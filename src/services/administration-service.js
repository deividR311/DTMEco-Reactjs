import { API_ADMIN } from "./axios-http-caller";

class AdministrationService {

    getAllUsers = async () => {
        return await API_ADMIN.get(`/User`);
    }

    getAllRoles = async () => {
        return await API_ADMIN.get(`/Group/List`);
    }

    getAllUserStates = async () => {
        return await API_ADMIN.get(`/State/1`);
    }

    createUser = async (data) => {
        return await API_ADMIN.post(`/User/Create`, data);
    }

    UserAssignRoles = async (data) => {
        return await API_ADMIN.put(`/UserGroup/Update`, data);
    }

    editUser = async (data) => {
        return await API_ADMIN.put(`/User/Update`, data);
    }
}

export default new AdministrationService();
