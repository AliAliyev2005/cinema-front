import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import send from "../../../lib/api";

function Register() {
    const [response, setResponse] = useState();

    async function handleSubmit(event) {
        event.preventDefault();
        const request = {
            name: event.target.elements.name.value,
            surname: event.target.elements.surname.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
        };

        var result = await send("/user/create.php", request);
        setResponse(result);
    }

    return (
        <form method="POST" onSubmit={handleSubmit} action="api.php">
            <FormControl>
                {response != null && (
                    <Alert status={response.code != 0 ? "error" : "success"}>
                        <AlertIcon />
                        {/* <AlertTitle>Error</AlertTitle> */}
                        <AlertDescription>{response?.message}</AlertDescription>
                    </Alert>
                )}
                <FormLabel mt={2}>Name</FormLabel>
                <Input name="name" type="text" placeholder="Name" />
                <FormLabel mt={2}>Surname</FormLabel>
                <Input name="surname" type="text" placeholder="Surname" />
                <FormLabel mt={2}>Email</FormLabel>
                <Input name="email" type="email" placeholder="Email" />
                <FormLabel mt={2}>Password</FormLabel>
                <Input name="password" type="password" placeholder="Password" />
                <Button onSubmit={handleSubmit} mt={5} type="submit" colorScheme="blue" w={"100%"}>
                    Register
                </Button>
            </FormControl>
        </form>
    );
}

export default Register;
