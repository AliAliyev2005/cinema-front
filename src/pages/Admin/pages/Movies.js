import { Box, Button, Input, FormControl, FormLabel, Textarea, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import send from "../../../lib/api";
import Select from "react-select";

function Movies() {
    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    async function getLanguages() {
        const result = await send("/language/read.php");
        setLanguages(result);
    }

    useEffect(() => {
        getLanguages();
    }, []);

    function handleSelectLanguage(data) {
        setSelectedLanguages(data);
    }

    async function handleAdd(event) {
        event.preventDefault();

        const movie = {
            name: event.target.elements.name.value,
            languages: selectedLanguages.map((l) => l.id),
        };

        await send("/movie/create.php", movie);
    }

    return (
        <Box>
            <Box>
                <form onSubmit={handleAdd}>
                    <SimpleGrid columns={2} spacing={10}>
                        <Box>
                            <FormControl>
                                <FormLabel>Movie name</FormLabel>
                                <Input name="name" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea name="description" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Poster</FormLabel>
                                <Input name="poster" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Trailer</FormLabel>
                                <Input name="trailer" />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>Age limit</FormLabel>
                                <Input name="ageLimit" type="number" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Country</FormLabel>
                                <Input name="country" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Director</FormLabel>
                                <Input name="director" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Duration</FormLabel>
                                <Input name="duration" type="number" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Languages</FormLabel>
                                <Select
                                    options={languages?.map((l) => {
                                        return { value: l.id, label: l.name };
                                    })}
                                    placeholder="Select color"
                                    value={selectedLanguages}
                                    onChange={handleSelectLanguage}
                                    isSearchable={true}
                                    isMulti
                                />
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                    <Button mt={5} colorScheme="blue" type="submit" w={"100%"}>
                        Add Movie
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default Movies;
