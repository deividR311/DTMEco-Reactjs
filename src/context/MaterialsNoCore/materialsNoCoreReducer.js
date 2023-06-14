import * as Types from "../types";

export default (state, { type, payload, action, time, options }) => {
  switch (type) {
    case Types.SET_SUCCESS:
      return {
        ...state,
        Time: time,
        Success: payload,
        MessageSuccess: action,
      };
    case Types.SET_ERROR:
      return {
        ...state,
        Time: time,
        Error: payload,
        MessageError: action,
      };
    case Types.GET_ALL_MATERIAL_NOCORE:
      return {
        ...state,
        allMaterialNoCore: payload,
        allMaterialNoCoreBase: payload,
      };
    case Types.GET_LISTS_MATERIAL_NOCORE:
      return {
        ...state,
        lists: payload,
      };
    case Types.GET_STATE:
      return {
        ...state,
        stateMaterialNoCore: payload,
      };
    case Types.GET_TYPE_MATERIAL:
      return {
        ...state,
        TypeMaterial: payload,
      };
    case Types.SET_ID:
      return {
        ...state,
        id: payload,
        successDraft: action,
        stepDraft: time,
      };
    case Types.GET_MATERIAL_NO_CORE_FILTERED:
      return {
        ...state,
        listMaterial: payload,
        isFiltered: action,
      };
    case Types.SET_MATERIAL_NO_CORE_DETAIL:
      return {
        ...state,
        materialNoCoreDetail: payload,
      };
    case Types.UPDATE_REQUEST:
      return {
        ...state,
        isUpdate: payload,
      };
    case Types.IS_BACK:
      return {
        ...state,
        isBack: payload,
      };
    case Types.CREATE_MATERIAL_NO_CORE:
      return {
        ...state,
        idMaterial: payload,
        existId: action,
      };
    case Types.UPDATE_MATERIAL_NO_CORE:
      return {
        ...state,
        updateMaterialNoCoreFlag: payload,
        formStep: action,
      };
    case Types.GET_MOTIVOS:
      return {
        ...state,
        listCauses: payload,
      };
    case Types.GET_DEFAULT_VALUES:
      return {
        ...state,
        defaultValuesShortDescription: payload,
      };
    case Types.GET_DESCRIPTION_LONG:
      return {
        ...state,
        descriptionLong: payload,
      };
    case Types.GET_HISTORY_MATERIAL:
      return {
        ...state,
        historyMaterial: payload,
      };
    case Types.GET_MATERILA_NO_CORE_LIST:
      return {
        ...state,
        listMaterial: payload,
        listMaterialBase: payload,
      };
    case Types.GET_MATERILA_NO_CORE_PACKAGE:
      return {
        ...state,
        materialsNoCorePackage: payload,
        materialsNoCorePackageBase: payload,
      };
    case Types.GET_MATERILA_NO_CORE_LIST_CATALOGERS:
      return {
        ...state,
        materialNoCoreListCatalogers: payload,
      };
    case Types.GET_MATERILA_NO_CORE_LIST_CATALOGERS_SEND:
      return {
        ...state,
        materialNoCoreListCatalogersSend: payload,
      };
    case Types.GET_MATERILA_NO_CORE_PAREN_TMATERIAL_OF_HERS:
      return {
        ...state,
        parentMaterialOfHERS: payload,
      };
    case Types.GET_MATERILA_NO_CORE_PACKAGE_FILTERED:
      return {
        ...state,
        materialsNoCorePackage: payload,
        isFilteredPackage: action,
      };
    case Types.SET_EXIST_MATERIAL:
      return {
        ...state,
        existMaterialMdsByLongDescription: payload,
      };
    case Types.SET_EXIST_MATERIAL_HERS:
      return {
        ...state,
        materialHers: payload,
      };
    case Types.GET_PLANIFICACION_NECESIDADES:
      return {
        ...state,
        caracteristicasPlanificacionNecesidades: payload,
      };
    case Types.TAM_LOTE:
      return {
        ...state,
        tamanioLote: payload,
      };
    case Types.GET_APPROVERS:
      return {
        ...state,
        listApprovers: payload,
      };
    case Types.GET_MODIFICACTIONS_IN_SAVED_STATE:
      return {
        ...state,
        listMaterialModificationstate: payload,
        listMaterialModificationstateBase: payload,
      };
    case Types.GET_MODIFICACTIONS_IN_SAVED_STATE_BASE:
      return {
        ...state,
        listMaterialModificationstateBase: payload,
      };
    case Types.SET_DELETE_MODIFICATIONS:
      return {
        ...state,
        resultDeleteModifications: payload,
      };
    case Types.SET_CREATE_MATERIAL_NO_CORE_MODIFIFY_PACKE:
      return {
        ...state,
        resultPackageModify: payload,
      };
    case Types.GET_ARRAY_MODIFY:
      return {
        ...state,
        arrayModify: payload,
      };
    case Types.SAVE_MATERIAL_NO_CORE_MODIFY:
      return {
        ...state,
        dataSaveMaterialNoCoreModify: payload,
      };
    case Types.GET_TYPE_REQUEST_MODIFY:
      return {
        ...state,
        typeRequestModify: payload,
      };
    case Types.GET_MATERIAL_NO_CORE_MODIFY_DETAILS:
      return {
        ...state,
        materialNoCoreModifyDetails: payload,
      };
    case Types.GET_MATERIAL_NO_CORE_MODIFY_DETAILS_FULL:
      return {
        ...state,
        materialNoCoreModifyDetailsFull: payload,
      };
    default:
      return state;
  }
};
