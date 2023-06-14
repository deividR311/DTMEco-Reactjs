import React from "react";
import "./__InputData.scss";
import { useHistory } from "react-router";
import { useStylesStepOne } from "./style";
import { StepIndicator } from "../StepIndicator";
import { Button, Grid } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { Footer } from "../../../../../../sharedComponents";

import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import MaterialNoCore from "../../../../../../context/MaterialsNoCore/materialsNoCoreContext";
import { ButtonsFooter } from "../ButtonsFooter";

const initialState = {
  typeSupply: "",
  typeProcess: "",
  typeRequest: "",
  manageService: "",
  typeMaterials: "",
  destinationService: "",
};

export const StepOne = ({
  id,
  isEdited,
  isCreation,
  currentUser,
  handleCancel,
}) => {
  const classesFormStepOne = useStylesStepOne();
  const history = useHistory();

  //context
  const materialNoCore = useContext(MaterialNoCore);
  const { lists, getList, clearUpdate, updateMaterialNoCore } = materialNoCore;

  //DETALLE DEL MATERIAL
  const { getMaterialNoCoreDetail, materialNoCoreDetail } = materialNoCore;

  //OTHER CONTEXT
  const {
    existId,
    formStep,
    idMaterial,
    createMaterialNoCore,
    updateMaterialNoCoreFlag,
  } = materialNoCore;

  //MANEJO DE ERRORES Y MENSAJES
  const { clear, setError, Time, Error } = materialNoCore;

  //STATE
  const [exit, setExit] = useState(false);
  const [bienesList, setBienesList] = useState([]);
  const [values, setValues] = useState(initialState);
  const [servicioList, setServicioList] = useState([]);
  const [materialTypeList, setMaterialTypeList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [update, setUpdate] = useState(false);

  const [list, setList] = useState({
    TypeResquestList: [],
    TypeCateringList: [],
    TypeProcessList: [],
  });

  const [errorField, setErrorField] = useState(() =>
    Object.keys(initialState).reduce((acum, key) => {
      acum[key] = [];
      return acum;
    }, {})
  );

  const saveData = () => {
    const value = Object.values(values).every(
      (data) => data !== "" && data !== undefined
    );
    if (value) {
      if (isCreation) {
        const requestCreation = {
          ...values,
          stateId: 1,
          operation: 1,
          createdBy: currentUser,
        };
        createMaterialNoCore(requestCreation);
      } else {
        const requestSolicitud = {
          ...values,
          id: id ? parseInt(id, 10) : 0,
          stateId: isEdited ? 4 : 1,
          operation: 2,
          requestPhase: 1,
          modifiedBy: currentUser,
        };
        updateMaterialNoCore(requestSolicitud);
      }
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      const value = Object.values(errorField).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        saveData();
      }
    }
    setIsSubmitting(false);
  }, [errorField]);

  const validateError = (value) => {
    if (value === undefined || value === "") {
      return ["Campo requerido"];
    } else {
      return [];
    }
  };

  const changeData = (e) => {
    const { name, value } = e.target;
    setErrorField(() => {
      const validations = validateError(value);
      return { ...errorField, [name]: validations };
    });
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);

  const submitValidate = () => {
    const errors = {};
    Object.keys(initialState).forEach((data) => {
      errors[data] = validateError(values[data]);
    });
    setErrorField(errors);
  };

  const valideTypeMaterial = (list, value) => {
    let retorno = "";
    const valueType = validateNull(value);
    if (list.length > 0) {
      if (valueType !== "") {
        const valor = list.filter((type) => type.id === valueType);
        if (valor.length > 0) {
          retorno = valor[0].id;
        }
      }
    }
    return retorno;
  };

  const validateNull = (value) => {
    if (value === null) {
      return "";
    } else {
      return value;
    }
  };

  useEffect(() => {
    if (update) {
      setUpdate(false);
      window.location.reload(false);
    }
    if (materialNoCoreDetail) {
      setValues({
        ...values,
        typeRequest: validateNull(materialNoCoreDetail.typeRequest),
        typeSupply: validateNull(materialNoCoreDetail.typeSupply),
        typeProcess: validateNull(materialNoCoreDetail.typeProcess),
        destinationService: validateNull(
          materialNoCoreDetail.destinationService
        ),
        manageService: validateNull(materialNoCoreDetail.manageService),
      });
    }
  }, [materialNoCoreDetail]);

  useEffect(() => {
    if (!isEdited) {
      if (list.TypeResquestList.length) {
        if (materialNoCoreDetail.typeRequest === undefined) {
          setValues({ ...values, typeRequest: "TS_01" });
        }
      }
    }
  }, [list, materialNoCoreDetail.typeRequest]);

  useEffect(() => {
    getList();
    clearUpdate();
    if (!isCreation) {
      getMaterialNoCoreDetail(id);
    }
  }, []);

  useEffect(() => {
    if (existId) {
      setTimeout(() => {
        history.push(`/MaterialesNoCore/Borrador/2/${idMaterial}`);
      }, Time);
    }
  }, [existId]);

  useEffect(() => {
    if (updateMaterialNoCoreFlag) {
      if (formStep === 1) {
        setTimeout(() => {
          if (isEdited) {
            history.push(`/MaterialesNoCore/Modificar/2/${id}`);
          } else {
            history.push(`/MaterialesNoCore/Borrador/2/${id}`);
          }
        }, Time);
      }
    }
  }, [updateMaterialNoCoreFlag]);

  if (Error) {
    if (exit) {
      setTimeout(() => {
        history.push("/MaterialesNoCore/Consultar");
        clear();
      }, Time);
    }
  }

  useEffect(() => {
    try {
      if (lists.length) {
        const TipoSolicitud = lists.filter(
          (element) => element.listName === "TipoSolicitud"
        );
        const TipoAbastecimiento = lists.filter(
          (element) => element.listName === "TipoAbastecimiento"
        );
        const TipoProceso = lists.filter(
          (element) => element.listName === "TipoProceso"
        );

        setList({
          ...list,
          TypeProcessList: TipoProceso[0].list[0].values,
          TypeResquestList: TipoSolicitud[0].list[0].values,
          TypeCateringList: TipoAbastecimiento[0].list[0].values,
        });
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado", 10000);
    }
  }, [lists]);

  useEffect(() => {
    try {
      if (lists.length) {
        if (values.typeProcess !== "" && values.typeProcess !== undefined) {
          const Destino = lists.filter(
            (element) => element.listName === "Destino"
          );
          if (Destino.length > 0) {
            if (Destino[0].list.length) {
              const DestinoByProcess = Destino[0].list[0].values.filter(
                (process) => process.id === values.typeProcess
              );
              setBienesList(DestinoByProcess[0].subValues);
            } else {
              setError(
                "Ha ocurrido un error al cargar la Lista de Destino",
                10000
              );
            }
          } else {
            setError(
              "Ha ocurrido un error al cargar la Lista de Destino",
              10000
            );
          }
        }
      }
    } catch (error) {
      setError(
        "Ha ocurrido un error al cargar la Lista de Destino catch",
        10000
      );
    }
  }, [values.typeProcess, lists]);

  useEffect(() => {
    try {
      if (lists.length) {
        if (
          values.destinationService !== "" &&
          values.destinationService !== undefined
        ) {
          const Bienes = lists.filter(
            (element) => element.listName === "Bienes"
          );
          setValues({ ...values, manageService: "", typeMaterials: "" });
          setServicioList([]);
          setMaterialTypeList([]);
          if (Bienes.length > 0) {
            if (Bienes[0].list.length) {
              const BienesByDestino = Bienes[0].list[0].values.filter(
                (bienes) => bienes.id === values.destinationService
              );
              if (BienesByDestino.length > 0) {
                if (BienesByDestino[0].subValues.length > 0) {
                  setServicioList(BienesByDestino[0].subValues);
                }
              } else {
                setValues({ ...values, manageService: "" });
                setServicioList([]);
                setError("La lista de bienes se encuentra vacía.", 10000);
              }
            } else {
              setError(
                "Ha ocurrido un error al cargar la Lista de Bienes",
                10000
              );
            }
          } else {
            setError(
              "Ha ocurrido un error al cargar la Lista de Bienes",
              10000
            );
          }
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error al cargar la Lista de Bienes", 10000);
    }
  }, [values.destinationService, lists]);

  useEffect(() => {
    try {
      if (lists.length) {
        if (values.manageService !== "" && values.manageService !== undefined) {
          const TipoMaterial = lists.filter(
            (element) => element.listName === "TipoMaterial"
          );
          setValues({ ...values, typeMaterials: "" });
          setMaterialTypeList([]);
          if (TipoMaterial.length > 0) {
            const TipoMaterialByAlmacen = TipoMaterial[0].list[0].values.filter(
              (bienes) => bienes.id === values.manageService
            );
            if (TipoMaterialByAlmacen.length > 0) {
              setMaterialTypeList(TipoMaterialByAlmacen[0].subValues);
              setValues({
                ...values,
                typeMaterials: valideTypeMaterial(
                  TipoMaterialByAlmacen[0].subValues,
                  materialNoCoreDetail.typeMaterials
                ),
              });
            } else {
              setValues({ ...values, typeMaterials: "" });
              setMaterialTypeList([]);
            }
          }
        }
      }
    } catch (error) {
      setError(
        "Ha ocurrido un error al cargar la Lista de Tipo de material",
        10000
      );
    }
  }, [values.manageService, lists, materialNoCoreDetail]);

  const tableCss = {
    marginTop: "30px",
    width: "100%",
    height: "74%",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    marginBottom: "100px",
  };

  const printError = (error) => {
    if (error.length > 0) {
      return error[0];
    } else {
      return "";
    }
  };

  return (
    <>
      <div>
        <StepIndicator step={1} />
        <span>
          <p className={classesFormStepOne.stepOne}>
            Creación del número de ticket
          </p>
        </span>
        <span>
          <p className={classesFormStepOne.stepOneDescription}>
            Señor usuario seleccione el tipo de solicitud y complete los campos
            para generar su número de ticket.
            <br />
            Recuerde que del manejo que se le dé a los bienes o servicios
            dependerá el tipo de material, por ejemplo: los materiales{" "}
            <strong>ERSA</strong> y <strong>HIBE</strong> son inventariados por
            cantidad y costo; los <strong>UNBW</strong> solo manejan inventario
            por cantidad, y los <strong>HERS</strong> y <strong>NLAG</strong> no
            son inventariados.
          </p>
        </span>
      </div>
      <div style={tableCss}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <SearchSelect
              isDisabled={isEdited || !list.TypeResquestList.length > 0}
              isLoading={!list.TypeResquestList.length > 0}
              valueId={values.typeRequest}
              autoFocus={true}
              isRequired={true}
              errors={printError(errorField.typeRequest)}
              label={"Tipo de solicitud"}
              listOpt={list.TypeResquestList}
              onChange={changeData}
              placeholder={"Seleccione una categoría"}
              optionList={"typeRequest"}
            />
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isDisabled={isEdited || !list.TypeCateringList.length > 0}
              isLoading={!list.TypeCateringList.length > 0}
              valueId={values.typeSupply}
              isRequired={true}
              errors={printError(errorField.typeSupply)}
              label={"Tipo de abastecimiento"}
              listOpt={list.TypeCateringList}
              onChange={changeData}
              placeholder={"Seleccione una categoría"}
              optionList={"typeSupply"}
            />
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isDisabled={!list.TypeProcessList.length > 0}
              isLoading={!list.TypeProcessList.length > 0}
              isRequired={true}
              errors={printError(errorField.typeProcess)}
              valueId={values.typeProcess}
              label={"Tipo de proceso"}
              listOpt={list.TypeProcessList}
              onChange={changeData}
              placeholder={"Seleccione una categoría"}
              optionList={"typeProcess"}
            />
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isDisabled={!bienesList.length > 0 || !values.typeProcess}
              isLoading={!list.TypeProcessList.length > 0}
              isRequired={true}
              errors={printError(errorField.destinationService)}
              valueId={values.destinationService}
              label={"El bien / servicio se destina a"}
              listOpt={bienesList}
              onChange={changeData}
              tooltip={
                "Defina si el articulo o servicio a catalogar es para comprar o vender"
              }
              placeholder={"Seleccione una categoría"}
              optionList={"destinationService"}
            />
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isDisabled={
                !servicioList.length > 0 || !values.destinationService
              }
              isLoading={!servicioList.length > 0}
              isRequired={true}
              errors={printError(errorField.manageService)}
              valueId={values.manageService}
              label={"Los bienes / servicios que se manejan"}
              listOpt={servicioList}
              onChange={changeData}
              tooltip={"Seleciona si maneja inventario"}
              placeholder={"Seleccione una categoría"}
              optionList={"manageService"}
            />
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isDisabled={!materialTypeList.length > 0 || !values.manageService}
              isLoading={!materialTypeList.length > 0}
              isRequired={true}
              errors={printError(errorField.typeMaterials)}
              valueId={values.typeMaterials}
              label={"Tipo de material"}
              listOpt={materialTypeList}
              onChange={changeData}
              tooltip={"Seleccione el tipo de material que necesita"}
              placeholder={"Seleccione una categoría"}
              optionList={"typeMaterials"}
            />
          </Grid>
        </Grid>

        <ButtonsFooter
          showCancel={true}
          showBack={false}
          showNext={true}
          handleCancel={handleCancel}
          handleNext={validate}
          labelNext="Siguiente"
        />
      </div>
    </>
  );
};
