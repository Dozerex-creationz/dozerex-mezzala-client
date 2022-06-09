import React from "react";
import Button from "@material-ui/core/Button";
const CustomButton = (props) => {
  return (
    <Button variant={props.variant} onClick={props.onClick}>
      {props.name}
    </Button>
  );
};

export default CustomButton;
