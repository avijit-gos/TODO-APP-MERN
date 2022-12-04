/** @format */

import React from "react";
import { Input } from "@chakra-ui/react";

const InputComp = ({ type, placeholder, id, value, onChange, className }) => {
  return (
    <React.Fragment>
      <Input
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        id={id}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default InputComp;
