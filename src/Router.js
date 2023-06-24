import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/";
import Home from "./pages/Home/";
import Admin from "./pages/Admin/";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/error" element={<h1>404</h1>}></Route>
        </Routes>
    );
}

export default Router;
