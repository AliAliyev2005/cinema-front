import { createContext, useContext, useRef, useState } from "react";

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

        let languages = movieRef.current.elements.languages.options;
        for (let i = 0; i < languages.length; i++) {
            Object.values(data.languages).map((j) => {
                if (j.id == languages[i].value) {
                    languages[i].selected = true;
                }
            });
        }

        let subtitles = movieRef.current.elements.subtitles.options;
        for (let i = 0; i < subtitles.length; i++) {
            Object.values(data.subtitles).map((j) => {
                if (j.id == subtitles[i].value) {
                    subtitles[i].selected = true;
                }
            });
        }

        let formats = movieRef.current.elements.formats.options;
        for (let i = 0; i < formats.length; i++) {
            Object.values(data.formats).map((j) => {
                if (j.id == formats[i].value) {
                    formats[i].selected = true;
                }
            });
        }

        let genres = movieRef.current.elements.genres.options;
        for (let i = 0; i < genres.length; i++) {
            Object.values(data.genres).map((j) => {
                if (j.id == genres[i].value) {
                    genres[i].selected = true;
                }
            });
        }
    }

    const movieRef = useRef();

    return <GlobalContext.Provider value={{ handleEdit, movieRef }}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
