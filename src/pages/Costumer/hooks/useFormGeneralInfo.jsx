import React, { useEffect, useState } from "react";

export const useFormGeneralInfo = (
  existCostumerMDS,
  indData,
  telephoneData,
  legalRepresentative,
  verificationCode,
  legalId,
  existCostumer,
  state,
  requestById
) => {
  const [validateEmail, setvalidateEmail] = useState(false);
  const [didSubmitCIIU, setDidSubmitCIIU] = useState(false);
  const [verification, setVerification] = useState("");
  const [generalInfo, setGeneralInfo] = useState({
    codeTypeNif: "",
    nif: "",
    codeTypePerson: "",
    codeCIIU: "",
    typeIndustry: "",
    tittle: "",
    businessName: "",
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    codeCountry: "CO",
    codeRegion: "",
    codeCity: "",
    address: "",
    telephone: "",
    cellphone: "",
    email: "",
    legalRepresentativeId: "",
    legalRepresentativeName: "",
  });

  useEffect(() => {
    if (verificationCode !== "" && verificationCode !== undefined) {
      setVerification(verificationCode);
    }
  }, [verificationCode]);

  useEffect(() => {
    validateRequiredCIIU();

    if (
      generalInfo.cellphone !== "" &&
      indData === "" &&
      telephoneData === ""
    ) {
      setGeneralInfo((prevState) => ({
        ...prevState,
        telephone: generalInfo.cellphone,
      }));
    }
  }, [generalInfo]);

  const validateRequiredCIIU = () => {
    if (generalInfo.codeTypeNif !== "" && generalInfo.codeTypeNif === "31") {
      if (generalInfo.codeCIIU === "") {
        setDidSubmitCIIU(true);
      } else {
        setDidSubmitCIIU(false);
      }
    } else {
      setDidSubmitCIIU(false);
    }
  }

  useEffect(() => {
    setGeneralInfo((prevState) => ({
      ...prevState,
      legalRepresentativeName: `${legalRepresentative.name} ${legalRepresentative.lastName}`,
    }));
  }, [legalRepresentative]);

  useEffect(() => {
    setGeneralInfo((prevState) => ({
      ...prevState,
      legalRepresentativeId: legalId,
    }));
  }, [legalId]);

  useEffect(() => {
    if (generalInfo.codeTypeNif !== "31" && generalInfo.codeTypeNif !== "") {
      setDidSubmitCIIU(false);
    }
  }, [generalInfo.codeTypeNif]);

  useEffect(() => {
    if (
      generalInfo.codeTypeNif === "31" &&
      generalInfo.codeTypePerson === "PJ"
    ) {
      setGeneralInfo((prevState) => ({
        ...prevState,
        tittle: 1,
      }));
    }

    if (generalInfo.codeTypePerson === "PN" && !requestById &&
    ((existCostumer === null ||
      existCostumer === undefined ||
      existCostumer === "") && state && state.requestId === undefined)) {
      setGeneralInfo((prevState) => ({
        ...prevState,
        legalRepresentativeId: "",
        tittle: "",
        typeIndustry: "11",
      }));
    }

    if (
      generalInfo.codeTypePerson === "PJ" && !requestById &&
      (existCostumer === null ||
        existCostumer === undefined ||
        existCostumer === "")
    ) {
      setGeneralInfo((prevState) => ({
        ...prevState,
        typeIndustry: "",
      }));
    }
  }, [generalInfo.codeTypePerson]);

  useEffect(() => {
    if (
      generalInfo.codeTypeNif === "31" &&
      generalInfo.codeTypePerson === "PJ"
    ) {
      setGeneralInfo((prevState) => ({
        ...prevState,
        tittle: 1,
      }));
    }
  }, [generalInfo.codeTypeNif]);

  useEffect(() => {
    if (didSubmitCIIU) {
      setGeneralInfo((prevState) => ({
        ...prevState,
        codeCIIU: "",
      }));
    }
  }, [didSubmitCIIU]);

  useEffect(() => {
    if (generalInfo.tittle !== 1 && generalInfo.tittle !== "") {
      setGeneralInfo((prevState) => ({
        ...prevState,
        codeTypePerson: "PN",
      }));
    }

    if (generalInfo.tittle !== 1) {
      setGeneralInfo((prevState) => ({
        ...prevState,
        businessName: "",
      }));
    } else {
      setGeneralInfo((prevState) => ({
        ...prevState,
        firstName: "",
        secondName: "",
        firstSurname: "",
        secondSurname: "",
      }));
    }

    if (generalInfo.tittle !== 1 && generalInfo.tittle !== "") {
      setGeneralInfo((prevState) => ({
        ...prevState,
        codeTypePerson: "PN",
      }));
    }
  }, [generalInfo.tittle]);

  useEffect(() => {
    if (
      existCostumerMDS !== undefined &&
      existCostumerMDS !== "" &&
      existCostumerMDS.codeEnterprise !== null
    ) {
      if (existCostumerMDS.codeEnterprise === "R") {
        setGeneralInfo((prevState) => ({
          ...prevState,
          businessName: existCostumerMDS.businessName,
          codeEnterprise: existCostumerMDS.codeEnterprise,
          codeTypeNif: existCostumerMDS.codeTypeNif,
          firstName: existCostumerMDS.firstName,
          firstSurname: existCostumerMDS.firstSurname,
          nif: existCostumerMDS.nif,
          secondName: existCostumerMDS.secondName,
          secondSurname: existCostumerMDS.secondSurname,
          tittle: existCostumerMDS.tittle,
        }));
      }
    }
  }, [existCostumerMDS]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeNif = (e) => {
    const { name, value } = e.target;
    if (value[0] === "0" || value[0] === 0) {
      setGeneralInfo((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    } else {
      setGeneralInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setGeneralInfo((prevState) => ({
      ...prevState,
      telephone: `${indData}-${telephoneData}`,
    }));
  }, [telephoneData]);

  useEffect(() => {
    setGeneralInfo((prevState) => ({
      ...prevState,
      telephone: `${indData}-${telephoneData}`,
    }));
  }, [indData]);

  const updateValue = (name, value) => {
    setGeneralInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const regexEmailOnChange = (name, value, isEmail) => {
    setvalidateEmail(isEmail);
    setGeneralInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return [
    generalInfo,
    validateEmail,
    didSubmitCIIU,
    updateValue,
    regexEmailOnChange,
    handleChange,
    handleChangeNif,
    setGeneralInfo,
    verification,
  ];
};
