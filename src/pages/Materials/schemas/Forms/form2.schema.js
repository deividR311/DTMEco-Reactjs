import { Validator } from "../../../../utils/validator";

const validatorSchema = new Validator();

// const validateTextUppercase = (value, materialType, company) => {
//   return function () {
//     validatorSchema.setResult();
//     validatorSchema.setValue(value);
//     return validatorSchema
//       .isNotEmpty("Este campo es requerido")
//       .isLengthText(3, 40, `Mínimo 3 carácteres`, `Máximo 40 carácteres`)
//       .notSpecialCharacter("En mayúscula y sin carácteres especiales")
//       .typeMaterial(
//         materialType,
//         company,
//         "Debe ingresar el nombre del material",
//         "Debe estar precedido por el tipo de material"
//       ).result;
//   };
// };

const validateText = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Este campo es requerido").result;
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
  department: validateText(value),
  materialType: validateSelect(value),
  //materialName: validateTextUppercase(value, materialType, company),
});
