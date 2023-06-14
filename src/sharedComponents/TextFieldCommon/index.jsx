import React from 'react';
import { TextField } from '@material-ui/core';

const TextFieldCommon = ({
    label, name, disabled, value, required, type, withIndicative,
    classes, handleChange, maxLength, updateValue, regex, isRegex
}) => {
    const handleIpunt = (e) => {
        const { name, value } = e.target;
        const newValue = value.replace(regex, '');

        updateValue(name, newValue);
    };

    return (
        <>
            <TextField
                id="outlined-basic"
                variant="outlined"
                name={name}
                type={type}
                label={label}
                margin="normal"
                size='small'
                disabled={disabled}
                value={value}
                inputProps={{ maxLength: maxLength }}
                helperText={
                        required && value === ''
                            ? 'El campo es requerido'
                            : ''
                        }
                error={required && value === ''}
                className={ withIndicative ? classes.numberTextField : classes.simpleTextField}
                onChange={isRegex === true ? handleIpunt : handleChange}
                required={required}
            />
        </>
    )
}

export default TextFieldCommon;
