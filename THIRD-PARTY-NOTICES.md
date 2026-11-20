# Third-party notices

Natural Display Calculator is licensed under the GNU General Public License, version 3 or (at your option) any later version (see [LICENSE](LICENSE)). It includes the following components, which keep their own licences. All of them are compatible with GPL-3.0.

## In every version (web page, Windows and Android)

### nerdamer 1.1.13 (algebra library)

Licensed under the MIT License:

```
Copyright (c) 2015 Martin Donk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

### STIX Two Text and IBM Plex Sans (fonts)

- STIX Two Text: Copyright 2001-2021 The STIX Fonts Project Authors (https://github.com/stipub/stixfonts)
- IBM Plex Sans: Copyright 2019 IBM Corp. All rights reserved.

Both fonts are licensed under the SIL Open Font License, Version 1.1, which follows. The fonts are embedded unmodified (as published by Fontsource); they remain under the OFL, not the GPL.

```
-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```

## Android app

Includes AndroidX libraries (webkit, core and their dependencies) and the Kotlin standard library and coroutines, by The Android Open Source Project, Google LLC and JetBrains s.r.o., licensed under the Apache License, Version 2.0 ([licenses/Apache-2.0.txt](licenses/Apache-2.0.txt)).

## Windows app

Built with Tauri and the Rust crates below, compiled into the executable. The MIT, Apache-2.0, MPL-2.0 and Unicode-3.0 texts are in [licenses/](licenses/); every crate's copyright notice follows the table. The source code of each crate, including those under the Mozilla Public License 2.0, is available at the address in the Source column.

The installer also contains Microsoft's Edge WebView2 Runtime bootstrapper, which Microsoft distributes under its own terms; it is a separate program and is not covered by this project's licence.

| Crate | Version | Licence | Source |
|---|---|---|---|
| adler2 | 2.0.1 | 0BSD OR MIT OR Apache-2.0 | https://github.com/oyvindln/adler2 |
| aho-corasick | 1.1.5 | Unlicense OR MIT | https://github.com/BurntSushi/aho-corasick |
| alloc-no-stdlib | 3.0.0 | BSD-3-Clause | https://github.com/dropbox/rust-alloc-no-stdlib |
| alloc-stdlib | 0.3.0 | BSD-3-Clause | https://github.com/dropbox/rust-alloc-no-stdlib |
| anyhow | 1.0.104 | MIT OR Apache-2.0 | https://github.com/dtolnay/anyhow |
| autocfg | 1.5.1 | Apache-2.0 OR MIT | https://github.com/cuviper/autocfg |
| base64 | 0.23.1 | MIT OR Apache-2.0 | https://github.com/marshallpierce/rust-base64 |
| bit-set | 0.8.0 | Apache-2.0 OR MIT | https://github.com/contain-rs/bit-set |
| bit-vec | 0.8.0 | Apache-2.0 OR MIT | https://github.com/contain-rs/bit-vec |
| bitflags | 2.13.2 | MIT OR Apache-2.0 | https://github.com/bitflags/bitflags |
| block-buffer | 0.12.1 | MIT OR Apache-2.0 | https://github.com/RustCrypto/utils |
| brotli | 9.1.3 | BSD-3-Clause AND MIT | https://github.com/dropbox/rust-brotli |
| brotli-decompressor | 6.3.2 | BSD-3-Clause/MIT | https://github.com/dropbox/rust-brotli-decompressor |
| bs58 | 0.5.1 | MIT/Apache-2.0 | https://github.com/Nullus157/bs58-rs |
| byteorder | 1.5.0 | Unlicense OR MIT | https://github.com/BurntSushi/byteorder |
| bytes | 1.12.2 | MIT | https://github.com/tokio-rs/bytes |
| camino | 1.2.6 | MIT OR Apache-2.0 | https://github.com/camino-rs/camino |
| cargo-platform | 0.1.9 | MIT OR Apache-2.0 | https://github.com/rust-lang/cargo |
| cargo_metadata | 0.19.2 | MIT | https://github.com/oli-obk/cargo_metadata |
| cargo_toml | 1.0.1 | Apache-2.0 OR MIT | https://gitlab.com/lib.rs/cargo_toml |
| cc | 1.11.2 | MIT OR Apache-2.0 | https://github.com/rust-lang/cc-rs |
| cfb | 0.14.0 | MIT | https://github.com/mdsteele/rust-cfb |
| cfg-if | 1.0.5 | MIT OR Apache-2.0 | https://github.com/rust-lang/cfg-if |
| chrono | 0.4.45 | MIT OR Apache-2.0 | https://github.com/chronotope/chrono |
| const-oid | 0.10.3 | Apache-2.0 OR MIT | https://github.com/RustCrypto/formats |
| cookie | 0.18.2 | MIT OR Apache-2.0 | https://github.com/SergioBenitez/cookie-rs |
| cpufeatures | 0.3.1 | MIT OR Apache-2.0 | https://github.com/RustCrypto/utils |
| crc32fast | 1.5.5 | MIT OR Apache-2.0 | https://github.com/srijs/rust-crc32fast |
| crossbeam-channel | 0.5.17 | MIT OR Apache-2.0 | https://github.com/crossbeam-rs/crossbeam |
| crossbeam-utils | 0.8.23 | MIT OR Apache-2.0 | https://github.com/crossbeam-rs/crossbeam |
| crypto-common | 0.2.2 | MIT OR Apache-2.0 | https://github.com/RustCrypto/traits |
| cssparser | 0.37.0 | MPL-2.0 | https://github.com/servo/rust-cssparser |
| cssparser-macros | 0.7.1 | MPL-2.0 | https://github.com/servo/rust-cssparser |
| ctor | 1.0.14 | Apache-2.0 OR MIT | https://github.com/mmastrac/linktime |
| darling | 0.24.1 | MIT | https://github.com/TedDriggs/darling |
| darling_core | 0.24.1 | MIT | https://github.com/TedDriggs/darling |
| darling_macro | 0.24.1 | MIT | https://github.com/TedDriggs/darling |
| deranged | 0.5.9 | MIT OR Apache-2.0 | https://github.com/jhpratt/deranged |
| derive_more | 2.1.1 | MIT | https://github.com/JelteF/derive_more |
| derive_more-impl | 2.1.1 | MIT | https://github.com/JelteF/derive_more |
| digest | 0.11.3 | MIT OR Apache-2.0 | https://github.com/RustCrypto/traits |
| dirs | 7.0.0 | MIT OR Apache-2.0 | https://codeberg.org/dirs/dirs-rs |
| dirs-sys | 0.5.0 | MIT OR Apache-2.0 | https://github.com/dirs-dev/dirs-sys-rs |
| displaydoc | 0.2.7 | MIT OR Apache-2.0 | https://github.com/yaahc/displaydoc |
| dom_query | 0.28.0 | MIT | https://github.com/niklak/dom_query |
| dpi | 0.1.2 | Apache-2.0 AND MIT | https://github.com/rust-windowing/winit |
| dtoa | 1.0.11 | MIT OR Apache-2.0 | https://github.com/dtolnay/dtoa |
| dtoa-short | 0.3.5 | MPL-2.0 | https://github.com/upsuper/dtoa-short |
| dunce | 1.0.5 | CC0-1.0 OR MIT-0 OR Apache-2.0 | https://gitlab.com/kornelski/dunce |
| dyn-clone | 1.0.20 | MIT OR Apache-2.0 | https://github.com/dtolnay/dyn-clone |
| embed-resource | 3.0.12 | MIT | https://github.com/nabijaczleweli/rust-embed-resource |
| equivalent | 1.0.3 | Apache-2.0 OR MIT | https://github.com/indexmap-rs/equivalent |
| erased-serde | 0.4.11 | MIT OR Apache-2.0 | https://github.com/dtolnay/erased-serde |
| fastrand | 2.5.0 | Apache-2.0 OR MIT | https://github.com/smol-rs/fastrand |
| fdeflate | 0.3.7 | MIT OR Apache-2.0 | https://github.com/image-rs/fdeflate |
| find-msvc-tools | 0.1.15 | MIT OR Apache-2.0 | https://github.com/rust-lang/cc-rs |
| flate2 | 1.1.11 | MIT OR Apache-2.0 | https://github.com/rust-lang/flate2-rs |
| fnv | 1.0.7 | Apache-2.0 / MIT | https://github.com/servo/rust-fnv |
| foldhash | 0.2.0 | Zlib | https://github.com/orlp/foldhash |
| form_urlencoded | 1.2.2 | MIT OR Apache-2.0 | https://github.com/servo/rust-url |
| getrandom | 0.3.4 | MIT OR Apache-2.0 | https://github.com/rust-random/getrandom |
| getrandom | 0.4.3 | MIT OR Apache-2.0 | https://github.com/rust-random/getrandom |
| glob | 0.3.4 | MIT OR Apache-2.0 | https://github.com/rust-lang/glob |
| hashbrown | 0.12.3 | MIT OR Apache-2.0 | https://github.com/rust-lang/hashbrown |
| hashbrown | 0.17.1 | MIT OR Apache-2.0 | https://github.com/rust-lang/hashbrown |
| heck | 0.5.0 | MIT OR Apache-2.0 | https://github.com/withoutboats/heck |
| hex | 0.4.3 | MIT OR Apache-2.0 | https://github.com/KokaKiwi/rust-hex |
| html5ever | 0.39.0 | MIT OR Apache-2.0 | https://github.com/servo/html5ever |
| http | 1.5.0 | MIT OR Apache-2.0 | https://github.com/hyperium/http |
| hybrid-array | 0.4.15 | MIT OR Apache-2.0 | https://github.com/RustCrypto/hybrid-array |
| ico | 0.6.0 | MIT | https://github.com/mdsteele/rust-ico |
| icu_collections | 2.4.0 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| icu_locale_core | 2.4.0 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| icu_normalizer | 2.4.0 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| icu_normalizer_data | 2.4.0 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| icu_properties | 2.4.0 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| icu_properties_data | 2.4.0 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| icu_provider | 2.4.0 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| ident_case | 1.0.1 | MIT/Apache-2.0 | https://github.com/TedDriggs/ident_case |
| idna | 1.1.0 | MIT OR Apache-2.0 | https://github.com/servo/rust-url/ |
| idna_adapter | 1.2.2 | Apache-2.0 OR MIT | https://github.com/hsivonen/idna_adapter |
| indexmap | 1.9.3 | Apache-2.0 OR MIT | https://github.com/bluss/indexmap |
| indexmap | 2.14.2 | Apache-2.0 OR MIT | https://github.com/indexmap-rs/indexmap |
| infer | 0.22.0 | MIT | https://github.com/bojand/infer |
| itoa | 1.0.19 | MIT OR Apache-2.0 | https://github.com/dtolnay/itoa |
| jiff | 0.2.46 | Unlicense OR MIT | https://github.com/BurntSushi/jiff |
| jiff | 1.0.1 | Unlicense OR MIT | https://github.com/BurntSushi/jiff |
| jiff-core | 0.1.8 | Unlicense OR MIT | https://github.com/BurntSushi/jiff |
| jiff-core | 1.0.1 | Unlicense OR MIT | https://github.com/BurntSushi/jiff |
| jiff-tzdb | 0.1.10 | Unlicense OR MIT | https://github.com/BurntSushi/jiff |
| jiff-tzdb | 1.0.0 | Unlicense OR MIT | https://github.com/BurntSushi/jiff |
| jiff-tzdb-platform | 0.1.3 | Unlicense OR MIT | https://github.com/BurntSushi/jiff |
| jiff-tzdb-platform | 1.0.0 | Unlicense OR MIT | https://github.com/BurntSushi/jiff |
| json-patch | 4.2.0 | MIT/Apache-2.0 | https://github.com/idubrov/json-patch |
| jsonptr | 0.7.1 | MIT OR Apache-2.0 | https://github.com/chanced/jsonptr |
| keyboard-types | 0.8.3 | MIT OR Apache-2.0 | https://github.com/rust-windowing/keyboard-types |
| libc | 0.2.191 | MIT OR Apache-2.0 | https://github.com/rust-lang/libc |
| litemap | 0.8.3 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| lock_api | 0.4.14 | MIT OR Apache-2.0 | https://github.com/Amanieu/parking_lot |
| log | 0.4.35 | MIT OR Apache-2.0 | https://github.com/rust-lang/log |
| markup5ever | 0.39.0 | MIT OR Apache-2.0 | https://github.com/servo/html5ever |
| memchr | 2.8.3 | Unlicense OR MIT | https://github.com/BurntSushi/memchr |
| mime | 0.3.18 | MIT OR Apache-2.0 | https://github.com/hyperium/mime |
| miniz_oxide | 0.8.9 | MIT OR Zlib OR Apache-2.0 | https://github.com/Frommi/miniz_oxide/tree/master/miniz_oxide |
| miniz_oxide | 0.9.1 | MIT OR Zlib OR Apache-2.0 | https://github.com/Frommi/miniz_oxide/tree/master/miniz_oxide |
| mio | 1.2.5 | MIT | https://github.com/tokio-rs/mio |
| muda | 0.20.0 | Apache-2.0 OR MIT | https://github.com/tauri-apps/muda |
| new_debug_unreachable | 1.0.6 | MIT | https://github.com/mbrubeck/rust-debug-unreachable |
| num-conv | 0.2.2 | MIT OR Apache-2.0 | https://github.com/jhpratt/num-conv |
| num-traits | 0.2.19 | MIT OR Apache-2.0 | https://github.com/rust-num/num-traits |
| once_cell | 1.21.4 | MIT OR Apache-2.0 | https://github.com/matklad/once_cell |
| option-ext | 0.2.0 | MPL-2.0 | https://github.com/soc/option-ext.git |
| parking_lot | 0.12.5 | MIT OR Apache-2.0 | https://github.com/Amanieu/parking_lot |
| parking_lot_core | 0.9.12 | MIT OR Apache-2.0 | https://github.com/Amanieu/parking_lot |
| percent-encoding | 2.3.2 | MIT OR Apache-2.0 | https://github.com/servo/rust-url/ |
| phf | 0.13.1 | MIT | https://github.com/rust-phf/rust-phf |
| phf_codegen | 0.13.1 | MIT | https://github.com/rust-phf/rust-phf |
| phf_generator | 0.13.1 | MIT | https://github.com/rust-phf/rust-phf |
| phf_macros | 0.13.1 | MIT | https://github.com/rust-phf/rust-phf |
| phf_shared | 0.13.1 | MIT | https://github.com/rust-phf/rust-phf |
| pin-project-lite | 0.2.18 | Apache-2.0 OR MIT | https://github.com/taiki-e/pin-project-lite |
| plist | 1.10.4 | MIT | https://github.com/ebarnard/rust-plist/ |
| png | 0.18.1 | MIT OR Apache-2.0 | https://github.com/image-rs/image-png |
| potential_utf | 0.1.6 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| powerfmt | 0.2.1 | MIT OR Apache-2.0 | https://github.com/jhpratt/powerfmt |
| precomputed-hash | 0.1.1 | MIT | https://github.com/emilio/precomputed-hash |
| proc-macro2 | 1.0.107 | MIT OR Apache-2.0 | https://github.com/dtolnay/proc-macro2 |
| quick-xml | 0.42.0 | MIT | https://github.com/tafia/quick-xml |
| quote | 1.0.47 | MIT OR Apache-2.0 | https://github.com/dtolnay/quote |
| raw-window-handle | 0.6.2 | MIT OR Apache-2.0 OR Zlib | https://github.com/rust-windowing/raw-window-handle |
| ref-cast | 1.0.27 | MIT OR Apache-2.0 | https://github.com/dtolnay/ref-cast |
| ref-cast-impl | 1.0.27 | MIT OR Apache-2.0 | https://github.com/dtolnay/ref-cast |
| regex | 1.13.2 | MIT OR Apache-2.0 | https://github.com/rust-lang/regex |
| regex-automata | 0.4.19 | MIT OR Apache-2.0 | https://github.com/rust-lang/regex |
| regex-syntax | 0.8.12 | MIT OR Apache-2.0 | https://github.com/rust-lang/regex |
| rustc-hash | 2.1.3 | Apache-2.0 OR MIT | https://github.com/rust-lang/rustc-hash |
| rustc_version | 0.4.1 | MIT OR Apache-2.0 | https://github.com/djc/rustc-version-rs |
| same-file | 1.0.6 | Unlicense/MIT | https://github.com/BurntSushi/same-file |
| schemars | 0.8.22 | MIT | https://github.com/GREsau/schemars |
| schemars | 0.9.0 | MIT | https://github.com/GREsau/schemars |
| schemars | 1.2.3 | MIT | https://github.com/GREsau/schemars |
| schemars_derive | 0.8.22 | MIT | https://github.com/GREsau/schemars |
| scopeguard | 1.2.0 | MIT OR Apache-2.0 | https://github.com/bluss/scopeguard |
| selectors | 0.38.0 | MPL-2.0 | https://github.com/servo/stylo |
| semver | 1.0.28 | MIT OR Apache-2.0 | https://github.com/dtolnay/semver |
| serde | 1.0.229 | MIT OR Apache-2.0 | https://github.com/serde-rs/serde |
| serde-untagged | 0.1.9 | MIT OR Apache-2.0 | https://github.com/dtolnay/serde-untagged |
| serde_core | 1.0.229 | MIT OR Apache-2.0 | https://github.com/serde-rs/serde |
| serde_derive | 1.0.229 | MIT OR Apache-2.0 | https://github.com/serde-rs/serde |
| serde_derive_internals | 0.29.1 | MIT OR Apache-2.0 | https://github.com/serde-rs/serde |
| serde_json | 1.0.154 | MIT OR Apache-2.0 | https://github.com/serde-rs/json |
| serde_repr | 0.1.21 | MIT OR Apache-2.0 | https://github.com/dtolnay/serde-repr |
| serde_spanned | 1.1.3 | MIT OR Apache-2.0 | https://github.com/toml-rs/toml |
| serde_with | 3.25.0 | MIT OR Apache-2.0 | https://github.com/jonasbb/serde_with/ |
| serde_with_macros | 3.25.0 | MIT OR Apache-2.0 | https://github.com/jonasbb/serde_with/ |
| serialize-to-javascript | 0.1.2 | MIT OR Apache-2.0 | https://github.com/chippers/serialize-to-javascript |
| serialize-to-javascript-impl | 0.1.2 | MIT OR Apache-2.0 | https://github.com/chippers/serialize-to-javascript |
| servo_arc | 0.4.3 | MIT OR Apache-2.0 | https://github.com/servo/stylo |
| sha2 | 0.11.1 | MIT OR Apache-2.0 | https://github.com/RustCrypto/hashes |
| shlex | 2.0.1 | MIT OR Apache-2.0 | https://github.com/comex/rust-shlex |
| simd-adler32 | 0.3.10 | MIT | https://github.com/mcountryman/simd-adler32 |
| siphasher | 1.0.4 | MIT OR Apache-2.0 | https://github.com/jedisct1/rust-siphash |
| smallvec | 1.16.6 | MIT OR Apache-2.0 | https://github.com/smallvec/smallvec |
| socket2 | 0.6.5 | MIT OR Apache-2.0 | https://github.com/rust-lang/socket2 |
| softbuffer | 0.4.8 | MIT OR Apache-2.0 | https://github.com/rust-windowing/softbuffer |
| stable_deref_trait | 1.2.1 | MIT OR Apache-2.0 | https://github.com/storyyeller/stable_deref_trait |
| static_vcruntime | 3.0.0 | MIT OR Apache-2.0 OR Zlib | https://github.com/ChrisDenton/static_vcruntime |
| string_cache | 0.9.0 | MIT OR Apache-2.0 | https://github.com/servo/string-cache |
| string_cache_codegen | 0.6.1 | MIT OR Apache-2.0 | https://github.com/servo/string-cache |
| strsim | 0.11.1 | MIT | https://github.com/rapidfuzz/strsim-rs |
| syn | 2.0.119 | MIT OR Apache-2.0 | https://github.com/dtolnay/syn |
| syn | 3.0.10 | MIT OR Apache-2.0 | https://github.com/dtolnay/syn |
| synstructure | 0.14.0 | MIT | https://github.com/mystor/synstructure |
| tao | 0.37.3 | Apache-2.0 | https://github.com/tauri-apps/tao |
| tauri | 2.12.7 | Apache-2.0 OR MIT | https://github.com/tauri-apps/tauri |
| tauri-build | 2.7.6 | Apache-2.0 OR MIT | https://github.com/tauri-apps/tauri |
| tauri-codegen | 2.7.6 | Apache-2.0 OR MIT | https://github.com/tauri-apps/tauri |
| tauri-macros | 2.7.6 | Apache-2.0 OR MIT | https://github.com/tauri-apps/tauri |
| tauri-runtime | 2.12.4 | Apache-2.0 OR MIT | https://github.com/tauri-apps/tauri |
| tauri-runtime-wry | 2.12.5 | Apache-2.0 OR MIT | https://github.com/tauri-apps/tauri |
| tauri-utils | 2.10.4 | Apache-2.0 OR MIT | https://github.com/tauri-apps/tauri |
| tauri-winres | 0.3.7 | MIT | https://github.com/tauri-apps/winres |
| tendril | 0.5.1 | MIT OR Apache-2.0 | https://github.com/servo/html5ever |
| thiserror | 2.0.21 | MIT OR Apache-2.0 | https://github.com/dtolnay/thiserror |
| thiserror-impl | 2.0.21 | MIT OR Apache-2.0 | https://github.com/dtolnay/thiserror |
| time | 0.3.55 | MIT OR Apache-2.0 | https://github.com/time-rs/time |
| time-core | 0.1.9 | MIT OR Apache-2.0 | https://github.com/time-rs/time |
| time-macros | 0.2.32 | MIT OR Apache-2.0 | https://github.com/time-rs/time |
| tinystr | 0.8.5 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| tinyvec | 1.13.3 | Zlib OR Apache-2.0 OR MIT | https://github.com/Lokathor/tinyvec |
| tokio | 1.54.1 | MIT | https://github.com/tokio-rs/tokio |
| toml | 1.2.1+spec-1.1.0 | MIT OR Apache-2.0 | https://github.com/toml-rs/toml |
| toml_datetime | 1.1.3+spec-1.1.0 | MIT OR Apache-2.0 | https://github.com/toml-rs/toml |
| toml_parser | 1.1.5+spec-1.1.0 | MIT OR Apache-2.0 | https://github.com/toml-rs/toml |
| toml_writer | 1.2.0+spec-1.1.0 | MIT OR Apache-2.0 | https://github.com/toml-rs/toml |
| tracing | 0.1.44 | MIT | https://github.com/tokio-rs/tracing |
| tracing-core | 0.1.36 | MIT | https://github.com/tokio-rs/tracing |
| tray-icon | 0.25.1 | MIT OR Apache-2.0 | https://github.com/tauri-apps/tray-icon |
| typeid | 1.0.3 | MIT OR Apache-2.0 | https://github.com/dtolnay/typeid |
| typenum | 1.20.1 | MIT OR Apache-2.0 | https://github.com/paholg/typenum |
| unicode-ident | 1.0.27 | (MIT OR Apache-2.0) AND Unicode-3.0 | https://github.com/dtolnay/unicode-ident |
| unicode-segmentation | 1.13.3 | MIT OR Apache-2.0 | https://github.com/unicode-rs/unicode-segmentation |
| url | 2.5.8 | MIT OR Apache-2.0 | https://github.com/servo/rust-url |
| urlpattern | 0.6.0 | MIT | https://github.com/denoland/rust-urlpattern |
| utf8_iter | 1.1.0 | Apache-2.0 OR MIT | https://github.com/hsivonen/utf8_iter |
| utf_types | 1.0.0 | Apache-2.0 OR MIT | https://github.com/hsivonen/utf_types |
| uuid | 1.29.3 | Apache-2.0 OR MIT | https://github.com/uuid-rs/uuid |
| version_check | 0.9.5 | MIT/Apache-2.0 | https://github.com/SergioBenitez/version_check |
| vswhom | 0.1.0 | MIT | https://github.com/nabijaczleweli/vswhom.rs |
| vswhom-sys | 0.1.3 | MIT | https://github.com/nabijaczleweli/vswhom-sys.rs |
| walkdir | 2.5.0 | Unlicense/MIT | https://github.com/BurntSushi/walkdir |
| web-time | 1.1.0 | MIT OR Apache-2.0 | https://github.com/daxpedda/web-time |
| web_atoms | 0.2.6 | MIT OR Apache-2.0 | https://github.com/servo/html5ever |
| webview2-com | 0.39.1 | MIT | https://github.com/wravery/webview2-rs |
| webview2-com-macros | 0.8.1 | MIT | https://github.com/wravery/webview2-rs |
| webview2-com-sys | 0.39.1 | MIT | https://github.com/wravery/webview2-rs |
| winapi-util | 0.1.11 | Unlicense OR MIT | https://github.com/BurntSushi/winapi-util |
| window-vibrancy | 0.8.1 | Apache-2.0 OR MIT | https://github.com/tauri-apps/tauri-plugin-vibrancy |
| windows | 0.62.2 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-collections | 0.3.2 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-core | 0.62.2 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-future | 0.3.2 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-implement | 0.60.2 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-interface | 0.59.3 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-link | 0.2.1 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-numerics | 0.3.1 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-result | 0.4.1 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-strings | 0.5.1 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-sys | 0.61.2 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-threading | 0.2.1 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| windows-version | 0.1.7 | MIT OR Apache-2.0 | https://github.com/microsoft/windows-rs |
| winnow | 1.0.5 | MIT | https://github.com/winnow-rs/winnow |
| winreg | 0.56.0 | MIT | https://github.com/gentoo90/winreg-rs |
| writeable | 0.6.4 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| wry | 0.57.3 | Apache-2.0 OR MIT | https://github.com/tauri-apps/wry |
| yoke | 0.8.4 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| yoke-derive | 0.8.4 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| zerofrom | 0.1.8 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| zerofrom-derive | 0.1.8 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| zerotrie | 0.2.5 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| zerovec | 0.11.9 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| zerovec-derive | 0.11.7 | Unicode-3.0 | https://github.com/unicode-org/icu4x |
| zlib-rs | 0.6.8 | Zlib | https://github.com/trifectatechfoundation/zlib-rs |
| zmij | 1.0.23 | MIT | https://github.com/dtolnay/zmij |

244 crates.

### Copyright notices

Each crate is used under the licence named after its notice (where several are offered, MIT, otherwise Apache-2.0). Licence texts not reproduced below are in [licenses/](licenses/).

**adler2 2.0.1** (MIT)

    Copyright (C) Jonas Schievink <jonasschievink@gmail.com>

**aho-corasick 1.1.5** (MIT)

    Copyright (c) 2015 Andrew Gallant

**alloc-no-stdlib 3.0.0** (BSD-3-Clause)

    Copyright (c) 2016 Dropbox, Inc.

**alloc-stdlib 0.3.0** (BSD-3-Clause)

    Copyright Daniel Reiter Horn

**anyhow 1.0.104** (MIT)

    Copyright David Tolnay

**autocfg 1.5.1** (MIT)

    Copyright (c) 2018 Josh Stone

**base64 0.23.1** (MIT)

    Copyright (c) 2025 Alice Maz, Marshall Pierce

**bit-set 0.8.0** (MIT)

    Copyright (c) 2023 The Rust Project Developers

**bit-vec 0.8.0** (MIT)

    Copyright (c) 2023 The Rust Project Developers

**bitflags 2.13.2** (MIT)

    Copyright (c) 2014 The Rust Project Developers

**block-buffer 0.12.1** (MIT)

    Copyright (c) 2018-2025 The RustCrypto Project Developers

**brotli 9.1.3** (BSD-3-Clause AND MIT)

    Copyright (c) 2016 Dropbox, Inc.
    Copyright (c) 2009, 2010, 2013-2016 by the Brotli Authors.

**brotli-decompressor 6.3.2** (MIT)

    Copyright (c) 2016 Dropbox, Inc.

**bs58 0.5.1** (MIT)

    Copyright (c) 2016 The roaring-rs developers.

**byteorder 1.5.0** (MIT)

    Copyright (c) 2015 Andrew Gallant

**bytes 1.12.2** (MIT)

    Copyright (c) 2018 Carl Lerche

**camino 1.2.6** (MIT)

    Copyright Without Boats, Ashley Williams, Steve Klabnik, Rain

**cargo-platform 0.1.9** (MIT)

    Copyright the cargo-platform developers

**cargo_metadata 0.19.2** (MIT)

    Copyright Oliver Schneider

**cargo_toml 1.0.1** (MIT)

    Copyright Kornel

**cc 1.11.2** (MIT)

    Copyright (c) 2014 Alex Crichton

**cfb 0.14.0** (MIT)

    Copyright (c) 2017 Matthew D. Steele

**cfg-if 1.0.5** (MIT)

    Copyright (c) 2014 Alex Crichton

**chrono 0.4.45** (MIT)

    Copyright (c) 2014, Kang Seonghoon.

**const-oid 0.10.3** (MIT)

    Copyright (c) 2020-2026 The RustCrypto Project Developers

**cookie 0.18.2** (MIT)

    Copyright 2017 Sergio Benitez
    Copyright 2014 Alex Chricton
    Copyright (c) 2017 Sergio Benitez
    Copyright (c) 2014 Alex Crichton

**cpufeatures 0.3.1** (MIT)

    Copyright (c) 2020-2026 The RustCrypto Project Developers

**crc32fast 1.5.5** (MIT)

    Copyright (c) 2018 Sam Rijs, Alex Crichton and contributors

**crossbeam-channel 0.5.17** (MIT)

    Copyright (c) 2019 The Crossbeam Project Developers
    Copyright (c) 2009 The Go Authors. All rights reserved.

**crossbeam-utils 0.8.23** (MIT)

    Copyright (c) 2019 The Crossbeam Project Developers

**crypto-common 0.2.2** (MIT)

    Copyright (c) 2021-2026 RustCrypto Developers

**cssparser 0.37.0** (MPL-2.0)

    Copyright Simon Sapin

**cssparser-macros 0.7.1** (MPL-2.0)

    Copyright Simon Sapin

**ctor 1.0.14** (MIT)

    Copyright Matt Mastracci

**darling 0.24.1** (MIT)

    Copyright (c) 2017 Ted Driggs

**darling_core 0.24.1** (MIT)

    Copyright (c) 2017 Ted Driggs

**darling_macro 0.24.1** (MIT)

    Copyright (c) 2017 Ted Driggs

**deranged 0.5.9** (MIT)

    Copyright 2024 Jacob Pratt et al.
    Copyright (c) 2024 Jacob Pratt et al.

**derive_more 2.1.1** (MIT)

    Copyright (c) 2016 Jelte Fennema

**derive_more-impl 2.1.1** (MIT)

    Copyright (c) 2016 Jelte Fennema

**digest 0.11.3** (MIT)

    Copyright (c) 2017-2025 RustCrypto Developers
    Copyright (c) 2017 Artyom Pavlov

**dirs 7.0.0** (MIT)

    Copyright (c) 2018-2019 dirs-rs contributors

**dirs-sys 0.5.0** (MIT)

    Copyright (c) 2018-2019 dirs-rs contributors

**displaydoc 0.2.7** (MIT)

    Copyright Jane Lusby

**dom_query 0.28.0** (MIT)

    Copyright (c) 2023 Mykola Humanov

**dpi 0.1.2** (Apache-2.0 AND MIT)

    Copyright (c) 2018 Jorge Aparicio
    copyright:
    Copyright © 2005-2020 Rich Felker, et al.
    Copyright © 1993,2004 Sun Microsystems or
    Copyright © 2003-2011 David Schultz or
    Copyright © 2003-2009 Steven G. Kargl or
    Copyright © 2003-2009 Bruce D. Evans or
    Copyright © 2008 Stephen L. Moshier or
    Copyright © 2017-2018 Arm Limited

**dtoa 1.0.11** (MIT)

    Copyright David Tolnay

**dtoa-short 0.3.5** (MPL-2.0)

    Copyright Xidorn Quan

**dunce 1.0.5** (Apache-2.0)

    Copyright Kornel

**dyn-clone 1.0.20** (MIT)

    Copyright David Tolnay

**embed-resource 3.0.12** (MIT)

    Copyright (c) 2017 nabijaczleweli

**equivalent 1.0.3** (MIT)

    Copyright (c) 2016--2023

**erased-serde 0.4.11** (MIT)

    Copyright David Tolnay

**fastrand 2.5.0** (MIT)

    Copyright Stjepan Glavina

**fdeflate 0.3.7** (MIT)

    Copyright The image-rs Developers

**find-msvc-tools 0.1.15** (MIT)

    Copyright (c) 2014 Alex Crichton

**flate2 1.1.11** (MIT)

    Copyright (c) 2014-2026 Alex Crichton

**fnv 1.0.7** (MIT)

    Copyright (c) 2017 Contributors

**foldhash 0.2.0** (Zlib)

    Copyright (c) 2024 Orson Peters

**form_urlencoded 1.2.2** (MIT)

    Copyright (c) 2013-2016 The rust-url developers

**getrandom 0.3.4** (MIT)

    Copyright (c) 2018-2025 The rust-random Project Developers
    Copyright (c) 2014 The Rust Project Developers

**getrandom 0.4.3** (MIT)

    Copyright (c) 2018-2026 The rust-random Project Developers
    Copyright (c) 2014 The Rust Project Developers

**glob 0.3.4** (MIT)

    Copyright (c) 2014 The Rust Project Developers

**hashbrown 0.12.3** (MIT)

    Copyright (c) 2016 Amanieu d'Antras

**hashbrown 0.17.1** (MIT)

    Copyright (c) 2016 Amanieu d'Antras

**heck 0.5.0** (MIT)

    Copyright (c) 2015 The Rust Project Developers

**hex 0.4.3** (MIT)

    Copyright (c) 2013-2014 The Rust Project Developers.
    Copyright (c) 2015-2020 The rust-hex Developers

**html5ever 0.39.0** (MIT)

    Copyright (c) 2014 The html5ever Project Developers

**http 1.5.0** (MIT)

    Copyright 2017 http-rs authors
    Copyright (c) 2017 http-rs authors

**hybrid-array 0.4.15** (MIT)

    Copyright (c) 2022-2026 The RustCrypto Project Developers

**ico 0.6.0** (MIT)

    Copyright (c) 2018 Matthew D. Steele

**icu_collections 2.4.0** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**icu_locale_core 2.4.0** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**icu_normalizer 2.4.0** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**icu_normalizer_data 2.4.0** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**icu_properties 2.4.0** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**icu_properties_data 2.4.0** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**icu_provider 2.4.0** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**ident_case 1.0.1** (MIT)

    Copyright Ted Driggs

**idna 1.1.0** (MIT)

    Copyright (c) 2013-2025 The rust-url developers

**idna_adapter 1.2.2** (MIT)

    Copyright (c) The rust-url developers

**indexmap 1.9.3** (MIT)

    Copyright (c) 2016--2017

**indexmap 2.14.2** (MIT)

    Copyright (c) 2016--2017

**infer 0.22.0** (MIT)

    Copyright (c) 2019 Bojan

**itoa 1.0.19** (MIT)

    Copyright David Tolnay

**jiff 0.2.46** (MIT)

    Copyright (c) 2015 Andrew Gallant

**jiff 1.0.1** (MIT)

    Copyright (c) 2015 Andrew Gallant

**jiff-core 0.1.8** (MIT)

    Copyright (c) 2015 Andrew Gallant

**jiff-core 1.0.1** (MIT)

    Copyright (c) 2015 Andrew Gallant

**jiff-tzdb 0.1.10** (MIT)

    Copyright (c) 2015 Andrew Gallant

**jiff-tzdb 1.0.0** (MIT)

    Copyright (c) 2015 Andrew Gallant

**jiff-tzdb-platform 0.1.3** (MIT)

    Copyright (c) 2015 Andrew Gallant

**jiff-tzdb-platform 1.0.0** (MIT)

    Copyright (c) 2015 Andrew Gallant

**json-patch 4.2.0** (MIT)

    Copyright (c) 2017 Ivan Dubrov

**jsonptr 0.7.1** (MIT)

    Copyright 2024 Chance Dinkins
    Copyright (c) 2022 Chance Dinkins

**keyboard-types 0.8.3** (MIT)

    Copyright (c) 2017 Pyfisch

**libc 0.2.191** (MIT)

    Copyright (c) The Rust Project Developers

**litemap 0.8.3** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**lock_api 0.4.14** (MIT)

    Copyright (c) 2016 The Rust Project Developers

**log 0.4.35** (MIT)

    Copyright (c) 2014 The Rust Project Developers

**markup5ever 0.39.0** (MIT)

    Copyright (c) 2014 The html5ever Project Developers

**memchr 2.8.3** (MIT)

    Copyright (c) 2015 Andrew Gallant

**mime 0.3.18** (MIT)

    Copyright (c) 2014 Sean McArthur

**miniz_oxide 0.8.9** (MIT)

    Copyright 2013-2014 RAD Game Tools and Valve Software
    Copyright 2010-2014 Rich Geldreich and Tenacious Software LLC
    Copyright (c) 2017 Frommi
    Copyright (c) 2017-2024 oyvindln
    Copyright (c) 2020 Frommi

**miniz_oxide 0.9.1** (MIT)

    Copyright 2013-2014 RAD Game Tools and Valve Software
    Copyright 2010-2014 Rich Geldreich and Tenacious Software LLC
    Copyright (c) 2017 Frommi
    Copyright (c) 2017-2024 oyvindln
    Copyright (c) 2020 Frommi

**mio 1.2.5** (MIT)

    Copyright (c) 2014 Carl Lerche and other MIO contributors

**muda 0.20.0** (MIT)

    Copyright (c) 2022-2022 Tauri Programme within The Commons Conservancy

**new_debug_unreachable 1.0.6** (MIT)

    Copyright (c) 2015 Jonathan Reem

**num-conv 0.2.2** (MIT)

    Copyright (c) Jacob Pratt

**num-traits 0.2.19** (MIT)

    Copyright (c) 2014 The Rust Project Developers

**once_cell 1.21.4** (MIT)

    Copyright Aleksey Kladov

**option-ext 0.2.0** (MPL-2.0)

    Copyright Simon Ochsenreither

**parking_lot 0.12.5** (MIT)

    Copyright (c) 2016 The Rust Project Developers

**parking_lot_core 0.9.12** (MIT)

    Copyright (c) 2016 The Rust Project Developers

**percent-encoding 2.3.2** (MIT)

    Copyright (c) 2013-2025 The rust-url developers

**phf 0.13.1** (MIT)

    Copyright (c) 2014-2022 Steven Fackler, Yuki Okushi

**phf_codegen 0.13.1** (MIT)

    Copyright (c) 2014-2022 Steven Fackler, Yuki Okushi

**phf_generator 0.13.1** (MIT)

    Copyright (c) 2014-2022 Steven Fackler, Yuki Okushi

**phf_macros 0.13.1** (MIT)

    Copyright (c) 2014-2022 Steven Fackler, Yuki Okushi

**phf_shared 0.13.1** (MIT)

    Copyright (c) 2014-2022 Steven Fackler, Yuki Okushi

**pin-project-lite 0.2.18** (MIT)

    Copyright the pin-project-lite developers

**plist 1.10.4** (MIT)

    Copyright (c) 2015 Edward Barnard

**png 0.18.1** (MIT)

    Copyright (c) 2015 nwin

**potential_utf 0.1.6** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**powerfmt 0.2.1** (MIT)

    Copyright 2023 Jacob Pratt et al.
    Copyright (c) 2023 Jacob Pratt et al.

**precomputed-hash 0.1.1** (MIT)

    Copyright (c) 2017 Emilio Cobos Álvarez

**proc-macro2 1.0.107** (MIT)

    Copyright David Tolnay, Alex Crichton

**quick-xml 0.42.0** (MIT)

    Copyright (c) 2016 Johann Tuffe

**quote 1.0.47** (MIT)

    Copyright David Tolnay

**raw-window-handle 0.6.2** (MIT)

    Copyright (c) 2019 Osspial
    Copyright (c) 2020 Osspial

**ref-cast 1.0.27** (MIT)

    Copyright David Tolnay

**ref-cast-impl 1.0.27** (MIT)

    Copyright David Tolnay

**regex 1.13.2** (MIT)

    Copyright (c) 2014 The Rust Project Developers

**regex-automata 0.4.19** (MIT)

    Copyright (c) 2014 The Rust Project Developers

**regex-syntax 0.8.12** (MIT)

    Copyright (c) 2014 The Rust Project Developers

**rustc-hash 2.1.3** (MIT)

    Copyright The Rust Project Developers

**rustc_version 0.4.1** (MIT)

    Copyright (c) 2016 The Rust Project Developers

**same-file 1.0.6** (MIT)

    Copyright (c) 2017 Andrew Gallant

**schemars 0.8.22** (MIT)

    Copyright (c) 2019 Graham Esau

**schemars 0.9.0** (MIT)

    Copyright (c) 2019 Graham Esau

**schemars 1.2.3** (MIT)

    Copyright (c) 2019 Graham Esau

**schemars_derive 0.8.22** (MIT)

    Copyright (c) 2019 Graham Esau

**scopeguard 1.2.0** (MIT)

    Copyright (c) 2016-2019 Ulrik Sverdrup "bluss" and scopeguard developers

**selectors 0.38.0** (MPL-2.0)

    Copyright The Servo Project Developers

**semver 1.0.28** (MIT)

    Copyright David Tolnay

**serde 1.0.229** (MIT)

    Copyright Erick Tryzelaar, David Tolnay

**serde-untagged 0.1.9** (MIT)

    Copyright David Tolnay

**serde_core 1.0.229** (MIT)

    Copyright Erick Tryzelaar, David Tolnay

**serde_derive 1.0.229** (MIT)

    Copyright Erick Tryzelaar, David Tolnay

**serde_derive_internals 0.29.1** (MIT)

    Copyright Erick Tryzelaar, David Tolnay

**serde_json 1.0.154** (MIT)

    Copyright the serde_json developers

**serde_repr 0.1.21** (MIT)

    Copyright David Tolnay

**serde_spanned 1.1.3** (MIT)

    Copyright Individual contributors
    Copyright (c) Individual contributors

**serde_with 3.25.0** (MIT)

    Copyright (c) 2015

**serde_with_macros 3.25.0** (MIT)

    Copyright (c) 2015

**serialize-to-javascript 0.1.2** (MIT)

    Copyright (c) 2021 Chip Reed

**serialize-to-javascript-impl 0.1.2** (MIT)

    Copyright (c) 2021 Chip Reed

**servo_arc 0.4.3** (MIT)

    Copyright The Servo Project Developers

**sha2 0.11.1** (MIT)

    Copyright (c) 2016-2026 The RustCrypto Project Developers
    Copyright (c) 2016 Artyom Pavlov
    Copyright (c) 2009-2013 Mozilla Foundation
    Copyright (c) 2006-2009 Graydon Hoare

**shlex 2.0.1** (MIT)

    Copyright 2015 Nicholas Allegra (comex).
    Copyright (c) 2015 Nicholas Allegra (comex).

**simd-adler32 0.3.10** (MIT)

    Copyright (c) [2021] [Marvin Countryman]

**siphasher 1.0.4** (MIT)

    Copyright 2012-2016 The Rust Project Developers.
    Copyright 2016-2026 Frank Denis.

**smallvec 1.16.6** (MIT)

    Copyright (c) 2018 The Servo Project Developers

**socket2 0.6.5** (MIT)

    Copyright (c) 2014 Alex Crichton

**softbuffer 0.4.8** (MIT)

    Copyright 2022 Kirill Chibisov

**stable_deref_trait 1.2.1** (MIT)

    Copyright (c) 2017 Robert Grosse

**static_vcruntime 3.0.0** (MIT)

    Copyright (c) 2021 Chris Denton.

**string_cache 0.9.0** (MIT)

    Copyright (c) 2012-2013 Mozilla Foundation

**string_cache_codegen 0.6.1** (MIT)

    Copyright (c) 2012-2013 Mozilla Foundation

**strsim 0.11.1** (MIT)

    Copyright (c) 2015 Danny Guo
    Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>
    Copyright (c) 2018 Akash Kurdekar

**syn 2.0.119** (MIT)

    Copyright David Tolnay

**syn 3.0.10** (MIT)

    Copyright David Tolnay

**synstructure 0.14.0** (MIT)

    Copyright 2016 Nika Layzell

**tao 0.37.3** (Apache-2.0)

    Copyright Tauri Programme within The Commons Conservancy, The winit contributors

**tauri 2.12.7** (MIT)

    Copyright (c) 2017 - Present Tauri Apps Contributors

**tauri-build 2.7.6** (MIT)

    Copyright (c) 2017 - Present Tauri Apps Contributors

**tauri-codegen 2.7.6** (MIT)

    Copyright (c) 2017 - Present Tauri Apps Contributors

**tauri-macros 2.7.6** (MIT)

    Copyright (c) 2017 - Present Tauri Apps Contributors

**tauri-runtime 2.12.4** (MIT)

    Copyright (c) 2017 - Present Tauri Apps Contributors

**tauri-runtime-wry 2.12.5** (MIT)

    Copyright (c) 2017 - Present Tauri Apps Contributors

**tauri-utils 2.10.4** (MIT)

    Copyright (c) 2017 - Present Tauri Apps Contributors

**tauri-winres 0.3.7** (MIT)

    Copyright (c) 2023 - Present Tauri Apps Contributors
    Copyright (c) 2016 Max Resch

**tendril 0.5.1** (MIT)

    Copyright (c) 2015 Keegan McAllister

**thiserror 2.0.21** (MIT)

    Copyright David Tolnay

**thiserror-impl 2.0.21** (MIT)

    Copyright David Tolnay

**time 0.3.55** (MIT)

    Copyright (c) Jacob Pratt et al.

**time-core 0.1.9** (MIT)

    Copyright (c) Jacob Pratt et al.

**time-macros 0.2.32** (MIT)

    Copyright (c) Jacob Pratt et al.

**tinystr 0.8.5** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**tinyvec 1.13.3** (MIT)

    Copyright (c) 2019 Daniel "Lokathor" Gee.

**tokio 1.54.1** (MIT)

    Copyright (c) Tokio Contributors

**toml 1.2.1+spec-1.1.0** (MIT)

    Copyright Individual contributors
    Copyright (c) Individual contributors

**toml_datetime 1.1.3+spec-1.1.0** (MIT)

    Copyright Individual contributors
    Copyright (c) Individual contributors

**toml_parser 1.1.5+spec-1.1.0** (MIT)

    Copyright Individual contributors
    Copyright (c) Individual contributors

**toml_writer 1.2.0+spec-1.1.0** (MIT)

    Copyright Individual contributors
    Copyright (c) Individual contributors

**tracing 0.1.44** (MIT)

    Copyright (c) 2019 Tokio Contributors

**tracing-core 0.1.36** (MIT)

    Copyright (c) 2019 Tokio Contributors

**tray-icon 0.25.1** (MIT)

    Copyright (c) 2022-2022 Tauri Programme within The Commons Conservancy

**typeid 1.0.3** (MIT)

    Copyright David Tolnay

**typenum 1.20.1** (MIT)

    Copyright 2014 Paho Lurie-Gregg
    Copyright (c) 2014 Paho Lurie-Gregg

**unicode-ident 1.0.27** (MIT AND Unicode-3.0)

    Copyright © 1991-2023 Unicode, Inc.

**unicode-segmentation 1.13.3** (MIT)

    Copyright (c) 2015 The Rust Project Developers

**url 2.5.8** (MIT)

    Copyright (c) 2013-2025 The rust-url developers

**urlpattern 0.6.0** (MIT)

    Copyright (c) 2021 the Deno authors

**utf8_iter 1.1.0** (MIT)

    Copyright Mozilla Foundation

**utf_types 1.0.0** (MIT)

    Copyright Mozilla Foundation

**uuid 1.29.3** (MIT)

    Copyright (c) 2014 The Rust Project Developers
    Copyright (c) 2018 Ashley Mannix, Christopher Armstrong, Dylan DPC, Hunar Roop Kahlon

**version_check 0.9.5** (MIT)

    Copyright (c) 2017-2018 Sergio Benitez

**vswhom 0.1.0** (MIT)

    Copyright (c) 2019 nabijaczleweli

**vswhom-sys 0.1.3** (MIT)

    Copyright (c) 2019 nabijaczleweli

**walkdir 2.5.0** (MIT)

    Copyright (c) 2015 Andrew Gallant

**web-time 1.1.0** (MIT)

    Copyright 2023 dAxpeDDa
    Copyright (c) 2023 dAxpeDDa

**web_atoms 0.2.6** (MIT)

    Copyright (c) 2014 The html5ever Project Developers

**webview2-com 0.39.1** (MIT)

    Copyright the webview2-com developers

**webview2-com-macros 0.8.1** (MIT)

    Copyright the webview2-com-macros developers

**webview2-com-sys 0.39.1** (MIT)

    Copyright the webview2-com-sys developers

**winapi-util 0.1.11** (MIT)

    Copyright (c) 2017 Andrew Gallant

**window-vibrancy 0.8.1** (MIT)

    Copyright (c) 2020-2022 Tauri Programme within The Commons Conservancy

**windows 0.62.2** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-collections 0.3.2** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-core 0.62.2** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-future 0.3.2** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-implement 0.60.2** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-interface 0.59.3** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-link 0.2.1** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-numerics 0.3.1** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-result 0.4.1** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-strings 0.5.1** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-sys 0.61.2** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-threading 0.2.1** (MIT)

    Copyright (c) Microsoft Corporation.

**windows-version 0.1.7** (MIT)

    Copyright (c) Microsoft Corporation.

**winnow 1.0.5** (MIT)

    Copyright the winnow developers

**winreg 0.56.0** (MIT)

    Copyright (c) 2015 Igor Shaula

**writeable 0.6.4** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**wry 0.57.3** (MIT)

    Copyright (c) 2020-2023 Ngo Iok Ui & Tauri Programme within The Commons Conservancy

**yoke 0.8.4** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**yoke-derive 0.8.4** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**zerofrom 0.1.8** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**zerofrom-derive 0.1.8** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**zerotrie 0.2.5** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**zerovec 0.11.9** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**zerovec-derive 0.11.7** (Unicode-3.0)

    Copyright © 2020-2024 Unicode, Inc.

**zlib-rs 0.6.8** (Zlib)

    (C) 2024 Trifecta Tech Foundation

**zmij 1.0.23** (MIT)

    Copyright David Tolnay

### Other licence texts

These crates use licences that carry their own copyright line, reproduced as published:

Applies to: alloc-no-stdlib 3.0.0, brotli 9.1.3, alloc-stdlib 0.3.0 (published without its own copy; same repository)

```
Copyright (c) 2016 Dropbox, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

Applies to: foldhash 0.2.0

```
Copyright (c) 2024 Orson Peters

This software is provided 'as-is', without any express or implied warranty. In
no event will the authors be held liable for any damages arising from the use of
this software.

Permission is granted to anyone to use this software for any purpose, including
commercial applications, and to alter it and redistribute it freely, subject to
the following restrictions:

1. The origin of this software must not be misrepresented; you must not claim
    that you wrote the original software. If you use this software in a product,
    an acknowledgment in the product documentation would be appreciated but is
    not required.

2. Altered source versions must be plainly marked as such, and must not be
    misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
```

Applies to: zlib-rs 0.6.8

```
(C) 2024 Trifecta Tech Foundation 

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
```
