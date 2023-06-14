import { Validator } from "../../../../utils/validator";

const validatorSchema = new Validator();

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const validateNameService = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .isNotEmpty("Este campo es requerido")
      .isLengthText(3, 40, `Mínimo 3 caracteres`, "Máximo 40 caracteres")
      .notSpecialCharacter(
        "No se permite caracteres especiales y debe ser mayúscula"
      ).result;
  };
};

const validateReficar = (value, options) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateReficar(options, "Este campo es requerido")
      .result;
  };
};

export default (value, options, company, companyService) => ({
  baseUnitMeasureService: validateSelect(value),
  serviceNameService: validateNameService(value),
  articleGroupService: validateReficar(value, companyService),
});
