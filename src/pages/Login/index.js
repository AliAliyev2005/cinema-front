import { Container, Image, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";

function index() {
    return (
        <Container h={"100vh"} display={"flex"} flexDir={"column"} justifyContent={"center"}>
            <Image h={"6em"} objectFit={"contain"} src="images/logo-white.png" />
            <Tabs mt={10} isFitted variant="enclosed" w={"100%"} minH={"60vh"}>
                <TabList mb="1em">
                    <Tab>Login</Tab>
                    <Tab>Register</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Register />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default index;
