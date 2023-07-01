import { Box, Button, FormControl, HStack, Input } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import send from "../../../lib/api";

function Languages() {
    const [languages, setLanguages] = useState([]);

    const [editId, setEditId] = useState(0);

    const [form, setform] = useState({
        color: "blue",
        text: "add Language",
        function: handleAdd,
    });

    async function getLanguages() {
        const result = await send("/language/read.php");
        setLanguages(result);
    }

    async function handleAdd(event) {
        event.preventDefault();

        const language = {
            name: event.target.elements.name.value,
            code: event.target.elements.code.value,
        };

        await send("/language/create.php", language);

        getLanguages();
    }

    async function handleEdit(event) {
        event.preventDefault();

        console.log(editId);

        const language = {
            name: event.target.elements.name.value,
            code: event.target.elements.code.value,
            id: editId,
        };

        await send("/language/update.php", language);

        getLanguages();
    }

    useEffect(() => {
        getLanguages();
    }, []);

    async function deleteLanguage(l) {
        await send("/language/delete.php", l);
        getLanguages();
    }

    async function editLanguage(l) {
        setEditId(l.id);
        setform({ color: "green", text: "finish edit", function: handleEdit });
        document.getElementById("name").value = l.name;
        document.getElementById("code").value = l.code;
    }

    return (
        <div>
            <form onSubmit={form.function}>
                <HStack spacing={4}>
                    <FormControl width="auto">
                        <Input id="name" name="name" placeholder="Name" />
                    </FormControl>
                    <FormControl width="auto">
                        <Input id="code" name="code" placeholder="Code" />
                    </FormControl>
                    <FormControl>
                        <Button type="submit" colorScheme={form.color}>
                            {form.text}
                        </Button>
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
                                        <Button
                                            onClick={() => deleteLanguage(l)}
                                            colorScheme="red">
                                            <DeleteIcon />
                                        </Button>
                                        <Button
                                            onClick={() => editLanguage(l)}
                                            colorScheme="yellow">
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
