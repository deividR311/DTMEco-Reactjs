import { Validator } from "../../../../../../utils/validator";

const validatorSchema = new Validator();

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const validateArray = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.lengthArray("No se ha agregado ningún elemento a la lista").result;
  };
};

const noRequired = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.result;
  };
};

export const validateError = (value, options, requerido=true) => ({
  store: requerido ? validateArray(options["logisticCenterstoreList"]) : noRequired(value),
  center: requerido ? validateArray(options["logisticCenterstoreList"]) : noRequired(value),

});