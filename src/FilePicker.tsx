import React from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { trace, info, error, attachConsole } from '@tauri-apps/plugin-log'

const FilePicker: React.FC = () => {
    const handleBrowse = async () => {
        const detach = await attachConsole();
        error('This is an error');
        detach();
        const selected = await open();
        // const selected = await open({
        //     multiple: false,
        //     // directory: true, // Uncomment to select directories
        //     filters: [
        //         { name: "Text", extensions: ["txt", "md"] },
        //         // Add more filters as needed
        //     ],
        // });
        // const detach = await attachConsole();
        // error('This is an error');
        // detach();
        if (selected) {
            // selected is a string (file path) or null
            console.log("Selected:", selected);
            // You can now process the file further, e.g., read its contents
        }
        console.log("Selected:");
    };

    return <button onClick={handleBrowse}>Browse File</button>;
};

export default FilePicker;
