import * as React from "react";
import { Filters } from "./Filters";
import { useHistory } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import HeaderContext from "../../../../context/Header/headerContext";
import { HeaderDataGrid, InputCustom } from "../../../Materials/widgets";
import DataGridList from "../../../Materials/widgets/DataGrid/GridMateriales";
import MaterialsContext from "../../../../context/Materials/materialContext";
import { NavBreadCrumb, SnackBarCommon } from "../../../../sharedComponents";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { SearchSelect } from "../../../../sharedComponents/SearchSelectCommon";

import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
} from "@material-ui/core";

import {
  stateBorrador,
  stateDevuelto,
  navBreadCrumbArrayList,
} from "../../constant";

export const ListMaterial = () => {
  const history = useHistory();

  const materialsContext = useContext(MaterialsContext);
  const { isFiltered, allMaterial, getInitialData, getMaterialByUser, dataCopyFromRequest, setcopyFromRequest, InfoMaterialRequest, getInfoMaterialRequestById } =
    materialsContext;

  //Manejar Errores
  const { clear, Error, Success, setError, MessageError, MessageSuccess } =
    materialsContext;

  if (Success || Error) {
    setTimeout(() => {
      clear();
      history.push("/Materiales/Consultar");
    }, 8000);
  }

  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions, rolesByUser } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //States
  const [flow, setFlow] = useState("")
  const [rowSelected, setRowSelected] = useState([]);
  const [isApplicantState, setIsApplicantState] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [currentUser, setCurrentUser] = useState({ createdBy: 0 });
  const [showDetail, setShowDetail] = useState(true);
  const [showEdit, setShowEdit] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [showCopy, setShowCopy] = useState(true);
  // const [showDraft, setShowDraft] = useState(false);
  const [userActivity, setUserActivity] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModalCopy, setOpenModalCopy] = useState({check:false, itemId:0, currentCompany:'', typeCompany:'', newCompany:'', createdBy:'', listCompany:[]});
  const [openDelete, setOpenDelete] = useState(false);
  const [aprobador, setAprobador] = useState(0);
  const [errorApprover, setErrorApprover] = useState([]);

  const handleDetail = (item) => {
    history.push(`/Materiales/Detalle/${item.id}`);
  };

  const handleEdit = (item) => {
    history.push(`/Materiales/Modificar/1/${item.id}`);
  };

  const handleDraft = (item) => {
    history.push(`/Materiales/Borrador/1/${item.id}`);
  };

  const handleCopy = (item) => {
    getInfoMaterialRequestById(item.id)
    let typeCompany = item.company==="Ecopetrol" ? "E" : item.company==="Reficar" ? "R" : ""
    let listCompany = [{id:"E", name:"Ecopetrol"}, {id:"R", name:"Reficar"}]
    // typeCompany==="E" ? listCompany.push({id:"R", name:"Reficar"}) : typeCompany==="R" && listCompany.push({id:"E", name:"Ecopetrol"}) 
    setOpenModalCopy({check:true, itemId:item.id, typeCompany, currentCompany:item.company, createdBy:item.createdBy, listCompany})
  }

  const customStylesCell = (color) => {
    let _color = color.toUpperCase();

    let Colores = []
    Colores["PENDIENTE APROBACIÓN"] = { hexColor: "#DFE6EA", colorText: "#575E69" };
    Colores["APROBADO APROBADOR"] = { hexColor: "#DCFCE6", colorText: "#068E19" };
    Colores["RECHAZADO APROBADOR"] = { hexColor: "#FDEBF0", colorText: "#FD211B" };
    Colores["DEVUELTO APROBADOR"] = { hexColor: "#FEF7E6", colorText: "#F4A500" };
    Colores["RECHAZADO DATO MAESTRO"] = { hexColor: "#FDEBF0", colorText: "#FD211B" };
    Colores["DEVUELTO DATO MAESTRO"] = { hexColor: "#FEF7E6", colorText: "#F4A500" };
    Colores["EN TRÁMITE"] = { hexColor: "#F3F3FC", colorText: "#5052A3" };
    Colores["EN CREACIÓN"] = { hexColor: "#F3F3FC", colorText: "#5052A3" };
    Colores["EN PRUEBAS"] = { hexColor: "#DFE6EA", colorText: "#575E69" };
    Colores["DISPONIBLE PARA CREAR"] = { hexColor: "#DCFCE6", colorText: "#068E19" };
    Colores["PRUEBAS FALLIDAS"] = { hexColor: "#FDEBF0", colorText: "#FD211B" };
    Colores["CREACIÓN FALLIDAS"] = { hexColor: "#FDEBF0", colorText: "#FD211B" };
    Colores["CREADO"] = { hexColor: "#DFE6EA", colorText: "#575E69" };

    let fullColor = {
      borderRadius: "8px",
      background: Colores[_color]?.hexColor,
      color: Colores[_color]?.colorText,
      height: "40px",
      width: "100%",
      padding: "inherit",
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
      width: 60,
      "min-width": 0,
      disableColumnMenu: true,
      border: "none",
    },
    {
      field: "dateCreatedFormat",
      headerName: "Fecha de creación",
      width: 140,
      disableColumnMenu: true,
    },
    {
      field: "lastModifiedFormat",
      headerName: "Fecha de modificación",
      width: 140,
      disableColumnMenu: true,
    },
    {
      field: "userName",
      headerName: "Solicitante",
      width: 220,
      disableColumnMenu: true,
    },
    {
      field: "materialTypeName",
      headerName: "Tipo material",
      width: 110,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div style={{
          margin:`0 auto`, 
          textTransform:`uppercase`
        }}>{params.value}</div>;
      },
    },
    {
      field: "company",
      headerName: "Empresa",
      width: 110,
      disableColumnMenu: true,
    },
    {
      field: "stateName",
      headerName: "Estado",
      width: 200,
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
      width: 120,
      cellClassName: "style-acciones",
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
          <div style={{display:`flex`, justifyContent:`center`, marginLeft:`5%`, outline: 'none'}}>
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
                  <VisibilityIcon color="disabled" />
                </div>
              ))}
            
            { showEdit && !readOnly 
              ? params.row.stateId == stateDevuelto || params.row.stateId == 6 || params.row.stateId == 7 || params.row.stateId == 11
                ? <div
                    style={simple}
                    onClick={() => handleEdit(params.row)}
                    title="Modificar"
                  >
                    <EditIcon />
                  </div>
                : (params.row.createdBy === userActivity)
                  ?  <div
                      style={simple}
                      onClick={() => handleEdit(params.row)}
                      title="Modificar"
                    >
                      <EditIcon />
                    </div>
                  : <div
                      style={disabledSimple}
                      title="Solo se puede editar por el usuario que realizó la solicitud"
                    >
                      <EditIcon color="disabled" />
                    </div>
              : <div
                  style={disabledSimple}
                  title="El rol catalogador no permite editar una solicitud"
                >
                  <EditIcon color="disabled" />
                </div>
            }

            {showCopy &&
              // (!readOnly ? (
                (params.row.stateId === 3 || params.row.stateId === 5 || params.row.stateId === 12) ? (
                  <div
                    style={disabledSimple}
                    title="No se puede copiar esta solicitud en el estado actual"
                  >
                    <FileCopyIcon color="disabled" />
                  </div>
                ) : (
                  ((rolesByUser.filter(e => ([40,42]).includes(e.id))).length>0) 
                    ? (<div
                      style={simple}
                      onClick={() => {
                        handleCopy(params.row);
                      }}
                      title="Copiar solicitud"
                    >
                      <FileCopyIcon />
                    </div>)
                    : (<div
                      style={disabledSimple}
                      title="No se puede copiar esta solicitud con el rol actual"
                    >
                      <FileCopyIcon color="disabled" />
                    </div>)
                )
            }
          </div>
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

  const validateDeleted = () => {
    if (rowSelected.length === 0) {
      setError("No ha seleccionado materiales para borrar", 2000);
    } else {
      setOpenDelete(true);
    }
  };

  const validateError = (value) => {
    if (value === 0 || value === "") {
      return ["Campo requerido"];
    } else {
      return [];
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClose = () => {
    setErrorApprover([]);
    setAprobador(0);
    setOpen(false);
  };

  const validateSelected = () => {
    if (rowSelected.length === 0) {
      setError("No ha seleccionado materiales para enviar a aprobación", 2000);
    } else {
      const selects = allMaterial
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

  const handleChangeApprover = (e) => {
    const { value } = e.target;
    setErrorApprover(validateError(value));
    setAprobador(value);
  };

  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 4
      );

      const havePermission = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_R_MTR"
      );
      if (!havePermission) {
        alert("No tiene permiso");
        history.push("/");
      }
      const isApplicant = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_C_MTR"
      );
      const isEdit = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_U_MTR"
      );
      if (isApplicant) {
        setIsApplicantState(true);
      }
      if (isEdit) {
        setIsEditable(true);
      }
      const isApprover = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_AP_MTR"
      );

      if (isApprover) {
        getInitialData(flow);
      } else if (isApplicant) {
        getMaterialByUser(moduleMaterials[0].userId, flow);
      }

      setUserActivity(moduleMaterials[0].userId);

      setCurrentUser({
        createdBy: moduleMaterials[0].userId,
      });
    }
  }, [responseData]);

  const detailMaterial = (item) => {
    history.push({
      pathname: "/Materiales/Detalle",
      state: item,
    });
  };

  const editMaterial = (item) => {
    history.push({
      pathname: "/Materiales/Modificar",
      state: item,
    });
  };

  const CreateMaterial = (_flow) => {
      setFlow(_flow)
      parseInt(_flow)===1 ? history.push("/Materiales/Crear") : parseInt(_flow)===2 && history.push("/Materiales/ServiciosCrear")
  };

  const handleCloseSnack = () => {
    clear();
  };

  const handleCopyRequest = () => {
    let data = {
      "numeroSolicitud": openModalCopy.itemId,
      "nombreMaterial": InfoMaterialRequest.materialName,
      "empresaActual": openModalCopy.typeCompany,
      "nuevaEmpresa": openModalCopy.newCompany,
      "createdBy": openModalCopy.createdBy
    }
    setcopyFromRequest(data)
    setError(dataCopyFromRequest)
  }

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArrayList} />
      <h3 className="TitleView">Gestión de solicitudes CORE</h3>
      <HeaderDataGrid
        isFiltered={isFiltered}
        showBtn={isApplicantState}
        labelButton={`Nueva solicitud`}
        optionsButtons={['Solicitud de material', 'Solicitud de servicio']}
        handleOnClick={CreateMaterial}
        showFilters={allMaterial && allMaterial.length > 0}
        pwd="CORE"
        role={rolesByUser}
      >
        <Filters iconFilter={false} />
      </HeaderDataGrid>
      <DataGridList
        head={columns}
        data={allMaterial}
        setRows={(row) => {
          setRowSelected(row);
        }}
        checkVisible={false}
        border="none"
      />
      <SnackBarCommon
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
                // listOpt={listApprovers}
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
              // onClick={confirmCancelDialog}
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
              // onClick={confirmCancelDialogDelete}
            >
              SI
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={openModalCopy.check}
        onClose={()=>setOpenModalCopy({...openModalCopy, check:false})}
      >
        <div style={{ display: "flex" }} >
          <DialogTitle id="alert-dialog-title" className=" mx-auto">
            Creaci&oacute;n y copia del material
          </DialogTitle>
          <IconButton aria-label="close" onClick={()=>setOpenModalCopy(false)}>
            <CloseIcon style={{ color: "#9F9D9D" }} />
          </IconButton>
        </div>
        <DialogContent dividers>
          <Box noValidate component="form" sx={{ display: 'flex', flexDirection:"column", m:'2rem auto', width:'80%' }} >
            
            <Box noValidate component="form" sx={{ display: 'flex', justifyContent:'space-between', paddingBottom:'1.5rem' }} >
              <div style={{width:'20rem'}}>
                <InputCustom
                  label={"Numero de solicitud:"}
                  disabled
                  name={"requestNumber"}
                  value={openModalCopy.itemId}
                  placeholder="(Campo Bloqueado)"
                  widthInput={"fullInput"}
                  max={13}
                  maxLength={13}
                />
              </div>
              <div style={{width:'20rem'}}>
                <InputCustom
                  label={"Nombre material:"}
                  disabled
                  name={"materialName"}
                  value={InfoMaterialRequest.materialName}
                  placeholder="(Campo Bloqueado)"
                  widthInput={"fullInput"}
                  max={13}
                  maxLength={13}
                />
              </div>
            </Box>
            
            <DialogContentText>Seleccione la empresa a la cual desea generar la copia</DialogContentText>
            
            <Box noValidate component="form" sx={{ display: 'flex', justifyContent:'space-between', paddingTop:'1rem' }} >
              <div style={{width:'20rem'}}>
                <InputCustom
                  label={"Empresa actual:"}
                  disabled
                  name={"currentCompany"}
                  value={openModalCopy.currentCompany}
                  placeholder="(Campo Bloqueado)"
                  widthInput={"fullInput"}
                  max={13}
                  maxLength={13}
                />
              </div>
              <div style={{width:'20rem'}}>
                <SearchSelect
                  label={"Empresa nueva:"}
                  name={"newCompany"}
                  // listOpt={companyMDS}
                  listOpt={openModalCopy.listCompany}
                  placeholder="Seleccione la empresa"
                  valueId={openModalCopy.newCompany}
                  autoFocus={true}
                  optionList={"typeCompany"}
                  onChange={(e)=>setOpenModalCopy({...openModalCopy, newCompany:e.target.value})}
                />
              </div>
            </Box>

          </Box>

          <SnackBarCommon
            error={Error}
            success={Success}
            errorMessage={MessageError}
            successMessage={MessageSuccess}
            handleCloseSnack={handleCloseSnack}
          />

        </DialogContent>
        <DialogActions style={{margin:'1rem 2rem 1rem 0'}}>
          <Button className="ButtonCancelarModal" onClick={()=>setOpenModalCopy({...openModalCopy, check:false})}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="ButtonAcceptModal"
            autoFocus
            style={{color:"white"}}
            onClick={handleCopyRequest}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      <br />
      <br />

    </>
  );
};
