import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import send from "../lib/api";

function useMultiple(name, url) {
    const ref = useRef();
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    function handleOptionMouseDown(e) {
        e.preventDefault();
        const option = e.target;
        option.selected = !option.selected;

        const currentSelectedOptions = ref.current.selectedOptions;
        let arr = [];
        for (let i = 0; i < currentSelectedOptions.length; i++) {
            const opt = currentSelectedOptions[i];
            arr.push({ value: opt.value, label: opt.label });
        }
        setSelectedOptions(arr);
    }

    function updateSelectedOptions(opts) {
        let arr = [];
        options.forEach((option) => {
            Object.values(opts ?? []).forEach((opt) => {
                if (opt.id == option.value) {
                    arr.push(option);
                }
            });
        });
        setSelectedOptions(arr);
    }

    function handleRemoveOption(value) {
        setSelectedOptions((prevOptions) => prevOptions.filter((option) => option.value !== value));
    }

    useEffect(() => {
        (async () => {
            const result = await send(url);
            setOptions(
                result.map((o) => {
                    return { value: o?.id, label: o?.name };
                })
            );
        })();
    }, []);

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
                    display={"Flex"}
                >
                    <Box
                        __css={{
                            width: "94%",
                            color: "hsl(0, 0%, 50%)",
                            display: "Flex",
                            alignItems: "Center",
                            margin: "6px 8px",
                        }}
                    >
                        {
                            <HStack spacing="24px">
                                {selectedOptions?.map((o) => (
                                    <ButtonGroup size="xs" isAttached>
                                        <Button borderLeftRadius={"2px"} colorScheme="gray">
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
                        rightIcon={<ChevronDownIcon />}
                    ></MenuButton>
                </Box>
                <MenuList __css={{ minWidth: "1px" }}>
                    <select
                        value={selectedOptions.map((i) => i.value)}
                        className="formSelect"
                        ref={ref}
                        multiple={true}
                        name={name}
                        onChange={() => {}}
                    >
                        {options?.map((o) => (
                            <option className="formOption" key={o.value} onMouseDown={handleOptionMouseDown} value={o.value}>
                                <MenuItem>{o.label}</MenuItem>
                            </option>
                        ))}
                    </select>
                </MenuList>
            </Menu>
        </div>
    );

    return [Select, updateSelectedOptions];
}

export default useMultiple;
