import * as React from "react";
import { TooltipCustom } from "../index";
import { TextField, InputLabel } from "@material-ui/core";
import { Stack } from "@mui/material";
// import { style } from "@mui/system";

export const InputCustom = ({
  max,
  name,
  value,
  label,
  errors,
  onChange,
  required,
  disabled,
  props = {},
  widthInput,
  textTooltip,
  placeholder,
  spacing = 1,
  showMessage,
  textMessage,
  width = "100%",
  lengthCharacters,
  showCharacters = false,
  autoFocus = false,
  maxLength = 40,
  buttonInput = <></>,
  type = "",
  inputMode = "",
  pattern = "",
  viewMaxCount = true,
  onInput = () => {},
}) => {
  const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const errores = (err) => {
    if (err) {
      return {
        position: "relative",
        bottom: "24px",
      };
    }
  };

  const [GetTextMessage, setGetTextMessage] = React.useState("");
  React.useEffect(() => {
    if (textMessage !== "") {
      setGetTextMessage(textMessage);
    }
  }, [textMessage]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <InputLabel className="__labelInput">
          {label}{" "}
          <span style={{ color: "red", marginLeft: "5px" }}>
            {required && " *"}
          </span>
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

      <Stack sx={{ width: width }} spacing={spacing}>
        <TextField
          type={type}
          {...props}
          size="small"
          name={name}
          value={value}
          autoComplete="off"
          variant="outlined"
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          className={`__inputCustom_${widthInput}`}
          error={errors.length > 0}
          helperText={errors.length > 0 ? errors[0] : ""}
          onInput={onInput}
          inputProps={{
            maxLength: maxLength,
            inputMode: inputMode,
            pattern: pattern,
          }}
          InputProps={{
            endAdornment: buttonInput,
          }}
          autoFocus={autoFocus}
        />
      </Stack>
      {showCharacters && (
        <p
          style={{
            ...errores(errors.length > 0),
            marginTop: "5px",
            fontSize: "10px",
            marginBottom: "auto",
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          Caracteres: {lengthCharacters.length ? lengthCharacters.length : 0}{" "}
          {viewMaxCount && `(max. ${max})`}
        </p>
      )}
      {showMessage && GetTextMessage.toString().length > 0 && (
        <p
          style={{
            ...errores(errors.length > 0),
            marginTop: "5px",
            fontSize: "10px",
            marginBottom: "auto",
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {currencyFormat(parseInt(textMessage, 10))}
        </p>
      )}
    </>
  );
};

InputCustom.defaultProps = {
  name: "",
  label: "",
  errors: [],
  max: 0,
  lengthCharacters: 0,
  withHook: true,
  required: false,
  showCharacters: false,
  textTooltip: "",
  disabled: false,
  placeholder: "",
  textMessage: "",
  showError: true,
  widthInput: "w280",
  showMessage: false,
  withTooltip: false,
  value: "",
  props: {},
};
