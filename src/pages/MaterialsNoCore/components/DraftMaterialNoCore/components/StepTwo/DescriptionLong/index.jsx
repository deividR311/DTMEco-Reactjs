import React from "react";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { InputFieldCustom } from "../../CustomInput";

export const DescriptionLongItems = ({
  data,
  isEdited,
  objComponents,
  buildDescription,
  setDescriptionLong,
  handelDescription,
}) => {
  const [state, setState] = useState({});
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getNameObj = (strName = "", type) => {
    if (type === 1) {
      return strName.replace(" ", "_");
    }
    if (type === 2) {
      return strName.replace("_", " ");
    }
  };

  const isRequiredField = (numberField) => {
    if (numberField == 1) return true;
    if (numberField == 0) return false;
  };

  const validateNullOrUndefined = (value) => {
    if (value === null) return "";
    if (value === undefined) return "";
    return value;
  };

  useEffect(() => {
    if (data !== "") {
      const JsonCaracteristica = JSON.parse(data);
      setState(
        objComponents.reduce((acum, key) => {
          acum[getNameObj(key.caracteristica, 1)] = validateNullOrUndefined(
            key.valor
          );
          JsonCaracteristica.map((caract) => {
            if (caract.Caracteristica === key.caracteristica) {
              acum[getNameObj(key.caracteristica, 1)] = caract.Valor;
            }
          });
          return acum;
        }, {})
      );
    } else {
      const valuesToState = objComponents.reduce((acum, key) => {
        acum[getNameObj(key.caracteristica, 1)] = validateNullOrUndefined(
          key.valor
        );
        return acum;
      }, {});
      setState(valuesToState);
    }
    setError(
      objComponents.reduce((acum, key) => {
        acum[getNameObj(key.caracteristica, 1)] = {
          value: [],
          required: isRequiredField(key.requerido),
        };
        return acum;
      }, {})
    );
  }, [objComponents, data]);

  const saveData = () => {
    const arrayValues = Object.keys(state).map((key) => {
      return {
        Caracteristica: getNameObj(key, 2),
        Valor: state[key],
      };
    });
    setDescriptionLong(JSON.stringify(arrayValues));
  };

  useEffect(() => {
    if (isSubmitting) {
      const value = Object.values(error).every(
        (data) => data.value.length == 0 && data.value !== ""
      );
      if (value) {
        saveData();
      }
    }
    setIsSubmitting(false);
    handelDescription();
  }, [error]);

  const isLenght = (value) => {
    if (value.length > 300) {
      return ["Máximo 300 carácteres"];
    } else {
      return [];
    }
  };

  const isRequired = (field) => {
    if (!field) {
      return ["Campo requerido"];
    } else {
      return [];
    }
  };

  const validatorField = (value) => {
    let arrayErrors = [];
    if (isRequired(value).length > 0) {
      arrayErrors.push(isRequired(value));
    }
    if (isLenght(value).length > 0) {
      arrayErrors.push(isLenght(value));
    }
    return arrayErrors;
  };

  const validateError = () => {
    const listErrores = {};
    Object.keys(error).forEach((key) => {
      if (error[key].required) {
        listErrores[key] = {
          value: validatorField(state[key]),
          required: error[key].required,
        };
      } else {
        listErrores[key] = {
          value: isLenght(state[key]),
          required: error[key].required,
        };
      }
    });
    setError(listErrores);
  };

  useEffect(() => {
    if (isSubmitting) {
      validateError();
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (buildDescription) {
      setIsSubmitting(true);
    }
  }, [buildDescription]);

  const changeData = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const capitalizarPrimeraLetra = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const printErrorLong = (error) => {
    if (error) {
      const arrayError = error.value;
      return arrayError;
    } else {
      return [];
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {objComponents.map((value) => (
          <Grid item xs={4}>
            <InputFieldCustom
              max={300}
              widthInput={"full"}
              onChange={changeData}
              showCharacterLength={true}
              name={getNameObj(value.caracteristica, 1)}
              required={isRequiredField(value.requerido)}
              value={state[getNameObj(value.caracteristica, 1)]}
              label={capitalizarPrimeraLetra(value.caracteristica)}
              props={{ multiline: true, maxRows: 10, key: value.codigo }}
              errors={printErrorLong(
                error[getNameObj(value.caracteristica, 1)]
              )}
              characterLength={state[getNameObj(value.caracteristica, 1)]}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
