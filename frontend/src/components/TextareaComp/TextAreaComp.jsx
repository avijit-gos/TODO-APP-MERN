/** @format */

import { Textarea } from "@chakra-ui/react";
import React from "react";

const TextAreaComp = ({ type, placeholder, className, value, onChange }) => {
  return (
    <React.Fragment>
      <Textarea
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}></Textarea>
    </React.Fragment>
  );
};

export default TextAreaComp;
