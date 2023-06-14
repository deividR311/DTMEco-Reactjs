import * as Types from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, { type, payload, userId, message }) => {
  switch (type) {
    case Types.LOAD_ALL_USERS:
      return {
        ...state,
        allUsers: payload
    };

    case Types.LOAD_ALL_ROLES:
      return {
        ...state,
        allRoles: payload
    };

    case Types.LOAD_ALL_USER_STATES:
      return {
        ...state,
        allUserStates: payload
    };

    case Types.CREATE_USER_SUCCESS:
      return {
        ...state,
        createUserSuccess: payload,
        userId: userId
    };

    case Types.CREATE_USER_FAILED:
      return {
        ...state,
        createUserFailed: payload,
        ErrorMessage: message
    };

    case Types.USER_ASSIGN_ROLES_SUCCESS:
      return {
        ...state,
        assignRolesSuccess: payload,
    };

    case Types.USER_ASSIGN_ROLES_FAILED:
      return {
        ...state,
        assignRolesFailed: payload
    };

    case Types.EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserSuccess: payload
    };

    case Types.EDIT_USER_FAILED:
      return {
        ...state,
        editUserFailed: payload
    };

    default:
      return state;
  }
};
