import { Validator } from "../../../../../../utils/validator";

const validatorSchema = new Validator();

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const noRequired = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.result;
  };
};

export const validateError = (value, options, required=true)  => ({
  benefitCenter: required === true ? validateSelect(value) : noRequired(value),
  expirationDateIndicator:  required === true ? validateSelect(value) : noRequired(value),
  indicatorDatePeriodicExpiration: required === true ? validateSelect(value) : noRequired(value),
  storageLocation: required === true ? validateSelect(value) : noRequired(value),
  storageConditions:required === true ? validateSelect(value) : noRequired(value),
  outputMeasurementUnit:required === true ? validateSelect(value) : noRequired(value)
});
