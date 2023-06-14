import React from 'react';
import { TextField } from '@material-ui/core';

const MultilineTextFieldCommon = ({
    rows, defaultValue, label, name, value, handleChange, classes, required
}) => {
    return (
        <>
            <TextField
                id={`outlined-multiline-static-${name}`}
                name={name}
                value={value}
                onChange={handleChange}
                label={label}
                className={classes.multilineStyle}
                multiline
                rows={rows}
                defaultValue={defaultValue}
                variant="outlined"
                helperText={
                    required && value === ''
                        ? 'El campo es requerido'
                        : ''
                    }
                error={required && value === ''}
                required={required}
            />
        </>
    )
}

export default MultilineTextFieldCommon;
