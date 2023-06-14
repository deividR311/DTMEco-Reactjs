export class Validator {
  constructor() {
    this.value = null;
    this.result = [];
  }

  setValue(value) {
    this.value = value;
  }

  setResult() {
    this.result = [];
  }

  isNotEmpty(msg) {
    if (!this.value) {
      this.result.push(msg);
    }
    return this;
  }

  validateCause(stateId, msg) {
    if (stateId !== 2) {
      this.isNotEmpty(msg);
    }

    return this;
  }

  validateCauseLevelTwo(stateId, msg) {
    if (stateId !== 10) {
      this.isNotEmpty(msg);
    }
  }

  validateStock(opt, msg) {
    if (opt === "A" || opt === "B" || opt === "C") {
      this.isNotEmpty(msg);
    }
    return this;
  }

  validateSector(company, materialType, msg) {
    const companyUppercase = company.toUpperCase();
    if (companyUppercase === "ECOPETROL") {
      this.isNotEmpty(msg);
    } else if (companyUppercase === "REFICAR") {
      if (materialType === "FERT_R") {
        this.isNotEmpty(msg);
      }
    }
    return this;
  }

  validateZeroAndOne = (msg) => {
    const valor = parseInt(this.value, 10);

    if (valor === 0 || valor === 1) {
      this.result.push(msg);
    }
    return this;
  };

  standarPrice() {
    this.isNotEmpty("Este campo es requerido");
    this.isNumber("Este campo solo permite números");
    this.validateLengthStandardPrice();
    return this;
  }

  validateLengthStandardPrice() {
    const price = this.value.split(".");
    if (price.length > 2) {
      this.result.push("Solo se permite un punto");
    }
    if (price[0].length < 4) {
      this.result.push("Mínimo 4 caracteres");
    } else if (price[0].length > 12) {
      this.result.push("Máximo 12 caracteres");
    }

    if (price.length > 1) {
      if (price[1].length !== 2) {
        this.result.push("Solo se permite dos decimales");
      }
    }
  }

  valideStandardPrice(company, materialType) {
    const companyUppercase = company.toUpperCase();
    if (companyUppercase === "ECOPETROL") {
      this.standarPrice();
    } else {
      if (materialType === "FERT_R") this.standarPrice();
    }
    return this;
  }

  validateLongDescriptionModifyForm(msg, source) {
    if (source !== "SAP") {
      this.isNotEmpty(msg);
    }
    return this;
  }

  validateLongDescriptionModify(msg, source) {
    if (source === "SAP") {
      this.isNotEmpty(msg);
    }
    return this;
  }

  validateEcopetrol(type, msg) {
    const companyUppercase = type.toUpperCase();
    if (type === "E" || companyUppercase === "ECOPETROL") {
      this.isNotEmpty(msg);
    }
    return this;
  }

  validateReficar(type, msg) {
    const companyUppercase = type.toUpperCase();
    if (type === "R" || companyUppercase === "REFICAR") {
      this.isNotEmpty(msg);
    }
    return this;
  }

  isLengthText(minLength, maxLength, msgMin, msgMax) {
    if (this.value.length < minLength) {
      this.result.push(msgMin);
    } else if (this.value.length > maxLength) {
      this.result.push(msgMax);
    }
    return this;
  }

  lengthMax(maxLength, msgMax) {
    if (this.value) {
      if (this.value.length > maxLength) {
        this.result.push(msgMax);
      }
    }
    return this;
  }

  validateStore = (type, msg) => {
    if (type !== "HERS" && type !== "NLAG") {
      this.isNotEmpty(msg);
    }
    return this;
  };

  validateLongDescription = (type, msg) => {
    if (type !== "HERS") {
      this.isNotEmpty(msg);
    }
    return this;
  };

  validateManufacture = (type, msg) => {
    if (type === "HERS") {
      this.isNotEmpty(msg);
    }
    return this;
  };

  validateUnit = (type, msg) => {
    if (type !== "HERS") {
      this.isNotEmpty(msg);
    }
    return this;
  };

  validateRequiredPrice = (type) => {
    if (type !== "HERS") {
      this.validateZeroAndOne("No se permiten 0 o 1");
      this.isNotEmpty("Este campo es requerido");
      this.isLengthText(0, 11, "Mínimo 11 carácteres", "Máximo 11 carácteres");
      this.isOnlyNumber("Solo se permiten números");
    }
    return this;
  };

  lengthArray(msg) {
    if (!this.value.length) {
      this.result.push(msg);
    }
    return this;
  }

  notSpecialCharacter(msg) {
    if (!/^[A-Z0-9-()]+(\s*[A-Z0-9-()]?)*[A-Z0-9-()]+$/.test(this.value)) {
      this.result.push(msg);
    }
    return this;
  }

  notSpecialCharacterWithÑAndSpaces(msg) {
    if (
      !/^[A-ZÑ0-9-()\s]+(\s*[A-ZÑ0-9-()\s]?)*[A-ZÑ0-9-()\s]+$/.test(this.value)
    ) {
      this.result.push(msg);
    }
    return this;
  }

  alfhanumeric(msg) {
    if (!/^[a-zA-Z0-9]+(\s*[a-zA-Z0-9]?)*[a-zA-Z0-9]+$/.test(this.value)) {
      this.result.push(msg);
    }
    return this;
  }

  validPartNumber() {
    this.isNotEmpty("Campo requerido");
    this.lengthMax(40, "Máximo 40 carácteres");
  }

  validateNumberPartByMaker(option) {
    const { manufacturer, typeMaterials } = option;
    if (typeMaterials === "HERS") {
      this.validPartNumber();
    } else if (manufacturer) {
      this.validPartNumber();
    }
    return this;
  }

  isUpperCase(msg) {
    if (
      !/^[A-Z0-9À-ÿ\u00f1\u00d1]+(\s*[A-Z0-9À-ÿ\u00f1\u00d1]*)*[A-Z0-9À-ÿ\u00f1\u00d1]+$/.test(
        this.value
      )
    ) {
      this.result.push(msg);
    }
    return this;
  }

  equalsStock(msg, max, opt) {
    if (opt === "A" || opt === "B" || opt === "C") {
      const valueMax = parseInt(max, 10);
      const valuePoint = parseInt(this.value, 10);
      if (this.value) {
        if (!(valuePoint <= valueMax)) {
          this.result.push(msg);
        }
      }
    }
    return this;
  }

  majorToZero(msg, opt) {
    if (opt === "A" || opt === "B" || opt === "C") {
      const valueText = parseInt(this.value, 10);
      if (valueText <= 0) {
        this.result.push(msg);
      }
    }

    return this;
  }

  equalsPoint(msg, max, opt) {
    const valueMax = parseInt(max, 10);
    if (valueMax) {
      if (opt === "A" || opt === "B" || opt === "C") {
        const valuePoint = parseInt(this.value, 10);
        if (this.value) {
          if (valuePoint < valueMax) {
            this.result.push(msg);
          }
        }
      }
    }

    return this;
  }

  validateStockMax(indicatorAbc, orderPoint) {
    if (orderPoint) {
      this.majorToZero("El valor ingresado debe ser mayor que 0", indicatorAbc);
      this.equalsPoint(
        "Debe ser mayor o igual al punto de pedido",
        orderPoint,
        indicatorAbc
      );
    }
    return this;
  }

  typeMaterial(materialType, company, msgType, msg) {
    const companyUppercase = company.toUpperCase();
    if (companyUppercase === "ECOPETROL") {
      let value = "";
      if (materialType === "ZCRU_E") {
        value = "CRUDO";
      } else if (materialType === "ZGAS_E") {
        value = "GAS";
      } else {
        value = "PRODUCTO";
      }

      if (value !== "PRODUCTO") {
        const arrayValue = this.value.split(" ");
        if (arrayValue.length < 2) {
          this.result.push(msgType);
        }
        if (value !== arrayValue[0]) {
          this.result.push(msg);
        }
      }
    } else if (companyUppercase === "REFICAR") {
      let value = "";
      if (materialType === "ZCRU_R") {
        value = "CRUDO";
      } else if (materialType === "ZGAS_R") {
        value = "GAS";
      } else {
        value = "PRODUCTO";
      }

      if (value !== "PRODUCTO") {
        const arrayValue = this.value.split(" ");
        if (arrayValue.length < 2) {
          this.result.push(msgType);
        }
        if (value !== arrayValue[0]) {
          this.result.push(msg);
        }
      }
    }
    return this;
  }

  isEmail(msg) {
    if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.result.push(msg);
    }
    return this;
  }

  isNumber(msg) {
    if (!/^([0-9.])*$/.test(this.value)) {
      this.result.push(msg);
    }
    return this;
  }

  isOnlyNumber(msg) {
    if (!/^([0-9])*$/.test(this.value)) {
      this.result.push(msg);
    }
    return this;
  }

  validStock(type) {
    if (type === "HERS") {
      this.isNotEmpty("Campo requerido");
      this.isOnlyNumber("Solo se permite números");
      this.isLengthText(11, 12, "Mínimo 11 caracteres", "Maximo 11 caracteres");
    }
    return this;
  }
}
