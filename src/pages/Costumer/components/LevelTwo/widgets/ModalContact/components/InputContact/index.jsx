import * as React from "react";
import { TextField, InputLabel } from "@material-ui/core";

export const InputContact = ({
  label,
  errors,
  disabled,
  required,
  autoFocus,
  widthInput,
  placeholder,
  handleInputs,
}) => {
  return (
    <>
      <InputLabel
        required={required}
        className="__labelInput"
        error={errors.length > 0}
      >
        {label}
      </InputLabel>
      <TextField
        {...handleInputs}
        autoComplete="off"
        variant="outlined"
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        error={errors.length > 0}
        className={`__inputCustom_${widthInput}`}
        helperText={errors.length > 0 ? errors[0] : ""}
      />
    </>
  );
};

InputContact.defaultProps = {
  label: "",
  required: false,
  disabled: false,
  placeholder: "",
  autoFocus: false,
  widthInput: "w280",
};
