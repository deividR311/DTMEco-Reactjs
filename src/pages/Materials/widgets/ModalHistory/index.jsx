import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
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

export const ModalHistory = ({
  id,
  open,
  module,
  dataHistory,
  handleClose,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"lg"}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Histórico de solicitud #{id}
        </DialogTitle>
        <DialogContent dividers style={{ padding: "15px 85px" }}>
          {dataHistory.length ? (
            <table className="table">
              <thead className="table__header">
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Estado</th>
                  {module === "service" && (
                    <th scope="col">Motivo de devolución</th>
                  )}
                  <th scope="col">Observación</th>
                </tr>
              </thead>
              <tbody>
                {dataHistory.map((data, index) => (
                  <tr index={index}>
                    <td>{data.dateCreatedFormat}</td>
                    <td>{data.userName}</td>
                    <td>{data.stateName}</td>
                    {module === "service" && (
                      <td>{data.causeName ? data.causeName : "No aplica"}</td>
                    )}
                    <td>{data.observation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No se pudo consultar el historial de la solicitud"
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="btnCloseHistory"
            style={{
              color: "white",
              width: "180px",
              height: "50px",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#0e0c5a",
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
