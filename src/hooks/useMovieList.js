import React, { useEffect, useRef, useState } from "react";
import Movie from "../components/Movie";
import send from "../lib/api";
import { Box, Button, FormControl, FormLabel, Input, SimpleGrid, Textarea } from "@chakra-ui/react";
import useMultiple from "./useMultiple";

function useMovieList(isAdmin = false) {
    const [movies, setMovies] = useState([]);
    const [SubtitleSelect, updateSelectedSubtitles] = useMultiple("subtitles", "/subtitle/read.php");
    const [FormatSelect, updateSelectedFormats] = useMultiple("formats", "/format/read.php");
    const [LanguageSelect, updateSelectedLangauges] = useMultiple("languages", "/language/read.php");
    const [GenreSelect, updateSelectedGenres] = useMultiple("genres", "/genre/read.php");
    const [isEdit, setIsEdit] = useState(false);

    const movieRef = useRef();

    async function getMovies() {
        var result = await send("/movie/read.php");
        setMovies(result);
    }

    async function handleDelete(movie) {
        await send("/movie/delete.php", movie);
        getMovies();
    }
    async function handleAdd(event) {
        event.preventDefault();

        const movie = {
            id: event.target.elements.id.value,
            name: event.target.elements.name.value,
            description: event.target.elements.description.value,
            poster: event.target.elements.poster.value,
            trailer: event.target.elements.trailer.value,
            age_limit: event.target.elements.age_limit.value,
            country: event.target.elements.country.value,
            director: event.target.elements.director.value,
            duration: event.target.elements.duration.value,
            languages: Array.from(event.target.elements.languages?.selectedOptions).map((i) => i.value),
            genres: Array.from(event.target.elements.genres?.selectedOptions).map((i) => i.value),
            subtitles: Array.from(event.target.elements.subtitles?.selectedOptions).map((i) => i.value),
            formats: Array.from(event.target.elements.formats?.selectedOptions).map((i) => i.value),
        };

        if (isEdit) {
            await send("/movie/update.php", movie);
        } else {
            await send("/movie/create.php", movie);
        }

        movieRef.current.reset();
        setIsEdit(false);
        getMovies();
    }
    function handleEdit(data) {
        setIsEdit(true);

        movieRef.current.elements.id.value = data.id;
        movieRef.current.elements.name.value = data.name;
        movieRef.current.elements.description.value = data.description;
        movieRef.current.elements.poster.value = data.poster;
        movieRef.current.elements.trailer.value = data.trailer;
        movieRef.current.elements.age_limit.value = data.age_limit;
        movieRef.current.elements.country.value = data.country;
        movieRef.current.elements.director.value = data.director;
        movieRef.current.elements.duration.value = data.duration;

        updateSelectedLangauges(data.languages);
        updateSelectedSubtitles(data.subtitles);
        updateSelectedGenres(data.genres);
        updateSelectedFormats(data.formats);
    }

    const EditMovie = () => (
        <form ref={movieRef} onSubmit={handleAdd}>
            <SimpleGrid columns={2} spacing={10}>
                <Box>
                    <Input hidden name="id" defaultValue={movieRef.current?.elements.id.value} />
                    <FormControl>
                        <FormLabel>Movie name</FormLabel>
                        <Input defaultValue={movieRef.current?.elements.name.value} name="name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea defaultValue={movieRef.current?.elements.description.value} name="description" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Poster</FormLabel>
                        <Input defaultValue={movieRef.current?.elements.poster.value} name="poster" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Trailer</FormLabel>
                        <Input defaultValue={movieRef.current?.elements.trailer.value} name="trailer" />
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
                        <Input defaultValue={movieRef.current?.elements.age_limit.value} name="age_limit" type="number" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Country</FormLabel>
                        <Input defaultValue={movieRef.current?.elements.country.value} name="country" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Director</FormLabel>
                        <Input defaultValue={movieRef.current?.elements.director.value} name="director" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Duration</FormLabel>
                        <Input defaultValue={movieRef.current?.elements.duration.value} name="duration" type="number" />
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
            {isEdit ? (
                <Button mt={5} colorScheme="green" type="submit" w={"100%"}>
                    Update Movie
                </Button>
            ) : (
                <Button mt={5} colorScheme="blue" type="submit" w={"100%"}>
                    Add Movie
                </Button>
            )}
        </form>
    );

    useEffect(() => {
        getMovies();
    }, []);

    const MovieList = () => (
        <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(320px, 1fr))">
            {Object.values(movies)?.map((movie, i) => (
                <Movie
                    isAdmin={isAdmin}
                    key={i}
                    data={movie}
                    handleDelete={() => handleDelete(movie)}
                    handleEdit={() => handleEdit(movie)}
                />
            ))}
        </SimpleGrid>
    );

    return { MovieList, EditMovie };
}

export default useMovieList;
