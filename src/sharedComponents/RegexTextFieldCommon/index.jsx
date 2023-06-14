import React, { useEffect, useState } from 'react';

import { TextField } from '@material-ui/core';

const RegexTextFieldCommon = ({
    label, name, value, classes, disabled, required, handleChange, regex, maxCharacterLength, medium
  }) => {
    const [isEmail, setIsEmail] = useState(false);

    const handleIpunt = (e) => {
        const { name, value } = e.target;
        const checkedEmail = regex.test(value);
        setIsEmail(regex.test(value));

        handleChange(name, value, checkedEmail);
    };

    useEffect(() => {
      if (medium === 'editar') {
        const checkedEmail = regex.test(value);
        handleChange(name, value, checkedEmail);
      }
    }, [value])
    
    return (
      <TextField
        name={name}
        label={label}
        margin="normal"
        variant="outlined"
        size='small'
        disabled={disabled}
        value={value}
        helperText={
            required && value === '' ? 'El campo es requerido' : ''
        }
        error={required && value === ''}
        className={classes.simpleTextField}
        onChange={handleIpunt}
        required={required}
        inputProps={{ maxLength: maxCharacterLength }}
      />
        );
    };

 export default RegexTextFieldCommon;
