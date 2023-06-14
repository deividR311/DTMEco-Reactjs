import { Validator } from "../../../../../../utils/validator";

const validatorSchema = new Validator();

const validateTextUppercase = (value, materialType, company) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .isNotEmpty("Este campo es requerido")
      .isLengthText(3, 40, `Mínimo 3 carácteres`, `Máximo 40 carácteres`)
      .notSpecialCharacterWithÑAndSpaces("En mayúscula y sin carácteres especiales")
      .typeMaterial(
        materialType,
        company,
        "Debe ingresar el nombre del material",
        "Debe estar precedido por el tipo de material"
      ).result;
  };
};

const validateText = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .isNotEmpty("Este campo es requerido")
      .isLengthText(0, 20, "El maximo es caracteres es 20").result;
  };
};

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const validateTransferList = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.lengthArray("Este campo es requerido").result;
  };
};

export const validateError = (value, options) => ({
  typeCompany: validateText(value),
  materialType: validateSelect(value),
  ramo: validateSelect(value),
  materialName: validateTextUppercase(value, options.materialType, options.company),
  businessProcess: validateTransferList(value),
});
