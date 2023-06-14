import React, { useState, useEffect, useContext } from "react";
import "./__resumen.scss";
import { useHistory } from "react-router";
import CloseIcon from "@material-ui/icons/Close";
import { InputFieldCustom } from "../CustomInput";
import { Footer } from "../../../../../../sharedComponents";
import HeaderContext from "../../../../../../context/Header/headerContext";
import MaterialNoCore from "../../../../../../context/MaterialsNoCore/materialsNoCoreContext";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from "@material-ui/core";
import { forceLoadUrl } from "../../../../../../utils/Function";
import { ButtonsFooter } from "../ButtonsFooter";

export const Resumen = ({ id, handleCancel, isEdited }) => {
  const history = useHistory();

  //---HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  const materialNoCore = useContext(MaterialNoCore);
  const {
    sendSaved,
    clearUpdate,
    getApprovers,
    listApprovers,
    sendPackage,
    materialNoCoreDetail,
    getMaterialNoCoreDetail,
  } = materialNoCore;

  const { Time } = materialNoCore;
  const { updateMaterialNoCoreFlag, formStep } = materialNoCore;

  const handleBack = () => {
    if (isEdited) {
      history.push(`/MaterialesNoCore/Modificar/3/${id}`);
    } else {
      history.push(`/MaterialesNoCore/Borrador/3/${id}`);
    }
  };

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
    clearUpdate();
    getApprovers();
  }, []);

  useEffect(() => {
    if (id !== "" || id !== 0) {
      getMaterialNoCoreDetail(id);
    }
  }, [id]);

  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);

  const [showFieldTypeMaterial, setShowFieldTypeMaterial] = useState(true);
  const showField = (typeMaterials) => {
    if (typeMaterials === "NLAG") {
      setShowFieldTypeMaterial(false);
    } else {
      setShowFieldTypeMaterial(true);
    }
  };

  const [approver, setApprover] = useState(0);
  const [errorApprover, setErrorApprover] = useState([]);
  const [validateApprover, setValidateApprover] = useState(false);

  const handleOnchange = (e) => {
    const { value } = e.target;
    setErrorApprover(validateError(value));
    setApprover(value);
  };

  useEffect(() => {
    showField(materialNoCoreDetail.typeMaterials);
  }, [materialNoCoreDetail.typeMaterials]);

  /* SE VALIDAN LOS ROLES Y PERMISOS */
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 5
      );
      setCurrentUser(moduleMaterials[0].userId);
    }
  }, [responseData]);

  const handleClose = () => {
    setErrorApprover([]);
    setApprover(0);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSaved = () => {
    const request = {
      id: parseInt(id, 10),
      stateId: isEdited ? 2 : 7,
      modifiedBy: currentUser,
      observations: materialNoCoreDetail.observations,
    };
    sendSaved(request);
    if (isEdited) {
      setTimeout(() => {
        forceLoadUrl("/MaterialesNoCore/GestionSolicitudes");
      }, 10000);
    }
  };
  const validateError = (value) => {
    if (value === 0 || value === "") {
      return ["Campo requerido"];
    } else {
      return [];
    }
  };

  const sendData = () => {
    const idMaterial = parseInt(id, 10);
    const RequestBody = {
      typeRequest: materialNoCoreDetail.typeRequest,
      createdBy: currentUser,
      ApproversId: approver,
      materialIds: [idMaterial],
    };
    sendPackage(RequestBody);
    handleClose();
  };

  const validationApprover = () => {
    setErrorApprover(validateError(approver));
  };

  const confirmCancelDialog = () => {
    setValidateApprover(true);
  };

  useEffect(() => {
    if (validateApprover) {
      validationApprover();
    }
  }, [validateApprover]);

  useEffect(() => {
    if (validateApprover) {
      if (!errorApprover.length > 0) {
        sendData();
      }
    }
    setValidateApprover(false);
  }, [errorApprover]);

  useEffect(() => {
    if (updateMaterialNoCoreFlag) {
      if (formStep === 4) {
        setTimeout(() => {
          if (materialNoCoreDetail.typeRequest === "TS_01") {
            forceLoadUrl(`/MaterialesNoCore/GestionSolicitudes`);
          } else {
            forceLoadUrl(`/MaterialesNoCore/CreacionMaterial`);
          }
        }, Time);
      }
    }
  }, [updateMaterialNoCoreFlag]);

  const showInfo = (info) => {
    let value = "";
    if (info) {
      value = info;
    }
    return value;
  };

  const printError = (error) => {
    if (error.length > 0) {
      return error[0];
    } else {
      return "";
    }
  };

  const styles = {
    itemDiv: {
      background: "#FBFAFC",
      border: "1px solid #707070",
      borderRadius: "5px",
      padding: "12px",
    },
  };

  const ButtonsSaved = () => {
    return (
      <ButtonsFooter
        showBack={true}
        showNext={true}
        showCancel={true}
        labelNext={"Guardar"}
        handleBack={handleBack}
        handleNext={handleSaved}
        handleCancel={handleCancel}
      />
    );
  };

  return (
    <>
      <div>
        <p style={{ fontSize: "36px", color: "#0E0C5A" }}>
          Resumen del material
        </p>
      </div>
      <div style={{ marginBlockEnd: "80px" }}>
        <div style={styles.itemDiv}>
          <Grid container spacing={4}>
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
                label={"Los bienes / servicios"}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputFieldCustom
                value={showInfo(
                  `${materialNoCoreDetail.typeMaterials} - ${materialNoCoreDetail.typeMaterialsDesc}`
                )}
                label={"Tipo de material"}
                disabled={true}
              />
            </Grid>
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
            {materialNoCoreDetail.typeMaterials !== "HERS" && (
              <>
                {materialNoCoreDetail.typeMaterials !== "NLAG" && (
                  <Grid item xs={6}>
                    <InputFieldCustom
                      value={showInfo(materialNoCoreDetail.storeDesc)}
                      label={"Almacén"}
                      disabled={true}
                    />
                  </Grid>
                )}

                <Grid item xs={4}>
                  <InputFieldCustom
                    value={showInfo(materialNoCoreDetail.price)}
                    label={"Precio (U.M)"}
                    disabled={true}
                    showCurrencyFormat={true}
                    currency={materialNoCoreDetail.price}
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
                    value={showInfo(materialNoCoreDetail.longDescriptionDesc)}
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
                label={"Grupo articulo UNSPSC"}
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
                    label={"Grupo articulo Externo"}
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
                <Grid item xs={8}>
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
                      label={"Tamaño Lote"}
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
                </>
              )}

            {materialNoCoreDetail.typeMaterials !== "NLAG" && (
              <>
                {materialNoCoreDetail.typeMaterials !== "HERS" && (
                  <Grid item xs={12}>
                    <strong>Nota: </strong> Recuerde que al diligenciar los
                    campos Fabricante y Número de parte se creará de manera
                    automática un material HERS.
                  </Grid>
                )}
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

      {isEdited ? (
        <ButtonsSaved />
      ) : (
        <>
          {materialNoCoreDetail.typeRequest === "TS_01" && (
            <ButtonsFooter
              showBack={true}
              showNext={true}
              showCancel={true}
              labelNext={"Enviar"}
              handleBack={handleBack}
              handleCancel={handleCancel}
              handleNext={handleClickOpen}
            />
          )}
          {materialNoCoreDetail.typeRequest === "TS_02" && <ButtonsSaved />}
        </>
      )}

      <Dialog
        maxWidth={"sm"}
        open={open}
        handleClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ display: "flex" }}>
          <DialogTitle id="alert-dialog-title" className=" mx-auto">
            Envío de materiales y creación de solicitud
          </DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon style={{ color: "#9F9D9D" }} />
          </IconButton>
        </div>
        <DialogContent dividers>
          <DialogContentText>
            <div className="text-center text-dark">
              Para crear y enviar la solicitud con el material y/o materiales
              registrados, por favor seleccione el aprobador a quien se le debe
              informar.
            </div>
          </DialogContentText>
          <Grid
            xs={9}
            style={{
              margin: "0 auto",
            }}
          >
            <div style={{ height: "300px", width: "100%" }}>
              <SearchSelect
                autoFocus={true}
                isRequired={true}
                errors={printError(errorApprover)}
                label={"Seleccione el aprobador"}
                onChange={handleOnchange}
                valueId={approver}
                listOpt={listApprovers}
                placeholder={"Seleccione aprobador"}
                maxMenuHeight={350}
              />
            </div>
          </Grid>
          <DialogActions>
            <Button className="ButtonCancelarModal" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="ButtonAcceptModal"
              autoFocus
              onClick={confirmCancelDialog}
            >
              Enviar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
