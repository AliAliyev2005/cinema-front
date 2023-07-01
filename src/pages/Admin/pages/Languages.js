import { Box, Button, FormControl, HStack, Input } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import send from "../../../lib/api";

function Languages() {
    const [languages, setLanguages] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const formRef = useRef();

    async function getLanguages() {
        const result = await send("/language/read.php");
        setLanguages(result);
    }

    async function handleAdd() {
        const language = {
            name: formRef.current.elements.name.value,
            code: formRef.current.elements.code.value,
        };

        await send("/language/create.php", language);

        formRef.current.reset();

        getLanguages();
    }

    function prepareEdit(l) {
        setIsEdit(true);
        formRef.current.elements.id.value = l.id;
        formRef.current.elements.name.value = l.name;
        formRef.current.elements.code.value = l.code;
    }

    async function handleEdit() {
        const language = {
            id: formRef.current.elements.id.value,
            name: formRef.current.elements.name.value,
            code: formRef.current.elements.code.value,
        };

        await send("/language/update.php", language);

        setIsEdit(false);
        formRef.current.reset();

        getLanguages();
    }

    useEffect(() => {
        getLanguages();
    }, []);

    async function handleDelete(l) {
        await send("/language/delete.php", l);
        getLanguages();
    }

    return (
        <div>
            <form ref={formRef}>
                <HStack spacing={4}>
                    <FormControl width="auto">
                        <Input id="id" name="id" hidden />
                    </FormControl>
                    <FormControl width="auto">
                        <Input id="name" name="name" placeholder="Name" />
                    </FormControl>
                    <FormControl width="auto">
                        <Input id="code" name="code" placeholder="Code" />
                    </FormControl>
                    <FormControl>
                        {isEdit ? (
                            <Button colorScheme={"green"} onClick={() => handleEdit()}>
                                Edit
                            </Button>
                        ) : (
                            <Button colorScheme={"blue"} onClick={() => handleAdd()}>
                                Add
                            </Button>
                        )}
                    </FormControl>
                </HStack>
            </form>
            <TableContainer mt={5}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Code</Th>
                            <Th>Edit</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {languages?.map((l, i) => (
                            <Tr key={i}>
                                <Td>{l.name}</Td>
                                <Td>{l.code}</Td>
                                <Td>
                                    <HStack>
                                        <Button onClick={() => handleDelete(l)} colorScheme="red">
                                            <DeleteIcon />
                                        </Button>
                                        <Button onClick={() => prepareEdit(l)} colorScheme="yellow">
                                            <EditIcon />
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Languages;
