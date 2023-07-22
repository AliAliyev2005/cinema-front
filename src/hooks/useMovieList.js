import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import send from "../lib/api";
import { SimpleGrid } from "@chakra-ui/react";

function useMovieList({ isAdmin }) {
    const [movies, setMovies] = useState([]);

    async function getMovies() {
        var result = await send("/movie/read.php");
        setMovies(result);
    }

    useEffect(() => {
        getMovies();
    }, []);

    const MovieList = () => (
        <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(320px, 1fr))">
            {Object.values(movies)?.map((movie, i) => (
                <Movie isAdmin={isAdmin} key={i} data={movie} get={getMovies} />
            ))}
        </SimpleGrid>
    );

    return [MovieList, getMovies];
}

export default useMovieList;
