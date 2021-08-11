import React from "react";
import ReactSelect from "react-select";

const defaultStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
  }),
  input: (styles) => ({ ...styles, fontSize: 14 }),
  placeholder: (styles) => ({ ...styles, fontSize: 14 }),
  singleValue: (styles, { data }) => ({
    ...styles,
    fontSize: 14,
  }),
  option: (styles, { data }) => ({
    ...styles,
    fontSize: 14,
  }),
};

export const Select = ({ options, customStyles, ...rest }) => {
  return (
    <ReactSelect
      classNamePrefix="select"
      options={options}
      placeholder="Select the country"
      styles={customStyles || defaultStyles}
      {...rest}
    />
  );
};
