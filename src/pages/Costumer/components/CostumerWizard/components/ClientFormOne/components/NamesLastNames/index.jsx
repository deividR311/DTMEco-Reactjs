import React from 'react';
import { Grid } from '@material-ui/core';
import { TextFieldCommon } from '../../../../../../../../sharedComponents';

const NamesLastNames = ({
    generalFormNames, generalFormStateNames,classes, wizardData, handleChange,
    required, updateValue, generalDisabled
}) => {
    return (
        <>
        <Grid container>
            <Grid item xs={2}>
                <TextFieldCommon
                    label={generalFormNames.firstName}
                    name={generalFormStateNames.firstName}
                    classes={classes}
                    disabled={generalDisabled}
                    value={wizardData.firstName.toUpperCase()}
                    required={required}
                    classes={classes}
                    regex={/[^a-zA-Z^0-9^ñÑ]/g}
                    isRegex={true}
                    updateValue={updateValue}
                    handleChange={handleChange}
                    maxLength={14}
                />
            </Grid>
            <Grid item xs={2}>
                <div className={classes.ctnTextField}>
                    <TextFieldCommon
                        label={generalFormNames.secondName}
                        name={generalFormStateNames.secondName}
                        classes={classes}
                        disabled={generalDisabled}
                        value={wizardData.secondName.toUpperCase()}
                        required={false}
                        classes={classes}
                        regex={/[^a-zA-Z^0-9^ñÑ]/g}
                        isRegex={true}
                        updateValue={updateValue}
                        handleChange={handleChange}
                        maxLength={14}
                    />
                </div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.ctnTextField2}>
                    <TextFieldCommon
                        label={generalFormNames.firstLastName}
                        name={generalFormStateNames.firstSurname}
                        classes={classes}
                        disabled={generalDisabled}
                        value={wizardData.firstSurname.toUpperCase()}
                        required={required}
                        classes={classes}
                        regex={/[^a-zA-Z^0-9^ñÑ]/g}
                        isRegex={true}
                        updateValue={updateValue}
                        handleChange={handleChange}
                        maxLength={14}
                    />
                </div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.ctnTextField3}>
                    <TextFieldCommon
                        label={generalFormNames.secondLastName}
                        name={generalFormStateNames.secondSurname}
                        classes={classes}
                        disabled={generalDisabled}
                        value={wizardData.secondSurname.toUpperCase()}
                        required={false}
                        classes={classes}
                        regex={/[^a-zA-Z^0-9^ñÑ]/g}
                        isRegex={true}
                        updateValue={updateValue}
                        handleChange={handleChange}
                        maxLength={14}
                    />
                </div>
            </Grid>
            </Grid>
        </>
    )
}

export default NamesLastNames;
