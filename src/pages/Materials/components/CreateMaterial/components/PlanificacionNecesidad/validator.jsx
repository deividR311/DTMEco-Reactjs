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

export const validateError = (value, options,required=true)  => ({
    featurePlanningNeed: required === true ? validateSelect(value) : noRequired(value),
    procurementType: required === true ? validateSelect(value) : noRequired(value),
    verificationAvailable: required === true ? validateSelect(value) : noRequired(value),
    repetitiveManufacturingProfile: required === true ? options.repetitiveManufacturing ? validateSelect(value) : noRequired(value) : noRequired(value),
    repetitiveManufacturing: noRequired(value),
});
