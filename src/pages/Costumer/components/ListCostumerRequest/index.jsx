import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import PersonIcon from "@material-ui/icons/Person";
import {
  ModalCommon,
  NavBreadCrumb,
  SnackBarCommon,
  Table,
} from "../../../../sharedComponents";
import {
  requestCellNames,
  requestCellNamesLevelOne,
  requestCellNamesLevelTwo,
  requestTableTitlesLevelTwo,
  requestTableTitles,
  requestTableTitlesApprover,
  requestTableTitlesVerify,
} from "../../constants";
import { useSearchMultiple } from "../../hooks/useSearchMultiple";
import { useStyles } from "../../styles";
import { SelectApprover } from "../CostumerWizard/components";
import AdminContext from "../../../../context/Administration/adminContext";
import { useDashboardSelectApprover } from "../../hooks/useDashboardSelectApprover";
import CostumerContext from "../../../../context/Costumer/costumerContext";
import { useDashboardCancelRequest } from "../../hooks/useDashboardCancelRequest";

const ListCostumerRequest = ({
  allUserRequestList,
  isApprover,
  isLevelTwo,
  serviceParameterName,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const adminContext = useContext(AdminContext);
  const { allUsers, loadAllUsers } = adminContext;
  const costumerContext = useContext(CostumerContext);
  const {
    saveApproverManage,
    saveApproverManageSuccess,
    saveApproverManageFailed,
    clearsaveApproverManageFailed,
    clearsaveApproverManageSuccess,
  } = costumerContext;
  const navBreadCrumbArray = [
    { path: "/", active: "", word: "Inicio" },
    {
      path: "/Clientes/Consultar",
      active: "BreadCrumb__link--active",
      word: "Listado de solicitudes",
    },
  ];
  const [wordFilter, requestFiltered, handleOnChange] =
    useSearchMultiple(allUserRequestList);
  const [
    openModal,
    didSubmitApprover,
    selectApprover,
    handleSelectApprover,
    setSelectApprover,
    changeApprover,
    handleCloseModal,
    handleConfirmApprover,
    handleApprover,
    handleCloseSnack,
  ] = useDashboardSelectApprover(
    saveApproverManage,
    clearsaveApproverManageFailed,
    clearsaveApproverManageSuccess,
    saveApproverManageFailed
  );

  const [
    openModalCancel,
    saveModalApproval,
    setOpenModalCancel,
    handleCloseModalCancel,
    handleApprovalModal,
  ] = useDashboardCancelRequest(history, costumerContext);

  useEffect(() => {
    loadAllUsers();
  }, []);

  const editRequest = (item) => {
    history.push({
      pathname: `/Clientes/ClienteNacional/${item.codeEnterprise}/Editar/${item.id}`,
    });
  };

  const approverCheckRequest = (item) => {
    history.push({
      pathname: `${
        serviceParameterName === "verifiedBy"
          ? `/Clientes/ClienteNacional/${item.codeEnterprise}/NivelUno/${item.id}`
          : `/Clientes/ClienteNacional/${item.codeEnterprise}/Aprobador/${item.id}`
      }`,
    });
  };

  const cancelRequest = (item) => {
    history.push({
      state: {
        cancelRequestFullData: item,
      },
    });
    setOpenModalCancel(true);
  };

  const saveCancelRequest = () => {
    handleApprovalModal();
  };

  const RedirectCreateNewRequest = () => {
    history.push("/Clientes/Crear");
  };

  const returnTitlesTable = () => {
    switch (serviceParameterName) {
      case "verifiedBy":
        return requestTableTitlesVerify;

      case "approvedBy":
        return requestTableTitlesApprover;

      case "createdBy":
        return requestTableTitles;
      case "Nivel2":
        return requestTableTitlesLevelTwo;

      default:
        return requestTableTitles;
    }
  };

  const approvers =
    allUsers.length > 0
      ? allUsers.filter((subModule) =>
          subModule.subModules.find((item) =>
            item.subModules.find((item2) => item2.code === "DMC_AP_CLIFA")
          )
        )
      : [];

  const tableTitles = returnTitlesTable();

  const setAssignCellNames = () => {
    switch (serviceParameterName) {
      case "verifiedBy":
        return requestCellNamesLevelOne;
      case "Nivel2":
        return requestCellNamesLevelTwo;
      default:
        return requestCellNames;
    }
  };

  const handleLevelTwo = (item) => {
    history.push({
      pathname: `${
        serviceParameterName === "Nivel2"
          ? `/Clientes/${item.codeEnterprise}/ClienteNacional/NivelDos/${item.id}`
          : ""
      }`,
    });
  };

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArray} />
      <h3 className="eco_titulo_tabla">
        {serviceParameterName === "Nivel2"
          ? "Listado de solicitudes Nivel 2"
          : "Listado de solicitudes"}
      </h3>
      <Table
        titles={tableTitles}
        data={requestFiltered.length > 0 ? requestFiltered : allUserRequestList}
        isFiltered={requestFiltered.length > 0 ? true : false}
        cellNames={setAssignCellNames()}
        alternativeCellName="clientName"
        otherMethod={cancelRequest}
        isJson={isApprover ? false : isLevelTwo ? false : true}
        editMethod={
          isApprover
            ? approverCheckRequest
            : isLevelTwo
            ? handleLevelTwo
            : editRequest
        }
        alternativeMethod={changeApprover}
        title={"Número de solicitud - Estado - Identificación del cliente"}
        wordFilter={wordFilter}
        classes={classes}
        handleOnChange={handleOnChange}
        redirectCreateRegister={RedirectCreateNewRequest}
        btnLabel={"Nueva solicitud"}
        nameRow="stateId"
        value={3}
        secondValue={4}
        threeValue={7}
        fourValue={8}
        isApprover={isApprover || isLevelTwo}
        Icon={
          isApprover && !isLevelTwo
            ? () => <FindInPageIcon />
            : () => <EditIcon />
        }
        Icon2={isApprover && !isLevelTwo ? () => {} : () => <BlockIcon />}
        AlternativeIcon={() => <PersonIcon />}
        disabledClass={classes.ctnEditIconDisabled}
        enabledClass={classes.ctnEditIcon}
        nivel2={isLevelTwo ? true : false}
        valueNivel2={isLevelTwo ? 8 : 0}
      />
      <ModalCommon
        classes={classes}
        handleOptions={""}
        handleClose={handleCloseModal}
        open={openModal}
        disableBackdropClick={true}
        title={"Selecciona un aprobador"}
        handleConfirm={handleConfirmApprover}
        cancel={"Cancelar"}
        confirm={"Guardar"}
      >
        <SelectApprover
          list={approvers}
          item={"name"}
          isSecondItem={true}
          secondItem={"lastName"}
          label={"Seleccionar..."}
          name={"approvedBy"}
          classes={classes}
          required={didSubmitApprover}
          handleOnChange={handleApprover}
        />
      </ModalCommon>

      <ModalCommon
        classes={classes}
        handleOptions={""}
        handleClose={handleCloseModalCancel}
        open={openModalCancel}
        disableBackdropClick={true}
        title={"Cancelar solicitud"}
        handleConfirm={saveCancelRequest}
        cancel={"Cancelar"}
        confirm={"Aceptar"}
      >
        <label>
          Señor usuario usted está cancelando la solicitud, ¿Desea continuar?
        </label>
      </ModalCommon>

      <SnackBarCommon
        success={saveApproverManageSuccess}
        error={saveApproverManageFailed}
        handleCloseSnack={handleCloseSnack}
        successMessage={"Aprobador modificado exitosamente"}
        errorMessage={"Ha ocurrido un error, intenta nuevamente"}
      />
    </>
  );
};

export default ListCostumerRequest;
