import { Validator } from "../../../../../../utils/validator";

const validatorSchema = new Validator();

const validateSelect = (value, options) => {
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
    taxIVA: noRequired(value),
    surtaxTax: noRequired(value),
    nationalTax: noRequired(value),
    carbonTax: noRequired(value),
    transportGroup: validateSelect(value),
    materialSizeGroup: required === true ? ((options.loadGroup)?.split('_')[1]==="R" ? noRequired(value) : validateSelect(value)) : noRequired(value),
    availabilityVerification: required === true ? validateSelect(value) : noRequired(value),
    loadGroup: required === true ? validateSelect(value) : noRequired(value),
    initDateStatusMAterial: required === true ? validateSelect(value) : noRequired(value),
    materialStatusCD: required === true ? validateSelect(value) : noRequired(value),
    materialStatisticalGroup: required === true ? validateSelect(value) : noRequired(value),
    groupMaterial: required === true ? validateSelect(value) : noRequired(value),
    materialImputationGroup: required === true ? validateSelect(value) : noRequired(value),
    positionTypeGroup: required === true ? validateSelect(value) : noRequired(value),
    commissionsGroup: required === true ? validateSelect(value) : noRequired(value),
    materialGroupOne: required === true ? validateSelect(value) : noRequired(value),
    materialGroupTwo:  required === true ? validateSelect(value) : noRequired(value),
    orderUnitmeasure: required === true ? validateSelect(value) : noRequired(value),
    TaxClassification: validateSelect(value),
});
