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

const validateReficar = (value, options) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateReficar(options, "Este campo es requerido")
      .result;
  };
};

export default (value, options, company, companyService) => ({
  materialCarryingGroup: validateEcopetrol(value, companyService),
  transportGroup: validateReficar(value, companyService),
  loadGroup: validateReficar(value, companyService),
  benefitCenterService: validateSelect(value),
});
