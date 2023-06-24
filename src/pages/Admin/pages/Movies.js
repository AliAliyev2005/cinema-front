import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import React from "react";

function Movies() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Box>
                <Button onClick={onOpen} colorScheme="blue">
                    Add Movie
                </Button>
                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create new movie</DrawerHeader>

                        <DrawerBody>
                            <form>
                                <FormControl>
                                    <FormLabel mt={2}>Name</FormLabel>
                                    <Input type="text" placeholder="Login" />
                                    <FormLabel mt={2}>Age limit</FormLabel>
                                    <Input type="number" placeholder="Age limit" />
                                    <FormLabel mt={2}>Trailer</FormLabel>
                                    <Input type="text" placeholder="Trailer link" />
                                </FormControl>
                            </form>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue">Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Box>
    );
}

export default Movies;
