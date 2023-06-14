import * as Types from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case Types.LOAD_MODULE_USER_PERMISSIONS_BY_USER:
      return {
        ...state,
        headerModuleUserPermissions: payload.data
    };

    case Types.LOAD_ROLES_BY_USER:
      return {
        ...state,
        rolesByUser: payload.data.responseData
    };

    default:
      return state;
  }
};