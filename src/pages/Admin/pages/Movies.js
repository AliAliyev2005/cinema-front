import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    SimpleGrid,
    Flex,
    Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import send from "../../../lib/api";
import Select from "react-select";
import { useGlobalContext } from "../../../Contexts/GlobalContex";
import MovieList from "../../../components/MovieList";

function Movies() {
    const { movieRef } = useGlobalContext();
    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [subtitles, setSubtitles] = useState([]);
    const [selectedSubtitles, setSelectedSubtitles] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [formats, setFormats] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);

    async function getLanguages() {
        const result = await send("/language/read.php");
        setLanguages(result);
    }

    async function getSubtitles() {
        const result = await send("/subtitle/read.php");
        setSubtitles(result);
    }

    async function getGenres() {
        const result = await send("/genre/read.php");
        setGenres(result);
    }

    async function getFormats() {
        const result = await send("/format/read.php");
        setFormats(result);
    }

    useEffect(() => {
        getLanguages();
    }, []);

    useEffect(() => {
        getSubtitles();
    }, []);

    useEffect(() => {
        getGenres();
    }, []);

    useEffect(() => {
        getFormats();
    }, []);

    function handleSelectLanguage(data) {
        setSelectedLanguages(data);
    }

    function handleSelectSubtitle(data) {
        setSelectedSubtitles(data);
    }

    function handleSelectGenre(data) {
        setSelectedGenres(data);
    }

    function handleSelectFormat(data) {
        setSelectedFormats(data);
    }

    async function handleAdd(event) {
        event.preventDefault();

        const movie = {
            name: event.target.elements.name.value,
            description: event.target.elements.description.value,
            poster: event.target.elements.poster.value,
            trailer: event.target.elements.trailer.value,
            ageLimit: event.target.elements.ageLimit.value,
            country: event.target.elements.country.value,
            director: event.target.elements.director.value,
            duration: event.target.elements.duration.value,
            languages: selectedLanguages.map((i) => i.value),
            genres: selectedGenres.map((i) => i.value),
            subtitles: selectedSubtitles.map((i) => i.value),
            formats: selectedFormats.map((i) => i.value),
        };

        await send("/movie/create.php", movie);
    }

    return (
        <Box>
            <Box>
                <form ref={movieRef} onSubmit={handleAdd}>
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
                            <FormControl>
                                <FormLabel>subtitles</FormLabel>
                                {/* <Select
                                    options={subtitles?.map((s) => {
                                        return { value: s.id, label: s.name };
                                    })}
                                    placeholder="Select Subtitle"
                                    value={selectedSubtitles}
                                    onChange={handleSelectSubtitle}
                                    isSearchable={true}
                                    isMulti
                                /> */}
                                {/* <select
                                    style={{
                                        width: "100%",
                                        minHeight: "100%",
                                        paddingTop: 6.5,
                                        paddingBottom: 6.5,
                                        border: "solid 1px ",
                                        borderRadius: "4px",
                                        borderColor: "rgb(204, 204, 204)",
                                    }}>
                                    <option
                                        color="rgb(204, 204, 204)"
                                        disabled
                                        selected>
                                        Select subtitle
                                    </option>
                                    {subtitles?.map((s) => {
                                        return (
                                            <option value={s.id}>
                                                {s.name}
                                            </option>
                                        );
                                    })}
                                </select> */}
                                <Box>
                                    <Box
                                        _hover={{ borderColor: "#b3b3b3" }}
                                        __css={{
                                            display: "Flex",
                                            width: "100%",
                                            minHeight: "100%",
                                            borderRadius: "4px",
                                            border: "solid 1px ",
                                            borderColor: "rgb(204, 204, 204)",
                                        }}>
                                        <Box
                                            __css={{
                                                width: "94%",
                                                padding: "2px 8px",
                                                color: "hsl(0, 0%, 50%)",
                                                display: "Flex",
                                                alignItems: "Center",
                                            }}>
                                            Select subtitle
                                        </Box>
                                        <Box
                                            _hover={{
                                                borderColor: "#b3b3b3",
                                                color: "#b3b3b3",
                                            }}
                                            __css={{
                                                display: "Flex",
                                                justifyContent: "center",
                                                alignContent: "center",
                                                padding: "8px 8px",
                                                borderLeft: "solid 1px ",
                                                borderColor:
                                                    "rgb(204, 204, 204)",
                                            }}>
                                            <svg
                                                height="20"
                                                width="20"
                                                viewBox="0 0 20 20"
                                                aria-hidden="true"
                                                focusable="false"
                                                class="css-tj5bde-Svg">
                                                <path
                                                    color="#cccccc"
                                                    d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                            </svg>
                                        </Box>
                                    </Box>
                                    <Box
                                        __css={{
                                            borderRadius: "4px",
                                            border: "solid 1px ",
                                            borderColor: "rgb(204, 204, 204)",
                                            marginTop: "10px",
                                            padding: "5px 0px",
                                        }}>
                                        {subtitles?.map((s) => {
                                            return (
                                                <Box
                                                    _hover={{
                                                        backgroundColor:
                                                            "#4299e130",
                                                    }}
                                                    __css={{
                                                        padding: "6px 8px",
                                                    }}>
                                                    {s.name}
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            </FormControl>
                            <FormControl>
                                <FormLabel>formats</FormLabel>
                                <Select
                                    options={formats?.map((s) => {
                                        return { value: s.id, label: s.name };
                                    })}
                                    placeholder="Select formats"
                                    value={selectedFormats}
                                    onChange={handleSelectFormat}
                                    isSearchable={true}
                                    isMulti
                                />
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
                                    placeholder="Select Language"
                                    value={selectedLanguages}
                                    onChange={handleSelectLanguage}
                                    isSearchable={true}
                                    isMulti
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Genres</FormLabel>
                                <Select
                                    options={genres?.map((g) => {
                                        return { value: g.id, label: g.name };
                                    })}
                                    placeholder="Select Genre"
                                    value={selectedGenres}
                                    onChange={handleSelectGenre}
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
                <MovieList />
            </Box>
        </Box>
    );
}

export default Movies;
