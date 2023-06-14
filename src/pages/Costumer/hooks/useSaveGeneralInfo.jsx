import React, { useEffect, useState } from "react";

export const useSaveGeneralInfo = (
  value,
  validateEmail,
  existCostumerMDS,
  existCostumer,
  didSubmitCIIU,
  telephoneData,
  indData,
  legalRepresentative,
  updateCostumer,
  wizardData,
  clearUpdateCostumerFailed,
  clearUpdateCostumerSuccess,
  setWizardData,
  responseData,
  location
) => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [didSubmitCompany, setDidSubmitCompany] = useState(false);
  const [didSubmitNames, setDidSubmitNames] = useState(false);
  const [didSubmitTel, setDidSubmitTel] = useState(false);
  const [specificError, setSpecificError] = useState(false);
  const [messageSpecificError, setMessageSpecificError] = useState("");
  const [canSave, setCanSave] = useState(false);
  let isValidate = false;

  useEffect(() => {
    if (
      existCostumerMDS !== undefined &&
      existCostumerMDS !== "" &&
      existCostumerMDS.codeEnterprise !== null
    ) {
      if (existCostumerMDS.codeEnterprise !== "R") {
        setSpecificError(true);
        setMessageSpecificError(`El cliente ya existe para Ecopetrol :
            ${
              existCostumerMDS.businessName !== null
                ? existCostumerMDS.businessName
                : `${existCostumerMDS.firstName} ${existCostumerMDS.firstSurname}`
            },
              ${existCostumerMDS.codeTypeNif}, ${
          existCostumerMDS.nif
        } encontrado`);
      }
    }
  }, [existCostumerMDS]);

  useEffect(() => {
    if ((indData !== "" && telephoneData !== "") || value.cellphone !== "") {
      setDidSubmitTel(false);
    }
  }, [value]);

  const handleCloseSnack = () => {
    setSpecificError(false);
    clearUpdateCostumerFailed();
    clearUpdateCostumerSuccess();
  };

  const handleSave = () => {
    if (location.state.dataRequest) {
      if (responseData !== undefined) {
        if (responseData) {
          setWizardData((prevState) => ({
            ...prevState,
            createdBy: responseData[0].userId,
          }));
        }
      }
    }

    setMessageSpecificError("");
    setCanSave(false);
    setSpecificError(false);
    if (
      value.codeTypeNif === "" ||
      value.nif === "" ||
      value.codeTypePerson === "" ||
      value.tittle === "" ||
      value.codeRegion === "" ||
      value.codeCity === "" ||
      value.address === "" ||
      indData === "" ||
      value.email === "" ||
      value.typeIndustry === ""
    ) {
      isValidate = true;
      setDidSubmit(true);
      setSpecificError(true);
      setDidSubmitTel(true);
      setMessageSpecificError("Hay campos requeridos sin diligenciar");
    }

    if ((indData !== "" && telephoneData !== "") || value.cellphone !== "") {
      setDidSubmitTel(false);
    }

    if (indData !== "" && telephoneData === "" && value.cellphone === "") {
      setDidSubmitTel(true);
      setSpecificError(true);
      setMessageSpecificError(
        "Señor usuario es necesario digitar al menos uno de los dos teléfonos (Teléfono fijo o celular)"
      );
      isValidate = true;
    }

    if (indData === "" && telephoneData === "" && value.cellphone === "") {
      setDidSubmitTel(true);
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError(
        "Señor usuario es necesario digitar al menos uno de los dos teléfonos (Teléfono fijo o celular)"
      );
    }

    if (
      value.codeTypePerson === "PJ" &&
      (value.legalRepresentativeId === "" ||
        legalRepresentative.name === "" ||
        legalRepresentative.lastName === "")
    ) {
      isValidate = true;
      setDidSubmit(true);
      setSpecificError(true);
      setMessageSpecificError("Hay campos requeridos sin diligenciar");
    }

    if (!validateEmail) {
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError("El correo electrónico no es valido");
    }

    if (didSubmitCIIU) {
      isValidate = true;
    }

    if (value.codeTypeNif === "31" && value.codeCIIU.length < 4) {
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError(
        'El campo "Codigo actividad econ. (CIIU)" debe ser de 4 caracteres'
      );
    }

    if (value.tittle === 1 && value.businessName === "") {
      setDidSubmitCompany(true);
      setDidSubmitNames(false);
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError("Hay campos requeridos sin diligenciar");
    }

    if (
      value.tittle !== 1 &&
      (value.firstName === "" || value.firstSurname === "")
    ) {
      setDidSubmitNames(true);
      setDidSubmitCompany(false);
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError("Hay campos requeridos sin diligenciar");
    }

    if (
      existCostumerMDS.codeEnterprise !== null &&
      existCostumerMDS.codeEnterprise === "E"
    ) {
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError(`El cliente ya existe para Ecopetrol :
            ${
              existCostumerMDS.businessName !== null
                ? existCostumerMDS.businessName
                : `${existCostumerMDS.firstName} ${existCostumerMDS.firstSurname}`
            },
              ${existCostumerMDS.codeTypeNif}, ${existCostumerMDS.nif}`);
    }

    if (value.tittle !== 1 && value.tittle !== "") {
      setDidSubmitCompany(false);
    }

    if (value.tittle === 1) {
      setDidSubmitNames(false);
    }

    if (!isValidate) {
      updateCostumer(wizardData);
    }
  };

  return [
    didSubmit,
    didSubmitCompany,
    didSubmitNames,
    specificError,
    messageSpecificError,
    canSave,
    handleCloseSnack,
    handleSave,
    didSubmitTel,
  ];
};
