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

export const LoginForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <chakra.form
      onSubmit={(e) => {
        try {
          setIsLoading(true);
          e.preventDefault();
          props.handleLogin({ username, password });
        } catch (e) {
          props.displayError(`Error tying to login. Error: ${e.message}`);
        }
        setIsLoading(false);
      }}
    >
      {!isLoading ? (
        <Stack spacing="6">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              autoComplete="username"
              required
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </FormControl>
          <PasswordField
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
            Sign in
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
