import { Box, Button, FormControl, HStack, Input } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import send from "../../../lib/api";

function Formats() {
    const [formats, setFormats] = useState([]);

    async function getFormats() {
        const result = await send("/format/read.php");
        setFormats(result);
    }

    async function handleAdd(event) {
        event.preventDefault();

        const format = {
            name: event.target.elements.name.value,
        };

        await send("/format/create.php", format);

        getFormats();
    }

    useEffect(() => {
        getFormats();
    }, []);

    async function deleteFormat(l) {
        await send("/format/delete.php", l);
        getFormats();
    }

    return (
        <div>
            <form onSubmit={handleAdd}>
                <HStack spacing={4}>
                    <FormControl width="auto">
                        <Input name="name" placeholder="Name" />
                    </FormControl>
                    <FormControl>
                        <Button type="submit" colorScheme="blue">
                            Add Format
                        </Button>
                    </FormControl>
                </HStack>
            </form>
            <TableContainer mt={5}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Edit</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {formats?.map((l, i) => (
                            <Tr key={i}>
                                <Td>{l.name}</Td>
                                <Td>
                                    <HStack>
                                        <Button onClick={() => deleteFormat(l)} colorScheme="red">
                                            <DeleteIcon />
                                        </Button>
                                        <Button
                                            // onClick={editFormat(l.id)}
                                            colorScheme="yellow"
                                        >
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

export default Formats;
