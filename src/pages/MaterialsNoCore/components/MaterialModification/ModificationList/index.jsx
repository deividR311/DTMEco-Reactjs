import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Grid } from "@material-ui/core";
import { HeaderDataGridModify } from "./components";
import { useContext, useEffect, useState } from "react";
import { forceLoadUrl } from "../../../../../utils/Function";
import DataGridList from "../../../../Materials/widgets/DataGrid";
import { breadCrumbConsultaModificacion } from "../../../constants";
import { ModalCusntomModifi } from "./components/ModalModification";
import {
  Footer,
  NavBreadCrumb,
  SnackBarCommon,
} from "../../../../../sharedComponents";
import HeaderContext from "../../../../../context/Header/headerContext";
import MaterialNoCore from "../../../../../context/MaterialsNoCore/materialsNoCoreContext";

export const ModificationList = () => {
  const history = useHistory();
  const materialsNoCore = useContext(MaterialNoCore);
  const [ListMaterials, setListMaterials] = useState([]);
  const {
    DeleteModifications,
    resultDeleteModifications,
    getModificationsInSavedState,
    listMaterialModificationstate,
    setCreateMaterialNoCoreModifyPackage,
  } = materialsNoCore;

  const { clear, Time, Error, Success, MessageError, MessageSuccess } =
    materialsNoCore;

  useEffect(() => {
    if (listMaterialModificationstate.length > 0) {
      setListMaterials(listMaterialModificationstate);
    }
  }, [listMaterialModificationstate]);
  const goCreateModification = () => {
    history.push("/MaterialesNoCore/CreacionModificacion");
  };
  const customStylesCell = (color) => {
    let hexColor = "";
    let colorText = "";
    let label = "";
    switch (color) {
      case 7:
        label = "Guardado";
        colorText = "white";
        hexColor = "#02A24E";
        break;
    }

    let fullColor = {
      borderRadius: "30px",
      background: hexColor,
      color: colorText,
      height: "30px",
      width: "95%",
      justifyContent: "center",
      display: "flex",
      alignContent: "center",
      flexWrap: "wrap",
    };
    return { color: fullColor, label: label };
  };
  const modifyItem = (id) => {
    history.push(`/MaterialesNoCore/EditarModificacion/${id}`);
  };
  const columns = [
    {
      field: "codigoSap",
      headerName: "Codigo material",
      "min-width": 0,
      width: 135,
      disableColumnMenu: true,
      border: "none",
    },
    {
      field: "shortDescription",
      headerName: "Descripción corta",
      "min-width": 0,
      width: 300,
      disableColumnMenu: true,
      border: "none",
    },
    {
      field: "lastModified",
      headerName: "Fecha de modificación",
      "min-width": 0,
      width: 150,
      disableColumnMenu: true,
      border: "none",
    },
    {
      field: "typeMaterials",
      headerName: "Tipo del material",
      "min-width": 0,
      width: 150,
      disableColumnMenu: true,
      border: "none",
    },
    {
      field: "statusId",
      headerName: "Estado",
      "min-width": 0,
      width: 200,
      disableColumnMenu: true,
      border: "none",
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div style={customStylesCell(params.value).color}>
            {customStylesCell(params.value).label}
          </div>
        );
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      disableColumnMenu: true,
      border: "none",
      disableColumnMenu: true,
      renderCell: (params) => {
        const simple = {
          marginRight: "10px",
          cursor: "pointer",
          color: "#0e0c5a",
        };
        return (
          <div
            style={simple}
            onClick={() => {
              modifyItem(params.id);
            }}
          >
            <EditIcon />
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

  const [selectRoesGrid, setSelectRoesGrid] = useState([]);
  const [getFilters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [meenssage, setMeenssage] = useState({
    error: false,
    meenssage: "",
    title: "",
  });
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;
  const [currentUser, setCurrentUser] = useState();
  const [openModalSend, setOpenModalSend] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [mensajeSuccess, setMensajeSuccess] = useState("");

  useEffect(() => {
    const { data, returnMessage } = resultDeleteModifications;
    if (data) {
      setOpenModal(false);
      forceLoadUrl("/MaterialesNoCore/ConsultaModificacion");
    }
  }, [resultDeleteModifications]);

  useEffect(() => {
    if (responseData !== undefined) {
      setCurrentUser(responseData[0].userId);
      getModificationsInSavedState(responseData[0].userId);
    }
  }, [responseData]);

  useEffect(() => {
    if (currentUser !== undefined) {
    }
  }, []);

  useEffect(() => {
    const validObj = Object.keys(getFilters);
    const datos = listMaterialModificationstate;
    if (validObj.length > 0) {
      if (
        validObj[0] === "codigoMaterial" &&
        getFilters.codigoMaterial !== ""
      ) {
        setListMaterials(
          datos.filter((item) =>
            item.codigoSap.toString().includes(getFilters.codigoMaterial)
          )
        );
      } else if (validObj[0] === "tipoMaterial") {
        if (getFilters.tipoMaterial !== "Todos") {
          setListMaterials(
            datos.filter(
              (item) =>
                item.typeMaterials.toString() === getFilters.tipoMaterial
            )
          );
        } else {
          setListMaterials(listMaterialModificationstate);
        }
      } else if (
        validObj[0] === "searchKeywords" &&
        getFilters.searchKeywords !== ""
      ) {
        setListMaterials(
          datos.filter((item) =>
            item.search
              .toLowerCase()
              .includes(getFilters.searchKeywords.toLowerCase())
          )
        );
      } else {
        setListMaterials(listMaterialModificationstate);
      }
    }
  }, [getFilters]);

  const onErase = () => {
    if (selectRoesGrid.length > 0) {
      setOpenModal(true);
      setMeenssage({
        error: false,
        meenssage: "¿Está seguro de eliminar los registros seleccionados?",
        title: "Eliminar materiales",
      });
    } else {
      setOpenModal(true);
      setMeenssage({
        error: true,
        meenssage:
          "Debe seleccionar al menos un material para para realizar el borrado",
        title: "Eliminar materiales",
      });
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handelConfirm = () => {
    const request = {
      modifiedBy: currentUser,
      materialIds: selectRoesGrid,
    };
    DeleteModifications(request);
  };

  const closeOpneModalSend = () => {
    setOpenModalSend(false);
  };

  useEffect(() => {
    if (Success) {
      setOpenModalSend(false);

      setTimeout(() => {
        forceLoadUrl("/MaterialesNoCore/GestionSolicitudes");
      }, Time);
    }
  }, [Success]);

  const handelConfirmSend = () => {
    const request = {
      CreateBy: currentUser,
      typeRequest: "TS_02",
      materialIds: selectRoesGrid,
    };
    setCreateMaterialNoCoreModifyPackage(request);
  };

  const sendRequest = () => {
    if (selectRoesGrid.length > 0) {
      setOpenModalSend(true);
      setMeenssage({
        error: false,
        meenssage:
          "¿Está seguro de crear  y enviar a Aprobación la solicitud de modificación con los materiales seleccionados?",
        title: "Envío de materiales para modificación y creación de solicitud",
      });
    } else {
      setOpenModalSend(true);
      setMeenssage({
        error: true,
        meenssage:
          "Debe seleccionar al menos un material para crear y enviar la solicitud de modificación",
        title: "Envío de materiales para modificación y creación de solicitud",
      });
    }
  };

  const handleCloseSnack = () => {
    clear();
  };

  return (
    <>
      <NavBreadCrumb path={breadCrumbConsultaModificacion} />
      <h3 className="TitleView">Modificación de materiales No Core</h3>
      <HeaderDataGridModify
        labelButton="Modificar material"
        handleOnClick={goCreateModification}
        getInput={(values) => {
          setFilters(values);
        }}
      />
      <Grid container>
        <Grid xs={12} style={{ paddingBottom: "2cm" }}>
          <DataGridList
            head={columns}
            data={ListMaterials}
            setRows={(item) => {
              setSelectRoesGrid(item);
            }}
          />
        </Grid>
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
                <Button className={`ButtonBackFooter btn`} onClick={onErase}>
                  Borrar
                </Button>
              </Grid>
              <Grid className="ContainerDetailButtons__items">
                <Button
                  className={`ButtonNextFooter btn`}
                  onClick={sendRequest}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <ModalCusntomModifi
        openModal={openModal}
        error={meenssage.error}
        handleClose={handleClose}
        titleModal={meenssage.title}
        handelConfirm={handelConfirm}
        bodyText={meenssage.meenssage}
      />
      <ModalCusntomModifi
        error={meenssage.error}
        openModal={openModalSend}
        titleModal={meenssage.title}
        bodyText={meenssage.meenssage}
        handleClose={closeOpneModalSend}
        handelConfirm={handelConfirmSend}
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
