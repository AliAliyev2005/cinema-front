import React from "react";
import { Box } from "@chakra-ui/react";
import useMovieList from "../../../hooks/useMovieList";

function Movies() {
    const { MovieList, EditMovie } = useMovieList(true);

    return (
        <Box>
            <EditMovie />
            <MovieList />
        </Box>
    );
}

export default Movies;
