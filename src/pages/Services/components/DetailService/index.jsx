import * as React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import schema from "../../../../utils/schemas/Detail.schema";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HeaderContext from "../../../../context/Header/headerContext";
import { titleWizardServices } from "../CreateEditService/constants";
import { ModalHistory, ModalCustom } from "../../../Materials/widgets";
import ServicesContext from "../../../../context/Services/servicesContext";
import { NavBreadCrumb, SnackBarCommon } from "../../../../sharedComponents";

let dataDetail;

const initialState = {
  stateId: "",
  typeCauses: "",
  observations: "",
};

export const DetailService = () => {
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
  //---SERVICES
  const servicesContext = useContext(ServicesContext);

  //OBTENER LISTAS DE MDS
  const { getDataByCompany, ListsMDS } = servicesContext;

  //OBTENER HISTORIAL DE LA SOLICITUD
  const { getHistoryById, historyById } = servicesContext;

  //OBTENER CAUSES
  const { getCauses, listCauses } = servicesContext;

  // // METODO PARA APROBAR O RECHZAR/DEVOLVER
  const { setStateService } = servicesContext;

  //Manejar Errores
  const {
    Time,
    clear,
    Error,
    Success,
    setError,
    MessageError,
    MessageSuccess,
  } = servicesContext;

  if (Success || Error) {
    setTimeout(() => {
      history.push("/Materiales/ServiciosConsultar");
      clear();
    }, Time);
  }

  //----HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //ReactContext  ****************************************************************>

  //******************************************************** UseEffects

  useEffect(() => {
    clear();
    return () => {
      clear();
    };
  }, []);

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
    if (stateRequest.stateId === 2) {
      const dataState = {
        serviceId: state.id,
        stateId: stateRequest.stateId,
        createdBy: currentUser.createdBy,
        observation: stateRequest.observations,
      };
      setStateService(dataState);
    } else {
      const dataState = {
        serviceId: state.id,
        stateId: stateRequest.stateId,
        causeId: stateRequest.typeCauses,
        createdBy: currentUser.createdBy,
        observation: stateRequest.observations,
      };
      setStateService(dataState);
    }
  };

  /*Al montarse el componente se consulta 
  el historial de la solicitud*/
  useEffect(() => {
    if (state) {
      getHistoryById(state.id);
      getDataByCompany(state.company === "Ecopetrol" ? "E" : "R");
    } else {
      setError(
        "No hay información para mostrar. ¡Por favor intentalo de nuevo!",
        5000
      );
    }
  }, [state]);

  /* SE VALIDAN LOS ROLES Y PERMISOS */
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleService = responseData.filter(
        (module) => module.moduleOrder === 4
      );
      const isEdit = moduleService[0].subModules.some(
        (element) => element.code === "DMM_U_SVC"
      );
      const isApprover = moduleService[0].subModules.some(
        (element) => element.code === "DMM_AP_SVC"
      );
      if (isEdit) {
        setIsEditable(true);
      }
      if (isApprover) {
        setIsApprover(true);
      }
      setCurrentUser({
        createdBy: moduleService[0].userId,
      });
    }
  }, [responseData]);

  //Se consultan y se validan las listas de MDS
  useEffect(() => {
    try {
      if (ListsMDS !== undefined) {
        if (ListsMDS.length) {
          ListsMDS.map((list) => {
            if (list.listName === "TipoMaterialServicio") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.serviceType
              );
              if (newValue !== undefined) {
                const textValue = newValue.name;
                dataDetail = { ...dataDetail, serviceType: textValue };
              }
            }
            if (list.listName === "AreaNegocio") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.businessArea
              );
              if (newValue !== undefined) {
                const textValue = newValue.name;
                dataDetail = { ...dataDetail, businessArea: textValue };
              }
            }
            if (list.listName === "Centro") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.center
              );
              if (newValue !== undefined) {
                const textValue = newValue.name;
                dataDetail = { ...dataDetail, center: textValue };
              }
            }
            if (list.listName === "GrupoMateriales1") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.materialGroup1
              );
              if (newValue !== undefined) {
                const textValue = newValue.name;
                dataDetail = { ...dataDetail, materialGroup1: textValue };
              }
            }
            if (list.listName === "GrupoMateriales2") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.materialGroup2
              );
              if (newValue !== undefined) {
                const textValue = newValue.name;
                dataDetail = { ...dataDetail, materialGroup2: textValue };
              }
            }
            if (list.listName === "GrupoImputacionMateriales") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.materialImputationGroup
              );
              if (newValue !== undefined) {
                const textValue = newValue.name;
                dataDetail = {
                  ...dataDetail,
                  materialImputationGroup: textValue,
                };
              }
            }
            if (list.listName === "GrupoComisiones") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.commissionGroup
              );
              if (newValue !== undefined) {
                const textValue = newValue.name;
                dataDetail = { ...dataDetail, commissionGroup: textValue };
              }
            }
            if (list.listName === "CentroBeneficio") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.beneficCenter
              );
              if (newValue !== undefined) {
                const textValue = newValue.name;
                dataDetail = { ...dataDetail, beneficCenter: textValue };
              }
            }

            //DEPENDE DE SERVICE TYPE
            if (list.listName === "Sector") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.serviceType
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.sector
                );
                if (subValues !== undefined) {
                  const textValue = subValues.name;
                  dataDetail = { ...dataDetail, sector: textValue };
                }
              }
            }
            if (list.listName === "UnidadMedidaBase") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.serviceType
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.baseUnitMeasure
                );
                if (subValues !== undefined) {
                  const textValue = subValues.name;
                  dataDetail = { ...dataDetail, baseUnitMeasure: textValue };
                }
              }
            }

            //SOLO REFICAR
            if (state.company === "Reficar") {
              if (list.listName === "GrupoArticulos") {
                const newValue = list.list[0].values.find(
                  (data) => data.id === state.serviceType
                );
                if (newValue !== undefined) {
                  const subValues = newValue.subValues.find(
                    (element) => element.id === state.articleGroup
                  );
                  if (subValues !== undefined) {
                    const textValue = subValues.name;
                    dataDetail = { ...dataDetail, articleGroup: textValue };
                  }
                }
              }
              if (list.listName === "GrupoTransporte") {
                const newValue = list.list[0].values.find(
                  (data) => data.id === state.transportGroup
                );
                if (newValue !== undefined) {
                  const textValue = newValue.name;
                  dataDetail = { ...dataDetail, transportGroup: textValue };
                }
              }
              if (list.listName === "GrupoCarga") {
                const newValue = list.list[0].values.find(
                  (data) => data.id === state.loadGroup
                );
                if (newValue !== undefined) {
                  const textValue = newValue.name;
                  dataDetail = { ...dataDetail, loadGroup: textValue };
                }
              }
            }

            //SOLO ECOPETROL
            if (state.company === "Ecopetrol") {
              if (list.listName === "GrupoMateriales") {
                const newValue = list.list[0].values.find(
                  (data) => data.id === state.materialGroup
                );
                if (newValue !== undefined) {
                  const textValue = newValue.name;
                  dataDetail = { ...dataDetail, materialGroup: textValue };
                }
              }
              if (list.listName === "GrupoPorteMaterial") {
                const newValue = list.list[0].values.find(
                  (data) => data.id === state.materialCarryingGroup
                );
                if (newValue !== undefined) {
                  const textValue = newValue.name;
                  dataDetail = {
                    ...dataDetail,
                    materialCarryingGroup: textValue,
                  };
                }
              }
            }

            //DEPENDE DE OTRAS LISTAS
            if (list.listName === "OrganizacionVentas") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.sector
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.salesOrganization
                );
                if (subValues !== undefined) {
                  const textValue = subValues.name;
                  dataDetail = { ...dataDetail, salesOrganization: textValue };
                }
              }
            }
            if (list.listName === "CanalDistribucion") {
              const newValue = list.list[0].values.find(
                (data) => data.id === state.sector
              );
              if (newValue !== undefined) {
                const subValues = newValue.subValues.find(
                  (element) => element.id === state.distributionChannel
                );
                if (subValues !== undefined) {
                  const textValue = subValues.name;
                  dataDetail = {
                    ...dataDetail,
                    distributionChannel: textValue,
                  };
                }
              }
            }
          });
          setValues({ ...state, ...dataDetail });
        }
      }
    } catch (error) {
      setError(
        "Ha ocurrido un error al consultar información en MDS. ¡Intenta más tarde!",
        5000
      );
    }
  }, [ListsMDS]);

  //******************************************************** UseEffects

  //Functions
  const goBack = () => {
    history.goBack();
  };
  const handleCloseSnack = () => {
    clear();
    history.push("/Materiales/ServiciosConsultar");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    document.location.reload();
    setOpen(false);
  };
  const handleClickOpenHistory = () => {
    setOpenHistory(true);
  };
  const handleCloseHistory = () => {
    setOpenHistory(false);
  };

  const handleEdit = (item) => {
    history.push({
      pathname: "/Materiales/ServiciosModificar",
      state: item,
    });
  };

  /*****************************************************************/

  const navBreadCrumbArrayList = [
    { path: "/", active: "", word: "Inicio" },
    {
      path: "/Materiales/ServiciosConsultar",
      active: "",
      word: "Gestión servicios",
    },
    {
      path: "#",
      active: "BreadCrumb__link--active",
      word: "Detalle servicio",
    },
  ];

  const showValue = (value) => {
    if (value) {
      return value;
    } else {
      return "Sin información";
    }
  };

  const transformTax = (tax) => {
    if (tax !== undefined) {
      if (ListsMDS !== undefined) {
        const Impuesto = ListsMDS.filter(
          (element) => element.listName === "ImpuestoSinFiltro"
        );
        const ClasificacionFiscal = ListsMDS.filter(
          (element) => element.listName === "ClasificacionFiscalSinFiltro"
        );
        let nameTax = [];
        tax.map((data) => {
          const TipoImpuesto = Impuesto[0].list[0].values.filter(
            (e) => e.id === data.TipoImpuesto
          );
          const Clasificacion = ClasificacionFiscal[0].list[0].values.filter(
            (e) => e.id === data.TipoImpuesto
          );
          if (Clasificacion.length) {
            const Fiscal = Clasificacion[0].subValues.filter(
              (e) => e.id === data.ClasificacionFiscal
            );
            nameTax.push({
              TipoImpuesto: TipoImpuesto[0].name,
              Clasificacion: Fiscal[0].name,
            });
          }
        });
        return nameTax;
      }
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
          <h3 className="eco_titulo_tabla">Detalle servicio</h3>

          <div className="ContainerDetail">
            <div className="HeaderDetail">
              <h4>Datos de encabezado</h4>
              <div className="col-detail">
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
                    <h6>Estado</h6>
                    <p>{showValue(values.stateName)}</p>
                  </div>
                  <div className="HeaderDetail__item">
                    <h6>Tipo material</h6>
                    <p>{showValue(values.serviceType)}</p>
                  </div>
                </div>
                <div className="row-detail">
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
                  <h4>{titleWizardServices[0].name}</h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Área de negocio</label>
                      <div className={"contentField"}>
                        {showValue(values.businessArea)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Section">
                  <h4>{titleWizardServices[1].name}</h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Centro</label>
                      <div className={"contentField"}>
                        {showValue(values.center)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Sector</label>
                      <div className={"contentField"}>
                        {showValue(values.sector)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">
                        Organización de ventas
                      </label>
                      <div className={"contentField"}>
                        {showValue(values.salesOrganization)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Canal distribución</label>
                      <div className={"contentField"}>
                        {showValue(values.distributionChannel)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Section">
                  <h4>{titleWizardServices[2].name}</h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Nombre del servicio</label>
                      <div className={"contentField"}>
                        {showValue(values.serviceName)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Unidad medida base</label>
                      <div className={"contentField"}>
                        {showValue(values.baseUnitMeasure)}
                      </div>
                    </div>
                    {state.company === "Reficar" && (
                      <div className="groupField">
                        <label className="titleField">Grupo artículos</label>
                        <div className={"contentField"}>
                          {showValue(values.articleGroup)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="Section">
                  <h4>{titleWizardServices[3].name}</h4>
                  <div className="Fields">
                    <div className="groupField">
                      <label className="titleField">Impuestos</label>
                      <div className={"contentTax"}>
                        <table className="table">
                          <thead className="table__header">
                            <tr>
                              <th scope="col">Tipo impuesto</th>
                              <th scope="col">Clasificación fiscal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transformTax(values.ArrayTax) &&
                              transformTax(values.ArrayTax).map(
                                (data, index) => (
                                  <tr index={index} key={index}>
                                    <td>{data.TipoImpuesto}</td>
                                    <td>{data.Clasificacion}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Section">
                  <h4>{titleWizardServices[4].name}</h4>
                  <div className="Fields">
                    {state.company === "Ecopetrol" && (
                      <div className="groupField">
                        <label className="titleField">Grupo materiales</label>
                        <div className={"contentField"}>
                          {showValue(values.materialGroup)}
                        </div>
                      </div>
                    )}
                    <div className="groupField">
                      <label className="titleField">Grupo materiales 1</label>
                      <div className={"contentField"}>
                        {showValue(values.materialGroup1)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Grupo materiales 2</label>
                      <div className={"contentField"}>
                        {showValue(values.materialGroup2)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">
                        Grupo imputación materiales
                      </label>
                      <div className={"contentField"}>
                        {showValue(values.materialImputationGroup)}
                      </div>
                    </div>
                    <div className="groupField">
                      <label className="titleField">Grupo de comisiones</label>
                      <div className={"contentField"}>
                        {showValue(values.commissionGroup)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Section">
                  <h4>{titleWizardServices[5].name}</h4>
                  <div className="Fields">
                    {state.company === "Ecopetrol" && (
                      <div className="groupField">
                        <label className="titleField">
                          Grupo porte material
                        </label>
                        <div className={"contentField"}>
                          {showValue(values.materialCarryingGroup)}
                        </div>
                      </div>
                    )}
                    {state.company === "Reficar" && (
                      <>
                        <div className="groupField">
                          <label className="titleField">Grupo transporte</label>
                          <div className={"contentField"}>
                            {showValue(values.transportGroup)}
                          </div>
                        </div>
                        <div className="groupField">
                          <label className="titleField">Grupo carga</label>
                          <div className={"contentField"}>
                            {showValue(values.loadGroup)}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="groupField">
                      <label className="titleField">Centro beneficio</label>
                      <div className={"contentField"}>
                        {showValue(values.beneficCenter)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Section">
                  <h4>{titleWizardServices[6].name}</h4>
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
                            onClick={() => handleEdit(state)}
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
            module={"service"}
            dataHistory={historyById}
            handleClose={handleCloseHistory}
          />
          <ModalCustom
            open={open}
            schema={schema}
            maxWidth={"md"}
            fullWidth={true}
            typeModule="service"
            hasApprove={hasApprove}
            listCauses={listCauses}
            handleCauses={getCauses}
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
