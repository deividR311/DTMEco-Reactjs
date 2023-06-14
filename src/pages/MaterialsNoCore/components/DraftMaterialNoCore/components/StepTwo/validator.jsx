import { Validator } from "../../../../../../utils/validator";

const validatorSchema = new Validator();

const required = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.isNotEmpty("Campo requerido").result;
  };
};

const lengthMax = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.lengthMax(900, "Máximo 900 carácteres").result;
  };
};

const validatePrice = (value, type) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateRequiredPrice(type).result;
  };
};

const validateStock = (value, indicatorAbc, orderPoint) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .validateStockMax(indicatorAbc, orderPoint)
      .majorToZero("El valor ingresado debe ser mayor que 0", indicatorAbc)
      .equalsPoint(
        "Debe ser mayor o igual al punto de pedido",
        orderPoint,
        indicatorAbc
      )
      .validateStock(indicatorAbc, "Campo requerido")
      .isOnlyNumber("Solo se permiten números")
      .lengthMax(13, "Máximo 13 carácteres").result;
  };
};

const validateOrderPoint = (value, indicatorAbc, max) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema
      .validateStock(indicatorAbc, "Campo requerido")
      .isOnlyNumber("Solo se permiten números")
      .lengthMax(13, "Máximo 13 carácteres")
      .equalsStock("Debe ser menor o igual al stock máximo", max, indicatorAbc)
      .result;
  };
};

const validateSelectEmpty = (value) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.result;
  };
};

const validateNumberParts = (value, option) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateNumberPartByMaker(option).result;
  };
};

const validateStore = (value, type) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateStore(type, "Campo requerido").result;
  };
};

const validateUnit = (value, type) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateUnit(type, "Campo requerido").result;
  };
};

const validateABC = (value, type) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateStore(type, "Campo requerido").result;
  };
};

const validateLongDescription = (value, type) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateLongDescription(type, "Campo requerido")
      .result;
  };
};

const validateManufacturer = (value, type) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validateManufacture(type, "Campo requerido").result;
  };
};

const validateStockManagment = (value, type) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.validStock(type).result;
  };
};

const noRequired = (value, type) => {
  return function () {
    validatorSchema.setResult();
    validatorSchema.setValue(value);
    return validatorSchema.result;
  };
};

export const validateError = (value, options) => {
  return {
    planningRequirements: noRequired(value),
    lotLength: noRequired(value),
    internalNote: lengthMax(value),
    logisticCenter: required(value),
    shortDescription: required(value),
    groupInternalArticle: required(value),
    price: validatePrice(value, options.typeMaterials),
    store: validateStore(value, options.typeMaterials),
    abcindicator: validateABC(value, options.typeMaterials),
    measuredUnit: validateUnit(value, options.typeMaterials),
    partNumber: validateNumberParts(value, options),
    hierarchyProducts: validateUnit(value, options.typeMaterials),
    manufacturer: validateManufacturer(value, options.typeMaterials),
    groupExternalArticle: validateUnit(value, options.typeMaterials),
    stockManagement: validateStockManagment(value, options.typeMaterials),
    longDescription: validateLongDescription(value, options.typeMaterials),
    stockMax: validateStock(value, options.abcindicator, options.orderPoint),
    orderPoint: validateOrderPoint(
      value,
      options.abcindicator,
      options.stockMax
    ),
  };
};