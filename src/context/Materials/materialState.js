import React, { useEffect, useReducer } from "react";
import * as Types from "../types";
import { useDispatch } from "react-redux";
import materialReducer from "./materialReducer";
import MaterialContext from "./materialContext";
import materialServices from "../../services/material-service";
import { startLoading, finishLoading } from "../../redux/ui/uiActions";

const MaterialState = (props) => {
  const initialState = {
    LIST_MDS: [],
    Error: false,
    companyMDS: [],
    Success: false,
    allMaterial: [],
    historyById: [],
    stateRequest: [],
    MessageError: "",
    isFiltered: false,
    MessageSuccess: "",
    allMaterialBase: [],
    typeMaterial: [],
    configurationInputs: [],
    InfoMaterialRequest:[],
    dataCopyFromRequest: [],
    dataDatosGenerales: {},
    dataDatosBasicos: {},
    dataNivelesOrganizacion: {},
    dataAreaVenta: {},
    dataOilGas: {},
    dataGestionCompras: {},
    dataPlanificacionNecesidad: {},
    dataDatAlmacenamiento: {},
    dataContabilidad: {},
    dataInformacionAdicional: {},
    dataVenta: {}
  };

  const [state, dispatch] = useReducer(materialReducer, initialState);
  const dispatchRedux = useDispatch();
  /*GUARDAR DATA*/

  const setDataDatosGenerales = (data) => {
    dispatch({ type: Types.SET_DATA_DATOS_GENERALES, payload: data });
  };

  const setDataDatosBasicos = (data) => {
    dispatch({ type: Types.SET_DATA_DATOS_BASICOS, payload: data });
  };

  const setDataNivelesOrganizacion = (data) => {
    dispatch({ type: Types.SET_DATA_NIVELES_ORGANIZACION, payload: data });
  };

  const setDataAreaVenta = (data) => {
    dispatch({ type: Types.SET_DATA_AREA_VENTA, payload: data });
  };

  const setDataOilGas = (data) => {
    dispatch({ type: Types.SET_DATA_OILGAS, payload: data });
  };

  const setDataVenta = (data) => {
    dispatch({ type: Types.SET_DATA_VENTA, payload: data });
  };

  const setDataGestionCompras = (data) => {
    dispatch({ type: Types.SET_DATA_GESTION_COMPRAS, payload: data });
  };

  const setDataPlanificacionNecesidad = (data) => {
    dispatch({ type: Types.SET_DATA_PLANIFICACION_NECESIDAD, payload: data });
  };

  const setDataDatAlmacenamiento = (data) => {
    dispatch({ type: Types.SET_DATA_DATALMACENAMIENTO, payload: data });
  };

  const setDataContabilidad = (data) => {
    dispatch({ type: Types.SET_DATA_CONTABILIDAD, payload: data });
  };

  const setDataInformacionAdicional = (data) => {
    dispatch({ type: Types.SET_DATA_INFORMACION_ADICIONAL, payload: data });
  };

  /* MANEJAR ERRORES */
  const setSuccess = (msg) => {
    dispatch({ type: Types.SET_SUCCESS, payload: true, action: msg });
  };

  const getConfiguration = (configuration) => {
    materialServices.getConfigurationInputs(configuration)
    .then(response => {
        const { data } = response
        dispatch({ type: Types.GET_CONFIGURATION_INPUT, payload: data.data })
      }
    )
    .catch(() => {
      setError("Error")
    })
  }
  
  const setError = (msg) => {
    dispatch({ type: Types.SET_ERROR, payload: true, action: msg });
  };
  
  const clear = () => {
    dispatch({ type: Types.SET_ERROR, payload: false });
    dispatch({ type: Types.SET_SUCCESS, payload: false });
  };

  const getStateRequest = () => {
    dispatchRedux(startLoading());
    materialServices
      .getStateRequest()
      .then((response) => {
        const { data } = response;
        dispatch({ type: Types.GET_STATE_REQUEST, payload: data.data });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error al consultar los estados de la solicitud"
        );
      });
  };

  const getCompanyMDS = () => {
    dispatchRedux(startLoading());
    const ListId = [{ listId: 1, parentCode: "" }];
    materialServices
      .getList(ListId)
      .then((response) => {
        const { data } = response;
        const { responseData } = data;
        const company = responseData[0].list[0].values;
        dispatch({ type: Types.GET_COMPANY_MDS, payload: company });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error al consultar la empresa proveniente de MDS"
        );
      });
  };

  const getDataByCompany = (company, flowType = 1 ) => {
    dispatchRedux(startLoading());
    const ListsId = [
      { listId: 2, parentCode: company },
      { listId: 3, parentCode: company },
      { listId: 4, parentCode: company },
      { listId: 5, parentCode: company },
      { listId: 6, parentCode: company },
      { listId: 7, parentCode: company },
      { listId: 8, parentCode: company },
      { listId: 9, parentCode: company },
      { listId: 10, parentCode: company },
      { listId: 11, parentCode: company },
      { listId: 12, parentCode: company },
      { listId: 13, parentCode: company },
      { listId: 14, parentCode: company },
      { listId: 15, parentCode: company },
      { listId: 16, parentCode: company },
      { listId: 17, parentCode: company },
      { listId: 18, parentCode: company },
      { listId: 19, parentCode: company },
      { listId: 20, parentCode: company },
      { listId: 21, parentCode: company },
      { listId: 22, parentCode: company },
      { listId: 23, parentCode: company },
      { listId: 24, parentCode: company },
      { listId: 25, parentCode: company },
      { listId: 26, parentCode: company },
      { listId: 27, parentCode: company },
      { listId: 28, parentCode: company },
      { listId: 29, parentCode: company },
      { listId: 30, parentCode: company },
      { listId: 31, parentCode: company },
      { listId: 32, parentCode: company },
      { listId: 33, parentCode: company },
      { listId: 34, parentCode: company },
      { listId: 35, parentCode: "" },
      { listId: 36, parentCode: "" },
      { listId: 37, parentCode: "" },
      { listId: 38, parentCode: "" },
      { listId: 39, parentCode: "" },
      { listId: 40, parentCode: "" },
      { listId: 41, parentCode: "" },
      { listId: 42, parentCode: company },
      { listId: 43, parentCode: company },
      { listId: 44, parentCode: company },
      { listId: 45, parentCode: company },
      { listId: 46, parentCode: company },
      { listId: 47, parentCode: company },
      { listId: 48, parentCode: company },
      { listId: 49, parentCode: company },
      { listId: 50, parentCode: company },
      { listId: 51, parentCode: company },
      { listId: 52, parentCode: company },
      { listId: 53, parentCode: company },
      { listId: 54, parentCode: company },
      { listId: 55, parentCode: flowType },
      { listId: 56, parentCode: company },
      { listId: 57, parentCode: company },
      { listId: 58, parentCode: "" },
      { listId: 59, parentCode: "" },
      { listId: 60, parentCode: company },
      { listId: 61, parentCode: company },
      { listId: 62, parentCode: company },

    ];
    materialServices
      .getList(ListsId)
      .then((response) => {
        const { data } = response;
        const { responseData } = data;
        dispatch({ type: Types.GET_LISTS, payload: responseData });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError("Ha ocurrido un error al consultar la información en MDS");
      });
  };

  const materialDTO = (data) => {
    let nameMaterial;
    if (data.materialType === "ZCRU_E" || data.materialType === "ZCRU_R") {
      nameMaterial = "Crudo";
    } else if (
      data.materialType === "ZGAS_E" ||
      data.materialType === "ZGAS_R"
    ) {
      nameMaterial = "Gas";
    } else {
      nameMaterial = "Producto";
    }
    let businessProcessText = "";
    const dataModified = {
      ...data,
      materialTypeName: nameMaterial,
      company: data.company === "R" ? "Reficar" : "Ecopetrol",
      businessProcessEdit: process,
      businessProcess: businessProcessText,
    };
    return dataModified;
  };

  const getInitialData = async (flow) => {
    dispatchRedux(startLoading());
    await materialServices
      .getAllMaterial(flow)
      .then((response) => {
        const { data } = response;
        const arrayMaterial = data.data;
        const ArrayResult = arrayMaterial.map((material) =>
          materialDTO(material)
        );
        dispatch({ type: Types.LOAD_ALL_MATERIAL, payload: ArrayResult });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error al intentar consultar la lista de solicitudes de materiales. ¡Intenta más tarde!"
        );
      });
  };

  const getMaterialByUser = async (userId) => {
    dispatchRedux(startLoading());
    await materialServices
      .getMaterialByUser(userId)
      .then((response) => {
        const { data } = response;
        const arrayMaterial = data.data;
        const ArrayResult = arrayMaterial.map((material) =>
          materialDTO(material)
        );
        dispatch({ type: Types.LOAD_ALL_MATERIAL, payload: ArrayResult });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error al intentar consultar la lista de solicitudes de materiales. ¡Intenta más tarde!"
        );
      });
  };

  const getInfoMaterialRequestById = async (id) => {
    dispatchRedux(startLoading());
    await materialServices
      .getInfoMaterialRequest(id)
      .then((response) => {
        const { data } = response;
        const arrayMaterial = data.data;
        dispatch({ type: Types.INFO_MATERIAL_REQUEST, payload: arrayMaterial });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error al intentar consultar la información de solicitudes de materiales. ¡Intenta más tarde!"
        );
      });
  };

  const getHistoryById = (id) => {
    materialServices
      .getHistoryById(id)
      .then((response) => {
        const { data } = response;
        dispatch({ type: Types.GET_HISTORY_BY_ID, payload: data.data });
      })
      .catch(() => {
        setError("Error al consultar el histórico de la solicitud");
      });
  };

  const setStateMaterial = (data) => {
    dispatchRedux(startLoading());
    materialServices
      .setStateMaterial(data)
      .then((response) => {
        const { data } = response;
        const Message = data.returnMessage;
        setSuccess(Message);
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error inesperado al cambiar el estado de la solicitud. ¡Intenta de nuevo!"
        );
      });
  };

  const materialFilter = (filedToFiler, nameField) => {
    const { allMaterialBase } = state;
    if (filedToFiler !== "") {
      if (!Array.isArray(filedToFiler)) {
        switch (nameField) {
          case "idRequest":
            const idRequest = allMaterialBase.filter((material) => {
              return material.id.toString().includes(filedToFiler);
            });
            dispatch({
              type: Types.GET_MATERIAL_FILTERED,
              payload: idRequest,
              action: true,
            });
            break;
          case "stateId":
            const stateId = allMaterialBase.filter((material) => {
              return material.stateId.toString().includes(filedToFiler);
            });
            dispatch({
              type: Types.GET_MATERIAL_FILTERED,
              payload: stateId,
              action: true,
            });
            break;
          case "company":
            const company = allMaterialBase.filter((material) => {
              return material.company.includes(filedToFiler);
            });
            dispatch({
              type: Types.GET_MATERIAL_FILTERED,
              payload: company,
              action: true,
            });
            break;
          case "search":
            const search = allMaterialBase.filter((material) => {
              let nameMaterial;
              if (material.materialType === "ZCRU_E" || material.materialType === "ZCRU_R") {
                nameMaterial = "Crudo";
              } else if (
                material.materialType === "ZGAS_E" ||
                material.materialType === "ZGAS_R"
              ) {
                nameMaterial = "Gas";
              } else {
                nameMaterial = "Producto";
              }
              let filtro = (material.company.toString() + material.stateName.toString() + material.id.toString() + material.userName.toString() + nameMaterial).toUpperCase();
              return filtro.includes(filedToFiler.toUpperCase())
            });    
            dispatch({
              type: Types.GET_MATERIAL_FILTERED,
              payload: search,
              action: true,
            });
            break;
          default:
            break;
        }
      } else {
        const stateId = allMaterialBase.filter((material) => {
          if(filedToFiler.length===0) {
            return material.stateId.toString();
          }else {
            return filedToFiler.some(i => material.stateId.toString().includes(i))
          }
        });
        dispatch({
          type: Types.GET_MATERIAL_FILTERED,
          payload: stateId,
          action: true,
        });
      }
    } else {
      dispatch({
        type: Types.GET_MATERIAL_FILTERED,
        payload: allMaterialBase,
        action: false,
      });
    }
  };

  const createMaterial = (data) => {
    dispatchRedux(startLoading());
    materialServices
      .createMaterial(data)
      .then((response) => {
        const { data } = response;
        const Message = data.returnMessage;
        setSuccess(Message);
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error inesperado en la creación del material. ¡Intenta de nuevo!"
        );
      });
  };

  const editMaterial = (data) => {
    dispatchRedux(startLoading());
    materialServices
      .editMaterial(data)
      .then((response) => {
        const { data } = response;
        const Message = data.returnMessage;
        setSuccess(Message);
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error inesperado en la edición del material. ¡Intenta de nuevo!"
        );
      });
  };

  const getMaterialType = (company) => {
    const ListsId = [{ listId: 62, parentCode: company }];
    materialServices
      .getList(ListsId)
      .then((response) => {
        const { data } = response;
        const { responseData } = data;
        dispatch({
          type: Types.TYPE_MATERIAL,
          payload: responseData[0].list[0].values,
        });
      })
      .catch(() => {
        setError("Ha ocurrido un error al consultar el tipo de material");
      });
  };

  const stateByFilter = (state) => {
    return (data) => {
      if (state) {
        if (state.length > 0) {
          return state.includes(data.stateId)
        } else {
          return data;
        }
      } else {
        return data;
      }
    }
  };

  const companyByFilter = (company) => {
    return (data) => {
      if (company) {
        if (company !== "Todos") {
          return data.company === (company === "E" ? "Ecopetrol" : "Reficar");
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
          return data.materialType === typeMaterial;
        } else {
          return data;
        }
      } else {
        return data;
      }
    };
  };

  const idRequestFilter = (idRequest) => {
    return (data) => {
      if (idRequest) {
        if (idRequest !== "") {
          return data.id.toString().includes(idRequest);
        } else {
          return data;
        }
      } else {
        return data;
      }
    };
  };

  const searchFilter = (search) => {
    return (data) => {
      if (search) {
        if (search !== "") {
          let nameMaterial;
          if (data.materialType === "ZCRU_E" || data.materialType === "ZCRU_R") {
            nameMaterial = "Crudo";
          } else if (
            data.materialType === "ZGAS_E" ||
            data.materialType === "ZGAS_R"
          ) {
            nameMaterial = "Gas";
          } else {
            nameMaterial = "Producto";
          }
          let filtro = (data.company.toString() + data.stateName.toString() + data.id.toString() + data.userName.toString() + nameMaterial).toUpperCase();

          return filtro.includes(search.toUpperCase());
        } else {
          return data;
        }
      } else {
        return data;
      }
    };
  };
  
  const materialByFilters = (
    idRequest = "",
    stateRequest = [],
    company = "Todos",
    typeMaterial = "Todos",    
    search = ""
  ) => {
    const { allMaterialBase } = state;
    const materialByFiltered = allMaterialBase
      .filter(idRequestFilter(idRequest))
      .filter(stateByFilter(stateRequest))
      .filter(companyByFilter(company))
      .filter(typeMaterialFilter(typeMaterial))
      .filter(searchFilter(search));
    dispatch({
      type: Types.GET_MATERIAL_FILTERED,
      payload: materialByFiltered,
      action: true,
    });
  };

  const setValuesConfigurationInputs = (configuration) => {
    materialServices.getConfigurationInputs(configuration).then((response) => {
      const {data} = response;
      dispatch({type: Types.GET_CONFIGURATION_INPUT, payload: data.data});
    })
    .catch(() => {
      setError("Ha ocurrido un error al intentar consultar la configuracion de los campos. ¡Intenta más tarde!");
    });
  }

  const setcopyFromRequest = (data) => {
    materialServices.copyFromRequest(data).then((response) => {
      const {data} = response;
      dispatch({type: Types.POST_COPY_REQUEST, payload: data.data});
    })
    .catch(() => {
      setError("Ha ocurrido un error al intentar consultar la disponibilidad para realizar la copia de la solicitud. ¡Intenta más tarde!");
    });
  }

  return (
    <MaterialContext.Provider
      value={{
        //Obtener estados de la solicitud
        getStateRequest,
        stateRequest: state.stateRequest,

        //APROBAR - RECHAZAR - DEVOLVER SOLICITUD
        setStateMaterial,

        //Obtener Historial del material
        getHistoryById,
        historyById: state.historyById,

        //LISTA DE MATERIALES (METODOS, ARREGLOS Y FILTROS)
        materialFilter,
        getInitialData,
        getMaterialByUser,
        isFiltered: state.isFiltered,
        allMaterial: state.allMaterial,
        getInfoMaterialRequestById,
        InfoMaterialRequest: state.InfoMaterialRequest,

        //CREACIÓN Y EDICIÓN MATERIAL
        editMaterial,
        createMaterial,

        //Datos de MDS
        getCompanyMDS,
        getDataByCompany,
        LIST_MDS: state.lists,
        companyMDS: state.companyMDS,
        clear,
        setError,
        setSuccess,
        Error: state.Error,
        Success: state.Success,
        MessageError: state.MessageError,
        MessageSuccess: state.MessageSuccess,
        getMaterialType,
        materialByFilters,
        typeMaterial: state.typeMaterial,

        //configuracion de input         
        configurationInputs: state.configurationInputs,
        setValuesConfigurationInputs,

        //copia de Solicitud
        dataCopyFromRequest: state.dataCopyFromRequest,
        // msgCopyFromRequest: state.msgCopyFromRequest,
        setcopyFromRequest,

        /// Create material
        dataDatosBasicos: state.dataDatosBasicos,
        setDataDatosBasicos,
        dataDatosGenerales: state.dataDatosGenerales,
        setDataDatosGenerales,
        dataNivelesOrganizacion: state.dataNivelesOrganizacion,
        setDataNivelesOrganizacion,
        dataAreaVenta: state.dataAreaVenta,
        setDataAreaVenta,
        dataOilGas: state.dataOilGas,
        setDataOilGas,
        dataVenta: state.dataVenta,
        setDataVenta,
        dataGestionCompras: state.dataGestionCompras,
        setDataGestionCompras,
        dataPlanificacionNecesidad: state.dataPlanificacionNecesidad,
        setDataPlanificacionNecesidad,
        dataDatAlmacenamiento: state.dataDatAlmacenamiento,
        setDataDatAlmacenamiento,
        dataContabilidad: state.dataContabilidad,
        setDataContabilidad,
        dataInformacionAdicional: state.dataInformacionAdicional,
        setDataInformacionAdicional
      }}
    >
      {props.children}
    </MaterialContext.Provider>
  );
};

export default MaterialState;
