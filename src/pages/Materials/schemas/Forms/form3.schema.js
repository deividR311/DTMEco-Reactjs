import { Validator } from "../../../../utils/validator";

const validatorSchema = new Validator();

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const validateSelectSector = (value, company, materialType) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateSector(
      company,
      materialType,
      "Este campo es requerido"
    ).result;
  };
};

export default (value, company, materialType) => ({
  articleGroup: validateSelect(value),
  baseUnitMeasure: validateSelect(value),
  sector: validateSelectSector(value, company, materialType),
});
