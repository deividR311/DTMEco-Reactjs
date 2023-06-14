import {
  API_COMMON,
  API_MATERIAL_NO_CORE,
  mockAPiLocalhost,
} from "./axios-http-caller";

class MaterialServiceNoCore {
  //GET MDS
  getList = async (listId) => {
    const params = JSON.stringify(listId);
    return await API_COMMON.get(`/MaterialNoCoreList?listRequest=${params}`);
  };
  //GET MDS
  getDefaultValues = async (lists) => {
    const params = JSON.stringify(lists);
    return await API_COMMON.get(`/MaterialNoCoreList?listRequest=${params}`);
  };

  //GET
  getMaterialNoCoreMotivos = async (listId) => {
    const params = JSON.stringify(listId);
    return await API_MATERIAL_NO_CORE.get(
      `/api/MaterialCataloging/GetMaterialNoCoreMotivos?listRequest=${params}`
    );
  };
  //GET
  getAllMateriaNoCore = async () => {
    return await API_MATERIAL_NO_CORE.get(
      `/api/MaterialCataloging/GetAllMaterialsNoCore`
    );
  };
  //GET
  getAllMateriaNoCoreByUser = async (id) => {
    return await API_MATERIAL_NO_CORE.get(
      `/api/MaterialCataloging/GetAllMaterialsNoCore?usuario=${id}`
    );
  };
  //GET
  getMaterialNoCoreState = async (stateType) => {
    return await API_MATERIAL_NO_CORE.get(
      `/api/MaterialCataloging/GetMaterialNoCoreState?stateType=${stateType}`
    );
  };
  //GET
  getCaracteristicasPlanificacionNecesidades = async () => {
    return await API_MATERIAL_NO_CORE.get(
      `/api/MaterialCataloging/GetCaracteristicasPlanificacionNecesidades`
    );
  };
  //GET
  getTamanioLote = async () => {
    return await API_MATERIAL_NO_CORE.get(
      `/api/MaterialCataloging/GetTamanioLote`
    );
  };
  //GET
  getMaterialNoCoreDetail = async (id) => {
    return await API_MATERIAL_NO_CORE.get(
      `/api/MaterialCataloging/GetMaterialNoCoreDetails?id=${id}`
    );
  };

  //POST
  SaveMaterialNoCoreRequest = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `api/MaterialCataloging/SaveMaterialNoCoreRequest`,
      request
    );
  };

  //POST
  ChangePackageState = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `/api/MaterialCataloging/ChangePackageState`,
      request
    );
  };

  //POST
  ChangeRequestState = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `/api/MaterialCataloging/ChangeRequestState`,
      request
    );
  };

  //POST
  ChangeRequestStateApprove = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `/api/MaterialCataloging/ChangeRequestStateApprove`,
      request
    );
  };

  //POST
  packageMaterial = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `/api/MaterialCataloging/CreateMaterialNoCorePackage`,
      request
    );
  };

  //POST
  DeleteMaterials = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `/api/MaterialCataloging/DeleteMaterials`,
      request
    );
  };

  GetDescriptionLong = async (request) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetCatalogoMaterialByDescripcionCorta?descripcionCorta=${request}`
    );
  };

  GetHistoryMaterial = async (request) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetMaterialsNoCoreHistory?MaterialId=${request}`
    );
  };

  GetMaterialsNoCoreInDraftAndSavedState = async (request) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetMaterialsNoCoreInDraftAndSavedState?usuario=${request}`
    );
  };

  GetMaterialsNoCorePackage = async (request) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetMaterialsNoCorePackage?usuario=${request}`
    );
  };

  GetListOfCatalogers = async () => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetListOfCatalogers`
    );
  };

  getMaterialHers = async (request) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetParentMaterialOfHERS?request=${request}`
    );
  };

  getExistHersMaterial = async (manufacturer, partNumber) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetHERSMaterialByManufacturerAndPartNumber?fabricante=${manufacturer}&partNumber=${partNumber}`
    );
  };

  getApprovers = async () => {
    return await API_MATERIAL_NO_CORE.get(
      "api/MaterialCataloging/GetMaterialNoCoreApprovers"
    );
  };

  GetModificationsInSavedState = async (userId) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetModificationsInSavedState?usuario=${userId}`
    );
  };

  GetMaterialForModification = async (codigoSap) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetMaterialForModification?codigoSap=${codigoSap}`
    );
  };

  SetChangeApproverRequest = async (body) => {
    return await API_MATERIAL_NO_CORE.post(
      `api/MaterialCataloging/ChangeApproverRequest`,
      body
    );
  };

  exitsMaterialMds = async (body) => {
    return await API_MATERIAL_NO_CORE.post(
      `api/MaterialCataloging/GetExistingMaterialsMdsByLongDescription`,
      body
    );
  };

  SetDeleteModifications = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `api/MaterialCataloging/DeleteModifications`,
      request
    );
  };

  SaveMaterialNoCoreModify = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `api/MaterialCataloging/SaveMaterialNoCoreModify`,
      request
    );
  };

  setCreateMaterialNoCoreModifyPackage = async (request) => {
    return await API_MATERIAL_NO_CORE.post(
      `api/MaterialCataloging/CreateMaterialNoCoreModifyPackage`,
      request
    );
  };

  GetMaterialNoCoreModifyDetails = async (MaterialId) => {
    return await API_MATERIAL_NO_CORE.get(
      `api/MaterialCataloging/GetMaterialNoCoreModifyDetails?MaterialId=${MaterialId}`
    );
  };

  GetMaterialNoCoreModifyDetailChanges = async (MaterialId) => {
    return await API_MATERIAL_NO_CORE.get(
      `/api/MaterialCataloging/GetMaterialNoCoreModifyDetailChanges?MaterialId=${MaterialId}`
    );
  };
}
export default new MaterialServiceNoCore();
