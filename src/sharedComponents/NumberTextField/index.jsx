import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

const NumberTextField = ({
 name, label, value, handleChange, classes, maxCharacterLength, required, disabled, isIndicative
}) => {
  const helperText = required && (value === '' || value === 0 || value === undefined)
  ? 'El campo es requerido'
  : '';

  const shortHelperText = required && (value === '' || value === 0 || value === undefined)
  ? 'Requerido'
  : '';


  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={handleChange}
      name={name}
      disabled={disabled}
      id={name}
      size="small"
      className={isIndicative ? classes.indicative : classes.numberTextField}
      inputProps={{ maxLength: maxCharacterLength }}
      InputProps={{ inputComponent: NumberFormatCustom }}
      helperText={ isIndicative ? shortHelperText : helperText }
      error={required && (value === '' || value === 0 || value === undefined)}
    />
  );
};

const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value
            }
          });
        }}
        allowedDecimalSeparators={['-']}
        decimalSeparator={false}
        isNumericString
      />
    );
  };

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

export default NumberTextField;
