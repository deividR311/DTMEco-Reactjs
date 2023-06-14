import * as React from "react";
import { TooltipCustom } from "../index";
import { TextField, InputLabel } from "@material-ui/core";

export const InputMaterial = ({
  name,
  label,
  errors,
  onChange,
  required,
  disabled,
  withHook,
  showError,
  widthInput,
  textTooltip,
  placeholder,
  handleInputs,
}) => {
  return (
    <>
      {withHook ? (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <InputLabel
              required={required}
              className="__labelInput"
              error={showError ? errors.length > 0 : showError}
            >
              {label}
            </InputLabel>
            {textTooltip !== "" && (
              <TooltipCustom
                title={textTooltip}
                placement={"top"}
                style={{
                  marginTop: "-2px",
                  display: "flex",
                }}
              />
            )}
          </div>
          <TextField
            {...handleInputs}
            autoComplete="off"
            variant="outlined"
            disabled={disabled}
            placeholder={placeholder}
            className={`__inputCustom_${widthInput}`}
            error={showError ? errors.length > 0 : showError}
            helperText={showError ? (errors.length > 0 ? errors[0] : "") : ""}
          />
        </>
      ) : (
        <>
          <InputLabel
            required={required}
            className="__labelInput"
            error={showError ? errors.length > 0 : showError}
          >
            {label}
          </InputLabel>
          <TextField
            name={name}
            autoComplete="off"
            variant="outlined"
            onChange={onChange}
            placeholder={placeholder}
            className={`__inputCustom_${widthInput}`}
            error={showError ? errors.length > 0 : showError}
            helperText={showError ? (errors.length > 0 ? errors[0] : "") : ""}
          />
        </>
      )}
    </>
  );
};

InputMaterial.defaultProps = {
  name: "",
  label: "",
  errors: [],
  withHook: true,
  required: false,
  textTooltip: "",
  disabled: false,
  placeholder: "",
  showError: true,
  widthInput: "w280",
  withTooltip: false,
};
