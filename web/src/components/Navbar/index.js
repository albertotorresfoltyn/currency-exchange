import React, { isValidElement } from "react";
import {
  Divider,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MobileNavContent } from "../MobileNavContent";

export const Template = (props) => {
  const children = React.Children.toArray(props.children).filter(
    isValidElement
  );
  const mobileNav = useDisclosure();
  return (
    <Flex
      py={4}
      px={{
        base: 4,
        md: 6,
        lg: 8,
      }}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={useColorModeValue("md", "none")}
      borderBottomWidth={useColorModeValue("none", "1px")}
      justifyContent="space-between"
    >
      {children.find((child) => child.type === Brand)?.props.children}

      <Spacer />
      <HStack
        spacing={3}
        display={{
          base: "none",
          md: "flex",
        }}
      >
        {children.find((child) => child.type === UserInfo)?.props.children}
      </HStack>
      <HStack
        spacing={3}
        display={{
          base: "none",
          md: "flex",
        }}
      >
        {children.find((child) => child.type === Links)?.props.children}
      </HStack>

      <IconButton
        display={{
          base: "flex",
          md: "none",
        }}
        size="sm"
        aria-label="Open menu"
        fontSize="20px"
        variant="ghost"
        onClick={mobileNav.onOpen}
        icon={<HamburgerIcon />}
      />

      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose}>
        <Stack spacing={5}>
          <Flex>
            {children.find((child) => child.type === Brand)?.props.children}
          </Flex>
          <Stack>
            {children.find((child) => child.type === Links)?.props.children}
          </Stack>
          <Divider />
        </Stack>
      </MobileNavContent>
    </Flex>
  );
};

const UserInfo = () => null;
const Brand = () => null;
const Links = () => null;

export const Navbar = Object.assign(Template, {
  Brand,
  Links,
  UserInfo,
});
