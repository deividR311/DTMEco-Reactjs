import React, { useState } from 'react';

export const useWizardStep = () => {

  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return [ activeStep, handleNext, handleBack, setActiveStep ];

}
