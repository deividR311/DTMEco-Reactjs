import { Validator } from "../../../../../../utils/validator";

const validatorSchema = new Validator();

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const noRequired = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.result;
  };
};

export const validateError = (value, options, required=true)  => ({
  shoppingGroup: required === true ? validateSelect(value) : noRequired(value),
  umpVariable: required === true ? validateSelect(value) : noRequired(value),
  manufacturingPartsProfile: required === true ? validateSelect(value) : noRequired(value),
  statusMaterialSpecificCenter: required === true ? validateSelect(value) : noRequired(value),
  orderUnitmeasure:  required === true ? validateSelect(value) : noRequired(value),
  purchasingValueKey: required === true ? validateSelect(value) : noRequired(value),
});
