import { InputLabel, TextField } from "@material-ui/core";
import { Stack } from "@mui/material";
export const InputFieldCustom = ({
  value = "",
  size = "small",
  spacing = 1,
  width = "100%",
  label = "",
  disabled = false,
  props = {},
  onChange = "",
  characterLength = "",
  max = 100,
  showCharacterLength = false,
  errors = [],
  showCurrencyFormat = false,
  currency = 0,
  name = "",
  required = false,
  widthInput = "",
  inputProps = "",
  placeholder = "",
}) => {
  const styleSubInput = {
    fontSize: "10px",
    marginBottom: "auto",
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  };

  const currencyFormat = (num) => {
    if (num !== 0)
      return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <>
      <Stack
        sx={{
          width: width,
        }}
        spacing={spacing}
      >
        <InputLabel className="__labelInput">
          {label}{" "}
          <span style={{ color: "red", marginLeft: "5px" }}>
            {required && " *"}
          </span>
        </InputLabel>
        <TextField
          {...props}
          name={name}
          size={size}
          value={value}
          variant="outlined"
          required={required}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          error={errors.length > 0 && errors !== undefined}
          helperText={
            errors.length > 0 && errors !== undefined ? errors[0] : ""
          }
          className={widthInput !== "" && `__inputCustom_${widthInput}`}
          InputProps={inputProps}
        />
      </Stack>
      {showCharacterLength && (
        <p style={styleSubInput}>
          Caracteres: {value.length ? value.length : 0} (max. {max})
        </p>
      )}
      {/* {showCurrencyFormat && (
        <p style={styleSubInput}>{currencyFormat(currency)}</p>
      )} */}
    </>
  );
};
