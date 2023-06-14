import { Validator } from "../../../../../../utils/validator";

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

const validateNumeric = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNumber("Solo se permiten valores numéricos")
    .isNotEmpty("Este campo es requerido").result;
  };
};

const noRequired = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.result;
  };
};

export const validateError = (value, options, list, requerido=true)=> ({
  productFather: noRequired(value),
  businessArea: requerido === true ? validateSelect(value) : noRequired(value),
  articleGroup: requerido === true ? validateSelect(value) : noRequired(value),
  baseUnitMeasure: requerido === true ? validateSelect(value): noRequired(value),
  sector: requerido === true ? validateSelectSector(value, options.company, options.materialType) : noRequired(value),
  manufacturingInformation: noRequired(value),
  externalArticleGroup:noRequired(value),
  basicProduct: requerido === true ? validateSelect(value) : noRequired(value),
  statusMaterialCenter: noRequired(value),
  levelHierarchyOne: requerido === true ? validateSelect(value) : noRequired(value),
  levelHierarchyTwo: (options.levelHierarchyOne && list.levelHierarchyTwoList.length>=1) ? validateSelect(value): noRequired(value),
  levelHierarchyThree: (options.levelHierarchyTwo && list.levelHierarchyThreeList.length>=1) ? validateSelect(value): noRequired(value),
  levelHierarchyFour: (options.levelHierarchyThree && list.levelHierarchyFourList.length>=1) ? validateSelect(value): noRequired(value),
  levelHierarchyFive: (options.levelHierarchyFour && list.levelHierarchyFiveList.length >=1) ? validateSelect(value): noRequired(value),
  unitOfWeight: requerido === true ? validateSelect(value) : noRequired(value),
  groupstypesgeneralposition: requerido === true ? validateSelect(value) : noRequired(value),
  oldMaterialNumber: requerido === true ? validateNumeric(value) : noRequired(value),
  materialStatusCD: noRequired(value),
  initDateStatusMAterial: noRequired(value),
  typePurchase: noRequired(value),
});
