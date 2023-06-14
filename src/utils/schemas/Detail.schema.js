import { Validator } from "../validator";

const validatorSchema = new Validator();

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const validateCauses = (value, stateId) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateCause(stateId, "Este campo es requerido")
      .result;
  };
};

const validateText = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .isLengthText(0, 200, `Este campo es requerido.`, `Este campo debe de contener máximo 200 caracteres`)
      .isNotEmpty("Este campo es requerido").result;
  };
};

export default (value, options, materialType, companyService, stateId) => ({
  stateId: validateSelect(value),
  observations: validateText(value),
  typeCauses: validateCauses(value, stateId),
});
