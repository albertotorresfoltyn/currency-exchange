import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PasswordField } from "../../components/PasswordField";

export const RegisterForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  return (
    <chakra.form
      onSubmit={(e) => {
        try {
          setIsLoading(true);
          e.preventDefault();
          if (password !== repeatedPassword) {
            throw new Error("Passwords are not equal.");
          }
          props.handleRegister({ firstname, lastname, username, password });
          props.handleGoBack();
        } catch (e) {
          props.displayError(`Error creating account. Error: ${e.message}`);
        }
        setIsLoading(false);
      }}
    >
      {!isLoading ? (
        <Stack spacing="6">
          <FormControl id="firstname">
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstname"
              type="firstname"
              autoComplete="firstname"
              required
              onChange={(event) => setFirstname(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl id="lastname">
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastname"
              type="lastname"
              autoComplete="lastname"
              required
              onChange={(event) => setLastname(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              autoComplete="text"
              required
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </FormControl>
          <PasswordField
            errorBorderColor="red.300"
            isInvalid={!!repeatedPassword && password !== repeatedPassword}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <PasswordField
            id="repeatPassword"
            name="repeatPassword"
            label="Repeat Password"
            errorBorderColor="red.300"
            isInvalid={!!repeatedPassword && password !== repeatedPassword}
            onChange={(event) => setRepeatedPassword(event.currentTarget.value)}
          />
          <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
            Sign up
          </Button>
          <Button
            onClick={props.handleGoBack}
            colorScheme="teal"
            variant="outline"
            size="lg"
            fontSize="md"
          >
            Cancel
          </Button>
        </Stack>
      ) : (
        <Center spacing={4}>
          <Spinner size="xl" />
        </Center>
      )}
    </chakra.form>
  );
};
