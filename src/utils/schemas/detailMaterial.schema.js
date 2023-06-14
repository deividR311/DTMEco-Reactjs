import { Validator } from "../validator";

const validatorSchema = new Validator();

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const validateText = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .isNotEmpty("Este campo es requerido")
      .isLengthText(0, 200, `Este campo debe de contener máximo 200 caracteres`)
      .result;
  };
};

export default (value) => ({
  stateId: validateSelect(value),
  observations: validateText(value),
});
