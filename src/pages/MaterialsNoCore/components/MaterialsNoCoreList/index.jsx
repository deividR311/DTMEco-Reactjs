import * as React from "react";
import { Button } from "@mui/material";
import { Filters } from "./components";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import "../../../Materials/widgets/Table/__Table.scss";
import { useEffect, useContext, useState } from "react";
import { forceLoadUrl } from "../../../../utils/Function";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { HeaderDataGrid } from "../../../Materials/widgets";
import DataGridList from "../../../Materials/widgets/DataGrid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HeaderContext from "../../../../context/Header/headerContext";
import { SearchSelect } from "../../../../sharedComponents/SearchSelectCommon";
import MaterialNoCore from "../../../../context/MaterialsNoCore/materialsNoCoreContext";

import {
  Footer,
  NavBreadCrumb,
  SnackBarCommon,
} from "../../../../sharedComponents";

import {
  stateBorrador,
  stateDevuelto,
  navBreadCrumbArrayList,
} from "../../constants";

import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
const initialState = {
  typeSupply: "",
};
export const MaterialesNoCoreList = () => {
  const history = useHistory();

  //CONTEXT HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //CONTEXT MATERIAL NO CORE
  const materialNoCore = useContext(MaterialNoCore);
  const { isFiltered, listMaterial, GetMaterialsNoCoreInDraftAndSavedState } =
    materialNoCore;

  const {
    formStep,
    sendPackageGrid,
    DeleteMaterials,
    updateMaterialNoCoreFlag,
  } = materialNoCore;

  const { clearUpdate, getApprovers, listApprovers } = materialNoCore;

  const {
    clear,
    Time,
    Error,
    Success,
    setError,
    MessageError,
    MessageSuccess,
  } = materialNoCore;

  //states
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  //+++++++++++++++++
  const [aprobador, setAprobador] = useState(0);
  const [validateApprover, setValidateApprover] = useState(false);
  const [errorApprover, setErrorApprover] = useState([]);

  //+++++++++++++++++
  const [rowSelected, setRowSelected] = useState([]);
  const [userActivity, setUserActivity] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isApplicantState, setIsApplicantState] = useState(false);

  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterialsNoCore = responseData.filter(
        (module) => module.moduleOrder === 5
      );

      setReadOnly(false);
      setShowEdit(false);
      setShowDraft(true);
      setShowDetail(true);
      setIsApplicantState(true);
      setUserActivity(moduleMaterialsNoCore[0].userId);
      GetMaterialsNoCoreInDraftAndSavedState(moduleMaterialsNoCore[0].userId);
    }
  }, [responseData]);

  useEffect(() => {
    clearUpdate();
    getApprovers();
  }, []);

  const validateSelected = () => {
    if (rowSelected.length === 0) {
      setError("No ha seleccionado materiales para enviar a aprobación", 2000);
    } else {
      const selects = listMaterial
        .filter((item) => rowSelected.some((row) => item.id === row))
        .every((data) => data.stateId === 7);

      if (!selects) {
        setError(
          "Hay materiales en estado Borrador, por favor verificar y vuelve a intentar",
          2000
        );
      } else {
        setOpen(true);
      }
    }
  };

  const validateDeleted = () => {
    if (rowSelected.length === 0) {
      setError("No ha seleccionado materiales para borrar", 2000);
    } else {
      setOpenDelete(true);
    }
  };

  const sendData = () => {
    setOpen(false);

    const RequestBody = {
      typeRequest: "TS_02",
      createdBy: userActivity,
      ApproversId: aprobador,
      materialIds: rowSelected,
    };
    sendPackageGrid(RequestBody, 8);
  };

  const validateError = (value) => {
    if (value === 0 || value === "") {
      return ["Campo requerido"];
    } else {
      return [];
    }
  };

  const validationApprover = () => {
    setErrorApprover(validateError(aprobador));
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

  const confirmCancelDialogDelete = () => {
    setOpenDelete(false);

    const RequestBody = {
      modifiedBy: userActivity,
      materialIds: rowSelected,
    };
    DeleteMaterials(RequestBody, 9);
  };

  const handleCreate = () => {
    history.push("/MaterialesNoCore/Crear");
  };

  const handleCloseSnack = () => {
    clear();
  };

  const handleClose = () => {
    setErrorApprover([]);
    setAprobador(0);
    setOpen(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDetail = (item) => {
    history.push(`/MaterialesNoCore/Detalle/${item.id}`);
  };

  const handleDraft = (item) => {
    history.push(`/MaterialesNoCore/Borrador/1/${item.id}`);
  };

  const handleEdit = (item) => {
    history.push(`/MaterialesNoCore/Modificar/1/${item.id}`);
  };

  useEffect(() => {
    if (updateMaterialNoCoreFlag) {
      if (formStep === 8) {
        setTimeout(() => {
          forceLoadUrl(`/MaterialesNoCore/GestionSolicitudes`);
        }, Time);
      }
      if (formStep === 9) {
        setTimeout(() => {
          forceLoadUrl(`/MaterialesNoCore/CreacionMaterial`);
        }, Time);
      }
    }
  }, [updateMaterialNoCoreFlag]);

  const customStylesCell = (color) => {
    let hexColor = "";
    let colorText = "";
    switch (color) {
      case "Devuelto":
        hexColor = "#D8D8D8";
        break;
      case "Aprobado":
        hexColor = "#02A24E";
        colorText = "white";
        break;
      case "Borrador":
        hexColor = "#0e0c5a";
        colorText = "white";
        break;
      case "Pendiente aprobación":
        hexColor = "#E5C215";
        colorText = "";
        break;
      case "Rechazado":
        hexColor = "#FF2622";
        colorText = "white";
        break;
      case "Guardado":
        hexColor = "#02A24E";
        colorText = "white";
        break;
    }

    let fullColor = {
      borderRadius: "30px",
      background: hexColor,
      color: colorText,
      height: "30px",
      width: "100%",
      justifyContent: "center",
      display: "flex",
      alignContent: "center",
      flexWrap: "wrap",
    };
    return fullColor;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      "min-width": 0,
      disableColumnMenu: true,
      border: "none",
    },
    {
      field: "shortDescriptionDesc",
      headerName: "Descripción Corta",
      width: 328,
      disableColumnMenu: true,
    },
    {
      field: "lastModifiedFormat",
      headerName: "Fecha de modificación",
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: "typeMaterials",
      headerName: "Tipo material",
      width: 120,
      disableColumnMenu: true,
    },
    {
      field: "stateName",
      headerName: "Estado",
      width: 235,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div style={customStylesCell(params.value)}>{params.value}</div>;
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      disableColumnMenu: true,
      width: 110,
      renderCell: (params) => {
        const onClickDelete = async () => {
          return alert(JSON.stringify(params.row, null, 4));
        };

        const simple = {
          marginRight: "10px",
          cursor: "pointer",
          color: "#0e0c5a",
        };

        const disabledSimple = {
          marginRight: "10px",
          color: "rgb(209, 209, 209)",
          cursor: "not-allowed",
        };

        return (
          <>
            {showDetail &&
              (params.row.stateId !== stateBorrador ? (
                <div
                  style={simple}
                  onClick={() => {
                    handleDetail(params.row);
                  }}
                  title="Ver detalle"
                >
                  <VisibilityIcon />
                </div>
              ) : (
                <div
                  style={disabledSimple}
                  title="No se puede visualizar el detalle de la solicitud"
                >
                  <VisibilityIcon />
                </div>
              ))}

            {showEdit &&
              (!readOnly ? (
                params.row.stateId == stateDevuelto ? (
                  params.row.createdBy === userActivity ? (
                    <div
                      style={simple}
                      onClick={() => handleEdit(params.row)}
                      title="Modificar"
                    >
                      <EditIcon />
                    </div>
                  ) : (
                    <div
                      style={disabledSimple}
                      title="Solo se puede editar por el usuario que realizó la solicitud"
                    >
                      <EditIcon />
                    </div>
                  )
                ) : (
                  <div
                    style={disabledSimple}
                    title="Solo se puede editar en estado Devuelto"
                  >
                    <EditIcon />
                  </div>
                )
              ) : (
                <div
                  style={disabledSimple}
                  title="El rol catalogador no permite editar una solicitud"
                >
                  <EditIcon />
                </div>
              ))}
            {showDraft && (
              <div
                style={simple}
                onClick={() => {
                  handleDraft(params.row);
                }}
                title="Editar material"
              >
                <EditIcon />
              </div>
            )}
          </>
        );
      },
    },
  ];

  const style = {
    width: {
      width: "180px",
      height: "50px",
      color: "#0E0C5A",
      textTransform: "none",
    },
    clear: {
      textTransform: "none !important",
      border: "1px solid",
    },
    cancel: {
      textDecoration: "underline",
    },
  };

  const printError = (error) => {
    if (error.length > 0) {
      return error[0];
    } else {
      return "";
    }
  };

  const handleChangeApprover = (e) => {
    const { value } = e.target;
    setErrorApprover(validateError(value));
    setAprobador(value);
  };

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArrayList} />
      <h3 className="TitleView">Gestión de materiales NO CORE</h3>
      <HeaderDataGrid
        isFiltered={isFiltered}
        showBtn={isApplicantState}
        labelButton="Nuevo material"
        handleOnClick={handleCreate}
        showFilters={listMaterial && listMaterial.length > 0}
      >
        <Filters />
      </HeaderDataGrid>
      <DataGridList
        head={columns}
        data={listMaterial}
        setRows={(row) => {
          setRowSelected(row);
        }}
      />
       <div className="ContainerDetailButtons">
          <Grid className="containerBtnTwo">
            <Grid className="col-btn">
              <Grid className="ContainerDetailButtons__items">
                <Button
                  className={`ButtonCancelFooter btn`}
                  onClick={() => {
                    history.push(`/MaterialesNoCore/GestionMateriales`);
                  }}
                >
                  Regresar
                </Button>
              </Grid>
              <Grid className="ContainerDetailButtons__items">
                <Button className={`ButtonBackFooter btn`} onClick={validateDeleted}>
                  Borrar
                </Button>
              </Grid>
              <Grid className="ContainerDetailButtons__items">
                <Button
                onClick={validateSelected}
                  className={`ButtonNextFooter btn`}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
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
        <div
          style={{
            display: "flex",
          }}
        >
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
                label={"Seleccione el aprobador"}
                onChange={handleChangeApprover}
                valueId={aprobador}
                errors={errorApprover.length > 0 ? errorApprover[0] : ""}
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
      <Dialog
        open={openDelete}
        handleClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Eliminar materiales
          <IconButton aria-label="close" onClick={handleCloseDelete}>
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
              ¿Está seguro de eliminar los registros seleccionados?
            </div>
          </DialogContentText>
          <DialogActions>
            <Button className="ButtonCancelarModal" onClick={handleCloseDelete}>
              NO
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="ButtonAcceptModal"
              autoFocus
              onClick={confirmCancelDialogDelete}
            >
              SI
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <br />
      <br />
    </>
  );
};
