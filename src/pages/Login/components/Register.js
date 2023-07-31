import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import send from "../../../lib/api";

function Register() {
    function handleSubmit(event) {
        event.preventDefault();
        const request = {
            name: event.target.elements.name.value,
            surname: event.target.elements.surname.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
        };

        send("/user/create.php", request);
    }

    return (
        <form method="POST" onSubmit={handleSubmit} action="api.php">
            <FormControl>
                <FormLabel mt={2}>Name</FormLabel>
                <Input name="name" type="text" placeholder="Name" />
                <FormLabel mt={2}>Surname</FormLabel>
                <Input name="surname" type="text" placeholder="Surname" />
                <FormLabel mt={2}>Email</FormLabel>
                <Input name="email" type="email" placeholder="Email" />
                <FormLabel mt={2}>Password</FormLabel>
                <Input name="password" type="password" placeholder="Password" />
                <Button
                    onSubmit={handleSubmit}
                    mt={5}
                    type="submit"
                    colorScheme="blue"
                    w={"100%"}>
                    Register
                </Button>
            </FormControl>
        </form>
    );
}

export default Register;
