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

export const validateError = (value, options, typeCompany, requerid)  => ({
    groupUM: typeCompany ==="E" ? requerid === true ? validateSelect(value):noRequired(value) : noRequired(value),
    conversionGroup: requerid === true ? validateSelect(value) : noRequired(value),
});
