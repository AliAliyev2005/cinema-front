import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import send from "../../../lib/api";
import Select from "react-select";
import { useGlobalContext } from "../../../Contexts/GlobalContex";
import MovieList from "../../../components/MovieList";
import useMultipleSelect from "../../../hooks/useMultipleSelect";
import useMultiple from "../../../hooks/useMultiple";

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

    const [SubtitleSelect] = useMultiple(
        subtitles?.map((s) => {
            return { value: s.id, label: s.name };
        }),
        "subtitles2"
    );

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

    console.log(movieRef);

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
        const opts = event.target.elements.subtitles2.selectedOptions;
        for (let i = 0; i < opts.length; i++) {
            const element = opts[i];
            console.log(element.value);
        }

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
                                <SubtitleSelect />
                            </FormControl>
                            <FormControl>
                                <FormLabel>formats</FormLabel>
                                <Select
                                    name="formats"
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
                                    name="languages"
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
                                    name="genres"
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
