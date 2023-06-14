import { Validator } from "../../../../../utils/validator";

const validatorForm = new Validator();

const required = (value) => {
  return function () {
    validatorForm.setResult();
    validatorForm.setValue(value);
    return validatorForm.isNotEmpty("Campo requerido").result;
  };
};

const validateLongDescriptionForm = (value, source) => {
  return function () {
    validatorForm.setResult();
    validatorForm.setValue(value);
    return validatorForm.validateLongDescriptionModifyForm(
      "Campo requerido",
      source
    ).result;
  };
};

const validateLongDescription = (value, source) => {
  return function () {
    validatorForm.setResult();
    validatorForm.setValue(value);
    return validatorForm.validateLongDescriptionModify(
      "Campo requerido",
      source
    ).result;
  };
};

const noRequired = (value) => {
  return function () {
    validatorForm.setResult();
    validatorForm.setValue(value);
    return validatorForm.result;
  };
};

const validateLenght = (value, max) => {
  return function () {
    validatorForm.setResult();
    validatorForm.setValue(value);
    return validatorForm
      .isNotEmpty("Campo requerido")
      .lengthMax(max, `Máximo ${max} carácteres`).result;
  };
};

export const validatorFromEdit = (value, options) => {
  return {
    typeRequest: required(value),
    typeMaterial: required(value),
    materialCode: required(value),
    checkboxEmail: noRequired(value),
    shortDescription: required(value),
    productHierarchy: required(value),
    statusMaterial: noRequired(value),
    articleGroupExternal: required(value),
    articleGroupInternal: required(value),
    internalNote: validateLenght(value, 900),
    observations: validateLenght(value, 500),
    longDescription: validateLongDescription(value, options.source),
    longDescriptionForm: validateLongDescriptionForm(value, options.source),
  };
};
