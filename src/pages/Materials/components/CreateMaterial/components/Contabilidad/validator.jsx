import { Validator } from "../../../../../../utils/validator";

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

const validateText = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const validateNumber = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNumber("Este campo debe ser numérico").result;
  };
};

const validateNumberRequired = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNumber("Este campo debe ser numérico").
    isNotEmpty("Este campo es requerido").result;
  };
};

const validateNumberNoRequired = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNumber("Este campo debe ser numérico").result;
  };
};

const noRequired = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.result;
  };
};

export const validateError = (value, options,required=true)  => ({
  ratingCategory: required === true ? validateSelect(value) : noRequired(value),
  standardPrice: required === true ? valideStandardPrice(value, options.company, options.materialType) : noRequired(value),
  variablePrice: required === true ? validateNumberRequired(value) : validateNumberNoRequired(value),
  plant: required === true ? validateSelect(value) : noRequired(value),
  valuationType: required === true ? validateSelect(value) : noRequired(value),
  valuationClass: noRequired(value),
  materialPriceDetermination: required === true ? validateSelect(value) : noRequired(value),
  priceControlIndicator: required === true ? validateSelect(value) : noRequired(value),
  unitPrice: required === true ? validateNumberRequired(value) : validateNumberNoRequired(value),
  variancekey: required === true ? validateSelect(value) : noRequired(value),
  costingLotSize: required === true ? validateNumberRequired(value) : validateNumberNoRequired(value),
});
