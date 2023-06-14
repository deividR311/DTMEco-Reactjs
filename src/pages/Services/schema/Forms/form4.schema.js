import { Validator } from "../../../../utils/validator";

const validatorSchema = new Validator();

const validate = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.result;
  };
};

export default (value) => ({
  tax: validate(value),
});
