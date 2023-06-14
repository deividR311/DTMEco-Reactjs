import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { SelectCustom } from "../SelectCustom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField, InputLabel } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { useValidateForm } from "../../../../hooks/useValidateForm";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

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

export const ModalCustom = ({
  open,
  schema,
  maxWidth,
  fullWidth,
  typeModule,
  hasApprove,
  handleClose,
  handleCauses,
  initialState,
  setStateRequest,
  listCauses = [],
  MaterialesNoCore = false,
}) => {
  const [stateForm, setStateForm] = useState(false);
  const { error, values, setValues, handleInputs, submitValidate, setError } =
    useValidateForm(initialState, schema);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (typeModule === "service") {
      if (MaterialesNoCore) {
        if (values.stateId === 4) {
          const Reject = listCauses.filter(
            (e) => e.listName === "MotivoDevolucion"
          );

          if (Reject.length) {
            const listaDevolucion = Reject[0].list[0].values;
            setList(listaDevolucion);
          }
        }
        if (values.stateId === 5) {
          const rechazo = listCauses.filter(
            (e) => e.listName === "MotivoRechazo"
          );

          if (rechazo.length) {
            const listaRechazo = rechazo[0].list[0].values;
            setList(listaRechazo);
          }
        }
      } else {
        if (values.stateId) {
          handleCauses(values.stateId);
        }
      }
    }
  }, [values]);

  useEffect(() => {
    if (MaterialesNoCore) {
      handleCauses();
    }
  }, [MaterialesNoCore]);

  useEffect(() => {
    if (hasApprove) {
      setValues({ ...values, stateId: 2 });
    }
  }, [hasApprove]);

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
    { id: 3, name: "Rechazado" },
    {
      id: 4,
      name: "Devuelto",
    },
  ];
  const lIST_STATE_MNC = [
    {
      id: 4,
      name: "Devuelto",
    },
    {
      id: 5,
      name: "Rechazado",
    },
  ];

  const handleValidate = () => {
    setStateForm(true);
  };

  const close = () => {
    handleClose();
    setError(initialState);
    setValues(initialState);
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={maxWidth}
        onClose={close}
        fullWidth={fullWidth}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={close}>
          <p style={{ fontWeight: "bold" }}>
            {MaterialesNoCore
              ? hasApprove
                ? "Aprobación de la solicitud creación del material"
                : "Rechazo o Devolución solicitud Creación de material No Core"
              : hasApprove
              ? "Aprobar solicitud"
              : "Rechazar/devolver solicitud"}
          </p>
        </DialogTitle>
        <DialogContent dividers style={{ padding: "10px 75px" }}>
          <br />
          {!hasApprove && (
            <div className="formRow">
              <div className="formRow__campo">
                <SelectCustom
                  showId={false}
                  required={true}
                  items={MaterialesNoCore ? lIST_STATE_MNC : lIST_STATE}
                  errors={error.stateId}
                  label={"Estado de solicitud"}
                  placeholder="Seleccione el estado de solicitud"
                  handleInputs={handleInputs("stateId")}
                />
              </div>
              {typeModule === "service" && (
                <>
                  <div className="formRow__campo">
                    <SelectCustom
                      disabled={!values.stateId}
                      showId={false}
                      required={true}
                      label={"Causal de rechazo o devolución"}
                      errors={error.typeCauses}
                      items={MaterialesNoCore ? list : listCauses}
                      placeholder="Seleccione las causales"
                      handleInputs={handleInputs("typeCauses")}
                    />
                  </div>
                </>
              )}
            </div>
          )}
          <br />

          <div className="formRow">
            <div className="formRow__campo__OBSERVATIONS">
              <InputLabel
                className="__labelInputOBSERVATIONS"
                error={error.observations.length > 0}
                required={true}
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
              <p className="OBSERVATIONS__characters">
                Caracteres: {values.observations.length} (max. 200)
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="ContainerDetailButtons_modal">
            <div className="ContainerDetailButtons__items-modal">
              <Button className={`ButtonCancel-modal`} onClick={close}>
                Cancelar
              </Button>
            </div>
            <div className="ContainerDetailButtons__items-modal">
              <Button className={`ButtonAccept-modal`} onClick={handleValidate}>
                Guardar
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
