import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import Movies from "./pages/Movies";
import Languages from "./pages/Languages";

function index() {
    return (
        <Container maxW={"container.lg"}>
            <Tabs>
                <TabList>
                    <Tab>Movies</Tab>
                    <Tab>Languages</Tab>
                    <Tab>Genre</Tab>
                    <Tab>Subtitle</Tab>
                    <Tab>Format</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Movies />
                    </TabPanel>
                    <TabPanel>
                        <Languages />
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default index;
