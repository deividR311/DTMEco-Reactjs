import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const SelectCommon = ({
  label,
  name,
  classes,
  value,
  otherStyle,
  selectOptions,
  handleChange,
  required,
  disabled,
  withCode,
  nameFirst,
  codeRegion,
  saveName
}) => {
  return (
    <>
      <FormControl
        size="small"
        variant="outlined"
        className={otherStyle ? classes.selectForm : classes.simpleSelectForm}
        error={required && (value === "" || value === null)}
      >
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          disabled={disabled}
          labelId={name}
          name={name}
          label={label}
          onChange={handleChange}
          value={value}
        >
          {selectOptions !== undefined &&
            selectOptions.length > 0 &&
            selectOptions.map((item) => (
              <MenuItem key={item.id} value={saveName ? item.name : item.id} disabled={disabled}>
                {withCode ? `${item.id}-${item.name}` : item.name}
                {nameFirst && `-${codeRegion}${item.id}`}
              </MenuItem>
            ))}
        </Select>
        {required && (value === "" || value === null) && (
          <FormHelperText>El campo es requerido</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default SelectCommon;
