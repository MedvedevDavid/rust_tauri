import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { trace, info, error, attachConsole } from '@tauri-apps/plugin-log'

const Dropdown: React.FC = () => {
    // State to hold options and selected value
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");

    useEffect(() => {
        // Fetch dropdown options from Rust backend on component mount
        async function fetchOptions() {
            try {
                // Invoke the Rust command; it returns a Vec<String> serialized as string[]
                const opts = (await invoke<string[]>("get_dropdown_options")) || [];
                setOptions(opts);
                if (opts.length > 0) {
                    setSelectedOption(opts[0]); // Default to first option
                }
            } catch (error) {
                console.error("Failed to fetch options:", error);
            }
        }
        fetchOptions();
    }, []);

    // Handle user selection
    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);

        try {
            // Send the selected option back to Rust
            const response = await invoke<string>("receive_selected_option", { selected: value });
            console.log("Response from Rust:", response);
        } catch (error) {
            console.error("Failed to send selected option:", error);
        }
    };

    return (
        <select value={selectedOption} onChange={handleChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;