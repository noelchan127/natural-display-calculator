// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Noel Chan
// Hide the console window on Windows release builds.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Url, WebviewWindowBuilder};

/// The calculator page itself (served by Tauri from the app's files).
fn is_app_page(url: &Url) -> bool {
    url.scheme() == "tauri" || url.host_str() == Some("tauri.localhost") || url.scheme() == "about"
}

/// Links in the About tab: only https links to GitHub leave the app, and they open in the default browser.
fn open_in_browser(url: &Url) {
    if url.scheme() != "https" || url.host_str() != Some("github.com") {
        return;
    }
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        const CREATE_NO_WINDOW: u32 = 0x0800_0000;
        // url.dll hands the address to the default browser without going through a command shell.
        let _ = std::process::Command::new("rundll32.exe")
            .args(["url.dll,FileProtocolHandler", url.as_str()])
            .creation_flags(CREATE_NO_WINDOW)
            .spawn();
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // The window is described in tauri.conf.json ("create": false) and built here so that
            // navigation away from the calculator can be caught and sent to the browser instead.
            let config = app
                .config()
                .app
                .windows
                .first()
                .cloned()
                .expect("tauri.conf.json defines the main window");
            WebviewWindowBuilder::from_config(app.handle(), &config)?
                .on_navigation(|url| {
                    if is_app_page(url) {
                        return true;
                    }
                    open_in_browser(url);
                    false
                })
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Natural Display Calculator");
}
