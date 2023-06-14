import { useState } from "react";

export const useSaveRutDirection = (
  urbanAddress,
  setGeneralInfo,
  addressType,
  setOpenModalAddress,
  showAddress,
  setUrbanAddress
) => {
  const [didSubmitOne, setDidSubmitOne] = useState(false);
  const [didSubmitTwo, setDidSubmitTwo] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [specificError, setSpecificError] = useState(false);
  let isValidate = false;

  const closeModalSnack = () => {
    setDidSubmitOne(false);
    setDidSubmitTwo(false);
    setDidSubmit(false);
  }

  const directionValidations = () => {
    if (
      addressType.id === 2 &&
      (urbanAddress.typeVia === "" ||
        urbanAddress.NameVia === "" ||
        urbanAddress.numberViaGeneral === "" ||
        urbanAddress.plateNumber === "")
    ) {
      isValidate = true;
      setDidSubmit(true);
      setSpecificError("Hay campos requeridos sin diligenciar");
    }

    if (addressType.id === 2) {
        setUrbanAddress((prevState) => ({
            ...prevState,
            complementOneRural: "",
            otherOneRural: "",
            complementTwoRural: "",
            otherTwoRural: ""
        }))
    }

    if (
      addressType.id === 2 &&
      urbanAddress.complementOne !== "" &&
      urbanAddress.otherOne === ""
    ) {
      isValidate = true;
      setDidSubmitOne(true);
      setSpecificError("Hay campos requeridos sin diligenciar");
    }

    if (
      addressType.id === 2 &&
      urbanAddress.complementTwo !== "" &&
      urbanAddress.otherTwo === ""
    ) {
      isValidate = true;
      setDidSubmitTwo(true);
      setSpecificError("Hay campos requeridos sin diligenciar");
    }

    if (showAddress.length > 60) {
        isValidate = true;
        setDidSubmit(true);
        setSpecificError("La longitud de la dirección no debe superar los 60 caracteres");
    }

    if (!isValidate) {
        setGeneralInfo((prevState) => ({
            ...prevState,
            address: `${urbanAddress.typeVia} ${urbanAddress.NameVia} ${urbanAddress.letterVia} ${urbanAddress.prefix} ${urbanAddress.quadrant} ${urbanAddress.numberViaGeneral} ${urbanAddress.letterViaGeneral} ${urbanAddress.prefixBis} ${urbanAddress.plateNumber} ${urbanAddress.complementOne}${urbanAddress.otherOne} ${urbanAddress.complementTwo}${urbanAddress.otherTwo}`
        }))
        setOpenModalAddress(false)
    }
  };

  return [
    didSubmit,
    didSubmitOne,
    didSubmitTwo,
    specificError,
    directionValidations,
    closeModalSnack
  ];
};
