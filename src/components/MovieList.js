import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import send from "../lib/api";
import { SimpleGrid } from "@chakra-ui/react";

function MovieList() {
    const [movies, setMovies] = useState([]);

    async function getMovies() {
        var result = await send("/movie/read.php");
        setMovies(result);
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(320px, 1fr))">
            {Object.values(movies).map((movie) => (
                <Movie data={movie} />
            ))}
        </SimpleGrid>
    );
}

export default MovieList;
