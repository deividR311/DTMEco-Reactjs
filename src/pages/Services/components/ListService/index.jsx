import * as React from "react";
import { Filters } from "./Filters";
import { useHistory } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import HeaderContext from "../../../../context/Header/headerContext";
import ServicesContext from "../../../../context/Services/servicesContext";
import { NavBreadCrumb, SnackBarCommon } from "../../../../sharedComponents";

//Tabla
import {
  BodyTable,
  ManageData,
  HeaderTable,
} from "../../../Materials/widgets/Table";

//Constant
import {
  servicesCellNames,
  servicesTableTitles,
  navBreadCrumbArrayList,
} from "./constants";

export const ListService = () => {
  const history = useHistory();

  //CONTEXT SERVICE
  const servicesContext = useContext(ServicesContext);
  const { isFiltered, allService, getAllService, getServiceByUser } =
    servicesContext;

  //Manejar Errores
  const { Time, clear, Error, Success, MessageError, MessageSuccess } =
    servicesContext;

  if (Success || Error) {
    setTimeout(() => {
      clear();
      history.push("/");
    }, Time);
  }

  //CONTEXT HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //States
  const [isApplicantState, setIsApplicantState] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    createdBy: 0,
  });

  useEffect(() => {
    if (responseData !== undefined) {
      const moduleServices = responseData.filter(
        (module) => module.moduleOrder === 4
      );
      if (moduleServices.length) {
        const isApplicant = moduleServices[0].subModules.some(
          (element) => element.code === "DMM_C_SVC"
        );
        if (isApplicant) {
          setIsApplicantState(true);
        }
        const isEdit = moduleServices[0].subModules.some(
          (element) => element.code === "DMM_U_SVC"
        );
        if (isEdit) {
          setIsEditable(true);
        }
        const isApprover = moduleServices[0].subModules.some(
          (element) => element.code === "DMM_AP_SVC"
        );
        if (isApprover) {
          getAllService();
        } else if (isApplicant) {
          getServiceByUser(moduleServices[0].userId);
        }
        setCurrentUser({
          createdBy: moduleServices[0].userId,
        });
      } else {
        alert("No tiene permiso ver este módulo");
        history.push("/");
      }
    }
  }, [responseData]);

  const handleCreate = () => {
    history.push("/Materiales/ServiciosCrear");
  };

  const handleEdit = (item) => {
    history.push({
      pathname: "/Materiales/ServiciosModificar",
      state: item,
    });
  };

  const handleDetail = (item) => {
    history.push({
      pathname: "/Materiales/ServiciosDetalle",
      state: item,
    });
  };

  const handleCloseSnack = () => {
    clear();
  };

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArrayList} />
      <h3 className="TitleView">Gestión de servicios</h3>
      <ManageData>
        <HeaderTable
          Filtered={isFiltered}
          showBtn={isApplicantState}
          labelButton="Nuevo servicio"
          handleOnClick={handleCreate}
          hasData={allService && allService.length > 0}
        >
          <Filters />
        </HeaderTable>
        <BodyTable
          data={allService}
          Filtered={isFiltered}
          handleEdit={handleEdit}
          isEditable={isEditable}
          handleDetail={handleDetail}
          titles={servicesTableTitles}
          cellNames={servicesCellNames}
          currentUser={currentUser.createdBy}
        />
      </ManageData>
      <SnackBarCommon
        time={Time}
        error={Error}
        success={Success}
        errorMessage={MessageError}
        successMessage={MessageSuccess}
        handleCloseSnack={handleCloseSnack}
      />
    </>
  );
};
