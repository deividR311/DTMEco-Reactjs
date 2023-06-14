import * as types from '../types';
import adminReducer from './adminReducer';

const initialState = {
    allUsers : [],
    allRoles : [],
    allUserStates : [],
    createUserSuccess : false,
    createUserFailed : false,
    ErrorMessage : '',
    userId : '',
    assignRolesSuccess : false,
    assignRolesFailed : false,
    editUserSuccess : false,
    editUserFailed : false
  };

describe('test adminReducer', () => {
    test('should return defect data', () => {
       const state = adminReducer(initialState, {});

       expect(state).toEqual(initialState);
    });

    test('should return allUsers data', () => {
        const allUsers = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_ALL_USERS,
            payload: allUsers
        };

        const state = adminReducer(initialState, action);

        expect(state.allUsers).toEqual(allUsers);
    });

    test('should return allRoles data', () => {
        const allRoles = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_ALL_ROLES,
            payload: allRoles
        };

        const state = adminReducer(initialState, action);

        expect(state.allRoles).toEqual(allRoles);
    });

    test('should return allUserStates data', () => {
        const allUserStates = [
            {listName: "claseCliente", list: []}
        ];

        const action = {
            type: types.LOAD_ALL_USER_STATES,
            payload: allUserStates
        };

        const state = adminReducer(initialState, action);

        expect(state.allUserStates).toEqual(allUserStates);
    });

    test('should return createUserSuccess', () => {
        const createUserSuccess = true;
        const userId = 1;

        const action = {
            type: types.CREATE_USER_SUCCESS,
            payload: createUserSuccess,
            userId: userId
        };

        const state = adminReducer(initialState, action);

        expect(state.createUserSuccess).toEqual(createUserSuccess);
    });

    test('should return createUserFailed', () => {
        const createUserFailed = true;
        const errorMessage = 'Error test message';

        const action = {
            type: types.CREATE_USER_FAILED,
            payload: createUserFailed,
            ErrorMessage: errorMessage
        };

        const state = adminReducer(initialState, action);

        expect(state.createUserFailed).toEqual(createUserFailed);
    });

    test('should return assignRolesSuccess', () => {
        const assignRolesSuccess = true;

        const action = {
            type: types.USER_ASSIGN_ROLES_SUCCESS,
            payload: assignRolesSuccess
        };

        const state = adminReducer(initialState, action);

        expect(state.assignRolesSuccess).toEqual(assignRolesSuccess);
    });

    test('should return assignRolesFailed', () => {
        const assignRolesFailed = true;

        const action = {
            type: types.USER_ASSIGN_ROLES_FAILED,
            payload: assignRolesFailed
        };

        const state = adminReducer(initialState, action);

        expect(state.assignRolesFailed).toEqual(assignRolesFailed);
    });

    test('should return editUserSuccess', () => {
        const editUserSuccess = true;

        const action = {
            type: types.EDIT_USER_SUCCESS,
            payload: editUserSuccess
        };

        const state = adminReducer(initialState, action);

        expect(state.editUserSuccess).toEqual(editUserSuccess);
    });

    test('should return editUserFailed', () => {
        const editUserFailed = true;

        const action = {
            type: types.EDIT_USER_FAILED,
            payload: editUserFailed
        };

        const state = adminReducer(initialState, action);

        expect(state.editUserFailed).toEqual(editUserFailed);
    });
});