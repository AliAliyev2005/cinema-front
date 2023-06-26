import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import Movies from "./pages/Movies";
import Languages from "./pages/Languages";
import Genres from "./pages/Genres";
import Subtitles from "./pages/Subtitles";
import Formats from "./pages/Formats";

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
                        <Genres />
                    </TabPanel>
                    <TabPanel>
                        <Subtitles />
                    </TabPanel>
                    <TabPanel>
                        <Formats />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default index;
