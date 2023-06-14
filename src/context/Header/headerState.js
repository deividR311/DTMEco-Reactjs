import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import headerService from '../../services/header-service';
import * as Types from '../types';
import HeaderContext from './headerContext';
import headerReducer from './headerReducer';
import { startLoading, finishLoading } from '../../redux/ui/uiActions';

const HeaderState = (props) => {
  const initialState = {
    headerModuleUserPermissions : [],
    rolesByUser : []
  };

  const [state, dispatch] = useReducer(headerReducer, initialState);
  const dispatchRedux = useDispatch();

  const loadModuleUserPermission = ( email ) => {
    dispatchRedux(startLoading());
    headerService.getModuleUserPermission( email )
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.LOAD_MODULE_USER_PERMISSIONS_BY_USER, payload: response });
    });
  };

  const loadRolesByUser = ( userId ) => {
    dispatchRedux(startLoading());
    headerService.getRolesByUser( userId )
    .then(( response ) => {
      dispatchRedux(finishLoading());
      dispatch({ type: Types.LOAD_ROLES_BY_USER, payload: response });
    });
  };

  return (
    <HeaderContext.Provider
      value={{
        headerModuleUserPermissions: state.headerModuleUserPermissions,
        rolesByUser: state.rolesByUser,
        loadModuleUserPermission,
        loadRolesByUser
      }}
    >
      {props.children}
    </HeaderContext.Provider>
  );
};

export default HeaderState;