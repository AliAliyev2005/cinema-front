import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
} from "@chakra-ui/react";
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
        setSelectedOptions((prevOptions) =>
            prevOptions.filter((option) => option.value !== value)
        );
    }

    const Select = () => (
        <div>
            <Menu>
                <Box
                    _hover={{ borderColor: "#b3b3b3" }}
                    __css={{
                        width: "100%",
                        minHeight: "100%",
                        borderRadius: "4px",
                        border: "solid 1px ",
                        borderColor: "rgb(204, 204, 204)",
                    }}
                    display={"Flex"}>
                    <Box
                        __css={{
                            width: "94%",
                            color: "hsl(0, 0%, 50%)",
                            display: "Flex",
                            alignItems: "Center",
                            margin: "6px 8px",
                        }}>
                        {
                            <HStack spacing="24px">
                                {selectedOptions?.map((o) => (
                                    <ButtonGroup size="xs" isAttached>
                                        <Button
                                            borderLeftRadius={"2px"}
                                            colorScheme="gray">
                                            {o.label}
                                        </Button>
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
                        }
                    </Box>
                    <MenuButton
                        _hover={{
                            borderColor: "rgb(204, 204, 204)",
                        }}
                        __css={{
                            display: "Flex",
                            justifyContent: "center",
                            alignContent: "center",
                            padding: "8px 8px",
                            borderLeft: "solid 1px ",
                            borderColor: "#b3b3b3",
                            color: "#b3b3b3",
                        }}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}></MenuButton>
                </Box>
                <MenuList __css={{ minWidth: "1px" }}>
                    <select
                        className="formSelect"
                        ref={ref}
                        multiple={true}
                        name={name}>
                        {options?.map((o) => (
                            <option
                                className="formOption"
                                key={o.value}
                                selected={selectedOptions.find(
                                    (i) => i.value == o.value
                                )}
                                onMouseDown={handleOptionMouseDown}
                                value={o.value}>
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
