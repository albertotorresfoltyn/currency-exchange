import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Redirect, withRouter } from "react-router-dom";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Logo } from "../../components/Logo";
import { LoginForm } from "../../containers/LoginForm";
import { RegisterForm } from "../../containers/RegisterForm";
import authClient from "../../integrations/rest/auth";
import { useAuth, login } from "../../context/auth";

const Auth = ({ location }) => {
  const toast = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const {
    dispatch,
    state: { user, token },
  } = useAuth();
  const isAuth = Boolean(user) && Boolean(token);
  const updateAuthAction = () => {
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };
  const displayError = (error) => {
    toast({
      title: "Error",
      description: error || "There was an error, please try again later.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleLogin = async (data) => {
    try {
      await login(dispatch, data);
    } catch (e) {
      displayError(e.message);
    }
  };
  const handleRegister = async (body) => {
    try {
      const { user } = await authClient.register(body);
      toast({
        title: "Account created.",
        description: `We've created your account for you. Please try to login using ${user.username} and your password.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      displayError(e.message);
    }
  };
  const getPrevRoute = () => {
    return location.state && location.state.prevUrl
      ? location.state.prevUrl
      : "/";
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{
        base: "4",
        lg: "8",
      }}
    >
      {isAuth && <Redirect to={getPrevRoute()} />}
      <Box maxW="md" mx="auto">
        <Logo
          mx="auto"
          h="8"
          mb={{
            base: "10",
            md: "20",
          }}
        />
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          {isLogin ? "Sign in to your account" : "Sign up"}
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          {isLogin ? (
            <>
              <Text as="span">Don&apos;t have an account?</Text>
              <Link href="#" onClick={updateAuthAction}>
                Sign up clicking here!
              </Link>
            </>
          ) : (
            <Text as="span">You are just one step away from joining!</Text>
          )}
        </Text>
        <Card>
          {isLogin ? (
            <LoginForm handleLogin={handleLogin} displayError={displayError} />
          ) : (
            <RegisterForm
              handleGoBack={updateAuthAction}
              handleRegister={handleRegister}
              displayError={displayError}
            />
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default withRouter(Auth);
