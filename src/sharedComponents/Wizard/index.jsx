import * as React from "react";
import { Steps, ButtonSteps } from "./components";

const Wizard = ({
  titlesWizard,
  componentsWizard,
  handleBack,
  handleNext,
  activeStep,
  handleCancel,
  classes,
  isSave,
  handleSave,
  showPreview,
  isDisabled,
  finalBtnName,
  approver = false,
  Component,
  showReject = false,
  handleReject,
  labelReject,
  disabledFirstStep = false,
}) => {
  const getStepContent = (stepIndex) =>
    componentsWizard.filter((dato) => dato.number === stepIndex)[0].component;

  return (
    <>
      <Steps data={titlesWizard} currentStep={activeStep} classes={classes}>
        {getStepContent(activeStep)}
      </Steps>
      {!approver ? (
        <ButtonSteps
          showReject={showReject}
          handleReject={handleReject}
          labelReject={labelReject}
          steps={titlesWizard}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleCancel={handleCancel}
          isSave={isSave}
          handleSave={handleSave}
          showPreview={showPreview}
          isDisabled={isDisabled}
          finalBtnName={finalBtnName}
          disabledFirstStep={disabledFirstStep}
        />
      ) : (
        <Component />
      )}
    </>
  );
};

export default Wizard;
