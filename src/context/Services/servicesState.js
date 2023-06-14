import React from "react";
import * as Types from "../types";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import servicesReducer from "./servicesReducer";
import ServicesContext from "./servicesContext";
import servicesService from "../../services/services-service";
import { startLoading, finishLoading } from "../../redux/ui/uiActions";

const ServicesState = (props) => {
  const initialState = {
    //DATOS MDS
    ListsMDS: [],
    companyMDS: [],

    // SERVICE
    allService: [],
    allServiceBase: [],

    //Causes
    listCauses: [],

    //HISTORY
    historyById: [],

    //FILTROS
    stateRequest: [],
    isFiltered: false,

    //MANEJAR ERRORES
    Time: 5000,
    Error: false,
    Success: false,
    MessageError: "",
    MessageSuccess: "",
  };
  const [state, dispatch] = useReducer(servicesReducer, initialState);
  const dispatchRedux = useDispatch();

  /* MANEJAR ERRORES */
  const setSuccess = (msg, time) => {
    dispatch({
      type: Types.SET_SUCCESS,
      payload: true,
      action: msg,
      time: time,
    });
  };
  const setError = (msg, time) => {
    dispatch({ type: Types.SET_ERROR, payload: true, action: msg, time: time });
  };
  const clear = () => {
    dispatch({ type: Types.SET_ERROR, payload: false });
    dispatch({ type: Types.SET_SUCCESS, payload: false });
  };

  const getCompany = () => {
    dispatchRedux(startLoading());
    const ListId = [{ listId: 1, parentCode: "" }];
    servicesService
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
          "Ha ocurrido un error al consultar la empresa en MDS. ¡Intenta de nuevo!",
          5000
        );
        dispatchRedux(finishLoading());
      });
  };

  const getStateRequest = () => {
    dispatchRedux(startLoading());
    servicesService
      .getStateRequest()
      .then((response) => {
        const { data } = response;
        dispatch({ type: Types.GET_STATE_REQUEST, payload: data.data });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error al consultar los estados de la solicitud",
          5000
        );
      });
  };

  const List_Area_Negocio = [
    {
      company: "E",
      values: [
        {
          id: "VRP_E",
          name: "VIT - VICEPRESIDENCIA DE OPERACIONES Y MANTENIMIENTO DE TRANSPORTE",
        },
        {
          id: "VIT_E",
          name: "VIT - VICEPRESIDENCIA DE OPERACIONES Y MANTENIMIENTO DE TRANSPORTE",
        },
        {
          id: "VCM_E",
          name: "VCM - VICEPRESIDENCIA COMERCIAL Y DE MERCADEO",
        },
        { id: "VGS_E", name: "VGS - VICEPRESIDENCIA DE GAS" },
        {
          id: "VDP_E",
          name: "VDP - VICEPRESIDENCIA DE DESARROLLO Y PRODUCCIÓN",
        },
      ],
    },
    {
      company: "R",
      values: [{ id: "REF_R", name: "REF - REFICAR" }],
    },
  ];

  const servicesDto = (service) => {
    const array = JSON.parse(service.tax);
    const AreaByCompany = List_Area_Negocio.filter(
      (a) => a.company === service.company
    );
    const AreaName = AreaByCompany[0].values.filter(
      (an) => an.id === service.businessArea
    );

    const arrayModified = {
      ...service,
      nameBussinesArea: AreaName.length ? AreaName[0].name : "",
      nameTypeService:
        service.company === "E"
          ? "ZDIE - GECP SERVICIOS VENTAS"
          : "DIEN - SERVICIO",
      ArrayTax: array,
      company: service.company === "E" ? "Ecopetrol" : "Reficar",
    };

    const keys = Object.keys(arrayModified);
    let valuesSearch = "";
    keys.map((element) => {
      if (
        element === "id" ||
        element === "company" ||
        element === "userName" ||
        element === "stateName" ||
        element === "nameTypeService" ||
        element === "dateCreatedFormat" ||
        element === "lastModifiedFormat" ||
        element === "nameBussinesArea"
      ) {
        valuesSearch =
          valuesSearch + " " + element + ":" + arrayModified[element];
      }
    });

    const infoServices = {
      ...arrayModified,
      search: valuesSearch.toLowerCase(),
    };

    return infoServices;
  };

  //Metodos y funciones
  const getAllService = () => {
    dispatchRedux(startLoading());
    servicesService
      .getAllServices()
      .then((response) => {
        const { data } = response;
        const arrayService = data.data;
        const ArrayResult = arrayService.map((service) => servicesDto(service));
        dispatch({ type: Types.GET_ALL_SERVICE, payload: ArrayResult });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error la lista de servicios. ¡Intenta de nuevo!",
          5000
        );
        dispatchRedux(finishLoading());
      });
  };

  const getServiceByUser = (userId) => {
    dispatchRedux(startLoading());
    servicesService
      .getServicesByUser(userId)
      .then((response) => {
        const { data } = response;
        const arrayService = data.data;
        const ArrayResult = arrayService.map((service) => servicesDto(service));
        dispatch({ type: Types.GET_ALL_SERVICE, payload: ArrayResult });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error la lista de servicios. ¡Intenta de nuevo!",
          5000
        );
        dispatchRedux(finishLoading());
      });
  };

  const getHistoryById = (id) => {
    dispatchRedux(startLoading());
    servicesService
      .getHistoryById(id)
      .then((response) => {
        const { data } = response;
        const ArrayHistory = data.data;
        dispatch({
          type: Types.GET_HISTORY_BY_ID_SERVICE,
          payload: ArrayHistory,
        });
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError("Error al consultar el histórico de la solicitud", 5000);
      });
  };

  const setStateService = (data) => {
    dispatchRedux(startLoading());
    servicesService
      .setStateService(data)
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        } else {
          setError(data.returnMessage, 8000);
        }
        dispatchRedux(finishLoading());
      })
      .catch((err) => {
        setError(
          "Ha ocurrido un error inesperado al cambiar el estado de la solicitud.",
          5000
        );
        dispatchRedux(finishLoading());
      });
  };

  const getCauses = (type) => {
    servicesService.getCauses(type).then((response) => {
      const { data } = response;
      dispatch({ type: Types.GET_CAUSES, payload: data.data });
    });
  };

  const editService = (serviceRequest) => {
    dispatchRedux(startLoading());
    servicesService
      .editService(serviceRequest)
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        } else {
          setError(data.returnMessage, 8000);
        }
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error inesperado al modificar el servicio. ¡Intenta de nuevo!",
          5000
        );
        dispatchRedux(finishLoading());
      });
  };

  const getDataByCompany = (company) => {
    dispatchRedux(startLoading());
    const ListId = [
      { listId: 2, parentCode: company },
      { listId: 4, parentCode: company },
      { listId: 5, parentCode: company },
      { listId: 6, parentCode: company },
      { listId: 9, parentCode: company },
      { listId: 12, parentCode: company },
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
    ];
    servicesService.getList(ListId).then((response) => {
      const { data } = response;
      const { responseData } = data;
      dispatch({ type: Types.GET_LISTS_SERVICE, payload: responseData });
      dispatchRedux(finishLoading());
    });
  };

  const createService = (serviceRequest) => {
    dispatchRedux(startLoading());
    servicesService
      .createService(serviceRequest)
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          setSuccess(data.returnMessage, 10000);
        } else {
          setError(data.returnMessage, 8000);
        }
        dispatchRedux(finishLoading());
      })
      .catch(() => {
        setError(
          "Ha ocurrido un error inesperado en la creación del servicio. ¡Intenta de nuevo!",
          5000
        );
      });
  };

  const filterByState = (states) => {
    return (data) => {
      if (states !== "Todos") {
        return data.stateId === states;
      } else {
        return data;
      }
    };
  };

  const filterByCompany = (company) => {
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

  const servicesByFilters = (stateId = "Todos", company = "Todos") => {
    const { allServiceBase } = state;
    const filterService = allServiceBase
      .filter(filterByState(stateId))
      .filter(filterByCompany(company));
    dispatch({
      type: Types.GET_SERVICE_FILTERED,
      payload: filterService,
      action: true,
    });
  };

  const servicesFilter = (filedToFiler, nameField) => {
    const { allServiceBase } = state;
    if (filedToFiler !== "") {
      switch (nameField) {
        case "idRequest":
          const idRequest = allServiceBase.filter((service) => {
            return service.id.toString().includes(filedToFiler);
          });
          dispatch({
            type: Types.GET_SERVICE_FILTERED,
            payload: idRequest,
            action: true,
          });
          break;
        case "search":
          const search = allServiceBase.filter((service) => {
            return service.search.includes(filedToFiler.toLowerCase());
          });
          dispatch({
            type: Types.GET_SERVICE_FILTERED,
            payload: search,
            action: true,
          });
          break;
      }
    } else {
      dispatch({
        type: Types.GET_SERVICE_FILTERED,
        payload: allServiceBase,
        action: false,
      });
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        //History
        getHistoryById,
        historyById: state.historyById,

        //Causes
        getCauses,
        listCauses: state.listCauses,

        //Datos de MDS
        getCompany,
        getDataByCompany,
        ListsMDS: state.ListsMDS,
        companyMDS: state.companyMDS,

        //Obtener estados de la solicitud
        getStateRequest,
        stateRequest: state.stateRequest,

        //State Request
        setStateService,

        //Servicio
        getAllService,
        getServiceByUser,
        allService: state.allService,

        //CREATE AND EDIT SERVICE
        editService,
        createService,

        //filtros
        servicesFilter,
        servicesByFilters,
        isFiltered: state.isFiltered,

        //Manejo de errores
        clear,
        setError,
        setSuccess,
        Time: state.Time,
        Error: state.Error,
        Success: state.Success,
        MessageError: state.MessageError,
        MessageSuccess: state.MessageSuccess,
      }}
    >
      {props.children}
    </ServicesContext.Provider>
  );
};

export default ServicesState;
