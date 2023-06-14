import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useStyles } from "../../../Administration/styles";
import {
  navBreadCrumbArrayCreateList,
  navBreadCrumbArrayCreateListEdited,
} from "../../constants";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { StepOne, StepTwo, StepThree, Resumen } from "./components";
import HeaderContext from "../../../../context/Header/headerContext";
import MaterialNoCore from "../../../../context/MaterialsNoCore/materialsNoCoreContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@material-ui/icons/Close";

import {
  NavBreadCrumb,
  DialogCommon,
  SnackBarCommon,
} from "../../../../sharedComponents";
import { DialogActions } from "@mui/material";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { forceLoadUrl } from "../../../../utils/Function";

export const DraftMaterialNoCore = () => {
  const classes = useStyles();
  const history = useHistory();
  const { location } = history;
  const { step, id } = useParams();

  //---HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //CONTEXT MATERIALES NO CORE
  const materialNoCore = useContext(MaterialNoCore);

  //states
  const [isEdited, setIsEdited] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const [isCreation, setIsCreation] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/MaterialesNoCore/Crear")) {
      setIsCreation(true);
    } else {
      if (!id) {
        setError("No se pudo identificar el id de la solicitud", 10000);
      }
      if (location.pathname.includes("/MaterialesNoCore/Modificar")) {
        setIsEdited(true);
      }
    }
  }, []);

  /* SE VALIDAN LOS ROLES Y PERMISOS */
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 5
      );
      setCurrentUser(moduleMaterials[0].userId);
    }
  }, [responseData]);

  const {
    clear,
    setError,
    setSuccess,
    Time,
    Error,
    Success,
    MessageError,
    MessageSuccess,
  } = materialNoCore;

  //states
  const [open, setOpen] = useState(false);

  //métodos
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const confirmCancelDialog = () => {
    setOpen(false);
    goDashboard();
  };
  const handleCloseSnack = () => {
    clear();
  };

  const goDashboard = () => {
    forceLoadUrl(`/MaterialesNoCore/CreacionMaterial`);
  };

  return (
    <>
      <>
        <NavBreadCrumb
          path={
            isEdited
              ? navBreadCrumbArrayCreateListEdited
              : navBreadCrumbArrayCreateList
          }
        />

        {isCreation ? (
          <StepOne
            id={id}
            isEdited={isEdited}
            isCreation={isCreation}
            currentUser={currentUser}
            handleCancel={handleClickOpen}
          />
        ) : (
          <>
            {step == 1 && (
              <StepOne
                id={id}
                isEdited={isEdited}
                isCreation={isCreation}
                currentUser={currentUser}
                handleCancel={handleClickOpen}
              />
            )}
            {step == 2 && (
              <StepTwo
                id={id}
                isEdited={isEdited}
                currentUser={currentUser}
                handleCancel={handleClickOpen}
              />
            )}
            {step == 3 && (
              <StepThree
                id={id}
                isEdited={isEdited}
                currentUser={currentUser}
                handleCancel={handleClickOpen}
              />
            )}
            {step == 4 && (
              <Resumen
                id={id}
                isEdited={isEdited}
                currentUser={currentUser}
                handleCancel={handleClickOpen}
              />
            )}
            {step <= 0 && goDashboard()}
            {step > 4 && goDashboard()}
          </>
        )}
      </>
      <>
        <Dialog
          open={open}
          handleClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Cambios pendientes por guardar
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon style={{ color: "#9F9D9D" }} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignContent: "stretch",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "52px",
                }}
              >
                <HighlightOffIcon style={{ color: "red", fontSize: "50px" }} />
                ¿Deseas salir?
              </div>
            </DialogContentText>
            <DialogActions>
              <Button className="ButtonCancelarModal" onClick={handleClose}>
                NO
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="ButtonAcceptModal"
                autoFocus
                onClick={confirmCancelDialog}
              >
                SI
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <SnackBarCommon
          time={Time}
          error={Error}
          success={Success}
          errorMessage={MessageError}
          successMessage={MessageSuccess}
          handleCloseSnack={handleCloseSnack}
        />
      </>
    </>
  );
};
