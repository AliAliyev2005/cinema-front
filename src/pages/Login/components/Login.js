import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

function Login() {
    function handleSubmit() {}

    return (
        <div>
            <FormControl>
                <FormLabel mt={2}>Name</FormLabel>
                <Input type="email" placeholder="Name" />
                <FormLabel mt={2}>Password</FormLabel>
                <Input type="password" placeholder="Password" />
                <Button
                    onSubmit={handleSubmit}
                    type="submit"
                    mt={5}
                    colorScheme="blue"
                    w={"100%"}>
                    Login
                </Button>
            </FormControl>
        </div>
    );
}

export default Login;
