import { Validator } from "../../../../utils/validator";

const validatorSchema = new Validator();

const valideStandardPrice = (value, company, materialType) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.valideStandardPrice(company, materialType).result;
  };
};

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

export default (value, company, materialType) => ({
  ratingCategory: validateSelect(value),
  standardPrice: valideStandardPrice(value, company, materialType),
});
