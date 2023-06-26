import { Box, Button, FormControl, HStack, Input } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import send from "../../../lib/api";

function Genres() {
    const [genres, setGenres] = useState([]);

    async function getGenres() {
        const result = await send("/genre/read.php");
        setGenres(result);
    }

    async function handleAdd(event) {
        event.preventDefault();

        const genre = {
            name: event.target.elements.name.value,
        };

        await send("/genre/create.php", genre);

        getGenres();
    }

    useEffect(() => {
        getGenres();
    }, []);

    async function deleteGenre(l) {
        await send("/genre/delete.php", l);
        getGenres();
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
                            Add Genre
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
                        {genres?.map((l, i) => (
                            <Tr key={i}>
                                <Td>{l.name}</Td>
                                <Td>
                                    <HStack>
                                        <Button onClick={() => deleteGenre(l)} colorScheme="red">
                                            <DeleteIcon />
                                        </Button>
                                        <Button
                                            // onClick={editGenre(l.id)}
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

export default Genres;
