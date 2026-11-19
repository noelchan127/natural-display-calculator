# SPDX-License-Identifier: GPL-3.0-only
# Copyright (C) 2026 Noel Chan
"""Write THIRD-PARTY-NOTICES.md: the components bundled into the apps and their licences.

Run from the repository root after `npm ci` in web/ (for the bundled library and fonts) and with
Cargo available (for the Rust crates compiled into the Windows app):

    python3 tools/third_party_notices.py
"""
import json
import os
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
    rows = sorted((p['name'], p['version'], p['license'] or 'see crate', p.get('repository') or '')
                  for p in m['packages'] if p['id'] in used and p['name'] != 'natural-display-calculator')
    return rows


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
        'Natural Display Calculator is licensed under the GNU General Public License, version 3 only '
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
        'Built with Tauri and the Rust crates below, compiled into the executable. Each is used under the licence '
        'shown (where several are offered, under one of them). The MIT and Apache-2.0 texts are in '
        '[licenses/](licenses/); each crate\'s own copyright notice is in its repository.',
        '',
        'The installer also contains Microsoft\'s Edge WebView2 Runtime bootstrapper, which Microsoft distributes '
        'under its own terms; it is a separate program and is not covered by this project\'s licence.',
        '',
        '| Crate | Version | Licence |',
        '|---|---|---|',
    ]
    parts += [f'| {n} | {v} | {lic} |' for n, v, lic, _ in rows]
    parts += ['', f'{len(rows)} crates.', '']
    with open(os.path.join(ROOT, 'THIRD-PARTY-NOTICES.md'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(parts))
    print(f'wrote THIRD-PARTY-NOTICES.md ({len(rows)} crates)')


if __name__ == '__main__':
    main()
