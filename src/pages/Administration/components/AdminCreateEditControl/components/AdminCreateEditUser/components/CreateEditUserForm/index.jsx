import React from 'react';
import { Grid } from '@material-ui/core';
import { TextFieldCommon, SelectCommon, RegexTextFieldCommon } from '../../../../../../../../sharedComponents';

const CreateEditUserForm = ({
    adminCreateUserNames, handleOnChange, classes, dataUser, allUserStates, isRequired, regexEmailOnChange,
    medium, updateValue
}) => {
    return (
        <>
            <Grid container>
                <span className={classes.ctn__inputs}>
                <TextFieldCommon
                    label={adminCreateUserNames.name}
                    name={adminCreateUserNames.dataName}
                    disabled={false}
                    value={dataUser.name}
                    required={isRequired}
                    classes={classes}
                    handleChange={handleOnChange}
                />
                </span>
                <span className={classes.ctn__inputs}>
                <TextFieldCommon
                    label={adminCreateUserNames.lastName}
                    name={adminCreateUserNames.dataLastName}
                    disabled={false}
                    value={dataUser.lastName}
                    required={isRequired}
                    classes={classes}
                    handleChange={handleOnChange}
                />
                </span>
                <span className={classes.ctn__inputs}>
                <RegexTextFieldCommon
                    label={adminCreateUserNames.email}
                    name={adminCreateUserNames.dataEmail}
                    value={dataUser.email}
                    classes={classes}
                    required={isRequired}
                    medium={medium}
                    handleChange={regexEmailOnChange}
                    regex={/(@ecopetrol)(\.com)(\.co)$/}
                    maxCharacterLength={100}
                />
                </span>
                <span className={classes.ctn__inputs}>
                <SelectCommon
                    label={adminCreateUserNames.state}
                    name={adminCreateUserNames.dataStateId}
                    classes={classes}
                    value={dataUser.stateId}
                    selectOptions={allUserStates}
                    handleChange={handleOnChange}
                    required={isRequired}
                    disabled={false}
                />
                </span>
                <span className={classes.ctn__inputs}>
                <TextFieldCommon
                    label={adminCreateUserNames.register}
                    name={adminCreateUserNames.dataregister}
                    disabled={false}
                    value={dataUser.registrationCode}
                    required={isRequired}
                    classes={classes}
                    handleChange={handleOnChange}
                    maxLength={8}
                    regex={/[^a-zA-Z^0-9^ñÑ]/g}
                    isRegex={true}
                    updateValue={updateValue}
                />
                </span>
            </Grid>
        </>
    )
}

export default CreateEditUserForm;
