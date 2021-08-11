import { Text, Center, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "../../components/Logo";
import { Navbar } from "../../components/Navbar";
import { NavLink } from "../../components/NavLink";
import { useAuth, logout } from "../../context/auth";

export const NavbarWithButtons = () => {
  const {
    dispatch,
    state: { user },
  } = useAuth();
  return (
    <Navbar>
      <Navbar.Brand>
        <Center marginEnd="10">
          <Logo h="6" iconColor={mode("blue.600", "blue.300")} />
        </Center>
      </Navbar.Brand>
      <Navbar.UserInfo>
        <Text as="i" marginEnd="5">
          {`Welcome, ${user.firstName} ${user.lastName}`}
        </Text>
      </Navbar.UserInfo>
      <Navbar.Links>
        <NavLink onClick={() => logout(dispatch)}>Log out</NavLink>
      </Navbar.Links>
    </Navbar>
  );
};
