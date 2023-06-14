import React, { useContext, useEffect, useState } from "react";
import { Button, Paper, Container, Grid } from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import { CreateEditRolButtons, CreateEditRolForm } from "./components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  NavBreadCrumb, SnackBarCommon,
  DialogCommon
} from "../../../../sharedComponents";
import { useStyles } from "../../styles";
import { CreateRolesNames, transferListTitles } from "../../constant";
import AdminContext from "../../../../context/Administration/adminContext";
import RolesContext from "../../../../context/Roles/rolesContext";
import HeaderContext from "../../../../context/Header/headerContext";
import TransferListCommon2 from "../../../../sharedComponents/TransferListCommon/TransferListCommon2";

const CreateEditRol = ({ match, location }) => {
  const history = useHistory();
  const classes = useStyles();
  const adminContext = useContext(AdminContext);
  const { allUserStates, loadAllUserStates } = adminContext;
  const rolesContext = useContext(RolesContext);
  const { allSubModules, loadAllSubModules, allMasterData,
    loadAllMasterData, createRoleSuccess, createRoleFailed, editRoleSuccess, editRoleFailed,
    createRole, editRole, cleareditRoleFailed, cleareditRolesuccess, clearcreateRoleFailed,
    clearcreateRolesuccess, ErrorMessage } = rolesContext;
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;
  const [subModules, setsubModules] = useState([]);
  const [arraySubModules, setArraySubModules] = useState([]);
  const [open, setOpen] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [specificError, setSpecificError] = useState(false);
  const [messageSpecificError, setMessageSpecificError] = useState('');
  const [rolData, setRolData] = useState({
    id: 0,
    name: '',
    stateId: '',
    typeDmId: '',
    createdBy: 0,
    modifiedBy: 0,
    submodules: []
  })
  let isValidate = false;
  const array = [];
  const { state } = location;
  const navBreadCrumbArray = [
    { path: '/', active: '', word: 'Inicio' },
    { path: '/Admin/Roles/Consultar', active: '', word: 'Gestión de roles' },
    { path: `${match.path === '/Admin/Roles/Crear' ? '/Admin/Roles/Crear' : '/Admin/Roles/Modificar'}`, active: 'BreadCrumb__link--active', word: `${match.path === '/Admin/RolesCrear' ? 'Creación de nuevo' : 'Editar'} rol` }
  ];

  useEffect(() => {
    loadAllUserStates();
    loadAllSubModules();
    loadAllMasterData();
  }, [])

  useEffect(() => {
    setRolData((prevState) => ({
      ...prevState,
      submodules: arraySubModules
    }))
  }, [arraySubModules])

  useEffect(() => {
    if (subModules.length > 0) {
      for (let i = 0; i < subModules.length; i++) {
        array.push(subModules[i].id)
        setArraySubModules(array);
      }
    } else {
      setArraySubModules([]);
    }
  }, [subModules])

  useEffect(() => {
    if (responseData !== undefined) {
      setRolData((prevState) => ({
        ...prevState,
        createdBy: responseData[0].userId
      }))
    }
  }, [responseData])

  useEffect(() => {
    if (state !== undefined && responseData !== undefined) {
      setRolData({
        id: state.id,
        name: state.name,
        stateId: state.stateId,
        typeDmId: state.typeDmId,
        createdBy: state.createdBy,
        modifiedBy: responseData[0].userId,
        submodules: state.subModules
      })
    }
  }, [responseData])

  const goBack = () => {
    history.goBack();
  };

  const handleAssignSubModules = (subModules) => {
    setsubModules(subModules);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setSpecificError(false);
    cleareditRoleFailed();
    clearcreateRoleFailed();
    cleareditRolesuccess();
    clearcreateRolesuccess();
  }

  const confirmCancelDialog = () => {
    setOpen(false);
    goBack();
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const [roleId] = allMasterData.filter((item) => item.id === value)
    if (roleId !== undefined) {
      loadAllSubModules(roleId.name)
    }
    setRolData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleValidations = () => {
    setMessageSpecificError('');
    setDidSubmit(true);
    setSpecificError(false);

    if (rolData.name === '' || rolData.stateId === '' || rolData.typeDmId === '') {
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError('Hay campos requeridos sin diligenciar');
    }

    if (rolData.submodules.length === 0) {
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError('Debes asignar al menos una operación para el rol');
    }

    if (!isValidate) {
      if (match.path === '/Admin/Roles/Crear') {
        createRole(rolData);
      } else {
        editRole(rolData);
      }
    }
  }

  if (createRoleSuccess || editRoleSuccess) {
    setTimeout(() => {
      history.push('/Admin/Roles/Consultar');
      cleareditRoleFailed();
      clearcreateRoleFailed();
      cleareditRolesuccess();
      clearcreateRolesuccess();
    }, 2000);
  }

  let editItemsLeft = allSubModules.filter(e => arraySubModules.indexOf(e.id) === -1);

  return (
    <>
      <NavBreadCrumb
        path={navBreadCrumbArray}
      />
      <Button onClick={goBack} className={classes.goBackBtn} variant="outlined" color="primary" startIcon={<ArrowBackIosIcon />}>
        Regresar
      </Button>
      <h3> {match.path === '/Admin/RolesCrear' ? 'Creación de nuevo' : 'Editar'} rol</h3>
      <CreateEditRolForm
        CreateRolesNames={CreateRolesNames}
        rolData={rolData}
        classes={classes}
        required={didSubmit}
        allStates={allUserStates}
        allMasterData={allMasterData}
        handleChange={handleOnChange}
      />
      <Paper className={classes.PaperPermissionsCtn}>
        <Container className={classes.ctnPermissions}>
          <h5 className={classes.rolesTitle}>Operaciones:</h5>
          {
            (
              <TransferListCommon2
                allOptions={match.path === '/Admin/RolesCrear' ? allSubModules : editItemsLeft}
                handleAssignPermissions={handleAssignSubModules}
                allEditOptions={state ? state.submodules : []}
                medium={match.path === '/Admin/RolesCrear' ? 'create' : 'editar'}
                transferListTitles={transferListTitles}
                classes={classes}
              />
            )
          }
        </Container>
      </Paper>
      <div className="roles__btnsFormCtn">
        <Grid container>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <CreateEditRolButtons
              handleValidations={handleValidations}
              classes={classes}
              handleClickOpen={handleClickOpen}
            />
          </Grid>
        </Grid>
      </div>
      <SnackBarCommon
        success={createRoleSuccess || editRoleSuccess}
        error={createRoleFailed || editRoleFailed || specificError}
        handleCloseSnack={handleCloseSnack}
        successMessage={match.path === '/Admin/RolesCrear' ? 'Rol creado correctamente' : 'Rol editado correctamente'}
        errorMessage={ErrorMessage !== undefined && ErrorMessage !== '' ? ErrorMessage : messageSpecificError}
      />
      <DialogCommon
        open={open}
        handleClose={handleClose}
        title="Cancelar"
        medium={match.path === '/Admin/RolesCrear' ? 'crear' : 'editar'}
        messageEdit="¿Está seguro que desea cancelar la edición de la información?"
        messageCreate="¿Está seguro que desea cancelar la creación de la información?"
        confirmCancelDialog={confirmCancelDialog}
        classes={classes}
      />
    </>
  );
};

export default withRouter(CreateEditRol);
