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
import { useGlobalContext } from "../../../Contexts/GlobalContex";
import useMovieList from "../../../hooks/useMovieList";
import useMultiple from "../../../hooks/useMultiple";

function Movies() {
    const { movieRef } = useGlobalContext();
    const [MovieList, getMovies] = useMovieList();
    const [languages, setLanguages] = useState([]);
    const [subtitles, setSubtitles] = useState([]);
    const [genres, setGenres] = useState([]);
    const [formats, setFormats] = useState([]);

    const [SubtitleSelect] = useMultiple(
        subtitles?.map((s) => {
            return { value: s.id, label: s.name };
        }),
        "subtitles"
    );
    const [FormatSelect] = useMultiple(
        formats?.map((s) => {
            return { value: s.id, label: s.name };
        }),
        "formats"
    );
    const [LanguageSelect] = useMultiple(
        languages?.map((s) => {
            return { value: s.id, label: s.name };
        }),
        "languages"
    );
    const [GenreSelect] = useMultiple(
        genres?.map((s) => {
            return { value: s.id, label: s.name };
        }),
        "genres"
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
            languages: Array.from(
                event.target.elements.languages?.selectedOptions
            ).map((i) => i.value),
            genres: Array.from(
                event.target.elements.genres?.selectedOptions
            ).map((i) => i.value),
            subtitles: Array.from(
                event.target.elements.subtitles?.selectedOptions
            ).map((i) => i.value),
            formats: Array.from(
                event.target.elements.formats?.selectedOptions
            ).map((i) => i.value),
        };

        await send("/movie/create.php", movie);

        getMovies();
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
                                <FormatSelect />
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
                                <LanguageSelect />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Genres</FormLabel>
                                <GenreSelect />
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                    <Button mt={5} colorScheme="blue" type="submit" w={"100%"}>
                        Add Movie
                    </Button>
                </form>
                <MovieList isAdmin={true} />
            </Box>
        </Box>
    );
}

export default Movies;
