import React, { useContext, useEffect } from "react";
import {
  Footer,
  NavBreadCrumb,
  SnackBarCommon,
} from "../../../../../sharedComponents";
import { HeaderDataGrid } from "../../../../Materials/widgets";
import {
  navBreadCrumbArrayListSolicitudes,
  columnsCatalogador,
  columnsSolicitante,
} from "../../../constants";
import DataGridAcordeon from "./dataGridAcordeon";
import MaterialNoCore from "../../../../../context/MaterialsNoCore/materialsNoCoreContext";
import HeaderContext from "../../../../../context/Header/headerContext";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { forceLoadUrl } from "../../../../../utils/Function";

import { FiltersRequest } from "./FiltersRequest";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ReassignApprover } from "./ReasignarAprobador";
import { DialogMultiFunction } from "./DialogConfirm";

export const GestionSolicitudes = () => {
  const data = useContext(MaterialNoCore);
  const {
    ChangePackageState,
    materialsNoCorePackage,
    GetListOfCatalogers,
    materialNoCoreListCatalogers,
    GetMaterialsNoCorePackage,
    SetChangeApproverRequest,
    materialNoCoreListCatalogersSend,
  } = data;

  const {
    clear,
    setError,
    setSuccess,
    Time,
    Error,
    Success,
    MessageError,
    MessageSuccess,
  } = data;

  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  const [listCataloger, setListCataloger] = useState({});
  const onChangeCataloger = (event) => {
    const { name, value } = event.target;
    setListCataloger({ [name]: value });
  };

  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const [rowSelected, setRowSelected] = useState([]);
  const [ticket, setTicket] = useState(0);
  const [isCatolagador, setIsCatologador] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [catalogerSend, setCatalogerSend] = useState({});
  const [confirModal, setConfirModal] = useState();
  const [stateSaveData, setStateSaveData] = useState(false);
// console.log(materialsNoCorePackage)
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterialsNoCore = responseData.filter(
        (module) => module.moduleOrder === 5
      );
      setCurrentUser(moduleMaterialsNoCore[0].userId);

      if (moduleMaterialsNoCore.length > 0) {
        if (
          moduleMaterialsNoCore[0].subModules.some(
            (element) => element.code === "DMMNC_ADMIN" //Admin
          )
        ) {
          setIsAdmin(true);
          setIsCatologador(true);
          GetMaterialsNoCorePackage("");
        } else if (
          moduleMaterialsNoCore[0].subModules.some(
            (element) => element.code === "DMMNC_AP_MNC" //Catalogador
          )
        ) {
          setIsCatologador(true);
          GetMaterialsNoCorePackage("");
        } else if (
          moduleMaterialsNoCore[0].subModules.some(
            (element) => element.code === "DMMNC_C_MNC" //Solicitante
          )
        ) {
          GetMaterialsNoCorePackage(moduleMaterialsNoCore[0].userId);
        }
      }
    }
  }, [responseData]);

  const goBack = () => {
    forceLoadUrl("/MaterialesNoCore/Consultar");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [openModalError, setOpenModalError] = useState(false);
  const [opneModalConfirm, setOpneModalConfirm] = useState(false);

  const handleSendCataloger = (confirm) => {
    if (
      listCataloger.listCataloger === undefined ||
      listCataloger.listCataloger === ""
    ) {
      setOpenModalError(true);
    } else {
      if (confirm) {
        const payload = {
          ticketNumber: ticket,
          approverBy: parseInt(listCataloger.listCataloger, 10),
          modifiedBy: currentUser,
        };
        SetChangeApproverRequest(payload);
      }
    }
  };
  const [strContendModal, setStrContendModal] = useState("");
  useEffect(() => {
    if (Object.keys(materialNoCoreListCatalogersSend).length !== 0) {
      const { isSuccess, returnMenssage } = materialNoCoreListCatalogersSend;
      if (isSuccess) {
        setStrContendModal(returnMenssage);
        setStateSaveData(true);
      }
    }
  }, [materialNoCoreListCatalogersSend]);

  const handleSend = () => {
    if (rowSelected.length === 0) {
      setError("No ha seleccionado ninguna solicitud para enviar", 2000);
    } else {
      if (materialsNoCorePackage.length > 0) {
        const tickets = materialsNoCorePackage.filter((ticket) =>
          rowSelected.some((ticketSelected) => ticket.id === ticketSelected)
        );
        const allmaterial = tickets
          .map((element) =>
            element.materials.some((state) => state.stateId === 4)
          )
          .some((mat) => mat === true);
        if (allmaterial) {
          setError(
            "Para enviar las solicitudes no puede haber materiales en estado Devuelto. Verifique por favor.",
            2000
          );
        } else {
          setOpen(true);
        }
      }
    }
  };

  if (Success) {
    setTimeout(() => {
      forceLoadUrl("/MaterialesNoCore/GestionSolicitudes");
    }, Time);
  }

  const confirmCancelDialog = () => {
    setOpen(false);

    const ticketNumber = materialsNoCorePackage.filter((ticket) =>
      rowSelected.some((ticketSelected) => ticket.id === ticketSelected)
    )[0].ticketNumber;

    const request = [
      {
        ticketNumber: ticketNumber,
        stateId: 1,
        modifiedBy: currentUser,
      },
    ];
    ChangePackageState(request);
  };

  const handOnchange = (event) => {
    const arrayAux = rowSelected;
    if (event.target.checked) {
      const idItem = parseInt(event.target.id, 10);
      const index = arrayAux.indexOf(idItem);
      if (index === -1) {
        arrayAux.push(idItem);
      }
    }
    if (event.target.checked === false) {
      const idItem = parseInt(event.target.id, 10);
      const index = arrayAux.indexOf(idItem);
      if (index !== -1) {
        arrayAux.splice(index, 1);
      }
    }
    setRowSelected([...arrayAux]);
  };

  const handleCloseSnack = () => {
    clear();
  };
  const [openModal, setOpenModal] = useState(false);
  const handleCatalogardor = (id) => {
    setTicket(id);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setListCataloger({ listCataloger: "" });
    setOpenModal(false);
    forceLoadUrl("/MaterialesNoCore/GestionSolicitudes");
  };
  const handleConfirmModal = (booleand) => {
    handleSendCataloger(booleand);
    setOpneModalConfirm(false);
  };

  const handleCloseModalConfirm = () => {
    setStateSaveData(false);
  };

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArrayListSolicitudes} />
      <h3 className="TitleView">Gestión de solicitudes NO CORE</h3>
      <HeaderDataGrid
        isFiltered={true}
        showBtn={false}
        labelButton="Nuevo material"
        handleOnClick={() => {}}
        showFilters={0}
      >
        <FiltersRequest />
      </HeaderDataGrid>
      <div style={{ marginBlockEnd: "80px" }}>
        <DataGridAcordeon
          isAdmin={isAdmin}
          currentUser={currentUser}
          isCatolagador={isCatolagador}
          data={materialsNoCorePackage}
          head={isCatolagador ? columnsCatalogador : columnsSolicitante}
          handleOnchange={handOnchange}
          handleCatalogardor={(id) => {
            handleCatalogardor(id);
          }}
          selectionRows={(rowSelected) => {
            setRowSelected([...rowSelected]);
          }}
        />
      </div>
      {!isCatolagador && (
        <div className="ContainerDetailButtons">
          <Grid className="containerBtnTwo">
            <Grid className="col-btn">
              <Grid
                className="ContainerDetailButtons__items"
                style={{ paddingRight: "1.5cm" }}
              >
                <Button className={`ButtonCancelFooter btn`} onClick={goBack}>
                  Regresar
                </Button>
              </Grid>

              <Grid className="ContainerDetailButtons__items">
                <Button className={`ButtonSendFooter btn`} onClick={handleSend}>
                  Enviar solicitud
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}

      <ReassignApprover
        key={"provaiderModal"}
        open={openModal}
        handleClose={handleCloseModal}
        handleSend={() => {
          listCataloger.listCataloger !== undefined
            ? setOpneModalConfirm(true)
            : setOpenModalError(true);
        }}
        title={"Reasignar aprobador"}
        getListF={GetListOfCatalogers}
        getData={materialNoCoreListCatalogers}
        valueId={listCataloger.listCataloger}
        onChange={onChangeCataloger}
      />

      <DialogMultiFunction
        key={"modalConfirm"}
        open={opneModalConfirm}
        title={"Reasignar aprobador"}
        menssage={"¿Esta seguro de reasignar la solicitud?"}
        icono={
          <CheckCircleOutlineIcon
            style={{ color: "#7ee56d", fontSize: "50px" }}
          />
        }
        handleClose={() => {
          setOpneModalConfirm(false);
        }}
        buttons={
          <>
            <Button
              key={"cancelModalAprobador"}
              className="ButtonCancelarModal"
              onClick={() => {
                handleConfirmModal(false);
              }}
              style={{ height: "40px", width: "80px" }}
            >
              NO
            </Button>
            <Button
              key={"aprobarModalAprobador"}
              variant="contained"
              color="primary"
              className="ButtonAcceptModal"
              onClick={() => {
                handleConfirmModal(true);
              }}
              style={{ height: "40px", width: "80px" }}
            >
              SI
            </Button>
          </>
        }
      />

      <DialogMultiFunction
        key={"modalConfirmacion"}
        open={stateSaveData}
        title={"Reasignar aprobador"}
        menssage={"La información ha sido guardada exitosamente"}
        icono={
          <CheckCircleOutlineIcon
            style={{ color: "#7ee56d", fontSize: "50px" }}
          />
        }
        buttons={
          <Button
            key={"cancelModalAprobador"}
            variant="contained"
            color="primary"
            className="ButtonAcceptModal"
            onClick={() => {
              handleCloseModalConfirm(false);
              handleCloseModal();
            }}
            style={{ height: "40px", width: "80px" }}
          >
            Ok
          </Button>
        }
      />

      <DialogMultiFunction
        key={"modalExclamation"}
        open={openModalError}
        handleClose={() => {
          setOpenModalError(false);
        }}
        title={"Reasignar aprobador"}
        menssage={"Se debe seleccionar un aprobador."}
        icono={
          <ErrorOutlineIcon style={{ color: "#F39F3F", fontSize: "50px" }} />
        }
        buttons={
          <Button
            key={"cancelModalAprobadorError"}
            variant="contained"
            color="primary"
            className="ButtonAcceptModal"
            onClick={() => {
              setOpenModalError(false);
            }}
            style={{ height: "40px", width: "80px" }}
          >
            Ok
          </Button>
        }
      />

      <SnackBarCommon
        time={Time}
        error={Error}
        success={Success}
        errorMessage={MessageError}
        successMessage={MessageSuccess}
        handleCloseSnack={handleCloseSnack}
      />
      <Dialog
        open={open}
        handleClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Envío solicitudes devueltas para aprobación
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ right: "0px", position: "absolute" }}
          >
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
              <CheckCircleOutlineIcon
                style={{ color: "#7ee56d", fontSize: "50px" }}
              />
              ¿Está seguro de enviar nuevamente las solicitudes devueltas para
              Aprobación?
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
    </>
  );
};
