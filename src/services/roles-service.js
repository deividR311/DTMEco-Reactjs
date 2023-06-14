import { API_ADMIN } from "./axios-http-caller";

class RolesService {
  getAllRoles = async () => {
    return await API_ADMIN.get(`/Group/List`);
  };

  getAllSubModules = async (filter) => {
    return await API_ADMIN.get(`/Group/Submodules?filter=${filter}`);
  };

  getAllMasterData = async () => {
    return await API_ADMIN.get(`/TypeDm/List`);
  };

  createRole = async (data) => {
    return await API_ADMIN.post(`/Group/Create`, data);
  };

  editRole = async (data) => {
    return await API_ADMIN.put(`/Group/Update`, data);
  };
}

export default new RolesService();
