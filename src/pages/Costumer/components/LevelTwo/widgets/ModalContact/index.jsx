import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

//imports para logica
import schema from "../../schema/contact.schema";
import { InputContact } from "./components/InputContact";
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

//InitialState HOOK
const initialState = {
  Name: "",
  Function: "",
  FirstName: "",
};

export const ModalContact = ({ open, handleClose, setContactInfo, items }) => {
  const [stateForm, setStateForm] = useState(false);
  //HOOK
  const { error, values, setValues, handleInputs, submitValidate, setError } =
    useValidateForm(initialState, schema);

  useEffect(() => {
    if (stateForm) {
      const value = Object.values(error).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        setContactInfo(values);
        setValues(initialState);
      }
    }
    setStateForm(false);
  }, [error]);

  useEffect(() => {
    if (stateForm) {
      submitValidate();
    }
  }, [stateForm]);

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
        fullWidth={true}
        maxWidth={"sm"}
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          Agregar contacto
        </DialogTitle>
        <DialogContent dividers>
          <div className="containerAddContact">
            <InputContact
              required={true}
              autoFocus={true}
              errors={error.Name}
              label={"Nombre completo"}
              handleInputs={handleInputs("Name")}
              placeholder={"Ingrese el nombre completo"}
            />
            <br />
            <br />
            <InputContact
              required={true}
              label={"Identificación"}
              errors={error.FirstName}
              handleInputs={handleInputs("FirstName")}
              placeholder={"Ingrese la identificación"}
            />
            <br />
            <br />
            <SelectCustom
              items={items}
              required={true}
              label={"Función"}
              errors={error.Function}
              placeholder="Seleccione la función"
              handleInputs={handleInputs("Function")}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
          <Button onClick={handleValidate}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
