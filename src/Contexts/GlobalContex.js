import { createContext, useContext } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
