import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const CheckboxCommon = ({
  handleChange = () => {},
  label = "",
  checked = true,
  name = "checkedB",
  disabled = false
}) => {
  return (
    <>
      <FormControlLabel
        className="checkboxModify"
        control={
          <Checkbox disabled={disabled} name={name} checked={checked} onChange={handleChange} />
        }
        label={label}
      />
    </>
  );
};

export default CheckboxCommon;
