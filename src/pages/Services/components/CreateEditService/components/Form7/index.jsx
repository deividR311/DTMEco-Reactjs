import * as React from "react";
import { useEffect } from "react";
import { TextField, InputLabel } from "@material-ui/core";
import schema from "../../../../schema/Forms/form7.schema";
import { useValidateForm } from "../../../../../../hooks/useValidateForm";

const initialState = {
  observationsService: "",
};

export const Form7 = ({
  setForm,
  dataForm,
  isSubmitting,
  setIsSubmitting,
  dataEdit,
  isEdit,
}) => {
  const {
    error,
    values,
    setValues,
    handleInputs,
    submitValidate,
  } = useValidateForm(initialState, schema);

  useEffect(() => {
    if (isEdit) {
      const { observations } = dataEdit;
      setValues({
        observationsService: observations,
      });
    }
  }, [isEdit]);

  useEffect(() => {
    if (
      Object.values(dataForm).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      setValues(dataForm);
    }
  }, [dataForm]);

  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitting) {
      const value = Object.values(error).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        setForm(values);
      }
    }
    setIsSubmitting();
  }, [error]);

  return (
    <>
      <div className="formRow">
        <div className="formRow__campo__OBSERVATIONS">
          <InputLabel
            className="__labelInputOBSERVATIONS"
            error={error.observationsService.length > 0}
          >
            Observaciones
          </InputLabel>
          <TextField
            rows={4}
            multiline
            autoComplete="off"
            className="OBSERVATIONS__input"
            {...handleInputs("observationsService")}
            error={error.observationsService.length > 0}
            helperText={
              error.observationsService.length > 0
                ? error.observationsService[0]
                : ""
            }
            variant="outlined"
            placeholder="Ingrese las observaciones"
          />
          <p className="OBSERVATIONS__characters">
            Caracteres: {values.observationsService.length} (max. 200)
          </p>
        </div>
      </div>
    </>
  );
};
