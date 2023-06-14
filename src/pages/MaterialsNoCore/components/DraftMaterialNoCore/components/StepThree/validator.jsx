import { Validator } from "../../../../../../utils/validator";
const validatorSchema = new Validator();

const validateTextRequired = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .isNotEmpty("Este campo es requerido")
      .lengthMax(500, "Máximo 500 carácteres").result;
  };
};

export const validateError = (value, options) => {
  return {
    observations: validateTextRequired(value),
  };
};
