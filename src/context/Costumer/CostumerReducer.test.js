import * as types from '../types';
import costumerReducer from './costumerReducer';

const initialState = {
    requestUserCreateList : [],
    generalCostumerList : [],
    existCostumerMDS : '',
    existCostumer : '',
    createGeneralCostumerSuccess : false,
    createGeneralCostumerFailed : false,
    clientId : '',
    verificationCode : '',
    updateCostumerSuccess : false,
    updateCostumerFailed : false,
    documentType : [],
    uploadFileSuccess : false,
    uploadFileFailed : false,
    allUserRequestList : [],
    deleteClientRequestSuccess : false,
    deleteClientRequestFailed : false,
    requestById : '',
    rejectionReasons : [],
    returnReasons : [],
    saveApproverManageSuccess : false,
    saveApproverManageFailed : false,
    costumerFunctionList: ''
  };

describe('test costumerReducer', () => {
    test('should return defect data', () => {
       const state = costumerReducer(initialState, {});

       expect(state).toEqual(initialState);
    });

    test('should return requestUserCreateList data', () => {
        const requestUserCreateList = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_REQUEST_CREATE_COSTUMER_LIST,
            payload: requestUserCreateList
        };

        const state = costumerReducer(initialState, action);

        expect(state.requestUserCreateList).toEqual(requestUserCreateList);
    });

    test('should return generalCostumerList', () => {
        const generalCostumerList = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_GENERAL_COSTUMER_LISTS,
            payload: generalCostumerList
        };

        const state = costumerReducer(initialState, action);

        expect(state.generalCostumerList).toEqual(generalCostumerList);
    });

    test('should return createGeneralCostumerSuccess', () => {
        const createGeneralCostumerSuccess = true;
        const clientId = 1;

        const action = {
            type: types.CREATE_GENERAL_COSTUMER_SUCCESS,
            payload: createGeneralCostumerSuccess,
            clientId: clientId
        };

        const state = costumerReducer(initialState, action);

        expect(state.createGeneralCostumerSuccess).toEqual(createGeneralCostumerSuccess);
    });

    test('should return createGeneralCostumerFailed', () => {
        const createGeneralCostumerFailed = true;

        const action = {
            type: types.CREATE_GENERAL_COSTUMER_FAILED,
            payload: createGeneralCostumerFailed
        };

        const state = costumerReducer(initialState, action);

        expect(state.createGeneralCostumerFailed).toEqual(createGeneralCostumerFailed);
    });

    test('should return updateCostumerSuccess', () => {
        const updateCostumerSuccess = true;
        const clientId = 1;

        const action = {
            type: types.UPDATE_COSTUMER_SUCCESS,
            payload: updateCostumerSuccess,
            clientId: clientId
        };

        const state = costumerReducer(initialState, action);

        expect(state.updateCostumerSuccess).toEqual(updateCostumerSuccess);
    });

    test('should return updateCostumerFailed', () => {
        const updateCostumerFailed = true;

        const action = {
            type: types.UPDATE_COSTUMER_FAILED,
            payload: updateCostumerFailed
        };

        const state = costumerReducer(initialState, action);

        expect(state.updateCostumerFailed).toEqual(updateCostumerFailed);
    });

    test('should return existCostumerMDS', () => {
        const existCostumerMDS = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_MDS_EXIST_COSTUMER,
            payload: existCostumerMDS
        };

        const state = costumerReducer(initialState, action);

        expect(state.existCostumerMDS).toEqual(existCostumerMDS);
    });

    test('should return existCostumer', () => {
        const existCostumer = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_EXIST_COSTUMER,
            payload: existCostumer
        };

        const state = costumerReducer(initialState, action);

        expect(state.existCostumer).toEqual(existCostumer);
    });

    test('should return verificationCode', () => {
        const verificationCode = 0;

        const action = {
            type: types.LOAD_VERIFICATION_CODE_COSTUMER,
            payload: verificationCode
        };

        const state = costumerReducer(initialState, action);

        expect(state.verificationCode).toEqual(verificationCode);
    });

    test('should return documentType', () => {
        const documentType = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_DOCUMENT_TYPE,
            payload: documentType
        };

        const state = costumerReducer(initialState, action);

        expect(state.documentType).toEqual(documentType);
    });

    test('should return uploadFileSuccess', () => {
        const uploadFileSuccess = true;
        const clientId = 1;

        const action = {
            type: types.UPLOAD_COSTUMER_FILE_SUCCESS,
            payload: uploadFileSuccess,
            clientId: clientId
        };

        const state = costumerReducer(initialState, action);

        expect(state.uploadFileSuccess).toEqual(uploadFileSuccess);
    });

    test('should return uploadFileFailed', () => {
        const uploadFileFailed = true;

        const action = {
            type: types.UPLOAD_COSTUMER_FILE_FAILED,
            payload: uploadFileFailed
        };

        const state = costumerReducer(initialState, action);

        expect(state.uploadFileFailed).toEqual(uploadFileFailed);
    });

    test('should return allUserRequestList', () => {
        const allUserRequestList = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_ALL_USER_REQUEST,
            payload: allUserRequestList
        };

        const state = costumerReducer(initialState, action);

        expect(state.allUserRequestList).toEqual(allUserRequestList);
    });

    test('should return deleteClientRequestSuccess', () => {
        const deleteClientRequestSuccess = true;

        const action = {
            type: types.DELETE_CLIENT_REQUEST_SUCCESS,
            payload: deleteClientRequestSuccess
        };

        const state = costumerReducer(initialState, action);

        expect(state.deleteClientRequestSuccess).toEqual(deleteClientRequestSuccess);
    });

    test('should return deleteClientRequestFailed', () => {
        const deleteClientRequestFailed = true;

        const action = {
            type: types.DELETE_CLIENT_REQUEST_FAILED,
            payload: deleteClientRequestFailed
        };

        const state = costumerReducer(initialState, action);

        expect(state.deleteClientRequestFailed).toEqual(deleteClientRequestFailed);
    });

    test('should return requestById', () => {
        const requestById = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_REQUEST_BY_ID,
            payload: requestById
        };

        const state = costumerReducer(initialState, action);

        expect(state.requestById).toEqual(requestById);
    });

    test('should return rejectionReasons', () => {
        const rejectionReasons = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_REJECTION_REASONS,
            payload: rejectionReasons
        };

        const state = costumerReducer(initialState, action);

        expect(state.rejectionReasons).toEqual(rejectionReasons);
    });

    test('should return returnReasons', () => {
        const returnReasons = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_RETURN_REASONS,
            payload: returnReasons
        };

        const state = costumerReducer(initialState, action);

        expect(state.returnReasons).toEqual(returnReasons);
    });

    test('should return costumerFunctionList', () => {
        const costumerFunctionList = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_FUNCTION_COSTUMER_LISTS,
            payload: costumerFunctionList
        };

        const state = costumerReducer(initialState, action);

        expect(state.costumerFunctionList).toEqual(costumerFunctionList);
    });

    test('should return saveApproverManageSuccess', () => {
        const saveApproverManageSuccess = true;

        const action = {
            type: types.SAVE_APPROVER_MANAGE_SUCCESS,
            payload: saveApproverManageSuccess
        };

        const state = costumerReducer(initialState, action);

        expect(state.saveApproverManageSuccess).toEqual(saveApproverManageSuccess);
    });

    test('should return saveApproverManageFailed', () => {
        const saveApproverManageFailed = true;

        const action = {
            type: types.SAVE_APPROVER_MANAGE_FAILED,
            payload: saveApproverManageFailed
        };

        const state = costumerReducer(initialState, action);

        expect(state.saveApproverManageFailed).toEqual(saveApproverManageFailed);
    });
});