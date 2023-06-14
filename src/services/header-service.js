import { API_ADMIN } from "./axios-http-caller";

class HeaderService {

    getModuleUserPermission = async ( email ) => {
        return await API_ADMIN.get(`/UserGroup/${email}`);
    }

    getRolesByUser = async ( userId ) => {
        return await API_ADMIN.get(`/Group/${userId}`);
    }

}

export default new HeaderService();