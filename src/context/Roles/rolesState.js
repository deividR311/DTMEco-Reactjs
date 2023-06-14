import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import rolesService from '../../services/roles-service';
import * as Types from '../types';
import RolesContext from './rolesContext';
import rolesReducer from './rolesReducer';
import { startLoading, finishLoading, startRefreshUserPermissions,
  finishRefreshUserPermissions } from '../../redux/ui/uiActions';

const RolesState = (props) => {
  const initialState = {
    allRoles : [],
    allSubModules : [],
    allMasterData : [],
    createRoleSuccess : false,
    createRoleFailed : false,
    editRoleSuccess : false,
    editRoleFailed : false,
    ErrorMessage : '',
  };

  const [state, dispatch] = useReducer(rolesReducer, initialState);
  const dispatchRedux = useDispatch();

  const loadAllRoles = () => {
    dispatchRedux(startLoading());
    rolesService.getAllRoles()
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.LOAD_ROLES_ALL, payload: response });
    });
  };

  const loadAllSubModules = (filter) => {
    dispatchRedux(startLoading());
    rolesService.getAllSubModules(filter)
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.LOAD_ALL_ROLES_SUBMODULES, payload: response });
    });
  };

  const loadAllMasterData = () => {
    dispatchRedux(startLoading());
    rolesService.getAllMasterData()
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.LOAD_ALL_MASTER_DATA, payload: response });
    });
  };

  const createRole = ( data ) => {
    dispatchRedux(startLoading());
    dispatchRedux(startRefreshUserPermissions());
    rolesService.createRole( data )
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatchRedux(finishRefreshUserPermissions());
      dispatch({ type: Types.CREATE_ROLE_SUCCESS, payload: true });
    }).catch(( error ) => {
      dispatchRedux(finishLoading());
      dispatchRedux(finishRefreshUserPermissions());
      dispatch({ type: Types.CREATE_ROLE_FAILED, payload: true, message: `${error.response !== undefined ? error.response.data : ''}` });
    })
  };

  const editRole = ( data ) => {
    dispatchRedux(startLoading());
    dispatchRedux(startRefreshUserPermissions());
    rolesService.editRole( data )
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatchRedux(finishRefreshUserPermissions());
      dispatch({ type: Types.EDIT_ROLE_SUCCESS, payload: true });
    }).catch(( error ) => {
      dispatchRedux(finishLoading());
      dispatchRedux(finishRefreshUserPermissions());
      dispatch({ type: Types.EDIT_ROLE_FAILED, payload: true });
    })
  };

  const cleareditRoleFailed = () => {
    dispatch({ type: Types.EDIT_ROLE_SUCCESS, payload: false });
  }

  const cleareditRolesuccess = () => {
    dispatch({ type: Types.EDIT_ROLE_FAILED, payload: false });
  }

  const clearcreateRoleFailed = () => {
    dispatch({ type: Types.CREATE_ROLE_SUCCESS, payload: false, message: '' });
  }

  const clearcreateRolesuccess = () => {
    dispatch({ type: Types.CREATE_ROLE_FAILED, payload: false, userId: '' });
  }

  return (
    <RolesContext.Provider
      value={{
        allRoles: state.allRoles,
        allSubModules: state.allSubModules,
        allMasterData: state.allMasterData,
        createRoleSuccess: state.createRoleSuccess,
        createRoleFailed: state.createRoleFailed,
        editRoleSuccess: state.editRoleSuccess,
        editRoleFailed: state.editRoleFailed,
        ErrorMessage: state.ErrorMessage,
        loadAllRoles,
        loadAllSubModules,
        loadAllMasterData,
        createRole,
        editRole,
        cleareditRoleFailed,
        cleareditRolesuccess,
        clearcreateRoleFailed,
        clearcreateRolesuccess
      }}
    >
      {props.children}
    </RolesContext.Provider>
  );
};

export default RolesState;