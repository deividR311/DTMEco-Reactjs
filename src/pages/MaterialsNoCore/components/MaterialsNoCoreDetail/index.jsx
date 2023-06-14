import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { ModalHistory } from "./ModalHistory";
import { stateGuradado } from "../../constants";
import { Button, Grid } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { ModalCustom } from "../../../Materials/widgets";
import schema from "../../../../utils/schemas/Detail.schema";
import HeaderContext from "../../../../context/Header/headerContext";
import { NavBreadCrumb, SnackBarCommon } from "../../../../sharedComponents";
import { InputFieldCustom } from "../DraftMaterialNoCore/components/CustomInput";
import MaterialNoCore from "../../../../context/MaterialsNoCore/materialsNoCoreContext";

const initialState = {
  stateId: "",
  typeCauses: "",
  observations: "",
};

export const MaterialsNoCoreDetail = () => {
  const { id } = useParams();

  //HISTORY Y STATE CON EL ITEM DE LA SOLICITUD
  const history = useHistory();

  //CONTEXT MATERIAL NO CORE
  const materialNoCore = useContext(MaterialNoCore);
  const { getMaterialNoCoreDetail, materialNoCoreDetail } = materialNoCore;

  useEffect(() => {
    if (id) {
      getMaterialNoCoreDetail(id);
    }
  }, []);

  const replaceInternalNote = (valueInternal) => {
    if (
      valueInternal !== undefined &&
      valueInternal !== "" &&
      valueInternal !== null
    ) {
      return valueInternal.replace("%-@ ", "- ");
    } else {
      return "";
    }
  };

  useEffect(() => {
    showField(materialNoCoreDetail.typeMaterials);
  }, [materialNoCoreDetail.typeMaterials]);

  const {
    getCauses,
    listCauses,
    updateMaterialNoCoreFlag,
    formStep,
    changeStateRequest,
    aprroveMaterial,
    GetMaterialsNoCorePackage,
    materialsNoCorePackage,
  } = materialNoCore;

  const {
    clear,
    clearUpdate,
    setError,
    setSuccess,
    Time,
    Error,
    Success,
    MessageError,
    MessageSuccess,
  } = materialNoCore;

  //---HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //STATE
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const [isApprover, setIsApprover] = useState(false);
  const [hasApprove, setHasApprove] = useState(false);
  const [stateRequest, setStateRequest] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [showFieldTypeMaterial, setShowFieldTypeMaterial] = useState(true);
  const [isCataloger, setIsCataloger] = useState(false);
  /* SE VALIDAN LOS ROLES Y PERMISOS */

  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 5
      );
      const isApprover = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMMNC_AP_MNC"
      );
      if (isApprover) {
        setIsApprover(true);
        setIsCataloger(true);
      }

      const editable = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMMNC_U_MNC"
      );
      if (editable) {
        setIsEditable(true);
      }
      setCurrentUser(moduleMaterials[0].userId);
    }
  }, [responseData]);

  /**
   * Cruce de datos entre ticket y el material
   */
  const [stateTicket, setStateTicket] = useState({});
  useEffect(() => {
    GetMaterialsNoCorePackage("");
    clearUpdate();
  }, []);

  useEffect(() => {
    const validObj = Object.entries(materialNoCoreDetail).length;
    if (materialsNoCorePackage.length > 0 && validObj > 0) {
      const state = materialsNoCorePackage.filter(
        (item) => item.ticketNumber === materialNoCoreDetail.ticketNumber
      );
      const x = Object.keys(state);
      if (x.length > 0) {
        setStateTicket({
          state: state[0].stateId,
          approver: state[0].approverBy,
        });
      }
    }
  }, [materialsNoCorePackage, materialNoCoreDetail]);

  //FUNCIONES
  const goBack = () => {
    history.goBack();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEdit = (id) => {
    history.push(`/MaterialesNoCore/Modificar/1/${id}`);
  };

  useEffect(() => {
    if (
      Object.values(stateRequest).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      const request = {
        id: materialNoCoreDetail.id,
        stateId: stateRequest.stateId === 2 ? 3 : stateRequest.stateId,
        approverBy: currentUser,
        observations: stateRequest.observations,
        modifiedBy: currentUser,
        causeId: stateRequest.typeCauses
          ? parseInt(stateRequest.typeCauses, 10)
          : 0,
      };

      if (request.stateId === 3) {
        aprroveMaterial(request);
      } else {
        changeStateRequest(request);
      }
      setOpen(false);
    }
  }, [stateRequest]);

  useEffect(() => {
    if (updateMaterialNoCoreFlag) {
      if (formStep === 6) {
        setTimeout(() => {
          history.push("/MaterialesNoCore/Consultar");
        }, Time);
      }
    }
  }, [updateMaterialNoCoreFlag]);

  if (Error) {
    clearTimeout(
      setTimeout(() => {
        history.push("/MaterialesNoCore/Consultar");
      }, Time)
    );
  }
  
  const navBreadCrumbArrayList = [
    { path: "/", active: "", word: "Inicio" },
    {
      path: "/MaterialesNoCore/Consultar",
      active: "",
      word: "Gestión materiales no core",
    },
    {
      path: "#",
      active: "BreadCrumb__link--active",
      word: "Detalle material no core",
    },
  ];

  const showValue = (value) => {
    if (value) {
      return value;
    } else {
      return "Sin información";
    }
  };
  const showInfo = (value) => {
    if (value) {
      return value;
    } else {
      return "Sin información";
    }
  };

  const handleCloseSnack = () => {
    clear();
  };

  const styles = {
    itemDiv: {
      background: "#FBFAFC",
      border: "1px solid #707070",
      borderRadius: "5px",
      padding: "12px",
    },
  };

  const historyModalClick = () => {
    setHistoryModal(!historyModal);
  };

  const showField = (typeMaterials) => {
    if (typeMaterials === "NLAG") {
      setShowFieldTypeMaterial(false);
    } else {
      setShowFieldTypeMaterial(true);
    }
  };

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArrayList} />
      <div>
        <p style={{ fontSize: "36px", color: "#0E0C5A" }}>
          {materialNoCoreDetail.stateId === 7 ? "Resumen" : "Detalle"} del
          material
        </p>
      </div>
      {materialNoCoreDetail.stateId !== stateGuradado && (
        <Grid container spacing={2} style={{ padding: "0 30px" }}>
          <Grid item xs={12}>
            <p style={{ fontSize: "24px" }}>Datos del encabezado</p>
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                materialNoCoreDetail.ticketNumber
                  ? materialNoCoreDetail.ticketNumber
                  : "Sin asignar"
              }
              label={"N° de ticket"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={showValue(materialNoCoreDetail.id)}
              label={"Id"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                stateTicket.state === 2 && isApprover
                  ? "Devuelto"
                  : showValue(materialNoCoreDetail.stateName)
              }
              label={"Estado"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                materialNoCoreDetail.createdByName
                  ? materialNoCoreDetail.createdByName
                  : "Sin asignar"
              }
              label={"Solicitante"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                materialNoCoreDetail.approverByName
                  ? materialNoCoreDetail.approverByName
                  : "Sin asignar"
              }
              label={"Aprobador"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                materialNoCoreDetail.dateCreatedFormat
                  ? materialNoCoreDetail.dateCreatedFormat
                  : "Sin fecha"
              }
              label={"Fecha creación"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                materialNoCoreDetail.lastModifiedFormat
                  ? materialNoCoreDetail.lastModifiedFormat
                  : "Sin fecha"
              }
              label={"Fecha actualización"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                materialNoCoreDetail.modifiedByName
                  ? materialNoCoreDetail.modifiedByName
                  : "Sin asignar"
              }
              label={"Modificado por"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                materialNoCoreDetail.dateSendFormat
                  ? materialNoCoreDetail.dateSendFormat
                  : "Sin asignar"
              }
              label={"Fecha de envío"}
              disabled={true}
            />
          </Grid>
          {materialNoCoreDetail.typeMaterials !== "HERS" ? (
            <Grid item xs={3}>
              <InputFieldCustom
                value={
                  materialNoCoreDetail.codigoSap
                    ? materialNoCoreDetail.codigoSap
                    : "Sin asignar"
                }
                label={"Código SAP"}
                disabled={true}
              />
            </Grid>
          ) : (
            <></>
          )}
          <Grid item xs={3}>
            <InputFieldCustom
              value={
                materialNoCoreDetail.stockManagement
                  ? materialNoCoreDetail.typeMaterials !== "HERS"
                    ? materialNoCoreDetail.stockManagement === "0"
                      ? "Sin asignar"
                      : materialNoCoreDetail.stockManagement
                    : materialNoCoreDetail.codigoSap
                  : "Sin asignar"
              }
              label={"Código SAP HERS"}
              disabled={true}
            />
          </Grid>
          {materialNoCoreDetail.typeMaterials === "HERS" && (
            <Grid item xs={3}>
              <InputFieldCustom
                value={
                  materialNoCoreDetail.stockManagement
                    ? materialNoCoreDetail.stockManagement !== "0"
                      ? materialNoCoreDetail.stockManagement
                      : "Sin asignar"
                    : "Sin asignar"
                }
                label={"Código SAP HERS PADRE"}
                disabled={true}
              />
            </Grid>
          )}
          <Grid item xs={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className="ButtonAcceptModal"
                autoFocus
                onClick={historyModalClick}
                style={{
                  width: "100%",
                  height: "45px",
                  marginTop: "6%",
                }}
              >
                Ver histórico
              </Button>
            </div>
          </Grid>
        </Grid>
      )}
      <br />
      <div style={{ marginBlockEnd: "80px" }}>
        <div style={styles.itemDiv}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                Tipo de solicitud
              </p>
            </Grid>
            <Grid item xs={4}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.typeRequestDesc)}
                label={"Tipo de solicitud"}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.typeSupplyDesc)}
                label={"Tipo de abastecimiento"}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.typeProcessDesc)}
                label={"Tipo de proceso"}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.destinationServiceDesc)}
                label={"El bien / servicio se destina a"}
                disabled={true}
              />
            </Grid>

            <Grid item xs={4}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.manageServiceDesc)}
                label={"Los bienes / servicios que se manejan"}
                disabled={true}
              />
            </Grid>
            {materialNoCoreDetail.typeMaterials === "HERS" && (
              <Grid item xs={4}>
                <InputFieldCustom
                  value={showInfo(
                    `${materialNoCoreDetail.typeMaterials} - ${materialNoCoreDetail.typeMaterialsDesc}`
                  )}
                  label={"Tipo de material"}
                  disabled={true}
                />
              </Grid>
            )}
          </Grid>
        </div>
        <br />
        <div style={styles.itemDiv}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                Datos del material
              </p>
            </Grid>
            {materialNoCoreDetail.typeMaterials === "HERS" && (
              <>
                <Grid item xs={6}>
                  <InputFieldCustom
                    value={showInfo(materialNoCoreDetail.stockManagement)}
                    label={"Material gestión stock"}
                    disabled={true}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.logisticCenterDesc)}
                label={"Centro Logistico"}
                disabled={true}
              />
            </Grid>
            {showFieldTypeMaterial &&
              materialNoCoreDetail.typeMaterials !== "HERS" && (
                <Grid item xs={6}>
                  <InputFieldCustom
                    value={showInfo(materialNoCoreDetail.storeDesc)}
                    label={"Almacén"}
                    disabled={true}
                  />
                </Grid>
              )}
            {materialNoCoreDetail.typeMaterials !== "HERS" && (
              <>
                <Grid item xs={4}>
                  <InputFieldCustom
                    value={showInfo(
                      `${materialNoCoreDetail.typeMaterials} - ${materialNoCoreDetail.typeMaterialsDesc}`
                    )}
                    label={"Tipo de material"}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputFieldCustom
                    value={showInfo(materialNoCoreDetail.price)}
                    label={"Precio (Unidad de medida)"}
                    disabled={true}
                    showCurrencyFormat={true}
                    currency={parseInt(
                      showInfo(materialNoCoreDetail.price),
                      10
                    )}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.shortDescriptionDesc)}
                label={"Descripción corta"}
                disabled={true}
              />
            </Grid>
            {materialNoCoreDetail.typeMaterials !== "HERS" && (
              <>
                <Grid item xs={12}>
                  <InputFieldCustom
                    value={
                      showInfo(materialNoCoreDetail.longDescriptionDesc) || ""
                    }
                    label={"Descripción larga"}
                    props={{ multiline: true, maxRows: 4 }}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputFieldCustom
                    value={showInfo(materialNoCoreDetail.measuredUnitDesc)}
                    label={"Unidad de medida"}
                    disabled={true}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={4}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.groupInternalArticleDesc)}
                label={"Grupo de articulos UNSPSC"}
                disabled={true}
              />
            </Grid>
            {materialNoCoreDetail.typeMaterials !== "HERS" && (
              <>
                <Grid item xs={4}>
                  <InputFieldCustom
                    value={showInfo(
                      materialNoCoreDetail.groupExternalArticleDesc
                    )}
                    label={"Gr. Art. Externo"}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputFieldCustom
                    value={showInfo(materialNoCoreDetail.hierarchyProductsDesc)}
                    label={"Jerarquía de productos"}
                    disabled={true}
                  />
                </Grid>
              </>
            )}
            {showFieldTypeMaterial &&
              materialNoCoreDetail.typeMaterials !== "HERS" && (
                <>
                  <Grid item xs={4}>
                    <InputFieldCustom
                      value={showInfo(materialNoCoreDetail.abcindicatorDesc)}
                      label={"Indicador ABC"}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputFieldCustom
                      value={showInfo(materialNoCoreDetail.stockMax)}
                      label={"Stock máximo"}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputFieldCustom
                      value={showInfo(materialNoCoreDetail.orderPoint)}
                      label={"Punto de Pedido"}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputFieldCustom
                      value={showInfo(
                        materialNoCoreDetail.planningRequirements
                      )}
                      label={"Características planificación necesidades"}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputFieldCustom
                      value={showInfo(materialNoCoreDetail.lotLength)}
                      label={"Tamaño lote"}
                      disabled={true}
                    />
                  </Grid>
                </>
              )}
            {materialNoCoreDetail.typeMaterials !== "NLAG" && (
              <>
                <Grid item xs={4}>
                  <InputFieldCustom
                    value={showInfo(materialNoCoreDetail.manufacturerDesc)}
                    label={"Fabricante"}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputFieldCustom
                    value={showInfo(materialNoCoreDetail.partNumber)}
                    label={"Número de parte"}
                    disabled={true}
                  />
                </Grid>
              </>
            )}
            {materialNoCoreDetail.typeMaterials !== "HERS" ? (
              <>
                <Grid item xs={12}>
                  <InputFieldCustom
                    value={showInfo(
                      replaceInternalNote(materialNoCoreDetail.internalNote)
                    )}
                    label={"Nota Interna"}
                    disabled={true}
                    props={{ multiline: true, maxRows: 4 }}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </div>
        <br />
        <div style={styles.itemDiv}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                Observaciones
              </p>
            </Grid>
            <Grid item xs={12}>
              <InputFieldCustom
                value={showInfo(materialNoCoreDetail.observations)}
                label={"Observación acerca de la solicitud"}
                disabled={true}
                props={{ multiline: true, maxRows: 4 }}
              />
            </Grid>
          </Grid>
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
            {stateTicket.state !== 2 &&
              ((stateTicket.state === 1 && stateTicket.approver === null) ||
                stateTicket.approver === currentUser) &&
              isApprover &&
              materialNoCoreDetail.stateId === 2 &&
              (materialNoCoreDetail.approverBy === "" ||
              materialNoCoreDetail.approverBy === null ? (
                <>
                  <div className="ContainerDetailButtons__items">
                    <Button
                      className={`ButtonCancelBorder`}
                      onClick={() => {
                        handleClickOpen();
                        setHasApprove(false);
                      }}
                    >
                      Rechazar/devolver
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
              ) : (
                materialNoCoreDetail.approverBy === currentUser && (
                  <>
                    <div className="ContainerDetailButtons__items">
                      <Button
                        className={`ButtonCancelBorder`}
                        onClick={() => {
                          handleClickOpen();
                          setHasApprove(false);
                        }}
                      >
                        Rechazar/devolver
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
                )
              ))}

            {isEditable &&
              materialNoCoreDetail.stateId === 4 &&
              materialNoCoreDetail.createdBy === currentUser && (
                <div className="ContainerDetailButtons__items">
                  <Button
                    className={`ButtonAccept`}
                    onClick={() => handleEdit(materialNoCoreDetail.id)}
                  >
                    Modificar
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>

      <ModalHistory
        open={historyModal}
        id={materialNoCoreDetail.id}
        handleClose={historyModalClick}
        title={"Histórico de solicitud"}
      />

      <ModalCustom
        open={open}
        schema={schema}
        maxWidth={"md"}
        fullWidth={true}
        typeModule="service"
        hasApprove={hasApprove}
        MaterialesNoCore={true}
        listCauses={listCauses}
        handleCauses={getCauses}
        handleClose={handleClose}
        initialState={initialState}
        setStateRequest={setStateRequest}
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
