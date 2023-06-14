import { Validator } from "../../../../utils/validator";

const validatorSchema = new Validator();

const validateSelect = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
  };
};

const validateEcopetrol = (value, options) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateEcopetrol(options, "Este campo es requerido")
      .result;
  };
};

export default (value, options, company) => ({
  materialGroupService: validateEcopetrol(value, company),
  materialsImputationGroup: validateSelect(value),
  materialGroup1: validateSelect(value),
  materialGroup2: validateSelect(value),
  commissionGroup: validateSelect(value),
});
