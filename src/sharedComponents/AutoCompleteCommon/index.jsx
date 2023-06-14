import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

const AutoCompleteCommon = ({
  list,
  item,
  label,
  required,
  name,
  handleOnChange,
  isSecondItem,
  secondItem,
}) => {
  return (
    <Autocomplete
      id="combo-box-demo"
      name={name}
      options={list}
      getOptionLabel={(option) => isSecondItem ? `${option[item]} ${option[secondItem]}` : option[item]}
      onChange={(event, value) => handleOnChange(event, value, name)}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={required}
          helperText={required ? "El campo es requerido" : ""}
        />
      )}
    />
  );
};

export default AutoCompleteCommon;
