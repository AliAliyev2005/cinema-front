import { EditIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useGlobalContext } from "../Contexts/GlobalContex";

function Movie({ data }) {
    const { handleEdit } = useGlobalContext();

    return (
        <Card maxW="md">
            <CardHeader>
                <Heading size="md">{data.name}</Heading>
            </CardHeader>
            <Image objectFit="cover" src={data.poster} alt="Poster" />
            <Circle
                position={"absolute"}
                top={20}
                right={3}
                size="45px"
                bg="crimson"
                color="white"
                fontWeight={600}>
                {data.age_limit}+
            </Circle>
            <CardBody>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    {Object.values(data.languages).map((i) => (
                        <Tooltip label="Language" fontSize="md">
                            <Button size={"sm"} colorScheme="red">
                                {i.code}
                            </Button>
                        </Tooltip>
                    ))}
                    {Object.values(data.formats).map((i) => (
                        <Tooltip label="Format" fontSize="md">
                            <Button size={"sm"} colorScheme="green">
                                {i.name}
                            </Button>
                        </Tooltip>
                    ))}
                    {Object.values(data.subtitles).map((i) => (
                        <Tooltip label="Subtitle" fontSize="md">
                            <Button size={"sm"} colorScheme="yellow">
                                {i.code}
                            </Button>
                        </Tooltip>
                    ))}
                    <Button
                        onClick={() => {
                            handleEdit(data);
                        }}
                        colorScheme="yellow">
                        <EditIcon />
                    </Button>
                </Flex>
            </CardBody>
            <CardFooter display={"flex"} justifyContent={"center"}>
                <Button size={"lg"} w={"100%"} colorScheme="blue">
                    Sessions
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Movie;
