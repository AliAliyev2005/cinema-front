import { createContext, useContext, useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from "@chakra-ui/react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    function handleEdit(data) {
        movieRef.current.elements.name.value = data.name;
        movieRef.current.elements.description.value = data.description;
        movieRef.current.elements.poster.value = data.poster;
        movieRef.current.elements.trailer.value = data.trailer;
        movieRef.current.elements.ageLimit.value = data.age_limit;
        movieRef.current.elements.country.value = data.country;
        movieRef.current.elements.director.value = data.director;
        movieRef.current.elements.duration.value = data.duration;
        movieRef.current.elements.languages.value = Object.values(
            data.languages
        ).map((i) => {
            let node = new RadioNodeList();
            node.value = { value: i.id, label: i.code };
            return node;
        });
        movieRef.current.elements.genres.value = Object.values(data.genres);
        movieRef.current.elements.formats.value = Object.values(data.formats);
        movieRef.current.elements.subtitles.value = Object.values(
            data.subtitles
        );
        console.log(movieRef);
    }

    const movieRef = useRef();

    return (
        <GlobalContext.Provider value={{ handleEdit, movieRef }}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
