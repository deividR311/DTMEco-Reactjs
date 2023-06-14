import React from "react";
import Box from "@mui/material/Box";
import { useHistory } from "react-router";
import { validateError } from "./validator";
import Skeleton from "@mui/material/Skeleton";
import { StepIndicator } from "../StepIndicator";
import { ButtonsFooter } from "../ButtonsFooter";
import { InputFieldCustom } from "../CustomInput";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useContext } from "react";
import { DescriptionLongItems } from "./DescriptionLong";
import { Footer } from "../../../../../../sharedComponents";
import { InputCustom } from "../../../../../Materials/widgets";
import { useStylesMaterial } from "../../../../../Materials/styles";
import { validateAbsolute } from "../../../../../../utils/Function";
import { Button, Grid, IconButton, InputAdornment } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import MaterialNoCore from "../../../../../../context/MaterialsNoCore/materialsNoCoreContext";

const initialState = {
  store: "",
  price: "",
  stockMax: "",
  lotLength: "",
  orderPoint: "",
  partNumber: "",
  manufacturer: "",
  abcindicator: "",
  internalNote: "",
  measuredUnit: "",
  logisticCenter: "",
  stockManagement: "",
  longDescription: "",
  shortDescription: "",
  hierarchyProducts: "",
  planningRequirements: "",
  groupExternalArticle: "",
  groupInternalArticle: "",
};

export const StepTwo = ({ id, handleCancel, isEdited, currentUser }) => {
  const history = useHistory();
  const classesMaterial = useStylesMaterial();

  //STATES
  const [typeM, setTypeM] = useState("");
  const [exit, setExit] = useState(false);
  const [showMultiline, setShowMiltiline] = useState([
    { valueDefault: "", show: false },
  ]);
  const [options, setOptions] = useState(() => {
    return {
      ...initialState,
      typeMaterials: "",
    };
  });
  const [stock, setStock] = useState("");
  const [pushButton, setPushButton] = useState(false);
  const [disableStock, setDisableStock] = useState(true);
  const [buildDescription, setBuildDescription] = useState(false);
  const [existLongDescrip, setExistLongDescrip] = useState(false);
  const [validateDefaultValues, setValidateDefaultValues] = useState(false);

  //STATE HOOK
  const [values, setValues] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorField, setErrorField] = useState(() =>
    Object.keys(initialState).reduce((acum, key) => {
      acum[key] = [];
      return acum;
    }, {})
  );

  //MATERIALES NO CORE
  const materialNoCore = useContext(MaterialNoCore);

  const {
    lists,
    getList,
    formStep,
    clearUpdate,
    tamanioLote,
    materialHers,
    getTamanioLote,
    descriptionLong,
    getDefaultValues,
    exitsMaterialMds,
    GetDescriptionLong,
    materialNoCoreDetail,
    updateMaterialNoCore,
    getExistHersMaterial,
    parentMaterialOfHERS,
    GetParentMaterialOfHERS,
    getMaterialNoCoreDetail,
    updateMaterialNoCoreFlag,
    defaultValuesShortDescription,
    existMaterialMdsByLongDescription,
    caracteristicasPlanificacionNecesidades,
    getCaracteristicasPlanificacionNecesidades,
  } = materialNoCore;

  const { clear, setError, Time, Error } = materialNoCore;

  useEffect(() => {
    getList();
    clearUpdate();
    getTamanioLote();
    getMaterialNoCoreDetail(id);
    getCaracteristicasPlanificacionNecesidades();

    return () => {
      setExistLongDescrip(false);
    };
  }, []);

  useEffect(() => {
    setOptions({ ...options, ...values });
  }, [values]);

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState({
    storeList: [],
    makerList: [],
    grArtExtList: [],
    grArtUNSPSCList: [],
    abcIndicatorList: [],
    logisticCenterList: [],
    unitBaseMeasureList: [],
    productHierarchyList: [],
    shortDescriptionList: [],
  });

  const splitInternalNote = (internalNoteValue) => {
    const words = internalNoteValue.split("%-@");
    if (words.length > 1) {
      return words[1];
    } else {
      return words[0];
    }
  };

  useEffect(() => {
    try {
      if (materialNoCoreDetail) {
        if (lists.length) {
          const CentroLogistico = lists.filter(
            (element) => element.listName === "CentroLogistico"
          );
          const DescripcionCorta = lists.filter(
            (element) => element.listName === "DescripcionCorta"
          );

          const UnidadMedidaBase = lists.filter(
            (element) => element.listName === "UnidadMedidaBase"
          );
          const GrupoArticulos = lists.filter(
            (element) => element.listName === "GrupoArticulos"
          );
          const GrupoArtExterno = lists.filter(
            (element) => element.listName === "GrupoArtExterno"
          );
          const JerarquiaProducto = lists.filter(
            (element) => element.listName === "JerarquiaProducto"
          );

          const IndicadorAbc = lists.filter(
            (element) => element.listName === "IndicadorAbc"
          );
          const Fabricante = lists.filter(
            (element) => element.listName === "Fabricante"
          );

          const Maker = Fabricante[0].list[0].values;
          Maker.splice(0, 0, { id: "", name: "Seleccionar", subValues: null });

          setList({
            ...list,
            makerList: Maker,
            grArtExtList: GrupoArtExterno[0].list[0].values,
            abcIndicatorList: IndicadorAbc[0].list[0].values,
            grArtUNSPSCList: GrupoArticulos[0].list[0].values,

            logisticCenterList:
              materialNoCoreDetail.typeMaterials === "HERS"
                ? []
                : CentroLogistico[0].list[0].values,
            unitBaseMeasureList: UnidadMedidaBase[0].list[0].values,
            shortDescriptionList: DescripcionCorta[0].list[0].values,
            productHierarchyList: JerarquiaProducto[0].list[0].values,
          });

          setValues({
            ...values,
            shortDescription: validateNull(
              materialNoCoreDetail.shortDescription
            ),
            hierarchyProducts: validateNull(
              materialNoCoreDetail.hierarchyProducts
            ),
            groupExternalArticle: validateNull(
              materialNoCoreDetail.groupExternalArticle
            ),
            groupInternalArticle: validateNull(
              materialNoCoreDetail.groupInternalArticle
            ),
            price: validateNumber(materialNoCoreDetail.price),
            store: validateNull(materialNoCoreDetail.store),
            stockMax: validateNumber(materialNoCoreDetail.stockMax),
            orderPoint: validateNumber(materialNoCoreDetail.orderPoint),
            partNumber: validateNull(materialNoCoreDetail.partNumber),
            internalNote: splitInternalNote(
              validateNull(materialNoCoreDetail.internalNote)
            ),
            abcindicator: validateNull(materialNoCoreDetail.abcindicator),
            manufacturer: validateNull(materialNoCoreDetail.manufacturer),
            measuredUnit: validateNull(materialNoCoreDetail.measuredUnit),
            logisticCenter: validateNull(materialNoCoreDetail.logisticCenter),
            stockManagement: validateNull(materialNoCoreDetail.stockManagement),
            longDescription: validateNull(materialNoCoreDetail.longDescription),
          });

          setStock(validateNull(materialNoCoreDetail.stockManagement));
          setOptions({
            ...options,
            typeMaterials: validateNull(materialNoCoreDetail.typeMaterials),
          });

          setTypeM(validateNull(materialNoCoreDetail.typeMaterials));
          setLoading(false);
        }
      }
    } catch (error) {
      setExit(true);
      setError("Ha ocurrido un error inesperado", 10000);
    }
  }, [lists, materialNoCoreDetail]);

  useEffect(() => {
    setTypeM(validateNull(materialNoCoreDetail.typeMaterials));
  }, [materialNoCoreDetail.typeMaterials]);

  useEffect(() => {
    if (
      materialNoCoreDetail.typeMaterials !== "HERS" &&
      materialNoCoreDetail.typeMaterials !== "NLAG"
    ) {
      if (
        materialNoCoreDetail.abcindicator === null ||
        materialNoCoreDetail.abcindicator === ""
      ) {
        if (list.abcIndicatorList.length) {
          setValues({ ...values, abcindicator: "D" });
        }
      }
    }
  }, [list, materialNoCoreDetail]);

  const validateNull = (value) => {
    if (value === null || value === 0) {
      return "";
    } else {
      return value;
    }
  };

  const validateNumber = (value) => {
    if (value === null) {
      return "";
    } else if (value === 0) {
      return "";
    } else {
      return value;
    }
  };

  useEffect(() => {
    if (disableStock) {
      setValues({ ...values, stockMax: "", orderPoint: "" });
    }
  }, [disableStock]);

  useEffect(() => {
    if (values.manufacturer === "") {
      setValues({ ...values, partNumber: "" });
    }
  }, [values.manufacturer]);

  useEffect(() => {
    if (typeM !== "HERS") {
      if (values.logisticCenter !== undefined && values.logisticCenter !== "") {
        const Almacen = lists.filter(
          (element) => element.listName === "Almacen"
        );
        if (Almacen.length > 0) {
          if (Almacen[0].list.length > 0) {
            const AlmacenByCentro = Almacen[0].list[0].values.filter(
              (process) => process.id === values.logisticCenter
            );
            if (AlmacenByCentro.length > 0) {
              if (AlmacenByCentro[0].subValues.length > 0) {
                setList({
                  ...list,
                  storeList: AlmacenByCentro[0].subValues,
                });
              }
            } else {
              setValues({
                ...values,
                store: "",
              });
              setList({
                ...list,
                storeList: [],
              });
              setError(
                "La lista de almacenes para este centro se encuentra vacía.",
                10000
              );
            }
          }
        }
      }
    }
  }, [values.logisticCenter, typeM]);

  useEffect(() => {
    if (values.abcindicator !== "") {
      if (
        values.abcindicator === "D" ||
        values.abcindicator === "E" ||
        values.abcindicator === "F" ||
        values.abcindicator === "G"
      ) {
        setDisableStock(true);
        setErrorField({ ...errorField, stockMax: [], orderPoint: [] });
      } else {
        setDisableStock(false);
      }
    }
  }, [values.abcindicator]);

  useEffect(() => {
    if (values.abcindicator !== "") {
      let ValueTamLote = "";
      let ValuePlanningRequirements = "";

      if (
        values.abcindicator === "A" ||
        values.abcindicator === "B" ||
        values.abcindicator === "C"
      ) {
        if (caracteristicasPlanificacionNecesidades.length > 0) {
          const tempPlanning = caracteristicasPlanificacionNecesidades.filter(
            (element) => element === "Z2 - ECP PTOPEDMAN.C/RESORD DCTTRAS"
          );
          if (tempPlanning.length > 0) {
            ValuePlanningRequirements = tempPlanning[0];
          }
        }

        if (tamanioLote.length > 0) {
          const tempLote = tamanioLote.filter(
            (element) => element === "ZB - ECP REPOSICIÓN HASTA EL STOCK MÁXIMO"
          );
          if (tempLote.length > 0) {
            ValueTamLote = tempLote[0];
          }
        }
      } else if (values.abcindicator === "D" || values.abcindicator === "E") {
        if (caracteristicasPlanificacionNecesidades.length) {
          const tempPlanning = caracteristicasPlanificacionNecesidades.filter(
            (element) => element === "ZD - ECP PLANIFIC.NEC.DETERMINISTA"
          );
          if (tempPlanning.length > 0) {
            ValuePlanningRequirements = tempPlanning[0];
          }
        }

        if (tamanioLote.length > 0) {
          const tempLote = tamanioLote.filter(
            (element) => element === "EX - CÁLCULO DEL TAMAÑO DE LOTE EXACTO"
          );
          if (tempLote.length > 0) {
            ValueTamLote = tempLote[0];
          }
        }
      } else if (values.abcindicator === "F" || values.abcindicator === "G") {
        if (caracteristicasPlanificacionNecesidades.length) {
          const tempPlanning = caracteristicasPlanificacionNecesidades.filter(
            (element) => element === "ND - SIN PLANIFICACIÓN NECESIDADES"
          );
          if (tempPlanning.length > 0) {
            ValuePlanningRequirements = tempPlanning[0];
          }
        }
      }
      setValues({
        ...values,
        lotLength: ValueTamLote,
        planningRequirements: ValuePlanningRequirements,
      });
    }
  }, [
    tamanioLote,
    values.abcindicator,
    caracteristicasPlanificacionNecesidades,
  ]);

  useEffect(() => {
    if (typeM) {
      if (typeM !== "HERS") {
        if (validateAbsolute(values.shortDescription)) {
          getDefaultValues(values.shortDescription);
          GetDescriptionLong(values.shortDescription);
        }
      }
    }
  }, [values.shortDescription, typeM]);

  useEffect(() => {
    if (typeM) {
      if (typeM !== "HERS") {
        if (descriptionLong.length > 0) {
          setExistLongDescrip(true);
        } else {
          setExistLongDescrip(false);
        }
      }
    }
  }, [descriptionLong, typeM]);

  useEffect(() => {
    if (defaultValuesShortDescription.length) {
      const defaultValues = defaultValuesShortDescription[0];

      if (validateAbsolute(defaultValues.notaInterna)) {
        setShowMiltiline([
          { valueDefault: defaultValues.notaInterna, show: true },
        ]);
      } else {
        setShowMiltiline([
          { valueDefault: defaultValues.notaInterna, show: false },
        ]);
      }
      setValues({
        ...values,
        measuredUnit:
          defaultValues.codigoUnidadMedidaBaseCode !== null
            ? defaultValues.codigoUnidadMedidaBaseCode
            : values.measuredUnit,
        groupInternalArticle:
          defaultValues.codigoGrupoArticulo_Code !== null
            ? defaultValues.codigoGrupoArticulo_Code
            : values.groupInternalArticle,
        groupExternalArticle:
          defaultValues.codigoGrupoArticuloExterno_Code !== null
            ? defaultValues.codigoGrupoArticuloExterno_Code
            : values.groupExternalArticle,
        hierarchyProducts:
          defaultValues.codigoJerarquiaProducto_Code !== null
            ? defaultValues.codigoJerarquiaProducto_Code
            : values.hierarchyProducts,
      });
      setValidateDefaultValues(true);
    }
  }, [defaultValuesShortDescription]);

  if (Error) {
    if (exit) {
      setTimeout(() => {
        history.push("/MaterialesNoCore/Consultar");
        clear();
      }, Time);
    }
  }

  const handleBack = () => {
    setExistLongDescrip(false);
    if (isEdited) {
      history.push(`/MaterialesNoCore/Modificar/1/${id}`);
    } else {
      history.push(`/MaterialesNoCore/Borrador/1/${id}`);
    }
  };

  const changeData = (e) => {
    const { name, value } = e.target;
    setErrorField(() => {
      const validations = validateError(value, options);
      return { ...errorField, [name]: validations[name]() };
    });
    setValues({ ...values, [name]: value });
    setOptions({ ...options, [name]: value });
  };

  const Validate = () => {
    setBuildDescription(true);
    document.body.style.cursor = "wait";
    setTimeout(() => {
      setPushButton(true);
      setIsSubmitting(true);
      document.body.style.cursor = "default";
    }, 1000);
  };

  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);

  const submitValidate = () => {
    const errors = {};
    Object.keys(initialState).forEach((data) => {
      errors[data] = validateError(values[data], options)[data]();
    });
    setErrorField(errors);
  };

  const isTrue = (val) => {
    return val !== null;
  };

  useEffect(() => {
    if (validateDefaultValues) {
      if (defaultValuesShortDescription.length) {
        const defaultValues = defaultValuesShortDescription[0];
        let errors = { ...errorField };
        errors = {
          ...errors,
          measuredUnit: isTrue(defaultValues.codigoUnidadMedidaBaseCode)
            ? validateError(values.measuredUnit, options)["measuredUnit"]()
            : errorField.measuredUnit,
          hierarchyProducts: isTrue(defaultValues.codigoJerarquiaProducto_Code)
            ? validateError(values.hierarchyProducts, options)[
                "hierarchyProducts"
              ]()
            : errorField.hierarchyProducts,
          groupExternalArticle: isTrue(
            defaultValues.codigoGrupoArticuloExterno_Code
          )
            ? validateError(values.groupExternalArticle, options)[
                "groupExternalArticle"
              ]()
            : errorField.groupExternalArticle,
          groupInternalArticle: isTrue(defaultValues.codigoGrupoArticulo_Code)
            ? validateError(values.groupInternalArticle, options)[
                "groupInternalArticle"
              ]()
            : errorField.groupInternalArticle,
        };
        setErrorField(errors);
      }
      setValidateDefaultValues(false);
    }
  }, [values, validateDefaultValues, defaultValuesShortDescription]);

  const sendExitsMaterialMds = () => {
    try {
      const tipoMat = typeM;
      const numClass = values.shortDescription;
      const caracteristicasMat = JSON.parse(values.longDescription);

      const body = {
        TipoMaterial: tipoMat,
        NumeroClase: numClass,
        CaracteristicaMaterial: caracteristicasMat,
      };
      exitsMaterialMds(body);
    } catch (error) {
      setError(`Se ha presentado un error inesperado [${error}]`, 10000);
    }
  };

  const sendExitsMaterialHers = (flag) => {
    try {
      const PartNumber = values.partNumber;
      const Manufacturer = values.manufacturer;
      if (Manufacturer !== "" && PartNumber !== "") {
        getExistHersMaterial(Manufacturer, PartNumber);
      } else {
        if (flag) {
          setError(
            `Debe completar los campos Fabricante y número de parte`,
            10000
          );
        } else {
          saveData();
        }
      }
    } catch (error) {
      setError(`Se ha presentado un error inesperado [${error}]`, 10000);
    }
  };

  useEffect(() => {
    if (pushButton) {
      if (isSubmitting) {
        const value = Object.values(errorField).every(
          (data) => data.length === 0 && data !== ""
        );
        if (value) {
          if (typeM === "HERS") {
            sendExitsMaterialHers(true);
          } else {
            sendExitsMaterialMds();
          }
        } else {
          submitValidate();
        }
      }
      setIsSubmitting(false);
    }
    setPushButton(false);
  }, [errorField]);

  const saveData = () => {
    const requestSolicitud = {
      ...values,
      typeMaterials: materialNoCoreDetail.typeMaterials,
      price: parseInt(values.price, 10),
      stockMax: values.stockMax === "" ? 0 : parseInt(values.stockMax, 10),
      orderPoint:
        values.orderPoint === "" ? 0 : parseInt(values.orderPoint, 10),
      id: id ? parseInt(id, 10) : 0,
      stateId: isEdited ? 4 : 1,
      operation: 2,
      requestPhase: 2,
      modifiedBy: currentUser,
      internalNote:
        showMultiline.length > 0
          ? showMultiline[0].show
            ? showMultiline[0].valueDefault + " %-@ " + values.internalNote
            : values.internalNote
          : values.internalNote,
      stockManagement:
        values.stockManagement === ""
          ? null
          : parseInt(values.stockManagement, 10),
    };
    updateMaterialNoCore(requestSolicitud);
  };

  useEffect(() => {
    try {
      const valid =
        Object.entries(existMaterialMdsByLongDescription).length === 0;
      if (!valid) {
        const data = existMaterialMdsByLongDescription;
        if (data.isSuccess) {
          if (data.data === "-1") {
            sendExitsMaterialHers(false);
          } else {
            setError(`${data.data}`, 4000);
          }
        }
      }
    } catch (error) {
      setError(`Se ha presentado un error inesperado [${error}]`, 10000);
    }
  }, [existMaterialMdsByLongDescription]);

  useEffect(() => {
    try {
      const valid = Object.entries(materialHers).length === 0;
      if (!valid) {
        const data = materialHers;
        if (data.data.length === 0) {
          saveData();
        } else {
          setError(`${data.returnMessage}`, 10000);
        }
      }
    } catch (error) {
      setError(`Se ha presentado un error inesperado [${error}]`, 2000);
    }
  }, [materialHers]);

  useEffect(() => {
    if (updateMaterialNoCoreFlag) {
      if (formStep === 2) {
        setTimeout(() => {
          if (isEdited) {
            history.push(`/MaterialesNoCore/Modificar/3/${id}`);
          } else {
            history.push(`/MaterialesNoCore/Borrador/3/${id}`);
          }
        }, Time);
      }
    }
  }, [updateMaterialNoCoreFlag]);

  const printError = (error) => {
    if (error.length > 0) {
      return error[0];
    } else {
      return "";
    }
  };

  const validNumberSapStock = (codeSap) => {
    if (codeSap >= 71000000000 && codeSap <= 71999999999) {
      return true;
    } else if (codeSap >= 72000000000 && codeSap <= 72999999999) {
      return true;
    } else if (codeSap >= 73000000000 && codeSap <= 73999999999) {
      return true;
    } else if (codeSap >= 75000000000 && codeSap <= 75999999999) {
      return true;
    } else {
      return false;
    }
  };
  const validNumberStock = (number) => {
    if (number === "0") {
      return false;
    }
    if (number === 0) {
      return false;
    }
    if (number === "") {
      return false;
    }
    if (number === null) {
      return false;
    }
    if (number === undefined) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (validNumberStock(stock)) {
      GetParentMaterialOfHERS(parseInt(stock, 10));
    }
  }, [stock]);

  const serachParentHERS = () => {
    if (typeM === "HERS") {
      if (!values.stockManagement) {
        setError("Debe ingresar un codigo SAP a relacionar", 3000);
      } else {
        const numeric = values.stockManagement;
        if (numeric.toString().length === 11) {
          if (validNumberSapStock(numeric)) {
            GetParentMaterialOfHERS(parseInt(values.stockManagement, 10));
          } else {
            setError(
              "El código del material ingresado no corresponde a un material ERSA, HIBE, UNBW o ZIAC",
              3000
            );
          }
        }
      }
    }
  };

  const filterList = (listOrign, listFilter) => {
    return listOrign.filter((data) => data.id === listFilter)[0];
  };

  useEffect(() => {
    try {
      if (typeM === "HERS") {
        if (
          values.stockManagement !== undefined &&
          values.stockManagement !== ""
        ) {
          if (parentMaterialOfHERS.data.centro.length < 1) {
            setError(
              "El código del material ingresado no existe, verifique por favor",
              3000
            );
          } else {
            const CentroLogistico = lists.filter(
              (element) => element.listName === "CentroLogistico"
            );

            const { centro, grupoArticulo, numeroClase } =
              parentMaterialOfHERS.data;
            let idCenters = [],
              idNumClass = [],
              idGrupoArticulo = [];
            centro.map((value) => {
              idCenters.push(
                filterList(CentroLogistico[0].list[0].values, value)
              );
            });
            numeroClase.map((value) => {
              idNumClass.push(filterList(list.shortDescriptionList, value));
            });
            grupoArticulo.map((value) => {
              idGrupoArticulo.push(filterList(list.grArtUNSPSCList, value));
            });

            setValues({
              ...values,
              logisticCenter: idCenters.length > 0 ? idCenters[0].id : "",
              shortDescription: idNumClass.length > 0 ? idNumClass[0].id : "",
              groupInternalArticle:
                idGrupoArticulo.length > 0 ? idGrupoArticulo[0].id : "",
            });

            setList({
              ...list,
              logisticCenterList: idCenters,
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [parentMaterialOfHERS, typeM, lists]);

  return (
    <>
      <StepIndicator step={2} />
      <div className={classesMaterial.textInfo}>
        Datos generales del material
      </div>
      <div className={classesMaterial.textInfoSub}>
        Digite los datos que debe llevar el material que necesita. Tenga en
        cuenta que el precio debe diligenciarse en pesos colombianos sin
        caracteres especiales y debe corresponder a la unidad de medida. Ej: Si
        Unidad de Medida es Metros el valor debe ser equivalente a lo que vale
        un metro.
      </div>
      <br />
      <br />

      {!loading ? (
        <>
          <div style={{ padding: "0 20px" }}>
            <Grid container spacing={2}>
              {typeM === "HERS" && (
                <Grid item xs={4}>
                  <InputCustom
                    max={11}
                    required={true}
                    maxLength={11}
                    type={"number"}
                    onChange={changeData}
                    showCharacters={true}
                    widthInput={"fullInput"}
                    name={"stockManagement"}
                    value={values.stockManagement}
                    label={"Material gestión stock"}
                    placeholder={"Ingrese el código"}
                    errors={errorField.stockManagement}
                    textMessage={values.stockManagement}
                    lengthCharacters={values.stockManagement}
                    viewMaxCount={false}
                    textTooltip={
                      "Ingrese el código SAP al que va asociar el código HERS. Recuerde que debe ser ERSA, HIBE, UNBW, ZIAC."
                    }
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    buttonInput={
                      <InputAdornment position="end" style={{ zIndex: "1" }}>
                        <IconButton
                          onClick={serachParentHERS}
                          style={{ top: "4px", width: "30px", height: "30px" }}
                        >
                          <SearchIcon
                            style={{ fontSize: "26px", color: "#0F0C5A" }}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              )}
              <Grid item xs={4}>
                <SearchSelect
                  autoFocus={true}
                  isRequired={true}
                  onChange={changeData}
                  label={"Centro logístico"}
                  optionList={"logisticCenter"}
                  valueId={values.logisticCenter}
                  listOpt={list.logisticCenterList}
                  placeholder={"Seleccione una categoría"}
                  errors={printError(errorField.logisticCenter)}
                  tooltip={
                    "Seleccione la localidad, o departamento donde se necesita el material"
                  }
                />
              </Grid>
              {typeM !== "HERS" && typeM !== "NLAG" && (
                <Grid item xs={4}>
                  <SearchSelect
                    errors={printError(errorField.store)}
                    label={"Almacén"}
                    isRequired={true}
                    optionList={"store"}
                    onChange={changeData}
                    valueId={values.store}
                    listOpt={list.storeList}
                    isDisabled={!values.logisticCenter}
                    placeholder={"Seleccione una categoría"}
                    tooltip={
                      "Seleccione el almacén para la ubicación del material"
                    }
                    maxMenuHeight={"300px"}
                  />
                </Grid>
              )}
              {typeM !== "HERS" && (
                <Grid item xs={4}>
                  <InputCustom
                    name={"price"}
                    value={values.price}
                    onChange={changeData}
                    label={"Precio (Unidad de medida)"}
                    widthInput={"fullInput"}
                    required={true}
                    errors={errorField.price}
                    textTooltip={
                      "En pesos colombianos, sin caracteres especiales. Debe coincidir con la unidad de medida"
                    }
                    showMessage={true}
                    textMessage={values.price}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <SearchSelect
                  errors={printError(errorField.shortDescription)}
                  isRequired={true}
                  onChange={changeData}
                  label={"Descripción corta"}
                  optionList={"shortDescription"}
                  valueId={values.shortDescription}
                  listOpt={list.shortDescriptionList}
                  placeholder={"Seleccione una categoría"}
                  maxMenuHeight={"300px"}
                  isDisabled={typeM === "HERS" ? true : false}
                />
              </Grid>
            </Grid>
            <br />

            {typeM !== "HERS" && existLongDescrip && (
              <>
                <div
                  style={{
                    background: "#00000029",
                    padding: "30px 20px",
                    borderRadius: "7px",
                    zIndex: "-2",
                  }}
                >
                  <DescriptionLongItems
                    isEdited={isEdited}
                    objComponents={descriptionLong}
                    buildDescription={buildDescription}
                    handelDescription={() => setBuildDescription(false)}
                    setDescriptionLong={(val) =>
                      setValues({ ...values, longDescription: val })
                    }
                    data={values.longDescription}
                  />
                </div>
                <br />
              </>
            )}
            <Grid container spacing={2}>
              {materialNoCoreDetail.typeMaterials !== "HERS" && (
                <Grid item xs={4}>
                  <SearchSelect
                    valueId={values.measuredUnit}
                    isRequired={true}
                    errors={printError(errorField.measuredUnit)}
                    label={"Unidad de medida"}
                    listOpt={list.unitBaseMeasureList}
                    onChange={changeData}
                    placeholder={"Seleccione una categoría"}
                    optionList={"measuredUnit"}
                    maxMenuHeight={"300px"}
                  />
                </Grid>
              )}
              <Grid item xs={4}>
                <SearchSelect
                  valueId={values.groupInternalArticle}
                  isRequired={true}
                  tooltip={
                    "Seleccione el grupo clasificatorio de abastecimiento al que pertenece el material"
                  }
                  errors={printError(errorField.groupInternalArticle)}
                  label={"Grupo de articulos UNSPSC"}
                  listOpt={list.grArtUNSPSCList}
                  onChange={changeData}
                  placeholder={"Seleccione una categoría"}
                  optionList={"groupInternalArticle"}
                  maxMenuHeight={"300px"}
                  isDisabled={typeM === "HERS" ? true : false}
                />
              </Grid>
              {typeM !== "HERS" && (
                <>
                  <Grid item xs={4}>
                    <SearchSelect
                      valueId={values.groupExternalArticle}
                      isRequired={true}
                      tooltip={
                        "Seleccione la familia donde pertenece el material"
                      }
                      errors={printError(errorField.groupExternalArticle)}
                      label={"Grupo de articulos Externos"}
                      listOpt={list.grArtExtList}
                      onChange={changeData}
                      placeholder={"Seleccione una categoría"}
                      optionList={"groupExternalArticle"}
                      maxMenuHeight={"300px"}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SearchSelect
                      valueId={values.hierarchyProducts}
                      isRequired={true}
                      tooltip={
                        "Seleccione la jerarquía a la que pertenece el material"
                      }
                      errors={printError(errorField.hierarchyProducts)}
                      label={"Jerarquía de productos"}
                      listOpt={list.productHierarchyList}
                      onChange={changeData}
                      placeholder={"Seleccione una categoría"}
                      optionList={"hierarchyProducts"}
                      maxMenuHeight={"300px"}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    {showMultiline.length > 0 ? (
                      showMultiline[0].show ? (
                        <>
                          <InputFieldCustom
                            key={"txt"}
                            label={"Nota interna"}
                            disabled={true}
                            value={
                              showMultiline.length > 0 &&
                              showMultiline[0].show &&
                              showMultiline[0].valueDefault
                            }
                            props={{
                              multiline: true,
                              maxRows: 4,
                            }}
                          />
                          <InputFieldCustom
                            key={"xtx"}
                            max={900}
                            showCharacterLength={true}
                            onChange={changeData}
                            name={"internalNote"}
                            value={values.internalNote}
                            errors={errorField.internalNote}
                            props={{
                              multiline: true,
                              maxRows: 4,
                            }}
                          />
                        </>
                      ) : (
                        <InputFieldCustom
                          key={"xtx2"}
                          max={900}
                          label="Nota interna"
                          showCharacterLength={true}
                          onChange={changeData}
                          name={"internalNote"}
                          value={values.internalNote}
                          errors={errorField.internalNote}
                          placeholder={
                            "Ingresa las características especiales del producto que no están dentro de la descripción larga"
                          }
                          props={{
                            multiline: true,
                            maxRows: 4,
                          }}
                        />
                      )
                    ) : (
                      <InputCustom
                        maxLength={900}
                        name={"internalNote"}
                        onChange={changeData}
                        label={"Nota interna"}
                        widthInput={"insideNote"}
                        value={values.internalNote}
                        errors={errorField.internalNote}
                        placeholder={
                          "Ingresa las características especiales del producto que no están dentro de la descripción larga"
                        }
                        props={{ multiline: true }}
                      />
                    )}
                  </Grid>
                </>
              )}

              {typeM !== "HERS" && typeM !== "NLAG" && (
                <>
                  <Grid item xs={4}>
                    <SearchSelect
                      isDisabled={
                        isEdited || materialNoCoreDetail.typeSupply === "C_ING"
                      }
                      valueId={values.abcindicator}
                      isRequired={true}
                      errors={printError(errorField.abcindicator)}
                      label={"Indicador ABC"}
                      listOpt={list.abcIndicatorList}
                      onChange={changeData}
                      tooltip="Si se desconoce el funcionamiento de este atributo por favor deje el valor por defecto"
                      placeholder={"Seleccione una categoría"}
                      optionList={"abcindicator"}
                      maxMenuHeight={"300px"}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputCustom
                      disabled={true}
                      widthInput={"dis"}
                      value={values.planningRequirements}
                      label={"Características planificación necesidades"}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputCustom
                      disabled={true}
                      widthInput={"dis"}
                      label={"Tamaño lote"}
                      value={values.lotLength}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputCustom
                      disabled={disableStock}
                      required={!disableStock}
                      widthInput={disableStock ? "dis" : "fullInput"}
                      label={"Stock máximo"}
                      name={"stockMax"}
                      value={values.stockMax}
                      onChange={changeData}
                      errors={errorField.stockMax}
                      showCharacters={true}
                      lengthCharacters={values.stockMax}
                      max={13}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputCustom
                      disabled={disableStock || !values.stockMax}
                      required={!disableStock}
                      widthInput={
                        disableStock || !values.stockMax ? "dis" : "fullInput"
                      }
                      onChange={changeData}
                      value={values.orderPoint}
                      name={"orderPoint"}
                      label={"Punto de pedido"}
                      errors={errorField.orderPoint}
                      showCharacters={true}
                      lengthCharacters={values.orderPoint}
                      max={13}
                    />
                  </Grid>
                </>
              )}
              {materialNoCoreDetail.typeMaterials == "HERS" && (
                <>
                  <Grid item xs={4}>
                    <SearchSelect
                      valueId={values.manufacturer}
                      errors={printError(errorField.manufacturer)}
                      tooltip={
                        "Relacione el fabricante del material y no el proveedor"
                      }
                      label={"Fabricante"}
                      listOpt={list.makerList}
                      onChange={changeData}
                      isRequired={typeM === "HERS" ? true : false}
                      placeholder={"Seleccione una categoría"}
                      optionList={"manufacturer"}
                      maxMenuHeight={"300px"}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputCustom
                      maxLength={41}
                      required={typeM === "HERS" ? true : values.manufacturer}
                      placeholder={"Número de parte"}
                      disabled={false}
                      value={values.partNumber}
                      widthInput={
                        typeM === "HERS"
                          ? "fullInput"
                          : !values.manufacturer
                          ? "dis"
                          : "fullInput"
                      }
                      label={"Número de parte"}
                      onChange={changeData}
                      name={"partNumber"}
                      errors={errorField.partNumber}
                      showCharacters={true}
                      lengthCharacters={values.partNumber}
                      max={40}
                      textTooltip={
                        "Digite el part number que relaciona la ficha técnica del material"
                      }
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </div>
          <br />
          {materialNoCoreDetail.typeMaterials !== "HERS" &&
          materialNoCoreDetail.typeMaterials !== "NLAG" ? (
            <>
              <div className={classesMaterial.textInfoSub}>
                <strong>Nota:</strong> Recuerde que al diligenciar los campos
                Fabricante y Número de parte se creará de manera automática un
                material HERS.
              </div>
              <br />
              <div
                className={classesMaterial.marginFrom}
                style={{ padding: "0 20px" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <SearchSelect
                      valueId={values.manufacturer}
                      errors={printError(errorField.manufacturer)}
                      tooltip={
                        "Relacione el fabricante del material y no el proveedor"
                      }
                      label={"Fabricante"}
                      listOpt={list.makerList}
                      onChange={changeData}
                      isRequired={typeM === "HERS" ? true : false}
                      placeholder={"Seleccione una categoría"}
                      optionList={"manufacturer"}
                      maxMenuHeight={"300px"}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputCustom
                      maxLength={41}
                      disabled={!values.manufacturer}
                      required={values.manufacturer}
                      value={values.partNumber}
                      widthInput={!values.manufacturer ? "dis" : "fullInput"}
                      label={"Número de parte"}
                      onChange={changeData}
                      name={"partNumber"}
                      errors={values.manufacturer ? errorField.partNumber : []}
                      showCharacters={true}
                      lengthCharacters={values.partNumber}
                      max={40}
                      textTooltip={
                        "Digite el part number que relaciona la ficha técnica del material"
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            </>
          ) : (
            <div
              className={classesMaterial.marginFrom}
              style={{ padding: "0 20px" }}
            ></div>
          )}
          <ButtonsFooter
            showCancel={true}
            showBack={true}
            showNext={true}
            handleCancel={handleCancel}
            handleBack={handleBack}
            handleNext={Validate}
            labelNext="Siguiente"
          />
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ width: 300 }}>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ width: 300 }}>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
