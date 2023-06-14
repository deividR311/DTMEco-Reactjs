import React, { useState } from 'react';
import { Container, Grid, Paper, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { DialogCommon, NavBreadCrumb, SnackBarCommon } from '../../../../../../sharedComponents';
import { CreateEditUserBtns, CreateEditUserForm } from './components';
import TransferListCommon2 from '../../../../../../sharedComponents/TransferListCommon/TransferListCommon2';

const AdminCreateEditUser = ({
  classes, allUserStates, adminCreateUserNames, handleOnChange, dataUser, didSubmit, allRoles,
  handleAssignPermissions, handleValidations, createUserSuccess, createUserFailed, specificError,
  handleCloseSnack, messageSpecificError, history, regexEmailOnChange, allEditRoles, medium,
  transferListTitles, updateValue
}) => {
  const navBreadCrumbArray = [
    { path: '/', active: '', word: 'Inicio' },
    { path: '/Admin/Consultar', active: '', word: 'Listado de usuarios' },
    { path: '/Admin/Consultar', active: 'BreadCrumb__link--active', word: `${medium !== 'editar' ? 'Creación de nuevo ' : 'Edición de'} usuario` }
  ];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmCancelDialog = () => {
    setOpen(false);
    goBack();
  }

  const goBack = () => {
    history.goBack();
  }

  return(
    <>
      <NavBreadCrumb
        path={navBreadCrumbArray}
      />
      <Button onClick={goBack} className={classes.goBackBtn} variant="outlined" color="primary" startIcon={<ArrowBackIosIcon />}>
        Regresar
      </Button>
      <h3 className="admin__createTitle">
        {medium !== 'editar' ? 'Creación de nuevo ' : 'Edición de'} usuario
      </h3>
      <div className="admin__ctnForm">
        { allUserStates.length > 0 &&
          <CreateEditUserForm
            adminCreateUserNames={adminCreateUserNames}
            handleOnChange={handleOnChange}
            regexEmailOnChange={regexEmailOnChange}
            classes={classes}
            medium={medium}
            dataUser={dataUser}
            isRequired={didSubmit}
            allUserStates={allUserStates}
            updateValue={updateValue}
          />
        }
      </div>
      <Paper className={classes.PaperPermissionsCtn}>
        <Container className={classes.ctnPermissions}>
          <h5 className={classes.rolesTitle}>Roles:</h5>
          <TransferListCommon2
            allOptions={allRoles}
            handleAssignPermissions={handleAssignPermissions}
            allEditOptions={allEditRoles}
            medium={medium}
            transferListTitles={transferListTitles}
            classes={classes}
          />
        </Container>
      </Paper>
      <div className="admin__btnsFormCtn">
        <Grid container>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <CreateEditUserBtns
              handleValidations={handleValidations}
              classes={classes}
              handleClickOpen={handleClickOpen}
            />
          </Grid>
        </Grid>
      </div>
      <SnackBarCommon
        success={createUserSuccess}
        error={createUserFailed || specificError}
        handleCloseSnack={handleCloseSnack}
        successMessage={ medium === 'crear' ? 'Usuario creado correctamente' : 'Usuario editado correctamente'}
        errorMessage={messageSpecificError}
      />
      <DialogCommon
        open={open}
        handleClose={handleClose}
        title="Cancelar"
        medium={medium}
        messageEdit="¿Está seguro que desea cancelar la edición de la información?"
        messageCreate="¿Está seguro que desea cancelar la creación de la información?"
        confirmCancelDialog={confirmCancelDialog}
        classes={classes}
      />
    </>
  );
}

export default AdminCreateEditUser;
