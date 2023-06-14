import React from "react";
import { InputRowOne } from "./components";

const ClientFormOne = ({
  SpecialClasses,
  classes,
  generalFormNames,
  generalFormStateNames,
  required,
  wizardData,
  handleChange,
  peopleType,
  idTypeList,
  state,
  updateValue,
  departmentList,
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
  legalId,
  handleChangeLegalId,
  writeAddress,
  generalDisabled
}) => {
  const typePeopleEcopetrol =
    peopleType !== false && peopleType !== undefined && peopleType.length > 0
      ? peopleType[0].values
      : [];

  const typePeopleReficar =
    peopleType !== false && peopleType !== undefined && peopleType.length > 0
      ? peopleType[1].values
      : [];

  const creatorState =
    state && state.dataRequest && state.dataRequest.codeEnterprise === "E"
      ? typePeopleEcopetrol
      : typePeopleReficar;

  const approverState =
    state && state.codeEnterprise && state.codeEnterprise === "E"
      ? typePeopleEcopetrol
      : typePeopleReficar;
  const creatorOrApproverState =
    state && state.codeEnterprise ? approverState : creatorState;

    const creatorStateDisabled =
    state && state.dataRequest && state.dataRequest.codeEnterprise === "E"
      ? false
      : true;

  const approverStateDisabled =
    state && state.codeEnterprise && state.codeEnterprise === "E"
      ? false
      : true;
  const creatorOrApproverStateDisabled =
    state && state.codeEnterprise ? approverStateDisabled : creatorStateDisabled;

  return (
    <>
      <div className={classes.ctnFormOne}>
        <InputRowOne
          SpecialClasses={SpecialClasses}
          classes={classes}
          generalFormNames={generalFormNames}
          generalFormStateNames={generalFormStateNames}
          wizardData={wizardData}
          maxLength={maxLength}
          indData={indData}
          telephoneData={telephoneData}
          handleChange={handleChange}
          handleChangeNif={handleChangeNif}
          handleChangeTel={handleChangeTel}
          handleChangeInd={handleChangeInd}
          verification={verification}
          idTypeList={idTypeList}
          required={required}
          legalId={legalId}
          handleChangeLegalId={handleChangeLegalId}
          requiredCompany={requiredCompany}
          didSubmitTel={didSubmitTel}
          peopleType={creatorOrApproverState}
          industryTypeDisabled={ creatorOrApproverStateDisabled }
          departmentList={departmentList}
          industryType={industryType}
          updateValue={updateValue}
          requiredNames={requiredNames}
          requiredCIIU={requiredCIIU}
          regexEmailOnChange={regexEmailOnChange}
          legalRepresentative={legalRepresentative}
          handleChangeLegal={handleChangeLegal}
          writeAddress={writeAddress}
          generalDisabled={generalDisabled}
        />
      </div>
    </>
  );
};

export default ClientFormOne;
