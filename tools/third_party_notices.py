# SPDX-License-Identifier: GPL-3.0-or-later
# Copyright (C) 2026 Noel Chan
"""Write THIRD-PARTY-NOTICES.md: the components bundled into the apps and their licences.

Run from the repository root after `npm ci` in web/ (for the bundled library and fonts) and with
Cargo available (for the Rust crates compiled into the Windows app):

    python3 tools/third_party_notices.py
"""
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(*p):
    with open(os.path.join(ROOT, *p), encoding='utf-8') as f:
        return f.read().strip('\n')


def crates():
    out = subprocess.run(
        ['cargo', 'metadata', '--format-version', '1', '--filter-platform', 'x86_64-pc-windows-msvc',
         '--manifest-path', os.path.join(ROOT, 'windows', 'src-tauri', 'Cargo.toml')],
        check=True, capture_output=True, text=True).stdout
    m = json.loads(out)
    used = {n['id'] for n in m['resolve']['nodes']}
    return sorted((p for p in m['packages'] if p['id'] in used and p['name'] != 'natural-display-calculator'),
                  key=lambda p: (p['name'], p['version']))


# Licences whose standard text is in licenses/ and needs no per-crate copy beyond the copyright lines.
SHARED = {'MIT': 'MIT.txt', 'Apache-2.0': 'Apache-2.0.txt', 'MPL-2.0': 'MPL-2.0.txt', 'Unicode-3.0': 'Unicode-3.0.txt'}
TEMPLATE = re.compile(r'\[yyyy\]|<year>|\{yyyy\}|\[name of|<copyright holders>|copyright owner|'
                      r'copyright notice|copyright holders? (be|and)|copyright holder\b|copyright license|'
                      r'copyright law|copyright statement|by copyright|copyright and|copyright,', re.I)


def chosen(expr):
    """The licence(s) this project uses the crate under: MIT where offered, else Apache-2.0, else as stated."""
    expr = (expr or '').replace('/', ' OR ')
    terms = []
    for conj in re.split(r'\s+AND\s+', expr):
        opts = [o.strip(' ()') for o in re.split(r'\s+OR\s+', conj) if o.strip(' ()')]
        for pick in ('MIT', 'Apache-2.0'):
            if pick in opts:
                terms.append(pick)
                break
        else:
            terms.append(opts[0] if opts else 'see crate')
    return list(dict.fromkeys(terms))


def licence_files(p):
    d = os.path.dirname(p['manifest_path'])
    return sorted(os.path.join(d, f) for f in os.listdir(d)
                  if re.match(r'(?i)^(licen[cs]e|copying|copyright|notice)', f) and os.path.isfile(os.path.join(d, f)))


def copyright_lines(p):
    lines = []
    for f in licence_files(p):
        if os.path.basename(f).upper().startswith('NOTICE'):
            continue
        with open(f, encoding='utf-8', errors='replace') as fh:
            for line in fh:
                t = line.strip()
                if (re.match(r'(?i)^copyright\b', t) or (re.match(r'(?i)^(\(c\)|©)', t) and re.search(r'\d{4}', t))) \
                        and not TEMPLATE.search(t) and len(t) < 200:
                    lines.append(t)
    lines = list(dict.fromkeys(lines))
    if not lines:
        who = ', '.join(a.split(' <')[0] for a in p.get('authors') or []) or f'the {p["name"]} developers'
        lines = [f'Copyright {who}']
    return lines


def crate_section(pkgs):
    out = ['| Crate | Version | Licence | Source |', '|---|---|---|---|']
    for p in pkgs:
        src = p.get('repository') or f'https://crates.io/crates/{p["name"]}'
        out.append(f'| {p["name"]} | {p["version"]} | {p["license"] or "see crate"} | {src} |')
    out += ['', f'{len(pkgs)} crates.', '', '### Copyright notices', '',
            'Each crate is used under the licence named after its notice (where several are offered, MIT, '
            'otherwise Apache-2.0). Licence texts not reproduced below are in [licenses/](licenses/).', '']
    verbatim, notices, by_repo, missing = {}, [], {}, []
    for p in pkgs:
        terms = chosen(p['license'])
        out.append(f'**{p["name"]} {p["version"]}** ({" AND ".join(terms)})')
        out.append('')
        out += [f'    {l}' for l in copyright_lines(p)]
        out.append('')
        for f in licence_files(p):
            base = os.path.basename(f)
            with open(f, encoding='utf-8', errors='replace') as fh:
                text = fh.read().strip('\n')
            if base.upper().startswith('NOTICE'):
                notices.append((p, text))
            elif any(t not in SHARED for t in terms) and not re.search(r'(?i)mit|apache', base):
                verbatim.setdefault(text, []).append(f'{p["name"]} {p["version"]}')
                by_repo[p.get('repository')] = text
        if any(t not in SHARED for t in terms) and not any(
                f'{p["name"]} {p["version"]}' in v for v in verbatim.values()):
            missing.append(p)
    for p in missing:  # published without a licence file: same text as a sibling crate from the same repository
        text = by_repo.get(p.get('repository'))
        if text is None:
            raise SystemExit(f'{p["name"]} {p["version"]}: no licence text for {p["license"]}; add it by hand')
        verbatim[text].append(f'{p["name"]} {p["version"]} (published without its own copy; same repository)')
    if notices:
        out += ['### NOTICE files', '']
        for p, text in notices:
            out += [f'**{p["name"]} {p["version"]}**', '', '```', text, '```', '']
    if verbatim:
        out += ['### Other licence texts', '',
                'These crates use licences that carry their own copyright line, reproduced as published:', '']
        for text, names in verbatim.items():
            out += [f'Applies to: {", ".join(names)}', '', '```', text, '```', '']
    return out


def main():
    stix = read('web', 'node_modules', '@fontsource', 'stix-two-text', 'LICENSE').splitlines()[0]
    plex = read('web', 'node_modules', '@fontsource', 'ibm-plex-sans', 'LICENSE').splitlines()[0]
    stix = stix.split(' STIXTwo')[0]
    plex = plex.split(' IBMPlex')[0]
    nerd = json.loads(read('web', 'node_modules', 'nerdamer', 'package.json'))['version']
    rows = crates()
    parts = [
        '# Third-party notices',
        '',
        'Natural Display Calculator is licensed under the GNU General Public License, version 3 or (at your option) '
        'any later version '
        '(see [LICENSE](LICENSE)). It includes the following components, which keep their own licences. '
        'All of them are compatible with GPL-3.0.',
        '',
        '## In every version (web page, Windows and Android)',
        '',
        f'### nerdamer {nerd} (algebra library)',
        '',
        'Licensed under the MIT License:',
        '',
        '```',
        read('licenses', 'nerdamer-MIT.txt'),
        '```',
        '',
        '### STIX Two Text and IBM Plex Sans (fonts)',
        '',
        f'- STIX Two Text: {stix}',
        f'- IBM Plex Sans: {plex}',
        '',
        'Both fonts are licensed under the SIL Open Font License, Version 1.1, which follows. The fonts are '
        'embedded unmodified (as published by Fontsource); they remain under the OFL, not the GPL.',
        '',
        '```',
        read('licenses', 'OFL-1.1.txt'),
        '```',
        '',
        '## Android app',
        '',
        'Includes AndroidX libraries (webkit, core and their dependencies) and the Kotlin standard library and '
        'coroutines, by The Android Open Source Project, Google LLC and JetBrains s.r.o., licensed under the '
        'Apache License, Version 2.0 ([licenses/Apache-2.0.txt](licenses/Apache-2.0.txt)).',
        '',
        '## Windows app',
        '',
        'Built with Tauri and the Rust crates below, compiled into the executable. The MIT, Apache-2.0, '
        'MPL-2.0 and Unicode-3.0 texts are in [licenses/](licenses/); every crate\'s copyright notice follows the '
        'table. The source code of each crate, including those under the Mozilla Public License 2.0, is available '
        'at the address in the Source column.',
        '',
        'The installer also contains Microsoft\'s Edge WebView2 Runtime bootstrapper, which Microsoft distributes '
        'under its own terms; it is a separate program and is not covered by this project\'s licence.',
        '',
    ]
    parts += crate_section(rows)
    with open(os.path.join(ROOT, 'THIRD-PARTY-NOTICES.md'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(parts))
    print(f'wrote THIRD-PARTY-NOTICES.md ({len(rows)} crates)')


if __name__ == '__main__':
    main()
