import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import React from "react";

// TYPES - save, delete, warning
function useAlert({ title, message, onSubmit, type }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const cancelRef = React.useRef();
    const types = {
        save: {
            color: "green",
            text: "Save",
        },
        delete: {
            color: "red",
            text: "Delete",
        },
    };

    function onSave() {
        onSubmit();
        onClose();
    }

    const Alert = () => (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {title}
                    </AlertDialogHeader>
                    <AlertDialogBody>{message}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme={types[type].color} onClick={onSave} ml={3}>
                            {types[type].text}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );

    return [Alert, onOpen];
}

export default useAlert;
