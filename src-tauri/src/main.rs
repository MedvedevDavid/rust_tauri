// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sysinfo::Disks;

fn detect_function() {
    // We display all disks' information:
    println!("=> disks:");
    let disks = Disks::new_with_refreshed_list();
    for disk in &disks {
        println!("{:?}", disk.name());
    }
}
fn main() {
    let handle = std::thread::spawn(|| detect_function());
    handle.join().unwrap();
    tauri_app_lib::run();
}
