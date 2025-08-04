// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use sysinfo::Disks;
use tauri::command;
use tauri_plugin_log::{Target, TargetKind};

fn detect_function() -> Disks {
    let disks = Disks::new_with_refreshed_list();
    disks
}

#[command]
fn get_dropdown_options() -> Vec<String> {
    let disks = detect_function();
    let mut options = vec![];
    for disk in &disks {
        // options.push(disk.name().to_string_lossy().to_string().into());
        options.push(disk.mount_point().to_string_lossy().to_string().into());
    }
    options
}

#[command]
fn receive_selected_option(selected: String) -> Result<String, String> {
    println!("Received selected option: {}", selected);

    // You can process or store `selected` as needed.
    // For this example, just return a confirmation.
    Ok(format!("Option '{}' received", selected))
}

fn main() {
    // let handle = std::thread::spawn(|| detect_function());
    // handle.join().unwrap();

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .targets([
                    Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::LogDir { file_name: None }),
                    Target::new(TargetKind::Webview),
                ])
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            get_dropdown_options,
            receive_selected_option
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
