import { API_COMMON, API_MATERIAL } from "./axios-http-caller";

class ServicesService {
  //GET MDS
  getList = async (listId) => {
    const params = JSON.stringify(listId);
    return await API_COMMON.get(`/MaterialList?listRequest=${params}`);
  };

  //GET
  getStateRequest = async () => {
    return await API_MATERIAL.get(`/api/MaterialsState`);
  };
  getAllServices = async () => {
    return await API_MATERIAL.get(`/api/ServiceRequest`);
  };
  getServicesByUser = async (userId) => {
    return await API_MATERIAL.get(`/api/ServiceRequest/${userId}`);
  };
  getHistoryById = async (id) => {
    return await API_MATERIAL.get(`/api/ServiceHistory/${id}`);
  };
  getCauses = async (id) => {
    return await API_MATERIAL.get(`/api/Cause/${id}`);
  };

  //POST
  createService = async (serviceRequest) => {
    return await API_MATERIAL.post(`/api/ServiceRequest`, serviceRequest);
  };
  setStateService = async (data) => {
    return await API_MATERIAL.post(`/api/ServiceHistory`, data);
  };

  //PUT
  editService = async (serviceRequest) => {
    return await API_MATERIAL.put(`/api/ServiceRequest`, serviceRequest);
  };
}
export default new ServicesService();
