import * as Types from '../types';

const initialState = {
    loading: false,
    refreshPermissions: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.START_LOADING:
    return { 
      ...state,
      loading: true
    };

    case Types.FINISH_LOADING:
    return {
      ...state,
      loading: false
    };

    case Types.START_REFRESH_USER_PERMISSIONS:
    return { 
      ...state,
      refreshPermissions: true
    };

    case Types.FINISH_REFRESH_USER_PERMISSIONS:
    return {
      ...state,
      refreshPermissions: false
    };

    default:
      return state;
  }
}