import * as Types from '../types';

export default (state, { type, payload, message }) => {
  switch (type) {
    
    case Types.LOAD_ROLES_ALL:
      return {
        ...state,
        allRoles: payload.data.responseData
    };

    case Types.LOAD_ALL_ROLES_SUBMODULES:
      return {
        ...state,
        allSubModules: payload.data.responseData
    };

    case Types.LOAD_ALL_MASTER_DATA:
      return {
        ...state,
        allMasterData: payload.data.responseData
    };

    case Types.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        createRoleSuccess: payload
    };

    case Types.CREATE_ROLE_FAILED:
      return {
        ...state,
        createRoleFailed: payload,
        ErrorMessage: message
    };

    case Types.EDIT_ROLE_SUCCESS:
      return {
        ...state,
        editRoleSuccess: payload
    };

    case Types.EDIT_ROLE_FAILED:
      return {
        ...state,
        editRoleFailed: payload
    };

    default:
      return state;
  }
};