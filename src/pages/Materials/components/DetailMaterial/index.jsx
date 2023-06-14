import * as React from "react";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ModalHistory, ModalCustom } from "../../widgets";
import { TITLES_WIZARD } from "../CreateMaterial/constants";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import schema from "../../../../utils/schemas/detailMaterial.schema";
import HeaderContext from "../../../../context/Header/headerContext";
import MaterialContext from "../../../../context/Materials/materialContext";
import { NavBreadCrumb, SnackBarCommon } from "../../../../sharedComponents";
import { StorageLogisticCenter } from "../../widgets";

const initialState = {
  stateId: "",
  observations: "",
};

let dataDetail;

const dataCenterStoreList=[
  {
      logisticCenter: "1 - LAGER 0001",
      id: "1_E",
      subrows: [
          {
              store: "88 - LAGER 0088 (WM)",
              id: "88_1_E"
          },
          {
              store: "100 - LAGERORT WM&HU",
              id: "100_1_E"
          }
      ]
  },
  {
      logisticCenter: "1002 - PR PROVINCIA",
      id: "1002_E",
      subrows: [
          {
              store: "H001 - HERRAMIENTAS",
              id: "H001_1002_E"
          },
          {
              store: "I001 - IMPORTADOS",
              id: "I001_1002_E"
          },
          {
              store: "G001 - GENERAL",
              id: "G001_1002_E"
          }
      ]
  }
];

export const DetailMaterial = () => {
  //HISTORY Y STATE CON EL ITEM DE LA SOLICITUD
  const history = useHistory();
  const { location } = history;
  const { state } = location;

  //State
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [isApprover, setIsApprover] = useState(false);
  const [hasApprove, setHasApprove] = useState(false);
  const [stateRequest, setStateRequest] = useState({});
  const [openHistory, setOpenHistory] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    createdBy: 0,
  });

  //ReactContext  ****************************************************************>
  //---MATERIALES
  const materialContext = useContext(MaterialContext);

  //OBTENER HISTORIAL DE LA SOLICITUD
  const { getHistoryById, historyById } = materialContext;

  //OBTENER LISTAS DE MDS
  const { getDataByCompany, LIST_MDS } = materialContext;

  // METODO PARA APROBAR O RECHZAR/DEVOLVER
  const { setStateMaterial } = materialContext;

  //Manejar Errores
  const { clear, Error, Success, setError, MessageError, MessageSuccess } =
    materialContext;

  if (Success || Error) {
    setTimeout(() => {
      clear();
      history.push("/Materiales/Consultar");
    }, 8000);
  }

  //----HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //ReactContext  ****************************************************************>

  useEffect(() => {
    clear();
  }, []);

  /*Al montarse el componente se consulta 
  el historial de la solicitud*/
  useEffect(() => {
    if (state) {
      getHistoryById(state.id);
      getDataByCompany(state.company === "Ecopetrol" ? "E" : "R");
    } else {
      setError(
        "No hay información para mostrar. ¡Por favor intentalo de nuevo!"
      );
    }
  }, [state]);

  useEffect(() => {
    if (
      Object.values(stateRequest).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      saveState();
      setOpen(false);
    }
  }, [stateRequest]);

  //METODO PARA APROBAR O RECHAZAR/DEVOLVER
  const saveState = () => {
    const dataState = {
      materialId: state.id,
      stateId: stateRequest.stateId,
      createdBy: currentUser.createdBy,
      observation: stateRequest.observations,
    };
    setStateMaterial(dataState);
  };

  /* SE VALIDAN LOS ROLES Y PERMISOS */
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 4
      );
      const havePermission = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_R_MTR"
      );
      if (!havePermission) {
        alert("No tiene permiso");
        history.push("/");
      }
      const isEdit = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_U_MTR"
      );
      const isApprover = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_AP_MTR"
      );
      if (isEdit) {
        setIsEditable(true);
      }
      if (isApprover) {
        setIsApprover(true);
      }

      setCurrentUser({
        createdBy: moduleMaterials[0].userId,
      });
    }
  }, [responseData]);

  useEffect(() => {
    try {
      if (LIST_MDS !== undefined) {
        if (LIST_MDS.length) {
          LIST_MDS.map((e) => {
            if (e.listName === "AreaNegocio") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.businessArea
              );
              if (newValue !== undefined) {
                const textValue = newValue.id + " - " + newValue.name;
                dataDetail = { ...dataDetail, businessArea: textValue };
              }
            }
            if (e.listName === "ProductoPadre") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.productFather
              );
              if (newValue !== undefined) {
                const textValue = newValue.id + " - " + newValue.name;
                dataDetail = { ...dataDetail, productFather: textValue };
              }
            }
            if (e.listName === "GrupoConversion") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.conversionGroup
              );
              if (newValue !== undefined) {
                const textValue = newValue.id + " - " + newValue.name;
                dataDetail = { ...dataDetail, conversionGroup: textValue };
              }
            }
            if (e.listName === "TipoMaterial") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.materialType
              );
              if (newValue !== undefined) {
                const textValue = newValue.id + " - " + newValue.name;
                dataDetail = { ...dataDetail, materialType: textValue };
              }
            }
            if (e.listName === "Centro") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.center
              );
              if (newValue !== undefined) {
                const textValue = newValue.id + " - " + newValue.name;
                dataDetail = { ...dataDetail, center: textValue };
              }
            }
            if (e.listName === "CentroBeneficio") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.benefitCenter
              );
              if (newValue !== undefined) {
                const textValue = newValue.id + " - " + newValue.name;
                dataDetail = { ...dataDetail, benefitCenter: textValue };
              }
            }
            if (e.listName === "UnidadMedidaBase") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.materialType
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.baseUnitMeasure
                );
                if (subValues !== undefined) {
                  const textValue = subValues.id + " - " + subValues.name;
                  dataDetail = { ...dataDetail, baseUnitMeasure: textValue };
                }
              }
            }
            if (e.listName === "GrupoCompras") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.materialType
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.shoppingGroup
                );
                if (subValues !== undefined) {
                  const textValue = subValues.id + " - " + subValues.name;
                  dataDetail = { ...dataDetail, shoppingGroup: textValue };
                }
              }
            }
            if (e.listName === "GrupoArticulos") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.materialType
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.articleGroup
                );
                if (subValues !== undefined) {
                  const textValue = subValues.id + " - " + subValues.name;
                  dataDetail = { ...dataDetail, articleGroup: textValue };
                }
              }
            }
            if (e.listName === "CategoríaValoración") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.materialType
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.ratingCategory
                );
                if (subValues !== undefined) {
                  const textValue = subValues.id + " - " + subValues.name;
                  dataDetail = { ...dataDetail, ratingCategory: textValue };
                }
              }
            }
            if (e.listName === "Sector") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.materialType
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.sector
                );
                if (subValues !== undefined) {
                  const textValue = subValues.id + " - " + subValues.name;
                  dataDetail = { ...dataDetail, sector: textValue };
                }
              }
            }
            if (e.listName === "Almacen") {
              const newValue = e.list[0].values.find(
                (data) => data.id === state.center
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.store
                );
                if (subValues !== undefined) {
                  const textValue = subValues.id + " - " + subValues.name;
                  dataDetail = { ...dataDetail, store: textValue };
                }
              }
            }
          });
          setValues({ ...state, ...dataDetail });
        }
      }
    } catch (error) {
      setError(
        "Ha ocurrido un error al consultar información en MDS. ¡Intenta más tarde!"
      );
    }
  }, [LIST_MDS]);

  //FUNCIONES
  const goBack = () => {
    history.goBack();
  };
  const handleClose = () => {
    document.location.reload();
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseHistory = () => {
    setOpenHistory(false);
  };
  const handleClickOpenHistory = () => {
    setOpenHistory(true);
  };
  const handleCloseSnack = () => {
    clear();
    history.push("/Materiales/Consultar");
  };
  const handleDetail = (item) => {
    history.push({
      pathname: "/Materiales/Modificar",
      state: item,
    });
  };

  /*****************************************************************/

  const navBreadCrumbArrayList = [
    { path: "/", active: "", word: "Inicio" },
    {
      path: "/Materiales/Consultar",
      active: "",
      word: "Gestión materiales",
    },
    {
      path: "#",
      active: "BreadCrumb__link--active",
      word: "Detalle material",
    },
  ];

  const showValue = (value) => {
    if (value) {
      return value;
    } else {
      return "Sin información";
    }
  };

  /* ********************************** RETURN ***************************** */
  return (
    <>
      {state ? (
        <>
          <NavBreadCrumb path={navBreadCrumbArrayList} />
          <Button
            color="primary"
            onClick={goBack}
            variant="outlined"
            className="goBackButton"
            startIcon={<ArrowBackIosIcon />}
          >
            Regresar
          </Button>
          <br />
          <br />
          <h3 className="eco_titulo_tabla">Detalle material</h3>
          <div className="ContainerDetail">
            <div className="HeaderDetail">
              <h4>Datos de encabezado</h4>
              <div className="col-detail">
              <Grid container spacing={4}>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
              </Grid>
                <div className="row-detail">
                  <div className="HeaderDetail__item">
                    <h6>Nro solicitud</h6>
                    <p className="">{showValue(values.id)}</p>
                  </div>
                  <div className="HeaderDetail__item">
                    <h6>Empresa</h6>
                    <p>{showValue(values.company)}</p>
                  </div>
                  <div className="HeaderDetail__item">
                    <h6>Ramo</h6>
                    <p>{showValue(values.department)}</p>
                  </div>
                </div>
                <div className="row-detail">
                  <div className="HeaderDetail__item">
                    <h6>Estado</h6>
                    <p>{showValue(values.stateName)}</p>
                  </div>
                  <div className="HeaderDetail__item">
                    <h6>Fecha de creación</h6>
                    <p>
                      {values.dateCreatedFormat
                        ? values.dateCreatedFormat
                        : "Sin fecha"}
                    </p>
                  </div>
                  <div className="HeaderDetail__item">
                    <h6>Fecha de modificación</h6>
                    <p>
                      {values.lastModifiedFormat
                        ? values.lastModifiedFormat
                        : "Sin fecha"}
                    </p>
                  </div>
                </div>
                <div  className="row-detail">
                <div className="HeaderDetail__item">
                    <h6>Solicitante</h6>
                    <p>{values.userName ? values.userName : "Sin asignar"}</p>
                  </div>
                  <div className="HeaderDetail__item">
                    <h6>Aprobador</h6>
                    <p>
                      {values.approverName
                        ? values.approverName
                        : "Sin asignar"}
                    </p>
                  </div>
                  <div className="HeaderDetail__item"></div>
                </div>
              </div>
              <div className="col-detail__button">
                <div className="col-btn">
                  <div className="ContainerDetailButtons__items">
                    <Button
                      className={`ButtonAccept`}
                      onClick={handleClickOpenHistory}
                    >
                      Ver histórico
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="Detalle">
              <div className="ContainerDetailForm">
                <div className="Section">
                  <h4>{TITLES_WIZARD[0].name}</h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Proceso de negocio</label>
                      <div className={"contentField"}>
                        {showValue(values.businessProcess)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Tipo de material</label>
                      <div className={"contentField"}>
                        {showValue(values.materialType)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Nombre del material</label>
                      <div className={"contentField"}>
                        {showValue(values.materialName)}
                      </div>
                    </div>                  
                  </div>
                </div>
                <div className="Section">
                  <h4>{TITLES_WIZARD[1].name}</h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Área de negocio</label>
                      <div className={"contentField"}>
                        {showValue(values.businessArea)}
                      </div>
                    </div> 
                    <div className="groupField">
                      <label className="titleField">Grupo conversión</label>
                      <div className={"contentField"}>
                        {showValue(values.conversionGroup)}
                      </div>
                    </div> 
                    <div className="groupField">
                        <label className="titleField">Grupo artículos</label>
                        <div className={"contentField"}>
                          {showValue(values.articleGroup)}
                        </div>
                      </div>
                    {state.company === "Ecopetrol" ? (
                        <div className="groupField">
                          <label className="titleField">Sector</label>
                          <div className={"contentField"}>
                            {showValue(values.sector)}
                          </div>
                        </div>
                      ) : (
                        state.materialType === "FERT_R" && (
                          <div className="groupField">
                            <label className="titleField">Sector</label>
                            <div className={"contentField"}>
                              {showValue(values.sector)}
                            </div>
                          </div>
                        )
                      )}
                      <div className="groupField">
                        <label className="titleField">
                          Unidad de medida base
                        </label>
                        <div className={"contentField"}>
                          {showValue(values.baseUnitMeasure)}
                        </div>
                      </div>
                      <div className="groupField">
                      <label className="titleField">Producto padre</label>
                      <div className={"contentField"}>
                        {showValue(values.productFather)}
                      </div>
                    </div> 
                  </div>
                </div>
                <div className="Section">
                  <h4>{TITLES_WIZARD[2].name}</h4>
                  {/* <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Centro</label>
                      <div className={"contentField"}>
                        {showValue(values.center)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Almacén</label>
                      <div className={"contentField"}>
                        {showValue(values.store)}
                      </div>
                    </div>
                  </div> */}
            <StorageLogisticCenter
              titleColumns={["Centro logístico", "Código", "No almacenes"]}
              titleSubColumns={["Almacén", "Código"]}
              rows = {dataCenterStoreList}
              handleDelete = {()=>{}}
              disable = {true}
           ></StorageLogisticCenter>

                </div>
                <div className="Section">
                  <h4>
                    {TITLES_WIZARD[3].name}
                  </h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Grupo de compras</label>
                      <div className={"contentField"}>
                        {showValue(values.shoppingGroup)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Section">
                  <h4>
                    {TITLES_WIZARD[4].name}
                  </h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Centro de beneficio</label>
                      <div className={"contentField"}>
                        {showValue(values.benefitCenter)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Section">
                  <h4>{TITLES_WIZARD[5].name}</h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Categoría valoración</label>
                      <div className={"contentField"}>
                        {showValue(values.ratingCategory)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Precio estándar</label>
                      <div className={"contentField"}>
                        {showValue(values.standardPrice)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Section">
                  <h4>{TITLES_WIZARD[6].name}</h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Observaciones</label>
                      <div className={"contentObservation"}>
                        {showValue(values.observations)}
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
              <div className="ContainerDetailButtons">
                <div className="containerBtn">
                  <div className="col-btn">
                    <div className="ContainerDetailButtons__items">
                      <Button className={`ButtonCancel`} onClick={goBack}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                  <div className="col-btn">
                    {isApprover && state.stateId === 1 && (
                      <>
                        <div className="ContainerDetailButtons__items">
                          <Button
                            className={`ButtonCancel`}
                            onClick={() => {
                              handleClickOpen();
                              setHasApprove(false);
                            }}
                          >
                            Rechazar / devolver
                          </Button>
                        </div>
                        <div className="ContainerDetailButtons__items">
                          <Button
                            className={`ButtonAccept`}
                            onClick={() => {
                              handleClickOpen();
                              setHasApprove(true);
                            }}
                          >
                            Aprobar
                          </Button>
                        </div>
                      </>
                    )}
                    {state.createdBy === currentUser.createdBy &&
                      isEditable &&
                      state.stateId === 4 && (
                        <div className="ContainerDetailButtons__items">
                          <Button
                            className={`ButtonAccept`}
                            onClick={() => handleDetail(state)}
                          >
                            Modificar
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ModalHistory
            id={state.id}
            open={openHistory}
            module={"material"}
            dataHistory={historyById}
            handleClose={handleCloseHistory}
          />
          <ModalCustom
            open={open}
            schema={schema}
            maxWidth={"md"}
            fullWidth={true}
            typeModule="material"
            hasApprove={hasApprove}
            handleClose={handleClose}
            initialState={initialState}
            setStateRequest={setStateRequest}
          />
        </>
      ) : (
        <div className="noDataDetail">
          <p>No hay información para mostrar</p>
        </div>
      )}
      <SnackBarCommon
        time="5000"
        error={Error}
        success={Success}
        errorMessage={MessageError}
        successMessage={MessageSuccess}
        handleCloseSnack={handleCloseSnack}
      />
    </>
  );
};
