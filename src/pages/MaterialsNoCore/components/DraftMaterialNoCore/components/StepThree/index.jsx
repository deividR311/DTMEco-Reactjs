import { useHistory } from "react-router";
import { validateError } from "./validator";
import { StepIndicator } from "../StepIndicator";
import { ButtonsFooter } from "../ButtonsFooter";
import { TextField, InputLabel } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { TooltipCustom } from "../../../../../Materials/widgets";
import { forceLoadUrl } from "../../../../../../utils/Function";
import MaterialNoCore from "../../../../../../context/MaterialsNoCore/materialsNoCoreContext";

const initialState = {
  observations: "",
};

export const StepThree = ({ id, handleCancel, isEdited, currentUser }) => {
  const history = useHistory();

  const [values, setValues] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorField, setErrorField] = useState(() =>
    Object.keys(initialState).reduce((acum, key) => {
      acum[key] = [];
      return acum;
    }, {})
  );

  //MATERIALES NO CORE
  const materialNoCore = useContext(MaterialNoCore);
  const {
    clearUpdate,
    updateMaterialNoCore,
    materialNoCoreDetail,
    getMaterialNoCoreDetail,
  } = materialNoCore;

  const { clear, setError, Time, Error } = materialNoCore;

  const { updateMaterialNoCoreFlag, formStep } = materialNoCore;

  useEffect(() => {
    clearUpdate();
    getMaterialNoCoreDetail(id);
  }, []);

  useEffect(() => {
    if (updateMaterialNoCoreFlag) {
      if (formStep === 3) {
        setTimeout(() => {
          if (isEdited) {
            history.push(`/MaterialesNoCore/Modificar/4/${id}`);
          } else {
            history.push(`/MaterialesNoCore/Borrador/4/${id}`);
          }
        }, Time);
      }
    }
  }, [updateMaterialNoCoreFlag]);

  useEffect(() => {
    if (materialNoCoreDetail) {
      const obj = {
        observations: materialNoCoreDetail.observations,
      };

      if (
        Object.values(obj).every(
          (data) => data !== "" && data !== undefined && data !== null
        )
      ) {
        setValues({
          observations: obj.observations,
        });
      }
    }
  }, [materialNoCoreDetail]);

  const handleBack = () => {
    if (isEdited) {
      forceLoadUrl(`/MaterialesNoCore/Modificar/2/${id}`);
    } else {
      forceLoadUrl(`/MaterialesNoCore/Borrador/2/${id}`);
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setErrorField(() => {
      const validations = validateError(value, {});
      return { ...errorField, [name]: validations[name]() };
    });
    setValues({ ...values, [name]: value });
  };

  const saveData = () => {
    const request = {
      ...values,
      id: parseInt(id, 10),
      stateId: isEdited ? 4 : 1,
      operation: 2,
      requestPhase: 3,
      modifiedBy: currentUser,
    };
    updateMaterialNoCore(request);
  };

  useEffect(() => {
    if (isSubmitting) {
      const value = Object.values(errorField).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        saveData();
      }
    }
    setIsSubmitting(false);
  }, [errorField]);

  const submitValidate = () => {
    const errors = {};
    Object.keys(initialState).forEach((data) => {
      errors[data] = validateError(values[data], {})[data]();
    });
    setErrorField(errors);
  };

  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);

  const Validate = () => {
    setIsSubmitting(true);
  };

  return (
    <>
      <StepIndicator step={3} />
      <>
        <div>
          <p
            style={{
              fontSize: "36px",
              color: "#0E0C5A",
              margin: "10px",
              marginBlockEnd: "30px",
            }}
          >
            Solicitud Creación de Material
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "#666666",
              margin: "16px",
              marginBlockEnd: "40px",
            }}
          >
            Si cuenta con alguna solicitud especifica del material digítela en
            este espacio.
          </p>
        </div>
        <div className="formRow">
          <div className="formRow__campo__OBSERVATIONS">
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <InputLabel className="__labelInputOBSERVATIONS">
                Observación acerca de la solicitud{" "}
                <span style={{ color: "red" }}> *</span>
              </InputLabel>
              <TooltipCustom
                title={
                  "Relacione aquí los comentarios adicionales sobre esta solicitud"
                }
                placement={"top"}
                style={{
                  marginTop: "-2px",
                  display: "flex",
                }}
              />
            </span>
            <TextField
              rows={5}
              multiline
              autoComplete="off"
              className="OBSERVATIONS__input"
              name={"observations"}
              value={values.observations}
              onChange={handleOnChange}
              error={errorField.observations.length > 0}
              helperText={
                errorField.observations.length > 0
                  ? errorField.observations[0]
                  : ""
              }
              variant="outlined"
              placeholder=""
            />
            <p className="OBSERVATIONS__characters">
              Caracteres: {values.observations.length} (max. 500)
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />

        <ButtonsFooter
          showCancel={true}
          showBack={true}
          showNext={true}
          handleCancel={handleCancel}
          handleBack={handleBack}
          handleNext={Validate}
          labelNext="Siguiente"
        />
      </>
    </>
  );
};
