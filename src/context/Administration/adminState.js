import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import administrationService from '../../services/administration-service';
import * as Types from '../types';
import AdminContext from './adminContext';
import adminReducer from './adminReducer';
import { startLoading, finishLoading, startRefreshUserPermissions, finishRefreshUserPermissions } from '../../redux/ui/uiActions';

const AdminState = (props) => {
  const initialState = {
    allUsers : [],
    allRoles : [],
    allUserStates : [],
    createUserSuccess : false,
    createUserFailed : false,
    ErrorMessage : '',
    userId : '',
    assignRolesSuccess : false,
    assignRolesFailed : false,
    editUserSuccess : false,
    editUserFailed : false
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);
  const dispatchRedux = useDispatch();

  const loadAllUsers = () => {
    dispatchRedux(startLoading());
    administrationService.getAllUsers()
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.LOAD_ALL_USERS, payload: response.data.responseData });
    });
  };

  const loadAllRoles = () => {
    dispatchRedux(startLoading());
    administrationService.getAllRoles()
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.LOAD_ALL_ROLES, payload: response.data.responseData });
    });
  };

  const loadAllUserStates = () => {
    dispatchRedux(startLoading());
    administrationService.getAllUserStates()
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.LOAD_ALL_USER_STATES, payload: response.data.responseData });
    });
  };

  const createUser = ( data ) => {
    dispatchRedux(startLoading());
    administrationService.createUser( data )
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.CREATE_USER_SUCCESS, payload: true, userId: response.data.responseData });
    }).catch(( error ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.CREATE_USER_FAILED, payload: true, message: `${error.response !== undefined ? error.response.data : ''}` });
    })
  };

  const UserAssignRoles = ( data ) => {
    dispatchRedux(startLoading());
    dispatchRedux(startRefreshUserPermissions());
    administrationService.UserAssignRoles( data )
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatchRedux(finishRefreshUserPermissions());
      dispatch({ type: Types.USER_ASSIGN_ROLES_SUCCESS, payload: true });
    }).catch(( error ) => {
      dispatchRedux(finishLoading());
      dispatchRedux(finishRefreshUserPermissions());
      dispatch({ type: Types.USER_ASSIGN_ROLES_FAILED, payload: true });
    })
  };

  const editUser = ( data ) => {
    dispatchRedux(startLoading());
    dispatchRedux(startRefreshUserPermissions());
    administrationService.editUser( data )
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatchRedux(finishRefreshUserPermissions());
      dispatch({ type: Types.EDIT_USER_SUCCESS, payload: true });
    }).catch(( error ) => {
      dispatchRedux(finishLoading());
      dispatchRedux(finishRefreshUserPermissions());
      dispatch({ type: Types.EDIT_USER_FAILED, payload: true });
    })
  };

  const cleareditUserFailed = () => {
    dispatch({ type: Types.EDIT_USER_SUCCESS, payload: false });
  }

  const cleareditUsersuccess = () => {
    dispatch({ type: Types.EDIT_USER_FAILED, payload: false });
  }

  const clearcreateUserFailed = () => {
    dispatch({ type: Types.CREATE_USER_FAILED, payload: false, message: '' });
  }

  const clearcreateUsersuccess = () => {
    dispatch({ type: Types.CREATE_USER_SUCCESS, payload: false, userId: '' });
  }

  const clearUserAssignRolesSuccess = () => {
    dispatch({ type: Types.USER_ASSIGN_ROLES_SUCCESS, payload: false });
  }

  const clearUserAssignRolesFailed = () => {
    dispatch({ type: Types.USER_ASSIGN_ROLES_FAILED, payload: false });
  }

  return (
    <AdminContext.Provider
      value={{
        allUsers: state.allUsers,
        allRoles: state.allRoles,
        allUserStates: state.allUserStates,
        createUserSuccess: state.createUserSuccess,
        createUserFailed: state.createUserFailed,
        ErrorMessage: state.ErrorMessage,
        userId: state.userId,
        assignRolesSuccess: state.assignRolesSuccess,
        assignRolesFailed: state.assignRolesFailed,
        editUserSuccess: state.editUserSuccess,
        editUserFailed: state.editUserFailed,
        loadAllUsers,
        loadAllRoles,
        loadAllUserStates,
        createUser,
        UserAssignRoles,
        clearUserAssignRolesSuccess,
        clearUserAssignRolesFailed,
        clearcreateUserFailed,
        clearcreateUsersuccess,
        editUser,
        cleareditUserFailed,
        cleareditUsersuccess
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;