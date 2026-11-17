# Natural Display Calculator

A scientific and graphing calculator with natural (textbook) display, plus step-by-step derivative, integral, algebra, matrix and geometry calculators. It runs fully offline.

| Folder | What it is |
|---|---|
| `web/` | The calculator itself. `build.py` inlines the algebra library and fonts into one offline page, `web/dist/index.html`. |
| `windows/` | Windows desktop app. [Tauri](https://tauri.app) wrapper that renders the page with Microsoft Edge WebView2. |
| `android/` | Android app. A native `WebView` that serves the page from the app's own assets. No internet permission. |
| `art/` | App icon sources. |

## Getting the apps

Every push to `main` builds all three; download them from the run's **Artifacts** on the Actions tab.
Pushing a tag such as `v1.0.1` also publishes them as a GitHub Release.

- **Windows:** `Natural Display Calculator_<version>_x64-setup.exe` installs for the current user (no admin needed). The `(portable)` exe runs without installing. Both need the WebView2 runtime, which Windows 10 and 11 normally already have; the installer adds it if missing. The apps are not code-signed, so Windows SmartScreen warns the first time: choose **More info → Run anyway**.
- **Android:** `Natural-Display-Calculator.apk`. Allow installs from your browser or file manager when prompted. Android 7.0 or newer.

## Android signing

Updates only install over an existing copy if every APK is signed with the same key. The workflow reads it from these repository secrets:

| Secret | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | The release keystore (`.jks`), base64-encoded |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password |
| `ANDROID_KEY_ALIAS` | Key alias |
| `ANDROID_KEY_PASSWORD` | Key password |

Without them the build still succeeds but uses a throwaway debug key. Keep a backup of the keystore: if it is lost, the app has to be uninstalled before a newly signed version can be installed.

## Building locally

```sh
cd web && npm ci && python3 build.py          # web/dist/index.html
cd windows && npm ci && npx tauri build        # on Windows, with Rust installed
cd android && ./gradlew assembleRelease        # with the Android SDK (Android Studio)
```

To change the calculator, edit `web/src/index.html` or `web/src/solve.js`. Both apps pick up the rebuilt page.
