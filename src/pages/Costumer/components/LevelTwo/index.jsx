import * as React from "react";
import { Button } from "@material-ui/core";
import { Wizard } from "../../../../sharedComponents";
import { useSelector } from "react-redux";
import schema from "./schema/LevelTwoManagement.schema";
import { useContext, useEffect, useState } from "react";
import { ModalLevelTwo } from "./widgets/ModalLevelTwo";
import { useHistory, withRouter } from "react-router-dom";
import { useStyles } from "../../../Administration/styles";
import { useStylesMaterial } from "../../../Materials/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HeaderContext from "../../../../context/Header/headerContext";
import CostumerContext from "../../../../context/Costumer/costumerContext";

import {
  LevelTwoFormOne,
  LevelTwoFormTwo,
  LevelTwoFormThree,
} from "./components";

import {
  NavBreadCrumb,
  DialogCommon,
  SnackBarCommon,
} from "../../../../sharedComponents";

const initialState = {
  stateId: "",
  typeCauses: "",
  observations: "",
};

const LevelTwo = ({ match, location }) => {
  //REDUX
  const { data } = useSelector((state) => state.auth);
  const { name, lastName } = data.data;

  //STYLES
  const classes = useStyles();
  const classesMaterial = useStylesMaterial();

  //HISTORY
  const history = useHistory();

  //CONTEXT
  const costumerContext = useContext(CostumerContext);
  const {
    requestById,
    updateCostumerLevelTwo,
    loadRequestById,
    generalCostumerList,
    loadGeneralCostumerLists,

    //gestión
    returnReasons,
    rejectionReasons,
    loadReturnReasons,
    loadRejectionReasons,

    //snack
    updateCostumerFailed,
    updateCostumerSuccess,
    clearUpdateCostumerFailed,
    clearUpdateCostumerSuccess,
    saveApproverManage,
    saveApproverManageSuccess,
    saveApproverManageFailed,
    clearsaveApproverManageSuccess,
    clearsaveApproverManageFailed,
    documentType,
    loadDocumentType,
  } = costumerContext;

  //----HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //USE STATE
  const [dataForm, setDataForm] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [openSnack, setOpenSnack] = useState(false);
  const [stateRequest, setStateRequest] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    createdBy: 0,
  });

  //USE EFFECT¿
  useEffect(() => {
    if (match) {
      loadRequestById(match.params.id);
      loadGeneralCostumerLists([
        { ListId: 4, ParentCode: "" },
        { ListId: 7, ParentCode: "" },
        { ListId: 6, ParentCode: "CO" },
        { ListId: 5, ParentCode: match.params.code },
        { ListId: 10, ParentCode: match.params.code },
        { ListId: 11, ParentCode: match.params.code },
        { ListId: 12, ParentCode: match.params.code },
        { ListId: 13, ParentCode: match.params.code },
        { ListId: 14, ParentCode: match.params.code },
        { ListId: 17, ParentCode: match.params.code },
      ]);
    }
    loadDocumentType();
  }, []);

  /* SE VALIDAN LOS ROLES Y PERMISOS */
  useEffect(() => {
    if (responseData !== undefined) {
      setCurrentUser({
        createdBy: responseData[0].userId,
      });
    }
  }, [responseData]);

  useEffect(() => {
    if (requestById) {
      if (requestById.stateId !== 8) {
        setOpenSnack(true);
        setTimeout(() => {
          history.push("/Clientes/Consultar");
        }, 5000);
      }
    }
  }, [requestById]);

  //METHODS
  const goBack = () => {
    history.goBack();
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const clearStates = () => {
    clearUpdateCostumerFailed();
    clearUpdateCostumerSuccess();
    clearsaveApproverManageSuccess();
    clearsaveApproverManageFailed();
  };

  if (
    updateCostumerFailed ||
    updateCostumerSuccess ||
    saveApproverManageSuccess ||
    saveApproverManageFailed
  ) {
    setTimeout(() => {
      clearStates();
      history.push("/Clientes/Consultar");
    }, 5000);
  }

  const navBreadCrumbArrayList = [
    { path: "/", active: "", word: "Inicio" },
    {
      path: "/Clientes/Consultar",
      active: "",
      word: "Listado de solicitudes",
    },
    {
      path: "#",
      active: "BreadCrumb__link--active",
      word: "Gestión nivel 2",
    },
  ];

  //--------------------------------------------

  const [diaglog, setDialog] = useState(false);
  const [diaglogBack, setDialogBack] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isApprover, setIsApprover] = useState(false);
  const [passValidation, setPassValidation] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openDialogCancelar = () => {
    setDialog(true);
  };

  const handleCloseCancelar = () => {
    setDialog(false);
  };

  const confirmCancelDialogCancelar = () => {
    handleCloseCancelar();
    goBack();
  };

  const confirmCancelDialogBack = () => {
    handleBack();
    setDialogBack(false);
  };

  const handleOpenBack = () => {
    setDialogBack(true);
  };

  const handleCloseBack = () => {
    setDialogBack(false);
  };

  const validateBack = () => {
    if (activeStep > 2) {
      handleOpenBack();
    } else {
      handleBack();
    }
  };

  //--------------------------------------------

  const titleWizard = [
    { number: 1, name: "Datos anteriores" },
    { number: 2, name: "Campos cálculados" },
    { number: 3, name: "Formulario nivel 2" },
  ];

  useEffect(() => {
    if (
      Object.values(dataForm).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      modalApprove();
      setPassValidation(true);
    }
  }, [dataForm]);

  useEffect(() => {
    if (
      Object.values(stateRequest).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      if (stateRequest.stateId === 10) {
        if (passValidation) {
          UpdateForm();
        }
      } else {
        saveState();
      }
      handleCloseModal();
    }
  }, [stateRequest]);

  const UpdateForm = () => {
    const general = requestById.generalInfo;

    const requestUpdate = {
      ...requestById,
      generalInfo: {
        nif: general.nif,
        email: general.email,
        address: general.address,
        codeCity: general.codeCity,
        codeCIIU: general.codeCIIU,
        telephone: general.telephone,
        firstName: general.firstName,
        cellphone: general.cellphone,
        secondName: general.secondName,
        codeRegion: general.codeRegion,
        codeCountry: general.codeCountry,
        tittle: parseInt(general.tittle),
        codeTypeNif: general.codeTypeNif,
        typeIndustry: general.typeIndustry,
        firstSurname: general.firstSurname,
        businessName: general.businessName,
        secondSurname: general.secondSurname,
        codeTypePerson: general.codeTypePerson,
        legalRepresentativeId: general.legalRepresentativeId,
        legalRepresentativeName: general.legalRepresentativeName,
      },
      level2Info: {
        operationType: dataForm.operationType,
        associatedAccount: dataForm.associatedAccount,
        contactInformation: dataForm.contactInformation.length
          ? JSON.stringify(dataForm.contactInformation)
          : "",
      },
    };
    const request = returnRequest();
    updateCostumerLevelTwo(requestUpdate, request);
  };

  const saveState = () => {
    const request = returnRequest();
    saveApproverManage(request);
  };

  const returnRequest = () => {
    const request = {
      stateId: stateRequest.stateId,
      requestId: requestById.id,
      approvingUserId: currentUser.createdBy,
      approvingUserName: `${name} ${lastName}`,
      rejectionReason:
        stateRequest.stateId === 11 ? stateRequest.typeCauses : 0,
      returnReason: stateRequest.stateId === 13 ? stateRequest.typeCauses : 0,
      observations: stateRequest.observations,
      titanCaseId: requestById.titanCaseId,
      requestUrl: `${process.env.REACT_APP_OFFICIAL_URL}${location.pathname}`,
    };
    return request;
  };

  const components = [
    {
      number: 1,
      component: (
        <LevelTwoFormOne
          data={requestById}
          documentType={documentType}
          generalCostumerList={generalCostumerList}
        />
      ),
    },
    {
      number: 2,
      component: <LevelTwoFormTwo />,
    },
    {
      number: 3,
      component: (
        <LevelTwoFormThree
          dataForm={dataForm}
          isSubmitting={isSubmitting}
          codeEnterprise={match.params.code}
          modalApprove={() => modalApprove()}
          setForm={(element) => setDataForm(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          setPassValidation={(value) => setPassValidation(value)}
        />
      ),
    },
  ];

  const modalApprove = () => {
    handleOpenModal();
    setIsApprover(true);
  };

  const validateChangeStep = () => {
    if (activeStep <= 2) {
      handleNext();
    } else {
      setIsSubmitting(true);
    }
  };

  const handleReject = () => {
    setIsApprover(false);
    handleOpenModal();
  };

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArrayList} />
      <Button
        color="primary"
        variant="outlined"
        className="goBackButton"
        onClick={openDialogCancelar}
        startIcon={<ArrowBackIosIcon />}
      >
        Regresar
      </Button>
      <h3 className="TitleView">Gestión nivel 2</h3>
      <Wizard
        isSave={false}
        showPreview={true}
        handleCancel={openDialogCancelar}
        activeStep={activeStep}
        handleBack={validateBack}
        finalBtnName={"Aprobar"}
        classes={classesMaterial}
        titlesWizard={titleWizard}
        handleReject={handleReject}
        componentsWizard={components}
        handleNext={validateChangeStep}
        labelReject={"Rechazar / devolver"}
        showReject={activeStep > 2 ? true : false}
      />
      <SnackBarCommon
        time={5000}
        error={openSnack}
        success={false}
        errorMessage={
          "La solicitud no se encuentra en estado Aprobado Nivel 1 por ende no se puede editar"
        }
        successMessage={""}
        handleCloseSnack={() => {
          history.push("/Clientes/Consultar");
        }}
      />
      <SnackBarCommon
        time={5000}
        error={updateCostumerFailed || saveApproverManageFailed}
        success={updateCostumerSuccess || saveApproverManageSuccess}
        errorMessage={"Ha ocurrido un error inesperado"}
        successMessage={"La información ha sido guardada correctamente."}
        handleCloseSnack={clearStates}
      />
      <DialogCommon
        open={diaglog}
        title="Cancelar"
        classes={classes}
        handleClose={handleCloseCancelar}
        medium={"crear"}
        confirmCancelDialog={confirmCancelDialogCancelar}
        messageEdit=""
        messageCreate="¿Está seguro que desea cancelar gestión de la solicitud?"
      />
      <DialogCommon
        open={diaglogBack}
        title="Anterior"
        classes={classes}
        handleClose={handleCloseBack}
        medium={"crear"}
        confirmCancelDialog={confirmCancelDialogBack}
        messageEdit=""
        messageCreate={`Si registró información, ésta no se guadará si vuelve al paso anterior. \n
        ¿Está seguro que desea volver al paso anterior?`}
      />
      <ModalLevelTwo
        schema={schema}
        maxWidth={"md"}
        open={openModal}
        fullWidth={true}
        data={requestById}
        isApprove={isApprover}
        currentUser={currentUser}
        initialState={initialState}
        returnReasons={returnReasons}
        handleClose={handleCloseModal}
        setStateRequest={setStateRequest}
        rejectionReasons={rejectionReasons}
        loadReturnReasons={loadReturnReasons}
        nameCurrentUser={`${name} ${lastName}`}
        loadRejectionReasons={loadRejectionReasons}
      />
    </>
  );
};

//saveApproverManage

export default withRouter(LevelTwo);
