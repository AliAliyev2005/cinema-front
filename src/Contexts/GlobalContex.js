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
