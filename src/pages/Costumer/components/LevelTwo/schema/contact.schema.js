import { Validator } from "../../../../../utils/validator";

const validatorSchema = new Validator();

const validateText = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .isNotEmpty("Este campo es requerido")
      .isUpperCase("Solo se permite mayúsculas")
      .isLengthText(8, 35, "Mínino 8 carácteres", "Máximo 35 carácteres")
      .result;
  };
};

const validateIdentifiacion = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .isNotEmpty("Este campo es requerido")
      .isUpperCase("Solo se permite mayúsculas")
      .isLengthText(4, 35, "Mínino 4 carácteres", "Máximo 35 carácteres")
      .result;
  };
};

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

export default (value) => ({
  Name: validateText(value),
  Function: validateSelect(value),
  FirstName: validateIdentifiacion(value),
});
