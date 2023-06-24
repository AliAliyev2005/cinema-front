import { Box, Button, FormControl, HStack, Input } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import send from "../../../lib/api";

function Languages() {
    const [languages, setLanguages] = useState([]);

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

    useEffect(() => {
        getLanguages();
    }, []);

    return (
        <div>
            <form onSubmit={handleAdd}>
                <HStack spacing={4}>
                    <FormControl width="auto">
                        <Input name="name" placeholder="Name" />
                    </FormControl>
                    <FormControl width="auto">
                        <Input name="code" placeholder="Code" />
                    </FormControl>
                    <FormControl>
                        <Button type="submit" colorScheme="blue">
                            Add Language
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
                        {languages.map((l, i) => (
                            <Tr key={i}>
                                <Td>{l.name}</Td>
                                <Td>{l.code}</Td>
                                <Td>
                                    <HStack>
                                        <Button colorScheme="red">
                                            <DeleteIcon />
                                        </Button>
                                        <Button colorScheme="yellow">
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
