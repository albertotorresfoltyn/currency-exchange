import React, { useState, useEffect, useRef } from "react";
import { Stack, Input, Grid, GridItem } from "@chakra-ui/react";
import { useLazyQuery } from "@apollo/client";
import { Card } from "../../components/Card";
import { GET_EXCHANGE_RATE_QUERY } from "../../integrations/graphql/queries";
import { useAuth } from "../../context/auth";
import { debounce } from "../../utils";

export const CountryInfo = ({
  selectedItem,
  currencies: countryCurrencies,
}) => {
  const [base, setBase] = useState("SEK");
  const [amount, setAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [allcurrencies, setAllCurrencies] = useState([]);
  const {
    state: { token },
  } = useAuth();
  const [getExchangeRateQuery, { data }] = useLazyQuery(
    GET_EXCHANGE_RATE_QUERY,
    {
      fetchPolicy: "network-only",
      variables: {
        base,
        currencies: [...countryCurrencies, "SEK"].join(","),
        amount,
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
    }
  );
  const getExchangeRateQueryRef = useRef(debounce(getExchangeRateQuery, 800));
  const handleGetExchangeRate = (amount, code) => {
    setBase(code);
    setAmount(Number(amount));
    getExchangeRateQueryRef.current();
  };

  useEffect(() => {
    const curr = allcurrencies.map((c) => {
      let value = c.code === base ? amount : 0;
      if (data && data.getExchangeRate) {
        const exchangeRate = data.getExchangeRate.find(
          (res) => res.currencyName === c.code
        );
        if (exchangeRate) {
          value = exchangeRate.total;
        }
      }
      return {
        ...c,
        value,
      };
    });
    setCurrencies(curr);
  }, [data, allcurrencies, amount, base]);

  useEffect(
    () =>
      setAllCurrencies([
        ...selectedItem.currencies,
        { code: "SEK", name: "Swedish krona", symbol: "kr" },
      ]),
    [selectedItem.currencies]
  );

  return (
    <Card maxW="50%" margin="10px auto">
      <Stack spacing="3">
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={2} h="10">
            Population
          </GridItem>
          <GridItem textAlign="right" colSpan={3} h="10">
            {selectedItem.population}
          </GridItem>
          {currencies.map((c, i) => {
            return (
              <React.Fragment key={c.name + i}>
                <GridItem>{c.name}</GridItem>
                <GridItem textAlign="right" colStart={2} colEnd={6}>
                  {c.symbol}
                  <Input
                    width="80%"
                    maxW="140px"
                    marginLeft="5px"
                    name={c.name}
                    type="number"
                    textAlign="right"
                    value={c.value || 0}
                    onChange={(event) =>
                      handleGetExchangeRate(event.currentTarget.value, c.code)
                    }
                  />
                </GridItem>
              </React.Fragment>
            );
          })}
        </Grid>
      </Stack>
    </Card>
  );
};
