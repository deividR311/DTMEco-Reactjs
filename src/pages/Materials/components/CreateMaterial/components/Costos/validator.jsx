import { Validator } from "../../../../../../utils/validator";

const validatorSchema = new Validator();

const noRequired = (value) => {
    return function () {
      validatorSchema.setResult();
      validatorSchema.setValue(value);
      return validatorSchema.result;
    };
  };

const validateNumber = (value) => {
    return function () {
      validatorSchema.setResult();
      validatorSchema.setValue(value);
      return validatorSchema.isNumber("Este campo debe ser numérico").result;
    };
  };

export const validateError = (value, options)  => ({
    variancekey: noRequired(value),
    costingLotSize: validateNumber(value),
});
