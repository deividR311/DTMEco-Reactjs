import React from 'react';
import InputMask from 'react-input-mask';
import { MuiThemeProvider, TextField } from '@material-ui/core';

const TelTextFieldCommon = ({
    component
}) => {
    return (
        <>
            <MuiThemeProvider>
                <InputMask
                    mask="9-9999999"
                    maskChar=" "
                    component={() => component}
                > 
                </InputMask>
            </MuiThemeProvider>
        </>
    )
}

export default TelTextFieldCommon;
