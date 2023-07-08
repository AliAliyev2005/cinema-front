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

function Subtitles() {
    const [subtitles, setSubtitles] = useState([]);

    async function getSubtitles() {
        const result = await send("/subtitle/read.php");
        setSubtitles(result);
    }

    async function handleAdd(event) {
        event.preventDefault();

        const subtitle = {
            name: event.target.elements.name.value,
            code: event.target.elements.code.value,
        };

        await send("/subtitle/create.php", subtitle);

        getSubtitles();
    }

    useEffect(() => {
        getSubtitles();
    }, []);

    async function deleteSubtitle(l) {
        await send("/subtitle/delete.php", l);
        getSubtitles();
    }

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
                            Add Subtitle
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
                        {subtitles?.map((l, i) => (
                            <Tr key={i}>
                                <Td>{l.name}</Td>
                                <Td>{l.code}</Td>
                                <Td>
                                    <HStack>
                                        <Button
                                            onClick={() => deleteSubtitle(l)}
                                            colorScheme="red">
                                            <DeleteIcon />
                                        </Button>
                                        <Button
                                            // onClick={editSubtitle(l.id)}
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

export default Subtitles;
