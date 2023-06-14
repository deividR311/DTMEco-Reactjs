import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import * as Types from "../types";
import costumerService from "../../services/costumer-service";
import CostumerContext from "./costumerContext";
import costumerReducer from "./costumerReducer";
import { startLoading, finishLoading } from "../../redux/ui/uiActions";

const CostumerState = (props) => {
  const initialState = {
    requestUserCreateList: [],
    generalCostumerList: [],
    existCostumerMDS: "",
    existCostumer: "",
    createGeneralCostumerSuccess: false,
    createGeneralCostumerFailed: false,
    clientId: "",
    verificationCode: "",
    updateCostumerSuccess: false,
    updateCostumerFailed: false,
    documentType: [],
    uploadFileSuccess: false,
    uploadFileFailed: false,
    allUserRequestList: [],
    deleteClientRequestSuccess: false,
    deleteClientRequestFailed: false,
    requestById: "",
    rejectionReasons: [],
    returnReasons: [],
    saveApproverManageSuccess: false,
    saveApproverManageFailed: false,
    costumerFunctionList: "",
    ListsLevelTwo: [],
  };

  const [state, dispatch] = useReducer(costumerReducer, initialState);

  const dispatchRedux = useDispatch();

  const loadRequestUserCreateList = (listId) => {
    dispatchRedux(startLoading());
    costumerService.getRequestUserCreateList(listId).then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_REQUEST_CREATE_COSTUMER_LIST,
        payload: response.data.responseData,
      });
    });
  };

  const loadGeneralCostumerLists = (listId) => {
    dispatchRedux(startLoading());
    costumerService.getGeneralCostumerLists(listId).then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_GENERAL_COSTUMER_LISTS,
        payload: response.data.responseData,
      });
    });
  };

  const loadExistCostumerMDS = (data) => {
    dispatchRedux(startLoading());
    costumerService.getExistCostumerMDS(data).then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_MDS_EXIST_COSTUMER,
        payload: response.data.responseData,
      });
    });
  };

  const loadExistCostumer = (data) => {
    dispatchRedux(startLoading());
    costumerService.getExistCostumer(data).then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_EXIST_COSTUMER,
        payload: response.data.responseData,
      });
    });
  };

  const getListMDSlevel2 = (listId) => {
    dispatchRedux(startLoading());
    costumerService.getListLevel2(listId).then((response) => {
      dispatch({
        type: Types.GET_LIST_LEVEL_TWO,
        payload: response.data.responseData,
      });
      dispatchRedux(finishLoading());
    });
  };

  const loadVerificationCode = (nit) => {
    dispatchRedux(startLoading());
    costumerService.getVerificationCode(nit).then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_VERIFICATION_CODE_COSTUMER,
        payload: response.data.responseData,
      });
    });
  };

  const loadDocumentType = () => {
    dispatchRedux(startLoading());
    costumerService.getDocumentType().then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_DOCUMENT_TYPE,
        payload: response.data.responseData,
      });
    });
  };

  const loadAllUserRequest = (data) => {
    dispatchRedux(startLoading());
    costumerService.getAllUserRequest(data).then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_ALL_USER_REQUEST,
        payload: response.data.responseData,
      });
    });
  };

  const createGeneralCostumer = (data) => {
    dispatchRedux(startLoading());
    costumerService
      .createGeneralCostumer(data)
      .then((response) => {
        dispatchRedux(finishLoading());
        dispatch({
          type: Types.CREATE_GENERAL_COSTUMER_SUCCESS,
          payload: true,
          clientId: response.data.responseData,
        });
      })
      .catch((error) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.CREATE_GENERAL_COSTUMER_FAILED, payload: true });
      });
  };

  const updateCostumer = (data) => {
    dispatchRedux(startLoading());
    costumerService
      .updateCostumer(data)
      .then((response) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.UPDATE_COSTUMER_SUCCESS, payload: true });
      })
      .catch((error) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.UPDATE_COSTUMER_FAILED, payload: true });
      });
  };

  const updateCostumerLevelTwo = (data, levelTwo) => {
    dispatchRedux(startLoading());
    costumerService
      .updateCostumer(data)
      .then((response) => {
        saveApproverManage(levelTwo);
        dispatchRedux(finishLoading());
        dispatch({ type: Types.UPDATE_COSTUMER_SUCCESS, payload: true });
      })
      .catch((error) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.UPDATE_COSTUMER_FAILED, payload: true });
      });
  };

  const uploadCostumerFile = (data) => {
    dispatchRedux(startLoading());
    costumerService
      .uploadCostumerFile(data)
      .then((response) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.UPLOAD_COSTUMER_FILE_SUCCESS, payload: true });
      })
      .catch((error) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.UPLOAD_COSTUMER_FILE_FAILED, payload: true });
      });
  };

  const deleteCostumerRequest = (data) => {
    dispatchRedux(startLoading());
    costumerService
      .deleteUserRequest(data)
      .then((response) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.DELETE_CLIENT_REQUEST_SUCCESS, payload: true });
      })
      .catch((error) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.DELETE_CLIENT_REQUEST_FAILED, payload: true });
      });
  };

  const loadRequestById = (requestId) => {
    dispatchRedux(startLoading());
    costumerService.getRequestById(requestId).then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_REQUEST_BY_ID,
        payload: response.data.responseData[0],
      });
    });
  };

  const loadRejectionReasons = () => {
    dispatchRedux(startLoading());
    costumerService.getRejectionReasons().then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_REJECTION_REASONS,
        payload: response.data.responseData,
      });
    });
  };

  const loadReturnReasons = () => {
    dispatchRedux(startLoading());
    costumerService.getReturnReasons().then((response) => {
      dispatchRedux(finishLoading());
      dispatch({
        type: Types.LOAD_RETURN_REASONS,
        payload: response.data.responseData,
      });
    });
  };

  const saveApproverManage = (data) => {
    dispatchRedux(startLoading());
    costumerService
      .saveApproverManage(data)
      .then((response) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.SAVE_APPROVER_MANAGE_SUCCESS, payload: true });
      })
      .catch((error) => {
        dispatchRedux(finishLoading());
        dispatch({ type: Types.SAVE_APPROVER_MANAGE_FAILED, payload: true });
      });
  };

  const clearsaveApproverManageFailed = () => {
    dispatch({ type: Types.SAVE_APPROVER_MANAGE_SUCCESS, payload: false });
  };

  const clearsaveApproverManageSuccess = () => {
    dispatch({ type: Types.SAVE_APPROVER_MANAGE_FAILED, payload: false });
  };

  const clearUploadCostumerFileFailed = () => {
    dispatch({ type: Types.UPLOAD_COSTUMER_FILE_FAILED, payload: false });
  };

  const clearUploadCostumerFileSuccess = () => {
    dispatch({ type: Types.UPLOAD_COSTUMER_FILE_SUCCESS, payload: false });
  };

  const clearUpdateCostumerFailed = () => {
    dispatch({ type: Types.UPDATE_COSTUMER_FAILED, payload: false });
  };

  const clearUpdateCostumerSuccess = () => {
    dispatch({ type: Types.UPDATE_COSTUMER_SUCCESS, payload: false });
  };

  const clearCreateGeneralCostumerFailed = () => {
    dispatch({ type: Types.CREATE_GENERAL_COSTUMER_FAILED, payload: false });
  };

  const clearCreateGeneralCostumerSuccess = () => {
    dispatch({ type: Types.CREATE_GENERAL_COSTUMER_SUCCESS, payload: false });
  };

  const loadFucntionCostumerList = (calnalId, sectorId) => {
    dispatch(startLoading());
    costumerService
      .getFunctionCostumerLists(calnalId, sectorId)
      .then((response) => {
        dispatch(finishLoading());
        dispatch({
          type: Types.LOAD_FUNCTION_COSTUMER_LISTS,
          payload: response.data.responseData,
        });
      });
  };

  return (
    <CostumerContext.Provider
      value={{
        requestUserCreateList: state.requestUserCreateList,
        generalCostumerList: state.generalCostumerList,
        createGeneralCostumerSuccess: state.createGeneralCostumerSuccess,
        createGeneralCostumerFailed: state.createGeneralCostumerFailed,
        existCostumerMDS: state.existCostumerMDS,
        existCostumer: state.existCostumer,
        verificationCode: state.verificationCode,
        updateCostumerSuccess: state.updateCostumerSuccess,
        updateCostumerFailed: state.updateCostumerFailed,
        clientId: state.clientId,
        documentType: state.documentType,
        uploadFileSuccess: state.uploadFileSuccess,
        uploadFileFailed: state.uploadFileFailed,
        allUserRequestList: state.allUserRequestList,
        deleteClientRequestSuccess: state.deleteClientRequestSuccess,
        deleteClientRequestFailed: state.deleteClientRequestFailed,
        requestById: state.requestById,
        rejectionReasons: state.rejectionReasons,
        returnReasons: state.returnReasons,
        saveApproverManageSuccess: state.saveApproverManageSuccess,
        saveApproverManageFailed: state.saveApproverManageFailed,
        costumerFunctionList: state.costumerFunctionList,
        loadRequestUserCreateList,
        loadGeneralCostumerLists,
        loadFucntionCostumerList,
        createGeneralCostumer,
        loadExistCostumerMDS,
        loadExistCostumer,
        loadVerificationCode,
        clearCreateGeneralCostumerFailed,
        clearCreateGeneralCostumerSuccess,
        updateCostumer,
        updateCostumerLevelTwo,
        clearUpdateCostumerFailed,
        clearUpdateCostumerSuccess,
        loadDocumentType,
        uploadCostumerFile,
        clearUploadCostumerFileFailed,
        clearUploadCostumerFileSuccess,
        loadAllUserRequest,
        deleteCostumerRequest,
        loadRequestById,
        loadRejectionReasons,
        loadReturnReasons,
        saveApproverManage,
        clearsaveApproverManageFailed,
        clearsaveApproverManageSuccess,
        getListMDSlevel2,
        ListsLevelTwo: state.ListsLevelTwo,
      }}
    >
      {props.children}
    </CostumerContext.Provider>
  );
};

export default CostumerState;
