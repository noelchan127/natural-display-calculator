// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Noel Chan
// Hide the console window on Windows release builds.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running Natural Display Calculator");
}
