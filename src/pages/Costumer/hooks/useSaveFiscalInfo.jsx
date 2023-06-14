import { useEffect, useState } from "react";

export const useSaveFiscalInfo = (
  codeImpCarbono,
  codeImpNacional,
  codeImpTimbre,
  codeImpSobretasa,
  codeImpIVA,
  setDisabledBtn,
  activeStep,
  updateCostumer,
  clearUpdateCostumerFailed,
  clearUpdateCostumerSuccess,
  wizardData
) => {
  let isValidate = false;
  const [canSavefiscalInfo, setCanSavefiscalInfo] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [specificError, setSpecificError] = useState(false);
  const [messageSpecificError, setMessageSpecificError] = useState("");

  useEffect(() => {
    setDisabledBtn(true);
  }, [activeStep]);

  const handleCloseSnack = () => {
    setSpecificError(false);
    clearUpdateCostumerFailed();
    clearUpdateCostumerSuccess();
  };

  const saveFiscalInfo = () => {
    setMessageSpecificError("");
    setSpecificError(false);

    if (
      codeImpCarbono.value === "" ||
      codeImpNacional.value === "" ||
      codeImpTimbre.value === "" ||
      codeImpSobretasa.value === "" ||
      codeImpIVA.value === ""
    ) {
      isValidate = true;
      setDidSubmit(true);
      setSpecificError(true);
      setMessageSpecificError("Hay campos requeridos sin diligenciar");
    }

    if (!isValidate) {
        updateCostumer(wizardData);
    }
  };

  return [
    canSavefiscalInfo,
    didSubmit,
    specificError,
    messageSpecificError,
    handleCloseSnack,
    saveFiscalInfo,
  ];
};
