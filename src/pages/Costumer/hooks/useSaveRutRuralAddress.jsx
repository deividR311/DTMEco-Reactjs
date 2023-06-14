import { useState } from "react";

export const useSaveRutRuralAddress = (
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
        addressType.id === 1 &&
        (urbanAddress.complementOneRural === "" ||
        urbanAddress.otherOneRural === ""))
        {
        isValidate = true;
        setDidSubmit(true);
        setSpecificError("Hay campos requeridos sin diligenciar");
      }
  
      if (
        addressType.id === 1 &&
        urbanAddress.complementTwoRural !== "" &&
        urbanAddress.otherTwoRural === ""
      ) {
        isValidate = true;
        setDidSubmitTwo(true);
        setSpecificError("Hay campos requeridos sin diligenciar");
      }

      if (addressType.id === 1) {
        setUrbanAddress((prevState) => ({
            ...prevState,
            typeVia: "",
            NameVia: "",
            letterVia: "",
            prefix: "",
            quadrant: "",
            numberViaGeneral: "",
            letterViaGeneral: "",
            prefixBis: "",
            plateNumber: "",
            complementOne: "",
            otherOne: "",
            complementTwo: "",
            otherTwo: ""
        }))
    }
  
      if (showAddress.length > 60) {
          isValidate = true;
          setDidSubmit(true);
          setSpecificError("La longitud de la dirección no debe superar los 60 caracteres");
      }
  
      if (!isValidate) {
          setGeneralInfo((prevState) => ({
              ...prevState,
              address: `${urbanAddress.complementOneRural}${urbanAddress.otherOneRural} ${urbanAddress.complementTwoRural}${urbanAddress.otherTwoRural}`
          }))
          setOpenModalAddress(false)
      }
    };
  
    return [
      didSubmit,
      didSubmitTwo,
      specificError,
      directionValidations,
      closeModalSnack
    ];
  };
