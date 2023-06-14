import { Grid, Button, Tooltip } from '@material-ui/core';
import React from 'react';
import { SelectCommon } from '../../../../../../../../sharedComponents';

const RequestInputs = ({
    classes, createUserRequestNames, dataRequest, isRequired, handleOnChange,
    companyList, costumerType, titlesTooltip, handleValidations, handleCancel,
    societyList, disabled
}) => {
    const disabledList = dataRequest.codeEnterprise !== '' ? false : true;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Tooltip title={titlesTooltip.company}>
                        <label>
                            <SelectCommon
                                label={createUserRequestNames.office}
                                name={createUserRequestNames.officeType}
                                classes={classes}
                                value={dataRequest.codeEnterprise}
                                selectOptions={companyList.list[0].values}
                                handleChange={handleOnChange}
                                required={isRequired}
                                disabled={false}
                                withCode={true}
                            />
                        </label>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title={titlesTooltip.costumer}>
                        <label>
                            <SelectCommon
                                label={createUserRequestNames.costumer}
                                name={createUserRequestNames.costumerType}
                                classes={classes}
                                value={dataRequest.codeAccountGroup}
                                selectOptions={dataRequest.codeEnterprise === 'E' ? costumerType.list[0].values : costumerType.list[1].values}
                                handleChange={handleOnChange}
                                required={isRequired}
                                disabled={disabledList}
                                withCode={true}
                            />
                        </label>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <label>
                        <SelectCommon
                            label={createUserRequestNames.society}
                            name={createUserRequestNames.societyType}
                            classes={classes}
                            value={dataRequest.codePartnership}
                            selectOptions={dataRequest.codeEnterprise === 'E' && societyList.list.length > 0 ?
                            societyList.list[0].values : societyList.list[1].values}
                            handleChange={handleOnChange}
                            required={isRequired}
                            disabled={disabledList}
                            withCode={true}
                        />
                    </label>
                </Grid>
            </Grid>
            <Grid container className={classes.buttonsCtn}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                <Grid item xs={12}>
                    <Button className={classes.CancelBtn} variant="outlined" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button className={classes.saveBtn} variant="contained" onClick={handleValidations} disabled={disabled}>
                        Continuar
                    </Button>
                </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </>
    )
}

export default RequestInputs;
