import { Validator } from "../../../../../../utils/validator";

const validatorSchema = new Validator();

const validateRequiredDenominator = (value) => {
    let response = {response:1, msg:""}
    parseInt(value)===0 && (response = {response:0, msg:"No se permite el número 0"})
    return response
};

const validateNumberRequired = (value) => {
    return function () {
        validatorSchema.setResult();
        validatorSchema.setValue(value);
        return validatorSchema.isNumber("Este campo debe ser numérico").
        isNotEmpty("Este campo es requerido").result;
    };
};

const noRequired = (value) => {
    return function () {
      validatorSchema.setResult();
      validatorSchema.setValue(value);
      return validatorSchema.result;
    };
};

const fieldRequerid = (value) => {
    return function () {
        validatorSchema.setResult();
        validatorSchema.setValue(value);
        return validatorSchema.isNotEmpty("Este campo es requerido").result;
    };
};

export const validateError = (value, options,required = true)  => ({
    // materialSizeGroup: (options.loadGroup)?.split('_')[1]==="R" ? noCeroAdmited(value) : validateSelect(value),
    denominator: validateRequiredDenominator(value),
    numerator: required === true ? validateNumberRequired(value) : noRequired(value),
    observations: required === true ? fieldRequerid(value) : noRequired(value),
});
