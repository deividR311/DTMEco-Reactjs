import { API_COMMON, API_CLIENT } from "./axios-http-caller";

class CostumerService {
  getRequestUserCreateList = async (listId) => {
    const params = JSON.stringify(listId);
    return await API_COMMON.get(`/List?listRequest=${params}`);
  };

  getListLevel2 = async (listId) => {
    const params = JSON.stringify(listId);
    return await API_COMMON.get(`/List?listRequest=${params}`);
  };

  getGeneralCostumerLists = async (listId) => {
    const params = JSON.stringify(listId);
    return await API_COMMON.get(`/List?listRequest=${params}`);
  };

  getExistCostumerMDS = async (data) => {
    const params = JSON.stringify(data);
    return await API_COMMON.get(`/Client?client=${params}`);
  };

  getExistCostumer = async (data) => {
    const params = JSON.stringify(data);
    return await API_CLIENT.get(`/ClientRequest/Validate?clientInfo=${params}`);
  };

  getVerificationCode = async (nit) => {
    return await API_CLIENT.get(`/VerificationCode?nif=${nit}`);
  };

  createGeneralCostumer = async (data) => {
    return await API_CLIENT.post(`/ClientRequest/Create`, data);
  };

  updateCostumer = async (data) => {
    return await API_CLIENT.put(`/ClientRequest/Update`, data);
  };

  getDocumentType = async () => {
    return await API_CLIENT.get(`/DocumentType`);
  };

  uploadCostumerFile = async (data) => {
    return await API_CLIENT.put(
      `/ClientRequest/Attach?requestId=${data.requestId}&documentTypeId=${data.documentTypeId}&stateId=${data.stateId}&createdby=${data.createdBy}&modifiedBy=${data.modifiedBy}`,
      data.file
    );
  };

  getAllUserRequest = async (data) => {
    const params = JSON.stringify(data);
    return await API_CLIENT.get(
      `/ClientRequest/List?clientRequestUserFilter=${params}`
    );
  };

  deleteUserRequest = async (data) => {
    return await API_CLIENT.delete(`/ClientRequest/Delete`, { data: data });
  };

  getRequestById = async (requestId) => {
    return await API_CLIENT.get(`/ClientRequest/${requestId}`);
  };

  getRejectionReasons = async () => {
    return await API_CLIENT.get(`/RejectionReason`);
  };

  getReturnReasons = async () => {
    return await API_CLIENT.get(`/ReturnReason`);
  };

  saveApproverManage = async (data) => {
    return await API_CLIENT.put(`/ClientRequest/Approver`, data);
  };

  getFunctionCostumerLists = async (canal, sector) => {
    return await API_CLIENT.get(
      `/CalculatedFields/FunctionCode?canal=${canal}&sector=${sector}`
    );
  };
}

export default new CostumerService();
