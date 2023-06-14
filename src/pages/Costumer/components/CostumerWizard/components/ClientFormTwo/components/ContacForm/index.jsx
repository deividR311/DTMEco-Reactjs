import { formatMs, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { NumberTextField, RegexTextFieldCommon } from '../../../../../../../../sharedComponents';

const ContacForm = ({
    form, regexEmailOnChange, classes, handleSaleChange, costumerFunctionList, listFunctions, setSalesInfo,
    didSubmitContact, setDidSubmitContact, generalDisabled
}) => {
    useEffect(() => {
        if (costumerFunctionList !== '') {
            setSalesInfo((prevState) => ({
                ...prevState,
                codefunction: `${costumerFunctionList}`
            }));
        }
    }, [costumerFunctionList]);
    return (
        <>
            <Grid item xs={3}>
                <NumberTextField
                    label={'Función'}
                    name={'codefunction'}
                    value={form.codefunction}
                    handleChange={''}
                    classes={classes}
                    disabled={true}
                />
            </Grid>
            <Grid item xs={3}>
                <RegexTextFieldCommon
                    label='Correo'
                    name={'email'}
                    value={form.email.toLowerCase().replace(/ /g, "")}
                    classes={classes}
                    required={didSubmitContact}
                    medium={""}
                    handleChange={regexEmailOnChange}
                    regex={/\S+@\S+\.\S+/g}
                    maxCharacterLength={241}
                    disabled={generalDisabled}
                />
            </Grid>
            <Grid item xs={3}>
                <NumberTextField
                    label={'Teléfono fijo o móvil '}
                    name={'telephone'}
                    value={form.telephone}
                    handleChange={handleSaleChange}
                    classes={classes}
                    maxCharacterLength={10}
                    required={didSubmitContact}
                    disabled={generalDisabled}
                />
            </Grid>
        </>
    )
}
export default ContacForm;