import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

function useMultiple(options, name) {
    const ref = useRef();
    const [selectedOptions, setSelectedOptions] = useState([]);

    function handleOptionMouseDown(e) {
        e.preventDefault();
        const option = e.target;
        option.selected = !option.selected;

        const so = ref.current.selectedOptions;
        let arr = [];
        for (let i = 0; i < so.length; i++) {
            const opt = so[i];
            console.log("selectedOptions", opt.label);
            arr.push({ value: opt.value, label: opt.label });
        }
        setSelectedOptions(arr);
    }

    function handleRemoveOption(value) {
        setSelectedOptions((prevOptions) => prevOptions.filter((option) => option.value !== value));
    }

    const Select = () => (
        <div>
            <HStack spacing="24px">
                {selectedOptions?.map((o) => (
                    <ButtonGroup size="sm" isAttached>
                        <Button colorScheme="gray">{o.label}</Button>
                        <IconButton
                            colorScheme="red"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveOption(o.value);
                            }}
                            icon={<DeleteIcon />}
                        />
                    </ButtonGroup>
                ))}
            </HStack>
            <Menu>
                <MenuButton size={"sm"} as={Button} rightIcon={<ChevronDownIcon />}></MenuButton>
                <MenuList>
                    <select ref={ref} multiple={true} name={name}>
                        {options.map((o) => (
                            <option
                                key={o.value}
                                selected={selectedOptions.find((i) => i.value == o.value)}
                                onMouseDown={handleOptionMouseDown}
                                value={o.value}
                            >
                                <MenuItem>{o.label}</MenuItem>
                            </option>
                        ))}
                    </select>
                </MenuList>
            </Menu>
        </div>
    );

    return [Select];
}

export default useMultiple;
