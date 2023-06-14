import React, { useEffect, useState } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import {
  RegexTextFieldCommon,
  SelectCommon,
  TextFieldCommon,
  NumberTextField,
} from "../../../../../../../../sharedComponents";
import IconInfo from "../../../../../../../../assets/images/info.svg";

const InputRowTwo = ({
  handleChange,
  classes,
  generalFormStateNames,
  wizardData,
  generalFormNames,
  updateValue,
  departmentList,
  required,
  regexEmailOnChange,
  handleChangeTel,
  indData,
  telephoneData,
  handleChangeInd,
  SpecialClasses,
  requiredLegalNumber,
  didSubmitTel,
  legalRepresentative,
  handleChangeLegal,
  handleChangeLegalId,
  legalId,
  writeAddress,
  generalDisabled
}) => {
  const [city, setCity] = useState([]);
  const [disabledCity, setDisabledCity] = useState(true);

  useEffect(() => {
    if (wizardData.codeRegion === "") {
      setDisabledCity(true);
    } else {
      setDisabledCity(false);
    }
    setCity(
      departmentList !== false &&
        departmentList.filter((item) => item.id === wizardData.codeRegion)
    );
  }, [wizardData.codeRegion]);

  const departmentListAlter =
    departmentList !== false &&
    departmentList.filter((item) => item.id !== "01" && item.id !== "A1");

  const legalDisabled =
    wizardData.codeTypePerson !== "" && wizardData.codeTypePerson === "PN"
      ? true
      : false;
  const disabledIndivative = wizardData.codeRegion !== "" ? true : false;

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <SelectCommon
            label={generalFormNames.department}
            name={generalFormStateNames.codeRegion}
            classes={classes}
            value={wizardData.codeRegion}
            selectOptions={departmentListAlter}
            handleChange={handleChange}
            required={required}
            disabled={generalDisabled}
            withCode={true}
          />
        </Grid>
        <Grid item xs={4}>
          <SelectCommon
            label={generalFormNames.city}
            name={generalFormStateNames.codeCity}
            classes={classes}
            value={wizardData.codeCity}
            selectOptions={city.length > 0 ? city[0].subValues : []}
            handleChange={handleChange}
            required={required}
            disabled={generalDisabled ? generalDisabled : disabledCity}
            withCode={false}
            nameFirst={true}
            codeRegion={wizardData.codeRegion}
          />
        </Grid>
        <Grid item xs={4}>
          <div onClick={generalDisabled ? () => {} : writeAddress}>
            <TextFieldCommon
              label={generalFormNames.RUT}
              name={generalFormStateNames.address}
              classes={classes}
              disabled={true}
              value={wizardData.address}
              required={required}
              classes={classes}
              handleChange={handleChange}
              updateValue={updateValue}
              regex={/[^a-zA-Z^0-9^ñÑ]/g}
              isRegex={true}
              maxLength={60}
            />
          </div>
        </Grid>
      </Grid>
      <label htmlFor="">
        <strong>Diligenciar al menos uno de los dos teléfonos*</strong>
      </label>
      <Grid container>
        <Grid item xs={4}>
          <NumberTextField
            label={generalFormNames.indicative}
            value={indData}
            handleChange={handleChangeInd}
            isIndicative={true}
            disabled={generalDisabled ? generalDisabled : disabledIndivative}
            classes={classes}
            maxCharacterLength={1}
            required={didSubmitTel}
          />
          <NumberTextField
            label={generalFormNames.homeTel}
            value={telephoneData}
            handleChange={handleChangeTel}
            disabled={generalDisabled}
            classes={SpecialClasses}
            maxCharacterLength={7}
            required={didSubmitTel}
          />
        </Grid>
        <Grid item xs={4}>
          <NumberTextField
            label={generalFormNames.cellPhoneTel}
            name={generalFormStateNames.cellphone}
            value={wizardData.cellphone}
            handleChange={handleChange}
            disabled={generalDisabled}
            classes={classes}
            maxCharacterLength={10}
            required={didSubmitTel}
          />
        </Grid>
        <Grid item xs={4}>
          <RegexTextFieldCommon
            label={generalFormNames.email}
            name={generalFormStateNames.email}
            value={wizardData.email.toLowerCase().replace(/ /g, "")}
            classes={classes}
            required={required}
            disabled={generalDisabled}
            medium={""}
            handleChange={regexEmailOnChange}
            regex={/\S+@\S+\.\S+/g}
            maxCharacterLength={241}
          />
          <Tooltip title="Recuerde que este e- mail será utilizado para el envío de la factura electrónica">
            <span>
              <img src={IconInfo} alt="IconInfo" />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <TextFieldCommon
            label={generalFormNames.legalIdentification}
            name={"name"}
            classes={classes}
            disabled={generalDisabled ? generalDisabled : legalDisabled}
            value={legalId}
            required={requiredLegalNumber}
            classes={classes}
            handleChange={handleChange}
            regex={/[^a-zA-Z^0-9^ñÑ]/g}
            isRegex={true}
            updateValue={handleChangeLegalId}
            maxLength={35}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldCommon
            label={generalFormNames.legalRepresentativeName}
            name={"name"}
            classes={classes}
            disabled={generalDisabled ? generalDisabled : legalDisabled}
            value={legalRepresentative.name.toUpperCase()}
            required={requiredLegalNumber}
            classes={classes}
            handleChange={handleChange}
            regex={/[^a-zA-Z^0-9^ñÑ]/g}
            isRegex={true}
            updateValue={handleChangeLegal}
            maxLength={19}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldCommon
            label={generalFormNames.legalRepresentativeLastName}
            name={"lastName"}
            classes={classes}
            disabled={generalDisabled ? generalDisabled : legalDisabled}
            value={legalRepresentative.lastName.toUpperCase()}
            required={requiredLegalNumber}
            classes={classes}
            handleChange={handleChange}
            regex={/[^a-zA-Z^0-9^ñÑ]/g}
            isRegex={true}
            updateValue={handleChangeLegal}
            maxLength={19}
          />
          <Tooltip title="Representante legal principal">
            <span>
              <img src={IconInfo} alt="IconInfo" />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default InputRowTwo;
