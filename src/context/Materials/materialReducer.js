import * as Types from "../types";

export default (state, { type, payload, action }) => {
  switch (type) {
    case Types.LOAD_ALL_MATERIAL:
      return {
        ...state,
        allMaterial: payload,
        allMaterialBase: payload,
      };
    case Types.GET_MATERIAL_FILTERED:
      return {
        ...state,
        allMaterial: payload,
        isFiltered: action,
      };
    case Types.GET_STATE_REQUEST:
      return {
        ...state,
        stateRequest: payload,
      };
    case Types.GET_HISTORY_BY_ID:
      return {
        ...state,
        historyById: payload,
      };
    case Types.GET_COMPANY_MDS:
      return {
        ...state,
        companyMDS: payload,
      };
    case Types.GET_LISTS:
      return {
        ...state,
        lists: payload,
      };
    case Types.SET_SUCCESS:
      return {
        ...state,
        Success: payload,
        MessageSuccess: action,
      };
    case Types.SET_ERROR:
      return {
        ...state,
        Error: payload,
        MessageError: action,
      };
    case Types.TYPE_MATERIAL:
      return {
        ...state,
        typeMaterial: payload,
      };
    case Types.GET_CONFIGURATION_INPUT:
      return {
        ...state,
        configurationInputs: payload,
      };
    case Types.INFO_MATERIAL_REQUEST:
      return {
        ...state,
        InfoMaterialRequest: payload,
      };
    case Types.SET_DATA_DATOS_BASICOS:
      return {
        ...state,
        dataDatosBasicos: payload,
      };
    case Types.SET_DATA_DATOS_GENERALES:
      return {
        ...state,
        dataDatosGenerales: payload,
      };
    case Types.SET_DATA_NIVELES_ORGANIZACION:
      return {
        ...state,
        dataNivelesOrganizacion: payload,
      };
    case Types.SET_DATA_AREA_VENTA:
      return {
        ...state,
        dataAreaVenta: payload,
      };
    case Types.SET_DATA_OILGAS:
      return {
        ...state,
        dataOilGas: payload,
      };
    case Types.SET_DATA_VENTA:
      return {
        ...state,
        dataVenta: payload,
      };
    case Types.SET_DATA_GESTION_COMPRAS:
      return {
        ...state,
        dataGestionCompras: payload,
      };
    case Types.SET_DATA_PLANIFICACION_NECESIDAD:
      return {
        ...state,
        dataPlanificacionNecesidad: payload,
      };
    case Types.SET_DATA_DATALMACENAMIENTO:
      return {
        ...state,
        dataDatAlmacenamiento: payload,
      };
    case Types.SET_DATA_CONTABILIDAD:
      return {
        ...state,
        dataContabilidad: payload,
      };
    case Types.SET_DATA_INFORMACION_ADICIONAL:
      return {
        ...state,
        dataInformacionAdicional: payload,
      };
    case Types.POST_COPY_REQUEST:
      return {
        ...state,
        dataCopyFromRequest: payload,
        // msgCopyFromRequest: action,
      };
    default:
      return state;
  }
};
