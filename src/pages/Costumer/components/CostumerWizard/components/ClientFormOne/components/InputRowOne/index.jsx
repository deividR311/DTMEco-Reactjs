import React from "react";
import { Container, Grid, Paper, Tooltip } from "@material-ui/core";
import {
  SelectCommon,
  TextFieldCommon,
  NumberTextField,
} from "../../../../../../../../sharedComponents";
import IconInfo from "../../../../../../../../assets/images/info.svg";
import { InputRowTwo, NamesLastNames } from "..";
import CIIUImage from "../../../../../../../../assets/images/ciiu.png";

const InputRowOne = ({
  handleChange,
  SpecialClasses,
  classes,
  peopleType,
  idTypeList,
  generalFormNames,
  generalFormStateNames,
  wizardData,
  updateValue,
  departmentList,
  required,
  requiredCompany,
  requiredNames,
  requiredCIIU,
  regexEmailOnChange,
  handleChangeNif,
  handleChangeTel,
  handleChangeInd,
  indData,
  telephoneData,
  maxLength,
  didSubmitTel,
  legalRepresentative,
  handleChangeLegal,
  verification,
  industryType,
  industryTypeDisabled,
  handleChangeLegalId,
  legalId,
  writeAddress,
  generalDisabled
}) => {
  const toolTipImage = (
    <span>
      <img src={CIIUImage} width="250px" alt="CIIUImage" />
    </span>
  );
  const isDisabled =
    wizardData.codeTypeNif === "31" && wizardData.codeTypePerson === "PJ"
      ? true
      : false;

  const disabledCIIU = wizardData.codeTypeNif === "31" && !generalDisabled ? false : true;
  const nacionalIdTypeList =
    idTypeList !== undefined &&
    idTypeList.length > 0 &&
    idTypeList.filter(
      (item) =>
        item.id !== "43" &&
        item.id !== "83" &&
        item.id !== "84" &&
        item.id !== "CN" &&
        item.id !== "CP"
    );

  const tittle = [
    { id: 1, name: "Empresa" },
    { id: 2, name: "Señor" },
    { id: 3, name: "Señora" },
  ];
  const SrAndSra = tittle.filter((item) => item.id !== 1);

  const inputNumberOrText =
    wizardData.codeTypeNif === "11" ||
    wizardData.codeTypeNif === "12" ||
    wizardData.codeTypeNif === "13" ||
    wizardData.codeTypeNif === "31"
      ? true
      : false;

  let requiredLegalNumber = wizardData.codeTypePerson === "PJ" ? true : false;

  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <SelectCommon
            label={generalFormNames.typeId}
            name={generalFormStateNames.codeTypeNif}
            classes={SpecialClasses}
            value={wizardData.codeTypeNif}
            selectOptions={nacionalIdTypeList}
            handleChange={handleChange}
            required={required}
            disabled={generalDisabled}
            withCode={true}
          />
        </Grid>
        <Grid item xs={3}>
          {inputNumberOrText ? (
            <NumberTextField
              label={generalFormNames.identification}
              name={generalFormStateNames.nif}
              value={wizardData.nif}
              handleChange={handleChangeNif}
              disabled={generalDisabled}
              classes={
                wizardData.codeTypeNif === "31" ? SpecialClasses : classes
              }
              maxCharacterLength={maxLength}
              required={required}
            />
          ) : (
            <TextFieldCommon
              label={generalFormNames.identification}
              name={generalFormStateNames.nif}
              disabled={generalDisabled}
              value={wizardData.nif.toUpperCase()}
              required={required}
              classes={
                wizardData.codeTypeNif === "31" ? SpecialClasses : classes
              }
              handleChange={handleChangeNif}
              updateValue={updateValue}
              maxLength={maxLength}
              regex={/[^a-zA-Z^0-9^ñÑ]/g}
              isRegex={true}
              withIndicative={true}
            />
          )}
          {wizardData.codeTypeNif === "31" && (
            <NumberTextField
              label={generalFormNames.verification}
              value={verification}
              handleChange={() => {}}
              isIndicative={true}
              disabled={true}
              classes={SpecialClasses}
              maxCharacterLength={1}
              required={false}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          <SelectCommon
            label={generalFormNames.peopleType}
            name={generalFormStateNames.codeTypePerson}
            classes={classes}
            value={wizardData.codeTypePerson}
            selectOptions={peopleType}
            handleChange={handleChange}
            required={required}
            disabled={generalDisabled}
            withCode={true}
          />
        </Grid>
        <Grid item xs={4}>
          <NumberTextField
            label={generalFormNames.economicCode}
            name={generalFormStateNames.codeCIIU}
            value={wizardData.codeCIIU}
            handleChange={handleChange}
            disabled={disabledCIIU}
            classes={classes}
            maxCharacterLength={4}
            required={requiredCIIU}
          />
          <Tooltip title={toolTipImage}>
            <span>
              <img src={IconInfo} alt="IconInfo" />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <SelectCommon
            label={generalFormNames.industryType}
            name={generalFormStateNames.industryType}
            classes={classes}
            value={wizardData.typeIndustry}
            selectOptions={industryType}
            handleChange={handleChange}
            required={required}
            disabled={generalDisabled ? generalDisabled : industryTypeDisabled}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Paper className={classes.PaperPermissionsCtn}>
          <Container>
            <Grid container>
              <Grid item xs={3}>
                <SelectCommon
                  label={generalFormNames.treatment}
                  name={generalFormStateNames.tittle}
                  classes={classes}
                  value={wizardData.tittle}
                  selectOptions={
                    wizardData.codeTypePerson === "PN" ? SrAndSra : tittle
                  }
                  handleChange={handleChange}
                  required={required}
                  disabled={generalDisabled? generalDisabled : isDisabled}
                />
              </Grid>
              <div className={classes.ctnCompanyName}>
                {wizardData.tittle !== "" && wizardData.tittle === 1 && (
                  <Grid item xs={3}>
                    <TextFieldCommon
                      label={generalFormNames.companyName}
                      name={generalFormStateNames.businessName}
                      classes={classes}
                      disabled={generalDisabled}
                      value={wizardData.businessName.toUpperCase()}
                      required={requiredCompany}
                      classes={classes}
                      updateValue={updateValue}
                      regex={/[^a-zA-Z^0-9^ñÑ^+*-_,;.{}#$%&/()=?'¡¿! "]/g}
                      isRegex={true}
                      handleChange={handleChange}
                      maxLength={14}
                    />
                  </Grid>
                )}
                {wizardData.tittle !== "" && wizardData.tittle !== 1 && (
                  <NamesLastNames
                    generalFormNames={generalFormNames}
                    generalFormStateNames={generalFormStateNames}
                    classes={SpecialClasses}
                    wizardData={wizardData}
                    handleChange={handleChange}
                    required={requiredNames}
                    updateValue={updateValue}
                    generalDisabled={generalDisabled}
                  />
                )}
              </div>
            </Grid>
          </Container>
        </Paper>
      </Grid>
      <div className={classes.rowTwo}>
        <InputRowTwo
          generalFormNames={generalFormNames}
          handleChange={handleChange}
          handleChangeTel={handleChangeTel}
          handleChangeInd={handleChangeInd}
          classes={classes}
          SpecialClasses={SpecialClasses}
          generalFormStateNames={generalFormStateNames}
          wizardData={wizardData}
          indData={indData}
          telephoneData={telephoneData}
          updateValue={updateValue}
          departmentList={departmentList}
          required={required}
          didSubmitTel={didSubmitTel}
          requiredLegalNumber={requiredLegalNumber}
          regexEmailOnChange={regexEmailOnChange}
          legalRepresentative={legalRepresentative}
          handleChangeLegal={handleChangeLegal}
          handleChangeLegalId={handleChangeLegalId}
          legalId={legalId}
          writeAddress={writeAddress}
          generalDisabled={generalDisabled}
        />
      </div>
    </>
  );
};

export default InputRowOne;
