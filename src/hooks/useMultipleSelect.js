import React, { useState } from "react";
import { Select, Button } from "@chakra-ui/react";

const useMultipleSelect = (initialOptions, name) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (value) => {
        setSelectedOptions((prevSelectedOptions) => {
            if (prevSelectedOptions.includes(value)) {
                return prevSelectedOptions.filter((option) => option !== value);
            } else {
                return [...prevSelectedOptions, value];
            }
        });
    };

    const DropdownSelect = () => (
        <Select multiple value={selectedOptions} onChange={(e) => handleOptionChange(e.target.value)} name={name}>
            {initialOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );

    return [selectedOptions, DropdownSelect];
};

export default useMultipleSelect;
