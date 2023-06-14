import authenticationService from "../../services/authentication-service";
import * as Types from "../types";
import {
  finishLoading,
  startLoading,
  startRefreshUserPermissions,
  finishRefreshUserPermissions,
} from "../ui/uiActions";

export const authUser = (data) => {
  let errorData;

  return (dispatch) => {
    dispatch(startLoading());
    dispatch(startRefreshUserPermissions());
    if (!/\S+@ecopetrol\.com\.co$/g.test(data.user)) {
      errorData = {
        data: {
          code: 412,
          message: "Dominio no corresponde a la entidad",
        },
      };
      dispatch(loginFailed(false, errorData));
      dispatch(finishLoading());
      dispatch(finishRefreshUserPermissions());
      dispatchClearLoginFailed(dispatch);
    } else {
      authenticationService
        .login(data)
        .then((response) => {
          dispatch(login(true, response.data));
          dispatch(finishLoading());
          dispatch(finishRefreshUserPermissions());
        })
        .catch((error) => {
          console.table({
            response: error.response,
            err: error,
            code: error.code,
          });

          if (error.response) {
            dispatch(loginFailed(false, error.response));
          } else {
            errorData = {
              data: {
                code: error.code,
                message: error.message,
              },
            };
            dispatch(loginFailed(false, errorData));
          }
 
          dispatchClearLoginFailed(dispatch);
          dispatch(finishLoading());
          dispatch(finishRefreshUserPermissions());
        });
    }
  };
};

export const dispatchClearLoginFailed = (dispatch) => {
  setTimeout(() => {
    dispatch(
      clearLoginFailed()
    );
  }, 3000)
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(logOut());
  };
};

export const login = (isLogged, data) => ({
  type: Types.LOGIN_USER,
  payload: {
    isLogged: isLogged,
    data: data,
    loginTime: new Date()
  },
});

export const loginFailed = (isLogged, data) => ({
  type: Types.LOGIN_USER_FAILED,
  payload: {
    isLogged: isLogged,
    data: data,
  },
});

export const clearLoginFailed = () => ({
  type: Types.LOGIN_USER_FAILED,
  payload: {
    isLogged: null,
    data: {},
  },
});

export const logOut = () => ({
  type: Types.LOG_OUT,
});

export const updateLoginTime = () => ({
  type: Types.UPDATE_LOGIN_TIME,
  payload: {
    loginTime: new Date()
  },
});
