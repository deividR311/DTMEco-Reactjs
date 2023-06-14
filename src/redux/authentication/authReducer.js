import * as Types from '../types';

const initialState = {
  isLogged : null,
  data : {},
  loginTime: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOGIN_USER:
      return { 
        ...state,
        isLogged: payload.isLogged,
        data: payload.data,
        loginTime: payload.loginTime
      };

    case Types.LOGIN_USER_FAILED:
      return { 
        ...state,
        isLogged: payload.isLogged,
        data: payload.data
      };

    case Types.LOG_OUT:
      return {
        isLogged : null,
        data : {},
        loginTime: null
      };

      case Types.UPDATE_LOGIN_TIME:
        return {
          loginTime: payload.loginTime
        };

    default:
      return state;
  }
}