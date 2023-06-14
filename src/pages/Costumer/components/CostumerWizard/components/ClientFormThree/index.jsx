import React from 'react';
import { Grid } from '@material-ui/core';
import { NumberTextField, SelectCommon } from '../../../../../../sharedComponents';

const ClientFormThree = ({
    classes, fiscalNames, SpecialClasses, didSubmitFiscal, fiscalFormNames,
    carbonList, nationalList, surchargeList, ivaList, timbreList, codeImpCarbono, handleCodeImpCarbonoChange,
    codeImpNacional, handleCodeImpNacionalChange, codeImpTimbre, handlecodeImpTimbreChange, codeImpSobretasa,
    handleCodeImpSobretasaChange, codeImpIVA, handleCodeImpIVAChange, generalDisabled
}) => {
    return (
        <>
            <div className={classes.ctnFormThree}>
                <Grid container>
                    <Grid item xs={3}>
                        <SelectCommon
                            label={fiscalNames.carbon}
                            name={fiscalFormNames.codeImpCarbono}
                            classes={classes}
                            value={codeImpCarbono.value}
                            selectOptions={carbonList}
                            handleChange={handleCodeImpCarbonoChange}
                            required={didSubmitFiscal}
                            disabled={generalDisabled}
                            otherStyle={true}
                            withCode={true}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <SelectCommon
                            label={fiscalNames.national}
                            name={fiscalFormNames.codeImpNacional}
                            classes={classes}
                            value={codeImpNacional.value}
                            selectOptions={nationalList}
                            handleChange={handleCodeImpNacionalChange}
                            required={didSubmitFiscal}
                            disabled={generalDisabled}
                            otherStyle={true}
                            withCode={true}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <SelectCommon
                            label={fiscalNames.doorbell}
                            name={fiscalFormNames.codeImpTimbre}
                            classes={classes}
                            value={codeImpTimbre.value}
                            selectOptions={timbreList}
                            handleChange={handlecodeImpTimbreChange}
                            required={didSubmitFiscal}
                            disabled={generalDisabled}
                            otherStyle={true}
                            withCode={true}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <SelectCommon
                            label={fiscalNames.surcharge}
                            name={fiscalFormNames.codeImpSobretasa}
                            classes={classes}
                            value={codeImpSobretasa.value}
                            selectOptions={surchargeList}
                            handleChange={handleCodeImpSobretasaChange}
                            required={didSubmitFiscal}
                            disabled={generalDisabled}
                            otherStyle={true}
                            withCode={true}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={3}>
                        <SelectCommon
                            label={fiscalNames.iva}
                            name={fiscalFormNames.codeImpIVA}
                            classes={classes}
                            value={codeImpIVA.value}
                            selectOptions={ivaList}
                            handleChange={handleCodeImpIVAChange}
                            required={didSubmitFiscal}
                            disabled={generalDisabled}
                            otherStyle={true}
                            withCode={true}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ClientFormThree;