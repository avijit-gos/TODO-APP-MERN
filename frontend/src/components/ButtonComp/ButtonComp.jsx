/** @format */

import { Button } from "@chakra-ui/react";
import React from "react";

const ButtonComp = ({ clickHandler, className, btnText, disable }) => {
  return (
    <React.Fragment>
      <Button className={className} onClick={clickHandler} disabled={disable}>
        {btnText}
      </Button>
    </React.Fragment>
  );
};

export default ButtonComp;
