export const LOAD_ALL_USERS = "@@admin/load_all_users";
export const LOAD_ALL_ROLES = "@@admin/load_all_roles";
export const LOAD_ALL_USER_STATES = "@@admin/load_all_user_states";
export const CREATE_USER_SUCCESS = "@@admin/create_user_success";
export const CREATE_USER_FAILED = "@@admin/create_user_failed";
export const EDIT_USER_SUCCESS = "@@admin/edit_user_success";
export const EDIT_USER_FAILED = "@@admin/edit_user_failed";
export const USER_ASSIGN_ROLES_SUCCESS = "@@admin/user_assign_roles_success";
export const USER_ASSIGN_ROLES_FAILED = "@@admin/user_assign_roles_failed";

export const LOAD_MODULE_USER_PERMISSIONS_BY_USER =
  "@@header/load_module_user_permissions_by_user";
export const LOAD_ROLES_BY_USER = "@@header/load_roles_by_user";

export const LOAD_REQUEST_CREATE_COSTUMER_LIST =
  "@@costumer/load_request_create_costumer_list";
export const LOAD_GENERAL_COSTUMER_LISTS =
  "@@costumer/load_general_costumer_lists";
export const CREATE_GENERAL_COSTUMER_SUCCESS =
  "@@costumer/create_general_costumer_success";
export const CREATE_GENERAL_COSTUMER_FAILED =
  "@@costumer/create_general_costumer_failed";
export const LOAD_MDS_EXIST_COSTUMER = "@@costumer/load_mds_exist_costumer";
export const LOAD_EXIST_COSTUMER = "@@costumer/load_exist_costumer";
export const LOAD_VERIFICATION_CODE_COSTUMER =
  "@@costumer/load_verification_code_costumer";
export const UPDATE_COSTUMER_SUCCESS = "@@costumer/update_costumer_success";
export const UPDATE_COSTUMER_FAILED = "@@costumer/update_costumer_failed";
export const LOAD_DOCUMENT_TYPE = "@@costumer/load_document_type";
export const UPLOAD_COSTUMER_FILE_SUCCESS =
  "@@costumer/upload_costumer_file_success";
export const UPLOAD_COSTUMER_FILE_FAILED =
  "@@costumer/upload_costumer_file_failed";
export const LOAD_ALL_USER_REQUEST = "@@costumer/load_all_user_request";
export const DELETE_CLIENT_REQUEST_SUCCESS =
  "@@costumer/delete_client_request_success";
export const DELETE_CLIENT_REQUEST_FAILED =
  "@@costumer/delete_client_request_failed";
export const LOAD_REQUEST_BY_ID = "@@costumer/load_request_by_id";
export const LOAD_REJECTION_REASONS = "@@costumer/load_rejection_reasons";
export const LOAD_RETURN_REASONS = "@@costumer/load_return_reasons";
export const SAVE_APPROVER_MANAGE_SUCCESS =
  "@@costumer/save_approver_manage_success";
export const SAVE_APPROVER_MANAGE_FAILED =
  "@@costumer/save_approver_manage_failed";
export const LOAD_FUNCTION_COSTUMER_LISTS =
  "@@costumer/load_function_costumer_lists";
export const GET_LIST_LEVEL_TWO = "GET_LIST_LEVEL_TWO";

export const LOAD_REQUEST_CREATE_USER_LIST =
  "@@roles/load_request_create_user_list";
export const LOAD_ROLES_ALL = "@@roles/load_roles_all";
export const LOAD_ALL_ROLES_SUBMODULES = "@@roles/load_all_roles_submodules";
export const LOAD_ALL_MASTER_DATA = "@@roles/load_all_master_data";
export const CREATE_ROLE_SUCCESS = "@@roles/create_role_success";
export const CREATE_ROLE_FAILED = "@@roles/create_role_failed";
export const EDIT_ROLE_SUCCESS = "@@roles/edit_role_success";
export const EDIT_ROLE_FAILED = "@@roles/edit_role_failed";

//MANEJAR ERRORES
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";

//SHARED_TYPES
export const GET_COMPANY_MDS = "GET_COMPANY_MDS";
export const GET_STATE_REQUEST = "GET_STATE_REQUEST";

//MATERIALES
export const GET_LISTS = "GET_LISTS";
export const LOAD_ALL_MATERIAL = "LOAD_ALL_MATERIAL";
export const INFO_MATERIAL_REQUEST = "INFO_MATERIAL_REQUEST";
export const SET_DATA_MATERIAL = "SET_DATA_MATERIAL";
export const GET_HISTORY_BY_ID = "GET_HISTORY_BY_ID";
export const GET_LISTS_MATERIAL = "GET_LISTS_MATERIAL";
export const GET_MATERIAL_FILTERED = "GET_MATERIAL_FILTERED";

export const SET_DATA_DATOS_GENERALES = "SET_DATA_DATOS_GENERALES";
export const SET_DATA_DATOS_BASICOS = "SET_DATA_DATOS_BASICOS";
export const SET_DATA_NIVELES_ORGANIZACION = "SET_DATA_NIVELES_ORGANIZACION";
export const SET_DATA_AREA_VENTA = "SET_DATA_AREA_VENTA";
export const SET_DATA_OILGAS = "SET_DATA_OILGAS";
export const SET_DATA_GESTION_COMPRAS = "SET_DATA_GESTION_COMPRAS";
export const SET_DATA_PLANIFICACION_NECESIDAD =
  "SET_DATA_PLANIFICACION_NECESIDAD";
export const SET_DATA_DATALMACENAMIENTO = "SET_DATA_DATALMACENAMIENTO";
export const SET_DATA_CONTABILIDAD = "SET_DATA_CONTABILIDAD";
export const SET_DATA_COSTOS = "SET_DATA_COSTOS";
export const SET_DATA_INFORMACION_ADICIONAL = "SET_DATA_INFORMACION_ADICIONAL";
export const SET_DATA_VENTA = "SET_DATA_VENTA";

// OPTION COPY REQUEST MATERIAL / SERVICE
export const POST_COPY_REQUEST = "POST_COPY_REQUEST";

//SERVICES
export const GET_CAUSES = "GET_CAUSES";
export const CREATE_SERVICE = "CREATE_SERVICE";
export const GET_ALL_SERVICE = "GET_ALL_SERVICE";
export const GET_LISTS_SERVICE = "GET_LISTS_SERVICE";
export const GET_SERVICE_FILTERED = "GET_SERVICE_FILTERED";
export const GET_HISTORY_BY_ID_SERVICE = "GET_HISTORY_BY_ID_SERVICE";

//TYPE_MATERIAL
export const TYPE_MATERIAL = "TYPE_MATERIAL";
export const TYPE_MATERIAL_SERVICE = "TYPE_MATERIAL_SERVICE";

// MATERIAL NO CORE

export const GET_MATERILA_NO_CORE_LIST_CATALOGERS =
  "GET_MATERILA_NO_CORE_LIST_CATALOGERS";
export const GET_MATERILA_NO_CORE_PACKAGE_FILTERED =
  "GET_MATERILA_NO_CORE_PACKAGE_FILTERED";
export const GET_MATERILA_NO_CORE_LIST_CATALOGERS_SEND =
  "GET_MATERILA_NO_CORE_LIST_CATALOGERS_SEND";
export const GET_MATERILA_NO_CORE_PAREN_TMATERIAL_OF_HERS =
  "GET_MATERILA_NO_CORE_PAREN_TMATERIAL_OF_HERS";

export const SET_ID = "SET_ID";
export const IS_BACK = "IS_BACK";
export const TAM_LOTE = "TAM_LOTE";
export const GET_STATE = "GET_STATE";
export const GET_MOTIVOS = "GET_MOTIVOS";
export const GET_APPROVERS = "GET_APPROVERS";
export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const GET_TYPE_MATERIAL = "GET_TYPE_MATERIAL";
export const SET_EXIST_MATERIAL = "SET_EXIST_MATERIAL";
export const GET_DEFAULT_VALUES = "GET_DEFAULT_VALUES";
export const GET_HISTORY_MATERIAL = "GET_HISTORY_MATERIAL";
export const GET_DESCRIPTION_LONG = "GET_DESCRIPTION_LONG";
export const SET_EXIST_MATERIAL_HERS = "SET_EXIST_MATERIAL_HERS";
export const CREATE_MATERIAL_NO_CORE = "CREATE_MATERIAL_NO_CORE";
export const UPDATE_MATERIAL_NO_CORE = "UPDATE_MATERIAL_NO_CORE";
export const GET_ALL_MATERIAL_NOCORE = "GET_ALL_MATERIAL_NOCORE";
export const SET_DELETE_MODIFICATIONS = "SET_DELETE_MODIFICATIONS";
export const GET_LISTS_MATERIAL_NOCORE = "GET_LISTS_MATERIAL_NOCORE";
export const GET_MATERILA_NO_CORE_LIST = "GET_MATERILA_NO_CORE_LIST";
export const CARACTERISTICAS_PLAN_NECES = "CARACTERISTICAS_PLAN_NECES";
export const SET_MATERIAL_NO_CORE_DETAIL = "SET_MATERIAL_NO_CORE_DETAIL";
export const GET_MATERILA_NO_CORE_PACKAGE = "GET_MATERILA_NO_CORE_PACKAGE";
export const GET_PLANIFICACION_NECESIDADES = "GET_PLANIFICACION_NECESIDADES";
export const GET_MATERIAL_NO_CORE_FILTERED = "GET_MATERIAL_NO_CORE_FILTERED";

export const GET_MODIFICACTIONS_IN_SAVED_STATE =
  "GET_MODIFICACTIONS_IN_SAVED_STATE";

export const GET_ARRAY_MODIFY = "GET_ARRAY_MODIFY";
export const GET_CONFIGURATION_INPUT = "GET_CONFIGURATION_INPUT";
export const GET_MODIFICACTIONS_IN_SAVED_STATE_BASE =
  "GET_MODIFICACTIONS_IN_SAVED_STATE_BASE";
export const SET_CREATE_MATERIAL_NO_CORE_MODIFIFY_PACKE =
  "SET_CREATE_MATERIAL_NO_CORE_MODIFIFY_PACKE";
export const SAVE_MATERIAL_NO_CORE_MODIFY = "SAVE_MATERIAL_NO_CORE_MODIFY";
export const GET_TYPE_REQUEST_MODIFY = "GET_TYPE_REQUEST_MODIFY";
export const GET_MATERIAL_NO_CORE_MODIFY_DETAILS =
  "GET_MATERIAL_NO_CORE_MODIFY_DETAILS";
export const GET_MATERIAL_NO_CORE_MODIFY_DETAILS_FULL =
  "GET_MATERIAL_NO_CORE_MODIFY_DETAILS_FULL";
