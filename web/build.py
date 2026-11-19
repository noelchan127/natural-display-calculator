# SPDX-License-Identifier: GPL-3.0-or-later
# Copyright (C) 2026 Noel Chan
"""Build web/dist/index.html: one self-contained, offline page.

Inlines the Solve script, the nerdamer algebra library and the fonts into
src/index.html, so the result needs no network access. Run `npm ci` first.
"""
import base64
import html
import hashlib
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
NM = os.path.join(HERE, 'node_modules')


def read(*p):
    with open(os.path.join(*p), encoding='utf-8') as f:
        return f.read()


def font_face(family, pkg, subset, weight, style, unicode_range=''):
    path = os.path.join(NM, '@fontsource', pkg, 'files', f'{pkg}-{subset}-{weight}-{style}.woff2')
    with open(path, 'rb') as f:
        data = base64.b64encode(f.read()).decode()
    rng = f'unicode-range:{unicode_range};' if unicode_range else ''
    return (f'@font-face{{font-family:"{family}";font-style:{style};font-weight:{weight};'
            f'font-display:swap;src:url(data:font/woff2;base64,{data}) format("woff2");{rng}}}\n')


def main():
    page = read(HERE, 'src', 'index.html')
    solve = read(HERE, 'src', 'solve.js')
    lib = read(NM, 'nerdamer', 'all.min.js')
    solve = solve.replace(
        'The algebra library did not load, so symbolic results are unavailable. '
        'Check the connection and reload. Matrix and Geometry still work.',
        'The built-in algebra library failed to start, so symbolic results are unavailable. '
        'Matrix and Geometry still work.')
    for name, code in (('solve.js', solve), ('nerdamer', lib)):
        if '</script' in code.lower():
            sys.exit(f'{name} contains </script and cannot be inlined')

    tags = ('<script src="https://cdn.jsdelivr.net/npm/nerdamer@1.1.13/all.min.js"></script>\n'
            '<script src="solve.js"></script>')
    if page.count(tags) != 1:
        sys.exit('script tags for nerdamer and solve.js not found in src/index.html')
    if not lib.startswith('var nerdamer='):
        sys.exit('nerdamer bundle no longer starts with "var nerdamer=": check the lazy-load wrapper')
    # Wrapped in a function so the browser only pre-parses it at start-up; solve.js runs it on first use.
    lib = 'window.__loadNerdamer=function(){\n' + lib + '\n;return nerdamer;};'
    page = page.replace(tags, '<script>\n' + lib + '\n</script>\n<script>\n' + solve + '\n</script>')

    links = re.findall(r'<link[^>]*fonts\.g[^>]*>\n', page)
    for link in links:
        page = page.replace(link, '')
    greek = 'U+0370-03FF'
    css = ''.join([
        font_face('STIX Two Text', 'stix-two-text', 'latin', 400, 'normal'),
        font_face('STIX Two Text', 'stix-two-text', 'latin', 400, 'italic'),
        font_face('STIX Two Text', 'stix-two-text', 'latin', 600, 'normal'),
        font_face('STIX Two Text', 'stix-two-text', 'greek', 400, 'normal', greek),
        font_face('STIX Two Text', 'stix-two-text', 'greek', 400, 'italic', greek),
        font_face('STIX Two Text', 'stix-two-text', 'greek', 600, 'normal', greek),
        font_face('IBM Plex Sans', 'ibm-plex-sans', 'latin', 400, 'normal'),
        font_face('IBM Plex Sans', 'ibm-plex-sans', 'latin', 500, 'normal'),
        font_face('IBM Plex Sans', 'ibm-plex-sans', 'latin', 600, 'normal'),
    ])
    page = page.replace('<style>\n', '<style>\n' + css, 1)

    # Licence texts for the About tab, so every copy carries them (GPL-3.0 section 4 and 6, MIT, OFL, Apache-2.0).
    root = os.path.dirname(HERE)
    version = read(root, 'VERSION').strip()
    texts = {'lic-gpl': read(root, 'LICENSE'), 'lic-3p': read(root, 'THIRD-PARTY-NOTICES.md'),
             'lic-apache': read(root, 'licenses', 'Apache-2.0.txt'), 'lic-mit': read(root, 'licenses', 'MIT.txt')}
    tpl = ''.join(f'<template id="{k}">{html.escape(v, quote=False)}</template>\n' for k, v in texts.items())
    if page.count('<script id="engine">') != 1:
        sys.exit('engine script tag not found')
    page = page.replace('<script id="engine">', tpl + '<script id="engine">', 1)
    if page.count('__APP_VERSION__') < 1:
        sys.exit('__APP_VERSION__ placeholder not found')
    page = page.replace('__APP_VERSION__', version)

    head = page.split('<script', 1)[0]
    if re.search(r'(src|href)="https?://', head):
        sys.exit('an external URL is still referenced in the page head')

    # Content Security Policy: only this page's own inline scripts and styles may run (matched by hash), and it may
    # not load or send anything. The Windows (WebView2), Android and offline copies all use this file.
    def sha(text):
        return "'sha256-" + base64.b64encode(hashlib.sha256(text.encode('utf-8')).digest()).decode() + "'"
    scripts = [sha(m.group(1)) for m in re.finditer(r'<script>(.*?)</script>', page, re.S)]
    scripts += [sha(m.group(1)) for m in re.finditer(r'<script id="engine">(.*?)</script>', page, re.S)]
    styles = [sha(m.group(1)) for m in re.finditer(r'<style>(.*?)</style>', page, re.S)]
    if re.search(r'<script(?! id="engine")(?!>)', page):
        sys.exit('a <script> tag with attributes would not be covered by the CSP hashes')
    csp = ("default-src 'none'; script-src " + ' '.join(scripts) + "; style-src " + ' '.join(styles) +
           "; font-src data:; img-src data:; connect-src ipc: http://ipc.localhost; base-uri 'none'; form-action 'none'")
    meta = '<meta http-equiv="Content-Security-Policy" content="' + csp + '">\n'
    if page.count('<meta charset="utf-8">\n') != 1:
        sys.exit('<meta charset="utf-8"> not found once in the page head')
    page = page.replace('<meta charset="utf-8">\n', '<meta charset="utf-8">\n' + meta, 1)

    os.makedirs(os.path.join(HERE, 'dist'), exist_ok=True)
    out = os.path.join(HERE, 'dist', 'index.html')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(page)
    print(f'wrote {out} ({len(page) // 1024} KB)')


if __name__ == '__main__':
    main()
