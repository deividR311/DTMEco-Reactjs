import * as Types from '../types';

export const startLoading = () => ({
    type: Types.START_LOADING
})

export const finishLoading = () => ({
    type: Types.FINISH_LOADING
})

export const startRefreshUserPermissions = () => ({
    type: Types.START_REFRESH_USER_PERMISSIONS
})

export const finishRefreshUserPermissions = () => ({
    type: Types.FINISH_REFRESH_USER_PERMISSIONS
})