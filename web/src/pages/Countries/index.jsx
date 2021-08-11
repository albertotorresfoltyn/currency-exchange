import React, { useState } from "react";
import {
  useToast,
  Spinner,
  Center,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { NavbarWithButtons } from "../../containers/NavbarWithButtons";
import { CountryInfo } from "../../containers/CountryInfo";

import { Select } from "../../components/Select";
import { useAuth } from "../../context/auth";
import { GET_COUNTRIES_INFO_QUERY } from "../../integrations/graphql/queries";

const Countries = () => {
  const toast = useToast();
  const [pickerItems, setPickerItems] = React.useState([]);
  const [countryList, setCountryList] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [currencies, setCurrencies] = useState("");
  const {
    state: { token },
  } = useAuth();
  const displayError = (error) => {
    toast({
      title: "Error",
      description: error || "There was an error, please try again later.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  const { loading, error } = useQuery(GET_COUNTRIES_INFO_QUERY, {
    context: {
      headers: {
        Authorization: token,
      },
    },
    onCompleted: (data) => {
      if (data && Array.isArray(data.countries)) {
        const hashCountries = {};
        const pickerItems = [];
        data.countries.forEach((c) => {
          hashCountries[c.fullname] = c;
          pickerItems.push({ value: c.fullname, label: c.fullname });
        });
        setCountryList(hashCountries);
        setPickerItems(pickerItems);
      }
    },
  });
  if (error) {
    console.log("error", error);
    displayError(error);
  }
  return (
    <>
      <NavbarWithButtons />
      {loading ? (
        <Center spacing={4}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box
          minH="100vh"
          py="4"
          px={{
            base: "4",
            lg: "8",
          }}
        >
          <Box mx="auto">
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Country Info
            </Heading>
            <Text mt="4" mb="8" align="center" fontWeight="medium">
              <Text as="span">Do you want to try it?</Text>
            </Text>
            <Box maxW="50%" margin="0 auto">
              <Select
                onChange={(item) => {
                  const country = countryList[item.label];
                  setCurrencies(
                    country.currencies.map((currency) => currency.code)
                  );
                  setSelectedItem(country);
                }}
                options={pickerItems}
                isSearchable={true}
                name="countries"
                placeholder="Select the country"
              />
            </Box>
            {selectedItem ? (
              <CountryInfo
                key={"CountryInfo"}
                selectedItem={selectedItem}
                currencies={currencies}
              />
            ) : null}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Countries;
