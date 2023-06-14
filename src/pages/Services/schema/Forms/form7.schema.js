import { Validator } from "../../../../utils/validator";

const validatorSchema = new Validator();

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

export default (value, options) => ({
  observationsService: validateText(value),
});
