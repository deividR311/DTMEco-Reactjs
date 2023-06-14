import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField, InputLabel } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

//-----------------

import { SelectCustom } from "../../../../../Materials/widgets";
import { useValidateForm } from "../../../../../../hooks/useValidateForm";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const ModalLevelTwo = ({
  open,
  data,
  schema,
  maxWidth,
  isApprove,
  fullWidth,
  handleClose,
  initialState,
  returnReasons,
  nameCurrentUser,
  setStateRequest,
  rejectionReasons,
  loadReturnReasons,
  loadRejectionReasons,
}) => {
  const [stateForm, setStateForm] = useState(false);

  let date = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let dateFormatted = date.toLocaleDateString("es-MX", options);

  const { error, values, setValues, handleInputs, submitValidate, setError } =
    useValidateForm(initialState, schema);

  useEffect(() => {
    if (values.stateId) {
      if (values.stateId === 11) {
        loadRejectionReasons();
      } else if (values.stateId === 13) {
        loadReturnReasons();
      }
    }
  }, [values]);

  useEffect(() => {
    if (isApprove) {
      setValues({ ...values, stateId: 10 });
    }
  }, [isApprove]);

  useEffect(() => {
    if (stateForm) {
      const value = Object.values(error).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        setStateRequest(values);
      }
    }
    setStateForm(false);
  }, [error]);

  useEffect(() => {
    if (stateForm) {
      submitValidate();
    }
  }, [stateForm]);

  const lIST_STATE = [
    { id: 11, name: "Rechazado" },
    {
      id: 13,
      name: "Devuelto",
    },
  ];

  const handleValidate = () => {
    setStateForm(true);
  };

  const handleCloseModal = () => {
    handleClose();
    setError(initialState);
    setValues(initialState);
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          {isApprove ? "Aprobación nivel 2" : "Rechazar / devolver nivel 2"}
        </DialogTitle>
        <DialogContent dividers style={{ padding: "10px 75px" }}>
          <div className="formRow">
            <div className="titles">
              <div className="titles__item">
                Fecha de{" "}
                {isApprove
                  ? "aprobación"
                  : values.stateId
                  ? values.stateId === 11
                    ? "rechazo"
                    : "devolución"
                  : "rechazo / devolución"}
                :
              </div>
              <div className="titles__item">
                Nombre Profesional Datos Maestros:
              </div>
              <div className="titles__item">
                Numero de caso herramienta de gestión:
              </div>
            </div>
            <div className="datos">
              <div className="datos__item">
                {dateFormatted ? dateFormatted : "Sin fecha"}
              </div>
              <div className="datos__item">
                {nameCurrentUser ? nameCurrentUser : "Sin nombre"}
              </div>
              <div className="datos__item">
                {data.titanCaseId ? data.titanCaseId : "Sin información"}
              </div>
            </div>
          </div>
          {!isApprove && (
            <div className="formRow">
              <div className="formRow__campo">
                <SelectCustom
                  required={true}
                  items={lIST_STATE}
                  errors={error.stateId}
                  label={"Estado de solicitud"}
                  placeholder="Seleccione el estado de solicitud"
                  handleInputs={handleInputs("stateId")}
                />
              </div>
              {values.stateId !== "" && (
                <div className="formRow__campo">
                  <SelectCustom
                    required={true}
                    label={`Causal de ${
                      values.stateId === 11 ? "rechazo" : "devolución"
                    }`}
                    errors={error.typeCauses}
                    items={
                      values.stateId === 11 ? rejectionReasons : returnReasons
                    }
                    placeholder="Seleccione las causales"
                    handleInputs={handleInputs("typeCauses")}
                  />
                </div>
              )}
            </div>
          )}

          <div className="formRow">
            <div className="formRow__campo__OBSERVATIONS">
              <InputLabel
                className="__labelInputOBSERVATIONS"
                error={error.observations.length > 0}
              >
                Observaciones
              </InputLabel>
              <TextField
                rows={4}
                multiline
                autoComplete="off"
                className="OBSERVATIONS__input__State"
                {...handleInputs("observations")}
                error={error.observations.length > 0}
                helperText={
                  error.observations.length > 0 ? error.observations[0] : ""
                }
                variant="outlined"
                placeholder="Ingrese las observaciones"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="ContainerDetailButtons_modal">
            <div className="ContainerDetailButtons__items-modal">
              <Button
                className={`ButtonCancel-modal`}
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
            </div>
            <div className="ContainerDetailButtons__items-modal">
              <Button className={`ButtonAccept-modal`} onClick={handleValidate}>
                {isApprove
                  ? "Aprobar"
                  : values.stateId
                  ? values.stateId === 11
                    ? "Rechazar"
                    : "Devolver"
                  : "Rechazar / devolver"}
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
