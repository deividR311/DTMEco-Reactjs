import * as React from "react";
import { Button } from "@material-ui/core";

export const ButtonSteps = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleCancel,
  showPreview,
  isSave,
  handleSave,
  isDisabled,
  finalBtnName,
  showReject,
  handleReject,
  labelReject,
  disabledFirstStep,
}) => {
  return (
    <div className="containerButtons">
      <div className="containerButtons__items">
        <Button className={`ButtonCancel`} onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
      {showPreview && disabledFirstStep ? (
        <div className="containerButtons__items">
          <Button onClick={handleBack} className={"ButtonCancel"}>
            Anterior
          </Button>
        </div>
      ) : (
        <div className="containerButtons__items">
          <Button
            disabled={activeStep === 1}
            onClick={handleBack}
            className={`${
              activeStep === 1 ? "ButtonCancel-disabled" : "ButtonPrevius"
            }`}
            hidden={activeStep === 1 ? true : false}
          >
            Anterior
          </Button>
        </div>
      )}
      {isSave && (
        <div className="containerButtons__items">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="ButtonAccept"
          >
            Guardar
          </Button>
        </div>
      )}
      {showReject && (
        <div className="containerButtons__items">
          <Button
            variant="contained"
            color="primary"
            onClick={handleReject}
            className="ButtonAccept"
          >
            {labelReject}
          </Button>
        </div>
      )}
      <div className="containerButtons__items">
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className="ButtonAccept"
          disabled={isDisabled}
        >
          {activeStep === steps.length ? finalBtnName : "Siguiente"}
        </Button>
      </div>
    </div>
  );
};
