import * as React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

export const SelectCustom = ({
  name,
  label,
  value,
  items,
  showId,
  errors,
  showAll,
  onChange,
  required,
  disabled,
  withHook,
  minWidth,
  showError,
  showEmpty,
  withTooltip,
  widthSelect,
  placeholder,
  handleInputs,
}) => {
  return (
    <>
      {withHook ? (
        <>
          <InputLabel
            required={required}
            error={showError ? errors.length > 0 : false}
            className="__labelSelect"
          >
            {label}
            {withTooltip && "tooltip"}
          </InputLabel>
          <FormControl
            style={minWidth}
            variant="outlined"
            disabled={disabled}
            error={showError ? errors.length > 0 : false}
            className={`formControl__Select_${widthSelect}`}
          >
            <InputLabel className="placeholderSelect">{placeholder}</InputLabel>
            <Select {...handleInputs}>
              {items.length && showEmpty && (
                <MenuItem value={""}>Seleccionar</MenuItem>
              )}
              {items.length && showAll && (
                <MenuItem value={"Todos"}>Todos</MenuItem>
              )}
              {items.length ? (
                items.map((data, index) => (
                  <MenuItem value={data.id} index={index} key={index}>
                    {showId ? data.id + " - " + data.name : data.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={""}>Sin datos</MenuItem>
              )}
            </Select>
            <FormHelperText className="__labelSelect">
              {errors.length > 0 ? errors[0] : ""}
            </FormHelperText>
          </FormControl>
        </>
      ) : (
        <>
          <InputLabel required={required} className="__labelSelect">
            {label}
          </InputLabel>
          <FormControl
            style={minWidth}
            variant="outlined"
            disabled={disabled}
            error={showError ? errors.length > 0 : false}
            className={`formControl__Select_${widthSelect}`}
          >
            <InputLabel className="placeholderSelect">{placeholder}</InputLabel>
            <Select name={name} value={value} onChange={onChange}>
              {items.length && showEmpty && (
                <MenuItem value={""}>Seleccionar</MenuItem>
              )}
              {items.length && showAll && (
                <MenuItem value={"Todos"}>Todos</MenuItem>
              )}
              {items.length ? (
                items.map((data, index) => (
                  <MenuItem value={data.id} index={index} key={index}>
                    {showId ? data.id + " - " + data.name : data.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={""}>Sin datos</MenuItem>
              )}
            </Select>
            {showError && (
              <FormHelperText className="__labelSelect">
                {showError && (errors.length > 0 ? errors[0] : "")}
              </FormHelperText>
            )}
          </FormControl>
        </>
      )}
    </>
  );
};

SelectCustom.defaultProps = {
  label: "",
  name: "",
  value: "",
  items: [],
  errors: [],
  showId: true,
  withHook: true,
  showAll: false,
  required: false,
  placeholder: "",
  disabled: false,
  handleInputs: {},
  showError: true,
  showEmpty: false,
  withTooltip: false,
  widthSelect: "w280",
  minWidth: { minWidth: "200px" },
};
