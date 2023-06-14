import { API_COMMON, API_MATERIAL } from "./axios-http-caller";
class MaterialService {
  //GET MDS
  getList = async (listId) => {
    const params = JSON.stringify(listId);
    return await API_COMMON.get(`/MaterialList?listRequest=${params}`);
  };

  //GET
  getStateRequest = async () => {
    return await API_MATERIAL.get(`/api/MaterialsState`);
  };
  getAllMaterial = async () => {
    return await API_MATERIAL.get(`/api/MaterialsRequest`);
  };

  // Obtener información de la creación del material por medio del id
  getInfoMaterialRequest = async (id) => {
    return await API_MATERIAL.get(`/api/MaterialsRequest/ById/${id}`);
  }

  getMaterialByUser = async (id) => {
    return await API_MATERIAL.get(`/api/MaterialsRequest/ByUser/${parseInt(id)}`);
  };
  getHistoryById = async (id) => {
    return await API_MATERIAL.get(`/api/MaterialsHistory/ById/${id}`);
  };
  //Obtener la configuración de los campos de crear material
  getConfigurationInputs = async (configuration) => {
    return await API_MATERIAL.get(`/api/ConfiguracionCampos?configuraciones=${configuration}`);
  }

  // Configuration Jhonathan
  getConfigurationInputs = async (configuration) => {
    return await API_MATERIAL.get(`/api/ConfiguracionCampos?configuraciones=${configuration}`);
  }



  //POST
  setStateMaterial = async (data) => {
    return await API_MATERIAL.post(`/api/MaterialsHistory`, data);
  };
  createMaterial = async (data) => {
    return await API_MATERIAL.post(`/api/MaterialsRequest`, data);
  };
  //
  copyFromRequest = async (data) => {
    return await API_MATERIAL.post(`/api/MaterialsRequest/copyFromRequest`, data);
  };

  //PUT
  editMaterial = async (data) => {
    return await API_MATERIAL.put(`/api/MaterialsRequest`, data);
  };
}
export default new MaterialService();
