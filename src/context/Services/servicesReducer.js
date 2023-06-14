import * as Types from "../types";

export default (state, { type, payload, action, time }) => {
  switch (type) {
    case Types.SET_SUCCESS:
      return {
        ...state,
        Time: time,
        Success: payload,
        MessageSuccess: action,
      };
    case Types.SET_ERROR:
      return {
        ...state,
        Time: time,
        Error: payload,
        MessageError: action,
      };
    case Types.GET_COMPANY_MDS:
      return {
        ...state,
        companyMDS: payload,
      };

    case Types.GET_ALL_SERVICE:
      return {
        ...state,
        allService: payload,
        allServiceBase: payload,
      };
    case Types.GET_SERVICE_FILTERED:
      return {
        ...state,
        allService: payload,
        isFiltered: action,
      };
    case Types.GET_STATE_REQUEST:
      return {
        ...state,
        stateRequest: payload,
      };
    case Types.GET_LISTS_SERVICE:
      return {
        ...state,
        ListsMDS: payload,
      };
    case Types.GET_HISTORY_BY_ID_SERVICE:
      return {
        ...state,
        historyById: payload,
      };
    case Types.GET_CAUSES:
      return {
        ...state,
        listCauses: payload,
      };
    default:
      return state;
  }
};
