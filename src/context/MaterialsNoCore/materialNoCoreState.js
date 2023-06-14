import React from "react";
import * as Types from "../types";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import materialsNoCoreReducer from "./materialsNoCoreReducer";
import MaterialsNoCoreContext from "./materialsNoCoreContext";
import materialNoCoreService from "../../services/materials-nocore-service";

//loading REDUX
import { startLoading, finishLoading } from "../../redux/ui/uiActions";
import { clearLoginFailed } from "../../redux/authentication/authActions";

const MaterialNoCoreState = (props) => {
  //estado inicial de los estados del Context
  const initialState = {
    //MATERIAL NO CORE
    requestMaterial: {
      id: {},
      successDraft: false,
      stepDraft: 0,
    },
    descriptionLong: [],
    listMaterial: [],
    historyMaterial: [],
    materialNoCoreDetail: [],
    isFiltered: false,
    lists: [],
    TypeMaterial: [],
    ListBienesMDS: [],
    successDraft: false,
    allMaterialNoCore: [],
    stateMaterialNoCore: [],
    allMaterialNoCoreBase: [],
    materialsNoCorePackage: [],
    materialNoCoreListCatalogers: [],
    materialNoCoreListCatalogersSend: {},
    parentMaterialOfHERS: [],

    isUpdate: false,

    //MANEJAR ERRORES
    Time: 5000,
    Error: false,
    Success: false,
    MessageError: "",
    MessageSuccess: "",

    isBack: false,

    request: {
      id: 0,
      typeRequest: "",
      typeSupply: "",
      typeProcess: "",
      destinationService: "",
      manageService: "",
      logisticCenter: "",
      store: "",
      typeMaterials: "",
      price: 0,
      codeMaterials: "",
      stateId: 0,
      approverBy: 0,
      shortDescription: "",
      longDescription: "",
      measuredUnit: "",
      groupInternalArticle: "",
      groupExternalArticle: "",
      hierarchyProducts: "",
      internalNote: "",
      abcindicator: "",
      stockMax: 0,
      orderPoint: 0,
      manufacturer: "",
      partNumber: "",
      approver: "",
      observations: "",
      createdBy: 0,
      modifiedBy: 0,
      operation: 1,
      requestPhase: 1,
    },

    existId: false,
    idMaterial: 0,

    updateMaterialNoCoreFlag: false,
    formStep: 0,

    listCauses: [],
    defaultValuesShortDescription: [],

    listMaterialBase: [],

    caracteristicasPlanificacionNecesidades: [],
    tamanioLote: [],

    existMaterialMdsByLongDescription: {},
    materialHers: {},

    listApprovers: [],
    listMaterialModificationstate: [],
    listMaterialModificationstateBase: [],
    resultDeleteModifications: [],
    resultPackageModify: [],

    arrayModify: [],
    typeRequestModify: [],
    dataSaveMaterialNoCoreModify: {},

    materialNoCoreModifyDetails: {},
    materialNoCoreModifyDetailsFull: {},
  };

  const [state, dispatch] = useReducer(materialsNoCoreReducer, initialState);
  const dispatchRedux = useDispatch();

  /* MANEJAR ERRORES */
  const setSuccess = (msg, time) => {
    dispatch({
      type: Types.SET_SUCCESS,
      payload: true,
      action: msg,
      time: 10000,
    });
  };
  const setError = (msg, time) => {
    dispatch({
      type: Types.SET_ERROR,
      payload: true,
      action: msg,
      time: 10000,
    });
  };

  const clear = () => {
    dispatch({ type: Types.SET_ERROR, payload: false });
    dispatch({ type: Types.SET_SUCCESS, payload: false });
  };

  const showError = (data) => {
    let message = "Ha ocurrido un error inesperado.";
    if (data) {
      if (data.data) {
        if (data.data.data) {
          message = `${data.data.data}`;
        }
      }
    }
    setError(message, 10000);
    dispatchRedux(finishLoading());
  };

  const setIsUpdate = (value) => {
    dispatch({
      type: Types.UPDATE_REQUEST,
      payload: value,
    });
  };

  const getApprovers = () => {
    dispatchRedux(startLoading());
    materialNoCoreService
      .getApprovers()
      .then((response) => {
        const { data } = response;

        let approversDto = [];
        data.data.map((value) => {
          approversDto.push({
            id: value.id,
            name: value.email,
          });
        });
        // GET_APROBADORES
        dispatch({
          type: Types.GET_APPROVERS,
          payload: approversDto,
        });

        dispatchRedux(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
        dispatchRedux(finishLoading());
      });
  };

  const createMaterialNoCore = (obj) => {
    dispatchRedux(startLoading());
    materialNoCoreService.SaveMaterialNoCoreRequest(obj).then((response) => {
      const { data } = response;
      const responseApi = data.data;
      setSuccess(`Solicitud creada correctamente. ID ${responseApi.id}`, 10000);
      dispatch({
        type: Types.CREATE_MATERIAL_NO_CORE,
        payload: responseApi.id,
        action: true,
      });
      dispatchRedux(finishLoading());
    });
  };

  const updateMaterialNoCore = (obj) => {
    materialNoCoreService
      .SaveMaterialNoCoreRequest(obj)
      .then((response) => {
        const { data } = response;

        if (data.isSuccess) {
          setSuccess(
            `Solicitud actualizada correctamente. ID ${data.data.id}`,
            10000
          );

          dispatch({
            type: Types.UPDATE_MATERIAL_NO_CORE,
            payload: data.isSuccess,
            action: obj.requestPhase,
          });
        } else {
          setError("Se ha producido un error inesperado.", 10000);
        }
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const getCaracteristicasPlanificacionNecesidades = () => {
    materialNoCoreService
      .getCaracteristicasPlanificacionNecesidades()
      .then((response) => {
        const { data } = response;
        dispatch({
          type: Types.GET_PLANIFICACION_NECESIDADES,
          payload: data.data,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const getTamanioLote = () => {
    materialNoCoreService
      .getTamanioLote()
      .then((response) => {
        const { data } = response;
        dispatch({
          type: Types.TAM_LOTE,
          payload: data.data,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const sendPackage = (request) => {
    materialNoCoreService
      .packageMaterial(request)
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        }
        dispatch({
          type: Types.UPDATE_MATERIAL_NO_CORE,
          payload: data.isSuccess,
          action: 4,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const sendPackageGrid = (request, step) => {
    materialNoCoreService
      .packageMaterial(request)
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        }
        dispatch({
          type: Types.UPDATE_MATERIAL_NO_CORE,
          payload: data.isSuccess,
          action: step,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const DeleteMaterials = (request, step) => {
    materialNoCoreService
      .DeleteMaterials(request)
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        }
        dispatch({
          type: Types.UPDATE_MATERIAL_NO_CORE,
          payload: data.isSuccess,
          action: step,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const sendSaved = (request) => {
    materialNoCoreService
      .ChangeRequestState(request)
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        }
        dispatch({
          type: Types.UPDATE_MATERIAL_NO_CORE,
          payload: data.isSuccess,
          action: 4,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const aprroveMaterial = (request) => {
    dispatchRedux(startLoading());
    materialNoCoreService
      .ChangeRequestStateApprove(request)
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        }
        dispatch({
          type: Types.UPDATE_MATERIAL_NO_CORE,
          payload: data.isSuccess,
          action: 6,
        });
        dispatchRedux(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const changeStateRequest = (request) => {
    dispatchRedux(startLoading());
    materialNoCoreService
      .ChangeRequestState(request)
      .then((response) => {
        const { data } = response;

        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        }

        dispatch({
          type: Types.UPDATE_MATERIAL_NO_CORE,
          payload: data.isSuccess,
          action: 6,
        });
        dispatchRedux(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
        dispatchRedux(finishLoading());
      });
  };

  const clearUpdate = () => {
    dispatch({
      type: Types.UPDATE_MATERIAL_NO_CORE,
      payload: false,
      action: 0,
    });
  };

  const SaveMaterialNoCoreRequest = (jsonRequest) => {
    materialNoCoreService
      .SaveMaterialNoCoreRequest(jsonRequest)
      .then((response) => {
        const { data } = response;

        dispatch({
          type: Types.SET_ID,
          payload: data.data,
          action: true,
          time: jsonRequest.stateId === 2 ? 4 : jsonRequest.requestPhase,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const ChangePackageState = (jsonRequest) => {
    dispatchRedux(startLoading());

    materialNoCoreService
      .ChangePackageState(jsonRequest)
      .then((response) => {
        const { data } = response;

        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        }
      })
      .catch((error) => {
        showError(error.response);
      });

    setTimeout(() => {
      dispatchRedux(startLoading());
    }, 5000);
  };

  const getCauses = () => {
    const ListId = [
      { listId: 1, parentCode: "" },
      { listId: 2, parentCode: "" },
    ];
    materialNoCoreService.getMaterialNoCoreMotivos(ListId).then((response) => {
      const { data } = response;
      const dataCauses = data.data;

      dispatch({
        type: Types.GET_MOTIVOS,
        payload: dataCauses,
      });
    });
  };

  const getAllMateriaNoCoreByUser = (id) => {
    materialNoCoreService
      .getAllMateriaNoCoreByUser(id)
      .then((response) => {
        const { data } = response;
        const arrayMaterial = data.data;
        const ArrayResult = arrayMaterial.map((material) =>
          materialDto(material)
        );
        dispatch({ type: Types.GET_ALL_MATERIAL_NOCORE, payload: ArrayResult });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Error al consultar la información por id de la solicitud",
          10000
        );
      });
  };

  const getMaterialNoCoreDetail = (id) => {
    // dispatchRedux(startLoading());
    materialNoCoreService
      .getMaterialNoCoreDetail(id)
      .then((response) => {
        const { data } = response;
        const responseData = data.data;
        dispatch({
          type: Types.SET_MATERIAL_NO_CORE_DETAIL,
          payload: responseData,
        });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        dispatchRedux(finishLoading());
        setError(
          "Error al consultar la información por id de la solicitud",
          10000
        );
      });
  };

  const setNewDraft = () => {
    dispatch({
      type: Types.SET_ID,
      payload: state.id,
      action: false,
      time: 0,
    });
  };

  const getList = () => {
    dispatchRedux(startLoading());
    const ListId = [
      { listId: 1, parentCode: "" },
      { listId: 2, parentCode: "" },
      { listId: 3, parentCode: "" },
      { listId: 4, parentCode: "" },
      { listId: 5, parentCode: "" },
      { listId: 6, parentCode: "" },
      { listId: 7, parentCode: "" },
      { listId: 8, parentCode: "" },
      { listId: 9, parentCode: "" },
      { listId: 10, parentCode: "" },
      { listId: 11, parentCode: "" },
      { listId: 12, parentCode: "" },
      { listId: 13, parentCode: "" },
      { listId: 14, parentCode: "" },
      { listId: 15, parentCode: "" },
    ];
    materialNoCoreService
      .getList(ListId)
      .then((response) => {
        const { data } = response;
        const { responseData } = data;

        dispatch({
          type: Types.GET_LISTS_MATERIAL_NOCORE,
          payload: responseData,
        });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError("Ha ocurrido un error al consultar las listas en MDS", 10000);
      });
  };

  const materialDto = (material) => {
    const dataModified = {
      ...material,
    };
    const keys = Object.keys(dataModified);
    let valuesSearch = "";
    keys.map((element) => {
      if (
        element === "id" ||
        element === "dateCreated" ||
        element === "lastModified" ||
        element === "createdBy" ||
        element === "createdByName" ||
        element === "typeMaterials" ||
        element === "stateId" ||
        element === "dateCreatedFormat" ||
        element === "lastModifiedFormat" ||
        element === "stateName" ||
        element === "shortDescriptionDesc" ||
        element === "ticketNumber" ||
        element === "dateCreatedFormat" ||
        element === "materialNumber" ||
        element === "typeRequest"
      ) {
        valuesSearch =
          valuesSearch + " " + element + ":" + dataModified[element];
      }
    });
    const infoMaterial = {
      ...dataModified,
      search: valuesSearch.toLowerCase(),
    };
    return infoMaterial;
  };

  const getAllMaterialNoCore = () => {
    dispatchRedux(startLoading());
    materialNoCoreService.getAllMateriaNoCore().then((response) => {
      const { data } = response;
      const arrayMaterial = data.data;
      const ArrayResult = arrayMaterial.map((material) =>
        materialDto(material)
      );
      dispatch({ type: Types.GET_ALL_MATERIAL_NOCORE, payload: ArrayResult });
      dispatchRedux(finishLoading());
    });
  };

  const getMaterialNoCoreState = (type = 1) => {
    dispatchRedux(startLoading());
    materialNoCoreService.getMaterialNoCoreState(type).then((response) => {
      const { data } = response;
      const array = data.data;

      array.splice(0, 0, { id: "Todos", name: "Todos" });

      dispatch({ type: Types.GET_STATE, payload: array });
      dispatchRedux(finishLoading());
    });
  };

  const getDefaultValues = (description) => {
    dispatchRedux(startLoading());
    const lists = [{ ParentCode: description }];
    materialNoCoreService.getDefaultValues(lists).then((response) => {
      const { data } = response;
      const { responseData } = data;
      const defaultValues = responseData[0].list[0].valuesDescCortaDetalles;
      dispatch({ type: Types.GET_DEFAULT_VALUES, payload: defaultValues });
      dispatchRedux(finishLoading());
    });
  };

  const getTypeMaterial = () => {
    dispatchRedux(startLoading());
    const ListId = [{ listId: 17, parentCode: "" }];
    materialNoCoreService.getList(ListId).then((response) => {
      let dataList = [];
      const { data } = response;
      const { responseData } = data;
      const array = responseData[0].list[0].values;
      array.map((value, key) => {
        dataList.push({ id: value.id, name: `${value.id} - ${value.name}` });
      });
      dataList.splice(0, 0, { id: "Todos", name: "Todos" });
      dispatch({
        type: Types.GET_TYPE_MATERIAL,
        payload: dataList,
      });
      dispatchRedux(finishLoading());
    });
  };

  const stateByFilter = (state) => {
    return (data) => {
      if (state) {
        if (state !== "Todos") {
          return data.stateId === state;
        } else {
          return data;
        }
      } else {
        return data;
      }
    };
  };

  const typeMaterialFilter = (typeMaterial) => {
    return (data) => {
      if (typeMaterial) {
        if (typeMaterial !== "Todos") {
          return data.typeMaterials === typeMaterial;
        } else {
          return data;
        }
      } else {
        return data;
      }
    };
  };

  const materialNoCoreByFilters = (
    stateRequest = "Todos",
    typeMaterial = "ERSA"
  ) => {
    const { listMaterialBase } = state;
    const materialByFiltered = listMaterialBase
      .filter(stateByFilter(stateRequest))
      .filter(typeMaterialFilter(typeMaterial));

    dispatch({
      type: Types.GET_MATERIAL_NO_CORE_FILTERED,
      payload: materialByFiltered,
      action: true,
    });
  };

  const filtersByInputs = (filedToFiler, nameField) => {
    const { listMaterialBase } = state;
    if (filedToFiler !== "") {
      switch (nameField) {
        case "idRequest":
          const idRequest = listMaterialBase.filter((material) => {
            return material.id.toString().includes(filedToFiler);
          });
          dispatch({
            type: Types.GET_MATERIAL_NO_CORE_FILTERED,
            payload: idRequest,
            action: true,
          });
          break;
        case "search":
          let search = listMaterialBase.filter((material) => {
            let data = materialDto(material);
            return data.search.includes(filedToFiler.toLowerCase());
          });
          dispatch({
            type: Types.GET_MATERIAL_NO_CORE_FILTERED,
            payload: search,
            action: true,
          });
          break;
      }
    } else {
      dispatch({
        type: Types.GET_MATERIAL_NO_CORE_FILTERED,
        payload: listMaterialBase,
        action: false,
      });
    }
  };

  const GetDescriptionLong = (params) => {
    dispatchRedux(startLoading());
    materialNoCoreService.GetDescriptionLong(params).then((response) => {
      const { data } = response;
      const arrayDescriptionLong = data.data;
      dispatch({
        type: Types.GET_DESCRIPTION_LONG,
        payload: arrayDescriptionLong,
      });
      dispatchRedux(finishLoading());
    });
  };

  const GetHistoryMaterial = (params) => {
    dispatchRedux(startLoading());
    materialNoCoreService.GetHistoryMaterial(params).then((response) => {
      dispatch({
        type: Types.GET_HISTORY_MATERIAL,
        payload: response.data.data,
      });
      dispatchRedux(finishLoading());
    });
  };

  const GetMaterialsNoCoreInDraftAndSavedState = (params) => {
    dispatchRedux(startLoading());
    materialNoCoreService
      .GetMaterialsNoCoreInDraftAndSavedState(params)
      .then((response) => {
        dispatch({
          type: Types.GET_MATERILA_NO_CORE_LIST,
          payload: response.data.data,
        });
        dispatchRedux(finishLoading());
      });
  };

  const PackageDTO = (PackageObject) => {
    const keys = Object.keys(PackageObject);
    let valuesSearch = "";
    let typeMaterialsArray = [];
    keys.map((element) => {
      if (element === "materials") {
        const materialsArray = PackageObject[element];
        materialsArray.map((objMaterial) => {
          const keysMaterials = Object.keys(objMaterial);
          keysMaterials.map((materialKey) => {
            if (
              materialKey === "id" ||
              materialKey === "stateName" ||
              materialKey === "createByName" ||
              materialKey === "typeMaterials" ||
              materialKey === "createdByName" ||
              materialKey === "shortDescription" ||
              materialKey === "dateCreatedFormat" ||
              materialKey === "shortDescriptionDesc"
            ) {
              valuesSearch = valuesSearch + " " + objMaterial[materialKey];
            }
            if (materialKey === "typeMaterials") {
              typeMaterialsArray = [
                ...typeMaterialsArray,
                objMaterial["typeMaterials"],
              ];
            }
          });
        });
      }
      if (
        element === "stateName" ||
        element === "ticketNumber" ||
        element === "approverByName" ||
        element === "dateCreatedFormat"
      ) {
        valuesSearch = valuesSearch + " " + PackageObject[element];
      }
    });

    const result = {
      ...PackageObject,
      search: valuesSearch.toLowerCase(),
      typeMaterialsArray: typeMaterialsArray,
      createdBy: PackageObject.materials[0].createdBy,
    };

    return result;
  };

  const buildSearchPackage = (array) => {
    const arrayResult = array.map((element) => PackageDTO(element));
    return arrayResult;
  };

  const GetMaterialsNoCorePackage = (params) => {
    dispatchRedux(startLoading());
    materialNoCoreService
      .GetMaterialsNoCorePackage(params)
      .then((response) => {
        const { data } = response;
        const arrayValidate = data.data;
        // const array = buildSearchPackage(arrayValidate);

        dispatch({
          type: Types.GET_MATERILA_NO_CORE_PACKAGE,
          payload: arrayValidate,
        });
        dispatchRedux(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const GetListOfCatalogers = () => {
    dispatch(startLoading());
    materialNoCoreService
      .GetListOfCatalogers()
      .then((response) => {
        const { data } = response.data;
        dispatch({
          type: Types.GET_MATERILA_NO_CORE_LIST_CATALOGERS,
          payload: data,
        });
        dispatchRedux(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
      });
  };
  /**
   * Metod para reasignar aporbador
   * @param {} body
   */
  const SetChangeApproverRequest = (body) => {
    dispatch(startLoading());
    materialNoCoreService
      .SetChangeApproverRequest(body)
      .then((result) => {
        const { data } = result;
        if (data.isSuccess) {
          dispatch({
            type: Types.GET_MATERILA_NO_CORE_LIST_CATALOGERS_SEND,
            payload: data,
          });
        } else {
          setError("Se ha producido un error inesperado.", 10000);
        }
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const filterGetModificationsInSavedState = (type, value) => {
    const { listMaterialModificationstateBase, listMaterialModificationstate } =
      state;
    let result;
    switch (type) {
      case "codigoMaterial":
        if (value === "") {
          result = listMaterialModificationstate;
        } else {
          result = listMaterialModificationstateBase.filter((item) =>
            item.codigoSap.toString().includes(value)
          );
        }
        dispatch({
          type: Types.GET_MODIFICACTIONS_IN_SAVED_STATE_BASE,
          payload: result,
        });
        break;
      default:
        dispatch({
          type: Types.GET_MODIFICACTIONS_IN_SAVED_STATE,
          payload: listMaterialModificationstate,
        });
        break;
    }
  };

  const dtoFiltersModification = (datos) => {
    let data = [];
    datos.map((items) => {
      data.push({
        id: items.id,
        statusId: items.statusId,
        statusId: items.statusId,
        codigoSap: items.codigoSap,
        statusName: items.statusName,
        lastModified: items.lastModified,
        typeMaterials: items.typeMaterials,
        shortDescription: items.shortDescription,
        search: JSON.stringify(items),
      });
    });
    return data;
  };

  const getModificationsInSavedState = (userId) => {
    dispatch(startLoading());
    materialNoCoreService
      .GetModificationsInSavedState(userId)
      .then((result) => {
        const { data } = result;

        dispatch({
          type: Types.GET_MODIFICACTIONS_IN_SAVED_STATE,
          payload: dtoFiltersModification(data.data),
        });
      });
  };

  const GetParentMaterialOfHERS = (string) => {
    dispatch(startLoading());
    materialNoCoreService
      .getMaterialHers(string)
      .then((result) => {
        const { data } = result;
        if (data.isSuccess) {
          dispatch({
            type: Types.GET_MATERILA_NO_CORE_PAREN_TMATERIAL_OF_HERS,
            payload: data,
          });
        } else {
          setError("Se ha producido un error inesperado.", 10000);
        }
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const DeleteModifications = (request) => {
    materialNoCoreService.SetDeleteModifications(request).then((result) => {
      dispatch({
        type: Types.SET_DELETE_MODIFICATIONS,
        payload: result,
      });
    });
  };

  const getMaterialDto = (pack) => {
    const resultData = [];
    pack.materials.map((value) => {
      resultData.push({
        id: value.id,
        stateName: value.stateName,
        typeMaterials: value.typeMaterials,
        lastModifiedFormat: value.lastModifiedFormat,
        shortDescriptionDesc: value.shortDescriptionDesc,
      });
    });
    pack.materials = resultData;
    const data = {
      ...pack,
      search: JSON.stringify(pack),
    };
    return data;
  };

  const FilterByInputsPackage = (value, name) => {
    const { materialsNoCorePackageBase } = state;

    if (value !== "") {
      if (name === "ticket") {
        const valueUpperCase = value.toUpperCase();
        const ticket = materialsNoCorePackageBase.filter((pack) =>
          pack.ticketNumber.includes(valueUpperCase)
        );
        dispatch({
          type: Types.GET_MATERILA_NO_CORE_PACKAGE_FILTERED,
          payload: ticket,
          action: true,
        });
      }
      if (name === "search") {
        const valuetoLowerCase = value.toLowerCase();
        const search = materialsNoCorePackageBase.filter((pack) => {
          let data = getMaterialDto(pack);
          let result = data.search
            .toString()
            .toLowerCase()
            .includes(valuetoLowerCase);
          return result;
        });

        dispatch({
          type: Types.GET_MATERILA_NO_CORE_PACKAGE_FILTERED,
          payload: search,
          action: true,
        });
      }
    } else {
      dispatch({
        type: Types.GET_MATERILA_NO_CORE_PACKAGE_FILTERED,
        payload: materialsNoCorePackageBase,
        action: false,
      });
    }
  };

  const typeFilter = (typeM) => {
    return (data) => {
      if (typeM) {
        if (typeM !== "Todos") {
          if (data.materials.length > 0) {
            return data.materials.some(
              (mater) => mater.typeMaterials === typeM
            );
          }
        } else {
          return data;
        }
      } else {
        return data;
      }
    };
  };

  const stateFilter = (stateID) => {
    return (data) => {
      if (stateID) {
        if (stateID !== "Todos") {
          return data.stateId === stateID;
        } else {
          return data;
        }
      } else {
        return data;
      }
    };
  };

  const FilterPackage = (stateRequest, type) => {
    const { materialsNoCorePackageBase } = state;

    const packagebyFilter = materialsNoCorePackageBase
      .filter(stateFilter(stateRequest))
      .filter(typeFilter(type));

    dispatch({
      type: Types.GET_MATERILA_NO_CORE_PACKAGE_FILTERED,
      payload: packagebyFilter,
      action: true,
    });
  };

  const exitsMaterialMds = (body) => {
    dispatch(startLoading());
    materialNoCoreService
      .exitsMaterialMds(body)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: Types.SET_EXIST_MATERIAL,
          payload: data,
        });
        dispatchRedux(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
        dispatchRedux(finishLoading());
      });
  };

  const getExistHersMaterial = (manufacturer, partNumber) => {
    dispatch(startLoading());
    materialNoCoreService
      .getExistHersMaterial(manufacturer, partNumber)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: Types.SET_EXIST_MATERIAL_HERS,
          payload: data,
        });
        dispatchRedux(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
        dispatchRedux(finishLoading());
      });
  };

  const GetMaterialForModification = (codigoSap) => {
    dispatch(startLoading());
    materialNoCoreService
      .GetMaterialForModification(codigoSap)
      .then((response) => {
        const { data } = response;
        const ObjectModify = data.data;
        Object.entries(ObjectModify).map((obj) => {
          if (obj[0] === "codigoMaterial") {
            if (obj[1]) {
              dispatch({
                type: Types.GET_ARRAY_MODIFY,
                payload: ObjectModify,
              });
            } else {
              setError(
                "El código del material ingresado no existe, por favor verifíquelo",
                100
              );
            }
          }
        });
        dispatchRedux(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
        dispatchRedux(finishLoading());
      });
  };

  const setCreateMaterialNoCoreModifyPackage = (request) => {
    dispatch(startLoading());
    materialNoCoreService
      .setCreateMaterialNoCoreModifyPackage(request)
      .then((result) => {
        const { data } = result;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 100);
        }
        dispatch(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
        dispatchRedux(finishLoading());
      });
  };

  const SaveMaterialNoCoreModify = (request) => {
    dispatch(startLoading());
    materialNoCoreService
      .SaveMaterialNoCoreModify(request)
      .then((result) => {
        dispatch({
          type: Types.SAVE_MATERIAL_NO_CORE_MODIFY,
          payload: result.data,
        });
        dispatch(finishLoading());
      })
      .catch((error) => {
        showError(error.response);
        dispatchRedux(finishLoading());
      });
  };

  const getTypeResquetModify = () => {
    const ListId = [{ listId: 18, parentCode: "" }];
    materialNoCoreService
      .getList(ListId)
      .then((response) => {
        const { data } = response;
        const { responseData } = data;
        if (response.status === 200) {
          if (responseData.length > 0) {
            const list = responseData[0].list;
            if (list.length > 0) {
              dispatch({
                type: Types.GET_TYPE_REQUEST_MODIFY,
                payload: list[0].values,
              });
            } else {
              setError(
                "La lista de Tipo de solicitud para modificación está vacía.",
                100
              );
            }
          } else {
            setError(
              "La lista de Tipo de solicitud para modificación está vacía.",
              100
            );
          }
        }
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const GetMaterialNoCoreModifyDetails = (MaterialId) => {
    materialNoCoreService
      .GetMaterialNoCoreModifyDetails(MaterialId)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: Types.GET_MATERIAL_NO_CORE_MODIFY_DETAILS,
          payload: data.data,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  const getMaterialNoCoreModifyDetailChanges = (MaterialId) => {
    materialNoCoreService
      .GetMaterialNoCoreModifyDetailChanges(MaterialId)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: Types.GET_MATERIAL_NO_CORE_MODIFY_DETAILS_FULL,
          payload: data.data,
        });
      })
      .catch((error) => {
        showError(error.response);
      });
  };

  return (
    <MaterialsNoCoreContext.Provider
      value={{
        //List MDS
        getList,
        lists: state.lists,

        //Material No Core
        getAllMaterialNoCore,
        getMaterialNoCoreDetail,
        materialNoCoreByFilters,
        SaveMaterialNoCoreRequest,
        allMaterialNoCore: state.allMaterialNoCore,
        materialNoCoreDetail: state.materialNoCoreDetail,

        requestMaterial: {
          id: state.id,
          successDraft: state.successDraft,
          stepDraft: state.stepDraft,
        },

        //filters
        setNewDraft,
        filtersByInputs,
        getTypeMaterial,
        getMaterialNoCoreState,
        isFiltered: state.isFiltered,
        TypeMaterial: state.TypeMaterial,
        stateMaterialNoCore: state.stateMaterialNoCore,

        //Manejo de errores
        clear,
        setError,
        setSuccess,
        Time: state.Time,
        Error: state.Error,
        Success: state.Success,
        MessageError: state.MessageError,
        MessageSuccess: state.MessageSuccess,

        setIsUpdate,
        isUpdate: state.isUpdate,

        createMaterialNoCore,
        updateMaterialNoCore,

        existId: state.existId,
        idMaterial: state.idMaterial,
        request: state.request,

        updateMaterialNoCoreFlag: state.updateMaterialNoCoreFlag,
        formStep: state.formStep,

        getApprovers,
        listApprovers: state.listApprovers,

        getModificationsInSavedState,
        filterGetModificationsInSavedState,
        listMaterialModificationstate: state.listMaterialModificationstate,

        clearUpdate,
        getCauses,
        listCauses: state.listCauses,

        getAllMateriaNoCoreByUser,
        getDefaultValues,
        defaultValuesShortDescription: state.defaultValuesShortDescription,
        sendSaved,
        sendPackage,
        changeStateRequest,

        GetDescriptionLong,
        descriptionLong: state.descriptionLong,

        GetHistoryMaterial,
        historyMaterial: state.historyMaterial,
        GetMaterialsNoCoreInDraftAndSavedState,
        listMaterial: state.listMaterial,

        aprroveMaterial,

        getCaracteristicasPlanificacionNecesidades,
        caracteristicasPlanificacionNecesidades:
          state.caracteristicasPlanificacionNecesidades,

        getTamanioLote,
        tamanioLote: state.tamanioLote,

        GetMaterialsNoCorePackage,
        materialsNoCorePackage: state.materialsNoCorePackage,

        GetListOfCatalogers,
        materialNoCoreListCatalogers: state.materialNoCoreListCatalogers,
        SetChangeApproverRequest,
        materialNoCoreListCatalogersSend:
          state.materialNoCoreListCatalogersSend,

        GetParentMaterialOfHERS,
        parentMaterialOfHERS: state.parentMaterialOfHERS,

        sendPackageGrid,
        DeleteMaterials,

        //filterPackage
        FilterByInputsPackage,
        FilterPackage,

        ChangePackageState,

        //existe material Mds
        exitsMaterialMds,
        existMaterialMdsByLongDescription:
          state.existMaterialMdsByLongDescription,

        getExistHersMaterial,
        materialHers: state.materialHers,

        //Elimina material a modificar
        DeleteModifications,
        resultDeleteModifications: state.resultDeleteModifications,

        setCreateMaterialNoCoreModifyPackage,
        resultPackageModify: state.resultPackageModify,

        GetMaterialForModification,
        arrayModify: state.arrayModify,

        getTypeResquetModify,
        SaveMaterialNoCoreModify,
        typeRequestModify: state.typeRequestModify,
        dataSaveMaterialNoCoreModify: state.dataSaveMaterialNoCoreModify,

        GetMaterialNoCoreModifyDetails,
        materialNoCoreModifyDetails: state.materialNoCoreModifyDetails,

        //Detalle Modificación
        getMaterialNoCoreModifyDetailChanges,
        materialNoCoreModifyDetailsFull: state.materialNoCoreModifyDetailsFull,
      }}
    >
      {props.children}
    </MaterialsNoCoreContext.Provider>
  );
};

export default MaterialNoCoreState;
