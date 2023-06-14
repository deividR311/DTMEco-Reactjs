import "./styles_modification.scss";
import { breadCrumb } from "../constants";
import { useHistory } from "react-router-dom";
import { validatorFromEdit } from "./validator";
import { Button, Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { InputCustom } from "../../../../Materials/widgets";
import { forceLoadUrl } from "../../../../../utils/Function";
import { LongDescriptionModify } from "./LongDescriptionModify";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { AlertMessage, HelperDescriptionLong } from "../../../widgets";
import HeaderContext from "../../../../../context/Header/headerContext";
import { SearchSelect } from "../../../../../sharedComponents/SearchSelectCommon";
import { InputFieldCustom } from "../../DraftMaterialNoCore/components/CustomInput";
import { useStylesStepOne } from "../../DraftMaterialNoCore/components/StepOne/style";
import { ModalCusntomModifi } from "../ModificationList/components/ModalModification";
import MaterialNoCore from "../../../../../context/MaterialsNoCore/materialsNoCoreContext";

import {
  NavBreadCrumb,
  CheckboxCommon,
  SnackBarCommon,
} from "../../../../../sharedComponents";

const tableCss = {
  width: "100%",
  height: "74%",
  width: "100%",
  display: "flex",
  padding: "10px",
  flexWrap: "wrap",
  marginTop: "30px",
  marginTop: "10px",
  marginBottom: "100px",
};

const initialState = {
  typeRequest: "",
  materialCode: "",
  typeMaterial: "",
  internalNote: "",
  observations: "",
  statusMaterial: "",
  longDescription: "",
  checkboxEmail: false,
  shortDescription: "",
  productHierarchy: "",
  longDescriptionForm: "",
  articleGroupExternal: "",
  articleGroupInternal: "",
};

export const ModificationCreate = () => {
  const { id } = useParams();
  const history = useHistory();
  const { location } = history;

  //ESTILOS
  const classesFormStepOne = useStylesStepOne();

  //---HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //---MATERIAL NO CORE
  const materialNoCore = useContext(MaterialNoCore);

  const {
    lists,
    getList,
    arrayModify,
    TypeMaterial,
    getTypeMaterial,
    descriptionLong,
    typeRequestModify,
    GetDescriptionLong,
    getTypeResquetModify,
    SaveMaterialNoCoreModify,
    GetMaterialForModification,
    dataSaveMaterialNoCoreModify,
    setCreateMaterialNoCoreModifyPackage,

    //detail
    GetMaterialNoCoreModifyDetails,
    materialNoCoreModifyDetails,
  } = materialNoCore;

  // ESTADOS DE ERROR Y OK
  const {
    clear,
    Time,
    Error,
    Success,
    setSuccess,
    MessageError,
    MessageSuccess,
    setError: printError,
  } = materialNoCore;

  //ESTAD0S 1
  const [source, setSource] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [showBoby, setShowBoby] = useState(false);
  const [showLong, setShowLong] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState(initialState);
  const [modalError, setModalError] = useState(false);
  const [emailSupport, setEmailSupport] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModifyMassive, setIsModifyMassive] = useState(false);
  const [buildDescription, setBuildDescription] = useState(false);
  const [helperDescriptionLong, setHelperDescriptionLong] = useState([]);
  const [showMaterialBlocked, setShowMaterialBlocked] = useState(false);
  const [descripcionLargaDetalle, setDescripcionLargaDetalle] = useState([]);

  //ESTADOS 2
  const [meenssage, setMeenssage] = useState({
    error: false,
    meenssage: "",
    title: "",
  });

  const [options, setOptions] = useState(() => {
    return {
      ...initialState,
      source: "",
    };
  });
  const [optionsLists, setOptionsLists] = useState({
    typeRequest: [],
    typeMaterial: [],
    productHierarchy: [],
    shortDescription: [],
    articleGroupExternal: [],
    articleGroupInternal: [],
  });

  // SE CREAN EL ESTADO DE ERROR
  const [error, setError] = useState(() =>
    Object.keys(initialState).reduce((acum, key) => {
      acum[key] = [];
      return acum;
    }, {})
  );

  /* SE VALIDAN LOS ROLES Y PERMISOS */
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 5
      );
      setCurrentUser(moduleMaterials[0].userId);
    }
  }, [responseData]);

  useEffect(() => {
    if (descriptionLong.length > 0) {
      setHelperDescriptionLong(descriptionLong);
    }
  }, [descriptionLong]);

  // metodo para visualizar el detalle
  useEffect(() => {
    if (isEdited) {
      if (id !== undefined) {
        GetMaterialNoCoreModifyDetails(id);
      }
    }
  }, [id, isEdited]);

  const isNull = (value) => {
    if (value === undefined) {
      return "";
    }
    if (value === null) {
      return "";
    }
    if (value === "") {
      return "";
    }

    return value;
  };

  const validateLongDescripction = (longDescription, source) => {
    if (source !== "SAP") {
      if (longDescription.length > 0) {
        if (longDescription.length === 1) {
          const ObjArray = longDescription[0];
          const value = Object.values(ObjArray).every((data) => data === "");
          if (value) {
            printError(
              "Hay inconsistencia en la estructura de la descripción larga. Por favor validar con el área de Datos Maestros. Por lo anterior no puede continuar con la modificación.",
              100
            );
            return false;
          } else {
            return true;
          }
        }
        return true;
      } else {
        printError(
          "Las características de la descripción larga están vacías",
          100
        );
        return false;
      }
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (Object.entries(arrayModify).length > 0) {
      setShowBoby(true);
      if (
        arrayModify.statusClasificacion !== null &&
        arrayModify.statusClasificacion !== ""
      ) {
        setShowMaterialBlocked(true);
      } else {
        setShowMaterialBlocked(false);
      }
      if (arrayModify.fuente !== null && arrayModify.fuente !== "") {
        setSource(arrayModify.fuente);
        setOptions({ ...options, source: arrayModify.fuente });
      }

      setValues({
        ...values,
        typeRequest: isNull("TS_03"),
        internalNote: isNull(arrayModify.notaInterna),
        typeMaterial: isNull(arrayModify.tipoMaterial),
        longDescription: isNull(arrayModify.descripcionLarga),
        shortDescription: isNull(arrayModify.descripcionCorta),
        productHierarchy: isNull(arrayModify.jerarquiaProducto),
        statusMaterial: isNull(arrayModify.statusClasificacion),
        articleGroupInternal: isNull(arrayModify.grupoArticulos),
        articleGroupExternal: isNull(arrayModify.grupoArticuloExterno),
      });

      setEmailSupport(arrayModify.emailSupport);

      if (
        validateLongDescripction(
          arrayModify.descripcionLargaDetalle,
          arrayModify.fuente
        )
      ) {
        setShowLong(true);
        GetDescriptionLong(arrayModify.descripcionCorta);
        setDescripcionLargaDetalle(arrayModify.descripcionLargaDetalle);
      }
    }
  }, [arrayModify]);

  useEffect(() => {
    if (Object.entries(materialNoCoreModifyDetails).length > 0) {
      try {
        const sourceDetail = materialNoCoreModifyDetails.materialSource;
        const arrayLong = JSON.parse(
          materialNoCoreModifyDetails.longDescription
        );
        setValues({
          ...values,
          materialCode: parseInt(materialNoCoreModifyDetails.codigoSap, 10),
          typeRequest: materialNoCoreModifyDetails.typeRequest,
          mailSupport: materialNoCoreModifyDetails.mailSupport,
          internalNote: materialNoCoreModifyDetails.internalNote,
          observations: materialNoCoreModifyDetails.observations,
          typeMaterial: materialNoCoreModifyDetails.typeMaterials,
          statusMaterial: materialNoCoreModifyDetails.statusMaterial,
          longDescription: materialNoCoreModifyDetails.longDescription,
          shortDescription: materialNoCoreModifyDetails.shortDescription,
          productHierarchy: materialNoCoreModifyDetails.hierarchyProducts,
          articleGroupInternal:
            materialNoCoreModifyDetails.groupInternalArticle,
          articleGroupExternal:
            materialNoCoreModifyDetails.groupExternalArticle,
        });

        if (validateLongDescripction(arrayLong, sourceDetail)) {
          setShowLong(true);
          setDescripcionLargaDetalle(arrayLong);
        }
        setShowBoby(true);
        setSource(sourceDetail);
        setEmailSupport(materialNoCoreModifyDetails.emailSupport);
      } catch (error) {
        console.log(error);
      }
    }
  }, [materialNoCoreModifyDetails]);

  useEffect(() => {
    if (lists.length > 0) {
      const GrupoArticulos = lists.filter(
        (element) => element.listName === "GrupoArticulos"
      );
      const GrupoArtExterno = lists.filter(
        (element) => element.listName === "GrupoArtExterno"
      );
      const JerarquiaProducto = lists.filter(
        (element) => element.listName === "JerarquiaProducto"
      );
      const DescripcionCorta = lists.filter(
        (element) => element.listName === "DescripcionCorta"
      );
      try {
        if (GrupoArticulos.length > 0) {
          if (GrupoArtExterno.length > 0) {
            if (JerarquiaProducto.length > 0) {
              if (DescripcionCorta.length > 0) {
                setOptionsLists({
                  ...optionsLists,
                  shortDescription: DescripcionCorta[0].list[0].values,
                  productHierarchy: JerarquiaProducto[0].list[0].values,
                  articleGroupInternal: GrupoArticulos[0].list[0].values,
                  articleGroupExternal: GrupoArtExterno[0].list[0].values,
                });
              } else {
                printError("La lista Descripción Corta está vacía", 100);
              }
            } else {
              printError("La lista Jerarquía de Producto está vacía", 100);
            }
          } else {
            printError("La lista Grupo artículo Externo está vacía", 100);
          }
        } else {
          printError("La lista Grupo artículo UNSPSC está vacía", 100);
        }
      } catch (error) {
        printError("Ha ocurrido un error al consultar las listas en MDS", 100);
      }
    }
  }, [lists]);

  useEffect(() => {
    if (TypeMaterial.length > 0) {
      const listTypeMaterial = TypeMaterial.filter(
        (type) => type.id !== "Todos"
      );
      setOptionsLists({ ...optionsLists, typeMaterial: listTypeMaterial });
    }
  }, [TypeMaterial]);

  const validateForm = () => {
    const errors = {};
    Object.keys(initialState).map((key) => {
      errors[key] = validatorFromEdit(values[key], options)[key]();
    });
    setError(errors);
  };

  useEffect(() => {
    if (isSubmitting) {
      validateForm();
    }
  }, [isSubmitting]);

  useEffect(() => {
    getList();
    getTypeMaterial();
    getTypeResquetModify();
    if (location.pathname.split("/")[2] === "EditarModificacion") {
      setIsEdited(true);
    }
  }, []);

  const sendData = () => {
    try {
      let requestBody = {};
      if (!isEdited) {
        requestBody = {
          //DATA REQUEST
          typeRequest: values.typeRequest,
          internalNote: values.internalNote,
          observations: values.observations,
          mailSupport: values.checkboxEmail,
          typeMaterials: values.typeMaterial,
          statusMaterial: values.statusMaterial,
          shortDescription: values.shortDescription,
          hierarchyProducts: values.productHierarchy,
          codigoSap: parseInt(values.materialCode, 10),
          groupInternalArticle: values.articleGroupInternal,
          groupExternalArticle: values.articleGroupExternal,
          longDescription:
            source === "SAP"
              ? values.longDescription
              : values.longDescriptionForm,

          //INFO REQUEST
          stateId: 7,
          operation: 1,
          createdBy: currentUser,
          materialSource: source,
        };
      } else {
        requestBody = {
          typeRequest: values.typeRequest,
          internalNote: values.internalNote,
          observations: values.observations,
          mailSupport: values.checkboxEmail,
          typeMaterials: values.typeMaterial,
          statusMaterial: values.statusMaterial,
          shortDescription: values.shortDescription,
          hierarchyProducts: values.productHierarchy,
          codigoSap: parseInt(values.materialCode, 10),
          groupInternalArticle: values.articleGroupInternal,
          groupExternalArticle: values.articleGroupExternal,
          longDescription:
            source === "SAP"
              ? values.longDescription
              : values.longDescriptionForm,

          //INFO REQUEST
          id: id ? parseInt(id, 10) : 0,
          stateId: 7,
          operation: 2,
          modifiedBy: currentUser,
          materialSource: source,
        };
      }
      SaveMaterialNoCoreModify(requestBody);
    } catch (error) {
      printError(
        "Ha ocurrido un error al convertir el código SAP a un dato numérico",
        100
      );
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      const value = Object.values(error).every(
        (data) => data.length === 0 && data !== ""
      );
      if (value) {
        if (isEdited) {
          sendData();
        } else {
          if (values.typeRequest === "TS_03") {
            setMeenssage({
              error: false,
              title: "Creación modificación material",
              meenssage:
                "¿Está seguro de crear la solicitud de modificación y enviarla a Aprobación?",
            });
          } else {
            setMeenssage({
              error: false,
              title: "Creación modificación material",
              meenssage: "¿Está seguro de modificar el material?",
            });
          }
          setOpenModal(true);
        }
      }
    }
    setIsSubmitting(false);
  }, [error]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError(() => {
      const validations = validatorFromEdit(value, options);
      return { ...error, [name]: validations[name]() };
    });
    setOptions({ ...options, [name]: value });
  };

  const handleOnChangeCheckBox = (e) => {
    const { checked } = e.target;
    setValues({ ...values, checkboxEmail: checked });
  };

  const closeOpneModalSend = () => {
    setOpenModal(false);
  };

  const handleCloseSnack = () => {
    clear();
  };

  const handleOnClick = () => {
    GetMaterialForModification(values.materialCode);
  };

  const handleGoBack = () => {
    forceLoadUrl("/MaterialesNoCore/ConsultaModificacion");
  };

  const validate = () => {
    setBuildDescription(true);
    document.body.style.cursor = "wait";
    setTimeout(() => {
      setIsSubmitting(true);
      document.body.style.cursor = "default";
    }, 1000);
  };

  const handelConfirmSend = () => {
    if (modalError) {
      setOpenModal(false);
      setModalError(false);
      handleGoBack();
    } else {
      if (values.typeRequest === "TS_03") {
        setIsModifyMassive(true);
      }
      sendData();
    }
  };

  useEffect(() => {
    if (isModifyMassive) {
      const body = {
        CreateBy: currentUser,
        typeRequest: "TS_03",
        materialIds: [dataSaveMaterialNoCoreModify.data.id],
      };
      setCreateMaterialNoCoreModifyPackage(body);
    } else {
      if (dataSaveMaterialNoCoreModify.isSuccess) {
        setOpenModal(false);
        setSuccess(
          `${dataSaveMaterialNoCoreModify.returnMessage} Código material ${values.materialCode}`,
          100
        );
        setTimeout(() => {
          forceLoadUrl("/MaterialesNoCore/ConsultaModificacion");
        }, 10000);
      }
    }
  }, [dataSaveMaterialNoCoreModify]);

  useEffect(() => {
    if (Success) {
      if (isModifyMassive) {
        setOpenModal(false);
        setTimeout(() => {
          forceLoadUrl("/MaterialesNoCore/GestionSolicitudes");
        }, 10000);
      }
    }
  }, [Success]);

  useEffect(() => {
    if (Error) {
      setOpenModal(false);
    }
  }, [Error]);

  return (
    <>
      <NavBreadCrumb path={breadCrumb} />
      <div style={{ marginTop: "40px" }}>
        <span>
          <p className={classesFormStepOne.stepOne}>Modificación de material</p>
        </span>
        <span>
          <p className={classesFormStepOne.stepOneDescription}>
            Señor usuario a continuación por favor especifique el número de
            material que desea modificar y seleccione una o varias de las
            siguientes opciones. <br />
            En caso de que se requiera hacer modificaciones al Fabricante y/o
            parte número, Por favor indique el código del material tipo HERS
            asociado.
          </p>
        </span>
      </div>
      <div style={tableCss}>
        <Grid container spacing={2}>
          <Grid item xs={8} className="containerButtonModification">
            <div className="inputMod">
              <InputCustom
                max={11}
                type="number"
                maxLength={11}
                required={true}
                name={"materialCode"}
                showCharacters={true}
                onChange={handleOnChange}
                value={values.materialCode}
                errors={error.materialCode}
                lengthCharacters={values.materialCode}
                placeholder={"Ingrese el código del material"}
                label={"Ingrese el código del material que va a modificar"}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 11);
                }}
              />
            </div>
            <div
              className={`buttonMod ${
                error.materialCode.length > 0 ? "errorInput" : ""
              }`}
            >
              <Button
                variant="contained"
                onClick={handleOnClick}
                disabled={
                  isEdited
                    ? true
                    : values.materialCode.length >= 11
                    ? false
                    : true
                }
                className={`ButtonAcceptModification ${
                  isEdited
                    ? "disabledBtn"
                    : values.materialCode.length >= 11
                    ? ""
                    : "disabledBtn"
                }`}
              >
                Buscar material
              </Button>
            </div>
          </Grid>
          {showBoby && (
            <>
              <Grid item xs={12}>
                {showMaterialBlocked && (
                  <AlertMessage type={"Danger"} width={"60%"} />
                )}
              </Grid>
              <Grid item xs={4}>
                <SearchSelect
                  isRequired={true}
                  onChange={handleOnChange}
                  optionList={"typeRequest"}
                  label={"Tipo de solicitud"}
                  valueId={values.typeRequest}
                  placeholder={"Seleccione una categoría"}
                  listOpt={typeRequestModify}
                  errors={
                    error.typeRequest.length > 0 ? error.typeRequest[0] : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <SearchSelect
                  isRequired={true}
                  isDisabled={true}
                  label={"Tipo material"}
                  onChange={handleOnChange}
                  optionList={"typeMaterial"}
                  valueId={values.typeMaterial}
                  listOpt={optionsLists.typeMaterial}
                  placeholder={"Seleccione una categoría"}
                  errors={
                    error.typeMaterial.length > 0 ? error.typeMaterial[0] : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputCustom
                  disabled={true}
                  name={"statusMaterial"}
                  widthInput={"dis"}
                  value={values.statusMaterial}
                  label={"Status material para todos los centros"}
                />
              </Grid>
              <Grid item xs={12}>
                <SearchSelect
                  isDisabled={true}
                  isRequired={true}
                  onChange={handleOnChange}
                  name={"shortDescription"}
                  label={"Descripción corta"}
                  optionList={"shortDescription"}
                  valueId={values.shortDescription}
                  placeholder={"Seleccione una categoría"}
                  listOpt={optionsLists.shortDescription}
                  errors={
                    error.shortDescription.length > 0
                      ? error.shortDescription[0]
                      : ""
                  }
                />
              </Grid>
              {source === "SAP" && (
                <>
                  <Grid item xs={12}>
                    <strong>
                      Modificable para complementar o corregir información.
                    </strong>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <InputFieldCustom
                  required={true}
                  disabled={source !== "SAP" ? true : false}
                  name={"longDescription"}
                  label="Descripción larga"
                  onChange={handleOnChange}
                  value={values.longDescription}
                  errors={error.longDescription}
                  props={{
                    maxRows: 4,
                    multiline: true,
                    name: "longDescription",
                  }}
                />
              </Grid>
              {source !== "SAP" && (
                <>
                  <Grid item xs={12}>
                    <strong>
                      Modificable para complementar o corregir información.
                    </strong>
                  </Grid>
                  <Grid item xs={12}>
                    {showLong && (
                      <LongDescriptionModify
                        isEdited={isEdited}
                        setBuild={buildDescription}
                        initBuild={() => setBuildDescription(false)}
                        arrayLongDescription={descripcionLargaDetalle}
                        setLongDescription={(long) => {
                          setValues({ ...values, longDescriptionForm: long });
                        }}
                      />
                    )}
                  </Grid>
                </>
              )}
              <Grid item xs={12} className="textEmail">
                Recuerde que para solicitudes de corrección de texto ampliado es
                necesario enviar soportes (Fichas técnicas, manuales, etc.) al
                buzón {emailSupport} que permitan la validación de la corrección
                de los valores ingresados previamente.
                <strong>
                  Por favor en el asunto del correo relacione el número de
                  ticket de la solicitud y el ID del material al que asocia el
                  soporte.
                </strong>
              </Grid>
              <Grid item xs={12}>
                <CheckboxCommon
                  label={"Se envían soportes a correo"}
                  checked={values.checkboxEmail}
                  handleChange={handleOnChangeCheckBox}
                  color="red"
                />
              </Grid>
              {source === "SAP" && (
                <>
                  <Grid item xs={12}>
                    <AlertMessage width={"100%"} type={"Warning"} />
                  </Grid>
                  <Grid item xs={12}>
                    <HelperDescriptionLong
                      helperDescriptionLong={helperDescriptionLong}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={4}>
                <SearchSelect
                  isRequired={true}
                  onChange={handleOnChange}
                  name={"articleGroupInternal"}
                  label={"Grupo de artículos UNSPSC"}
                  optionList={"articleGroupInternal"}
                  valueId={values.articleGroupInternal}
                  placeholder={"Seleccione una categoría"}
                  listOpt={optionsLists.articleGroupInternal}
                  errors={
                    error.articleGroupInternal.length > 0
                      ? error.articleGroupInternal[0]
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <SearchSelect
                  isRequired={true}
                  onChange={handleOnChange}
                  name={"articleGroupExternal"}
                  optionList={"articleGroupExternal"}
                  label={"Grupo de artículos externo"}
                  valueId={values.articleGroupExternal}
                  placeholder={"Seleccione una categoría"}
                  listOpt={optionsLists.articleGroupExternal}
                  errors={
                    error.articleGroupExternal.length > 0
                      ? error.articleGroupExternal[0]
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <SearchSelect
                  isRequired={true}
                  onChange={handleOnChange}
                  name={"productHierarchy"}
                  label={"Jerarquia de productos"}
                  optionList={"productHierarchy"}
                  valueId={values.productHierarchy}
                  listOpt={optionsLists.productHierarchy}
                  placeholder={"Seleccione una categoría"}
                  errors={
                    error.productHierarchy.length > 0
                      ? error.productHierarchy[0]
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <InputFieldCustom
                  max="900"
                  required={true}
                  label="Nota interna"
                  name={"internalNote"}
                  onChange={handleOnChange}
                  showCharacterLength={true}
                  errors={error.internalNote}
                  value={values.internalNote}
                  placeholder="Ingresa las características especiales del producto que no están dentro de la descripción larga"
                  props={{
                    rows: 3,
                    maxRows: 3,
                    multiline: true,
                    name: "internalNote",
                  }}
                />
              </Grid>
              <Grid item xs={12} className="textEmail">
                <strong>Nota:</strong> En caso de requerir modificaciones
                adicionales a las mostradas anteriormente por favor detállelas
                en el campo observaciones que se muestra a continuación
              </Grid>
              <Grid item xs={12}>
                <InputFieldCustom
                  max="500"
                  required={true}
                  name={"observations"}
                  onChange={handleOnChange}
                  showCharacterLength={true}
                  errors={error.observations}
                  value={values.observations}
                  label="Observación acerca de la solicitud"
                  props={{
                    rows: 6,
                    maxRows: 6,
                    multiline: true,
                    name: "",
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
        <div className="ContainerDetailButtons">
          <Grid className="containerBtnTwo">
            <Grid className="col-btn">
              <Grid
                className="ContainerDetailButtons__items"
                style={{ paddingRight: "1.5cm" }}
              >
                <Button
                  className={`ButtonCancelFooter btn`}
                  onClick={() => {
                    setModalError(true);
                    setOpenModal(true);

                    setMeenssage({
                      error: true,
                      title: "Cambios pendientes por guardar",
                      meenssage: "¿Desea salir?",
                    });
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid className="ContainerDetailButtons__items">
                <Button className={`ButtonNextFooter btn`} onClick={validate}>
                  {isEdited
                    ? "Guardar"
                    : values.typeRequest === "TS_03"
                    ? "Enviar"
                    : "Guardar"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <ModalCusntomModifi
        goBack={modalError}
        openModal={openModal}
        error={meenssage.error}
        titleModal={meenssage.title}
        bodyText={meenssage.meenssage}
        handleClose={closeOpneModalSend}
        handelConfirm={handelConfirmSend}
      />
      <SnackBarCommon
        time={Time}
        error={Error}
        success={Success}
        errorMessage={MessageError}
        successMessage={MessageSuccess}
        handleCloseSnack={handleCloseSnack}
      />
    </>
  );
};
