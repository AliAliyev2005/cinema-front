import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Button,
    Image,
    Circle,
    Tooltip,
    HStack,
    IconButton,
} from "@chakra-ui/react";
import useAlert from "../hooks/useAlert";
import React from "react";

function Movie({ isAdmin, data, handleDelete, handleEdit }) {
    const [DeleteAlert, onDelete] = useAlert({
        title: "Delete Movie",
        message: "Are you sure? You can't undo this action afterwards.",
        onSubmit: handleDelete,
        type: "delete",
    });

    return (
        <Card maxW="md">
            <CardHeader>
                <Flex w={"100%"} justifyContent={"space-between"}>
                    <Heading display={"flex"} alignItems={"Center"} size="md">
                        {data.name}
                    </Heading>
                    {isAdmin && (
                        <HStack spacing="12px">
                            <IconButton colorScheme="yellow" onClick={handleEdit} icon={<EditIcon />} />
                            <IconButton colorScheme="red" onClick={onDelete} icon={<DeleteIcon />} />
                        </HStack>
                    )}
                </Flex>
            </CardHeader>
            <Image objectFit="cover" src={data.poster} alt="Poster" />
            <Circle position={"absolute"} top={20} right={3} size="45px" bg="crimson" color="white" fontWeight={600}>
                {data.age_limit}+
            </Circle>
            <CardBody>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    {Object.values(data.languages ?? []).map((i) => (
                        <Tooltip label="Language" fontSize="md">
                            <Button size={"sm"} colorScheme="red">
                                {i.code}
                            </Button>
                        </Tooltip>
                    ))}
                    {Object.values(data.formats ?? []).map((i) => (
                        <Tooltip label="Format" fontSize="md">
                            <Button size={"sm"} colorScheme="green">
                                {i.name}
                            </Button>
                        </Tooltip>
                    ))}
                    {Object.values(data.subtitles ?? []).map((i) => (
                        <Tooltip label="Subtitle" fontSize="md">
                            <Button size={"sm"} colorScheme="yellow">
                                {i.code}
                            </Button>
                        </Tooltip>
                    ))}
                </Flex>
            </CardBody>
            <CardFooter display={"flex"} justifyContent={"center"}>
                <Button size={"lg"} w={"100%"} colorScheme="blue">
                    Sessions
                </Button>
            </CardFooter>
            <DeleteAlert />
        </Card>
    );
}

export default Movie;
