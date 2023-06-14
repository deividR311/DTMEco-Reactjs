import * as Types from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, { type, payload, clientId }) => {
  switch (type) {
    case Types.LOAD_REQUEST_CREATE_COSTUMER_LIST:
      return {
        ...state,
        requestUserCreateList: payload,
      };

    case Types.LOAD_GENERAL_COSTUMER_LISTS:
      return {
        ...state,
        generalCostumerList: payload,
      };

    case Types.CREATE_GENERAL_COSTUMER_SUCCESS:
      return {
        ...state,
        createGeneralCostumerSuccess: payload,
        clientId: clientId,
      };

    case Types.CREATE_GENERAL_COSTUMER_FAILED:
      return {
        ...state,
        createGeneralCostumerFailed: payload,
      };

    case Types.UPDATE_COSTUMER_SUCCESS:
      return {
        ...state,
        updateCostumerSuccess: payload,
      };

    case Types.UPDATE_COSTUMER_FAILED:
      return {
        ...state,
        updateCostumerFailed: payload,
      };

    case Types.LOAD_MDS_EXIST_COSTUMER:
      return {
        ...state,
        existCostumerMDS: payload,
      };

    case Types.LOAD_EXIST_COSTUMER:
      return {
        ...state,
        existCostumer: payload,
      };

    case Types.LOAD_VERIFICATION_CODE_COSTUMER:
      return {
        ...state,
        verificationCode: payload,
      };

    case Types.LOAD_DOCUMENT_TYPE:
      return {
        ...state,
        documentType: payload,
      };

    case Types.UPLOAD_COSTUMER_FILE_SUCCESS:
      return {
        ...state,
        uploadFileSuccess: payload,
      };

    case Types.UPLOAD_COSTUMER_FILE_FAILED:
      return {
        ...state,
        uploadFileFailed: payload,
      };

    case Types.LOAD_ALL_USER_REQUEST:
      return {
        ...state,
        allUserRequestList: payload,
      };

    case Types.DELETE_CLIENT_REQUEST_SUCCESS:
      return {
        ...state,
        deleteClientRequestSuccess: payload,
      };

    case Types.DELETE_CLIENT_REQUEST_FAILED:
      return {
        ...state,
        deleteClientRequestFailed: payload,
      };

    case Types.LOAD_REQUEST_BY_ID:
      return {
        ...state,
        requestById: payload,
      };

    case Types.LOAD_REJECTION_REASONS:
      return {
        ...state,
        rejectionReasons: payload,
      };

    case Types.LOAD_RETURN_REASONS:
      return {
        ...state,
        returnReasons: payload,
      };

    case Types.LOAD_FUNCTION_COSTUMER_LISTS:
      return {
        ...state,
        costumerFunctionList: payload,
      };

    case Types.SAVE_APPROVER_MANAGE_SUCCESS:
      return {
        ...state,
        saveApproverManageSuccess: payload,
      };

    case Types.SAVE_APPROVER_MANAGE_FAILED:
      return {
        ...state,
        saveApproverManageFailed: payload,
      };
    case Types.GET_LIST_LEVEL_TWO:
      return {
        ...state,
        ListsLevelTwo: payload,
      };

    default:
      return state;
  }
};
