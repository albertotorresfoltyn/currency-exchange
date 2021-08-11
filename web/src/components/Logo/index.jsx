import { chakra, useColorModeValue, useToken } from "@chakra-ui/react";
import * as React from "react";

export const Logo = (props) => {
  const [black, white] = useToken("colors", ["black.400", "white.400"]);
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 658 156"
      fill={useColorModeValue(black, white)}
      h={props.h}
      flexShrink={0}
      mx={props.mx}
      mb={props.mb}
    >
      <path d="M113.546 44.91L96.474 3.87c-1.178-2.837-4.44-4.18-7.289-3.007L47.97 17.862a5.546 5.546 0 00-3.02 7.258l17.072 41.04c1.178 2.837 4.44 4.18 7.29 3.008l41.214-17c2.849-1.179 4.197-4.428 3.02-7.258zM79.728 74.488v44.421c0 3.066 2.5 5.555 5.578 5.555h44.61c3.079 0 5.578-2.489 5.578-5.555v-44.42c0-3.067-2.499-5.556-5.578-5.556h-44.61c-3.085 0-5.578 2.483-5.578 5.555zM41.084 124.297l31.545-31.41a5.538 5.538 0 000-7.855L41.084 53.62a5.595 5.595 0 00-7.888 0L1.652 85.03a5.538 5.538 0 000 7.855l31.544 31.411a5.596 5.596 0 007.888 0zM283.993 124.445h21.012L260.198 7.893h-24.137l-44.807 116.552h20.841l10.888-29.223h50.122l10.888 29.223zm-54.504-46.694l18.558-49.819 18.559 49.82h-37.117zM312.361 36.601h19.453v12.964c3.236-4.612 7.44-8.215 12.591-10.809 5.151-2.594 10.795-3.89 16.933-3.89 9.033 0 16.414 2.593 22.144 7.782 5.73 5.188 8.598 13.2 8.598 24.034v57.759h-19.275v-52.4c0-7.376-1.592-12.735-4.776-16.082-3.184-3.341-7.441-5.012-12.763-5.012-3.94 0-7.703 1.01-11.289 3.027-3.592 2.018-6.512 4.959-8.769 8.817-2.256 3.865-3.388 8.385-3.388 13.574v48.076h-19.453v-87.84h-.006zM459.431 36.597l-22.795 65.017-22.012-65.017H393.96l32.472 88.194c-1.506 3.917-3.124 6.943-4.861 9.079-1.737 2.129-3.737 3.655-5.993 4.585-2.257.924-4.947 1.383-8.072 1.383-2.316 0-5.033-.23-8.164-.695v15.388c2.894.577 5.907.865 9.032.865 6.947 0 12.703-.839 17.282-2.509 4.572-1.671 8.447-4.442 11.638-8.3 3.184-3.865 6.045-9.25 8.598-16.167l34.038-91.823h-20.499zM498.753 51.994h-13.486V36.606h13.486v-4.324c0-8.647 2.138-15.073 6.427-19.279 4.283-4.205 10.881-6.315 19.795-6.315 3.704 0 7.118.289 10.25.865v14.87a33.038 33.038 0 00-5.73-.517c-3.704 0-6.546 1.009-8.513 3.026-1.967 2.018-2.954 5.103-2.954 9.25v2.424h16.499v15.388h-16.499v72.458h-19.275V51.994zM545.058 5.993h19.453v19.889h-19.453V5.992zm.171 30.612h19.275v87.846h-19.275V36.605zM578.084 36.601h19.453v12.964c3.236-4.612 7.44-8.215 12.591-10.809 5.151-2.594 10.796-3.89 16.934-3.89 9.032 0 16.413 2.593 22.143 7.782 5.73 5.188 8.598 13.2 8.598 24.034v57.759h-19.275v-52.4c0-7.376-1.592-12.735-4.776-16.082-3.184-3.341-7.44-5.012-12.763-5.012-3.94 0-7.703 1.01-11.288 3.027-3.592 2.018-6.513 4.959-8.77 8.817-2.256 3.865-3.388 8.385-3.388 13.574v48.076h-19.459v-87.84z"></path>
    </chakra.svg>
  );
};