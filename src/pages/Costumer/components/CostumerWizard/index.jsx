import React, { useContext, useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import CostumerContext from "../../../../context/Costumer/costumerContext";
import { useDialog } from "../../../../hooks/useDialog";
import { useForm } from "../../../../hooks/useForm";
import {
  DialogCommon,
  ModalCommon,
  NavBreadCrumb,
  SnackBarCommon,
  Wizard,
} from "../../../../sharedComponents";
import {
  generalFormNames,
  titlesWizard,
  generalFormStateNames,
  CODE_DEPARTMENT,
  fiscalNames,
  saleNames,
  saleFormNames,
  fiscalFormNames,
} from "../../constants";
import { useFormGeneralInfo } from "../../hooks/useFormGeneralInfo";
import { useMaxLength } from "../../hooks/useMaxLength";
import { useSaveGeneralInfo } from "../../hooks/useSaveGeneralInfo";
import { useSaveMethod } from "../../hooks/useSaveMethod";
import { useSaveSalesInfo } from "../../hooks/useSaveSalesInfo";
import { useSaveFiscalInfo } from "../../hooks/useSaveFiscalInfo";
import { useWizardStep } from "../../hooks/useWizardStep";
import { useStyles } from "../../styles";
import {
  ClientFormOne,
  ClientFormTwo,
  ClientFormThree,
  ClientFormFour,
  SelectApprover,
  RutAddress,
  UpdateOrDelete,
  ApproversBtnsRequest,
  ApproverManage,
  ApproveRequest,
  RequestOtherUser,
} from "./components";
import { useSpecialStyles } from "./styles";
import { useDisabledBtn } from "../../hooks/useDisabledBtn";
import { useFormUploadFiles } from "../../hooks/useFormUploadFiles";
import { useSaveUploadFiles } from "../../hooks/useSaveUploadFiles";
import HeaderContext from "../../../../context/Header/headerContext";
import AdminContext from "../../../../context/Administration/adminContext";
import { useSaveRutDirection } from "../../hooks/useSaveRutDirection";
import { useSaveRutRuralAddress } from "../../hooks/useSaveRutRuralAddress";
import { useFormApproverManage } from "../../hooks/useFormApproverManage";

import { LevelTwo } from "../index";

const CostumerWizard = ({ match, location }) => {
  const SpecialClasses = useSpecialStyles();
  const classes = useStyles();
  const history = useHistory();
  const { state } = location;
  let legalRepresentativeId;
  let legalRepresentativeName;
  let isBusinessName;
  const [openModal, setOpenModal] = useState(false);
  const [generalDisabled, setGeneralDisabled] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [otherUserRequest, setOtherUserRequest] = useState(false);
  const [openModalExistRequest, setOpenModalExistRequest] = useState(false);
  const [openModalReconfirm, setOpenModalReconfirm] = useState(false);
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const adminContext = useContext(AdminContext);
  const { allUsers, loadAllUsers } = adminContext;
  const { responseData } = headerModuleUserPermissions;
  const costumerContext = useContext(CostumerContext);
  const {
    generalCostumerList,
    loadGeneralCostumerLists,
    existCostumerMDS,
    existCostumer,
    loadExistCostumerMDS,
    loadExistCostumer,
    verificationCode,
    loadVerificationCode,
    updateCostumerSuccess,
    updateCostumerFailed,
    updateCostumer,
    clearUpdateCostumerFailed,
    clearUpdateCostumerSuccess,
    documentType,
    loadDocumentType,
    uploadFileSuccess,
    uploadFileFailed,
    uploadCostumerFile,
    clearUploadCostumerFileFailed,
    clearUploadCostumerFileSuccess,
    deleteClientRequestSuccess,
    deleteClientRequestFailed,
    deleteCostumerRequest,
    requestById,
    loadRequestById,
    rejectionReasons,
    returnReasons,
    loadRejectionReasons,
    loadReturnReasons,
    saveApproverManageSuccess,
    saveApproverManageFailed,
    saveApproverManage,
    clearsaveApproverManageFailed,
    clearsaveApproverManageSuccess,
  } = costumerContext;

  let isValidate = false;
  const [wizardData, setWizardData] = useState({
    id: "",
    codeEnterprise: "",
    codeAccountGroup: "",
    codePartnership: "",
    observations: "",
    stateId: "",
    generalInfo: "",
    salesInfo: "",
    level2Info: {
      operationType: "",
      contactInformation: "",
      associatedAccount: "",
    },
    fiscalInfo: [],
    createdBy: null,
    approvedBy: null,
    verifiedBy: null,
    finalizedBy: null,
    modifiedBy: null,
    RequestUrl: "",
  });

  const [telephoneData, setTelephoneData] = useState("");
  const [legalId, setLegalId] = useState("");
  const [fiscalArray, setFiscalArray] = useState([]);
  const [legalRepresentative, setLegalRepresentative] = useState({
    name: "",
    lastName: "",
  });
  const [deleteJson, setDeleteJson] = useState({
    deletedBy: "",
    requestId: "",
  });
  const [showAddress, setShowAddress] = useState("");
  const [validateEmailSales, setValidateEmailSales] = useState(false);
  const [isExistUploadCostumer, setIsExistUploadCostumer] = useState(false);
  const [isEditRequest, setIsEditRequest] = useState(false);
  let indicative = [];
  const [indData, setIndData] = useState("");
  const [open, handleClickOpen, handleClose, confirmCancelDialog] =
    useDialog(false);
  const [
    generalInfo,
    validateEmail,
    didSubmitCIIU,
    updateValue,
    regexEmailOnChange,
    handleChange,
    handleChangeNif,
    setGeneralInfo,
    verification,
  ] = useFormGeneralInfo(
    existCostumerMDS,
    indData,
    telephoneData,
    legalRepresentative,
    verificationCode,
    legalId,
    existCostumer,
    state,
    requestById
  );
  const [
    didSubmit,
    didSubmitCompany,
    didSubmitNames,
    specificError,
    messageSpecificError,
    canSave,
    handleCloseSnack,
    handleSave,
    didSubmitTel,
  ] = useSaveGeneralInfo(
    generalInfo,
    validateEmail,
    existCostumerMDS,
    existCostumer,
    didSubmitCIIU,
    telephoneData,
    indData,
    legalRepresentative,
    updateCostumer,
    wizardData,
    clearUpdateCostumerFailed,
    clearUpdateCostumerSuccess,
    setWizardData,
    responseData,
    location
  );
  let validateLength = false;
  const [salesInfo, handleSaleChange, setSalesInfo] = useForm({
    salesOrganizationCode: "",
    canalCode: "",
    sectorCode: "",
    salesAreaCode: "ZV0003",
    transportZoneCode: "",
    email: "",
    telephone: "",
    codefunction: "",
  });
  const [codeImpCarbono, handleCodeImpCarbonoChange, setCodeImpCarbono] =
    useForm({
      codeClassFiscal: "ZICB",
      value: "",
      codeCountry: "CO",
    });

  const [codeImpNacional, handleCodeImpNacionalChange, setCodeImpNacional] =
    useForm({
      codeClassFiscal: "ZINA",
      value: "",
      codeCountry: "CO",
    });

  const [codeImpTimbre, handlecodeImpTimbreChange, setCodeImpTimbre] = useForm({
    codeClassFiscal: "ZITI",
    value: "",
    codeCountry: "CO",
  });

  const [codeImpSobretasa, handleCodeImpSobretasaChange, setCodeImpSobretasa] =
    useForm({
      codeClassFiscal: "ZIST",
      value: "",
      codeCountry: "CO",
    });

  const [codeImpIVA, handleCodeImpIVAChange, setCodeImpIVA] = useForm({
    codeClassFiscal: "ZIVA",
    value: "",
    codeCountry: "CO",
  });

  const [urbanAddress, UrbanAddressChange, setUrbanAddress] = useForm({
    typeVia: "",
    NameVia: "",
    letterVia: "",
    prefix: "",
    quadrant: "",
    numberViaGeneral: "",
    letterViaGeneral: "",
    prefixBis: "",
    plateNumber: "",
    complementOne: "",
    otherOne: "",
    complementTwo: "",
    otherTwo: "",
    complementOneRural: "",
    otherOneRural: "",
    complementTwoRural: "",
    otherTwoRural: "",
  });

  const [addressType, addressOnChange] = useForm({
    id: "",
  });

  const [
    approverManageModal,
    tittleModalApprover,
    showApproveScreen,
    approveManageJson,
    didSubmitApproverManage,
    approverManageMessageError,
    rejectionRequest,
    returnRequest,
    approveRequest,
    closeApproverManageModal,
    approverManageSave,
    handleChangeApproveManage,
    handleCloseApproverManageSnack,
  ] = useFormApproverManage(
    saveApproverManage,
    clearsaveApproverManageFailed,
    clearsaveApproverManageSuccess,
    requestById,
    allUsers,
    responseData,
    match
  );

  const [maxLength] = useMaxLength(generalInfo, validateLength);
  const [activeStep, handleNext, handleBack, setActiveStep] = useWizardStep();
  const [disabledBtn, setDisabledBtn] = useDisabledBtn(
    updateCostumerSuccess,
    activeStep
  );
  const [
    canSaveSalesInfo,
    didSubmitSale,
    specificErrorSale,
    messageSpecificErrorSale,
    didSubmitContact,
    handleCloseSnackSales,
    saveSalesInfo,
    setDidSubmitContact,
  ] = useSaveSalesInfo(
    salesInfo,
    setDisabledBtn,
    activeStep,
    updateCostumer,
    clearUpdateCostumerFailed,
    clearUpdateCostumerSuccess,
    wizardData,
    validateEmailSales
  );
  const [
    canSaveFiscalInfo,
    didSubmitFiscal,
    specificErrorFiscal,
    messageSpecificErrorFiscal,
    handleCloseSnackFiscal,
    saveFiscalInfo,
  ] = useSaveFiscalInfo(
    codeImpCarbono,
    codeImpNacional,
    codeImpTimbre,
    codeImpSobretasa,
    codeImpIVA,
    setDisabledBtn,
    activeStep,
    updateCostumer,
    clearUpdateCostumerFailed,
    clearUpdateCostumerSuccess,
    wizardData
  );

  const [
    checked,
    rut,
    camera,
    document,
    wash,
    handleCheckedChange,
    handleRutChange,
    handleCameraChange,
    handleDocumentChange,
    handleWashChange,
    setRut,
    setCamera,
    setDocument,
    setWash,
    rutNameFile,
    cameraNameFile,
    documentNameFile,
    washNameFile,
    messageFileRut,
    messageFileCamera,
    messageFileDocument,
    messageFileWash,
    showMessageFileRut,
    closeSnackRut,
    showMessageFileCamera,
    closeSnackCamera,
    showMessageFileDocument,
    closeSnackDocument,
    showMessageFileWash,
    closeSnackWash,
  ] = useFormUploadFiles(
    wizardData.id,
    state && state.userLogged
      ? state.userLogged
      : responseData && responseData[0].userId,
    wizardData.stateId
  );

  const [
    didSubmitFile,
    specificErrorFile,
    messageSpecificErrorFile,
    handleCloseSnackFile,
    saveUploadFiles,
  ] = useSaveUploadFiles(
    checked,
    rut,
    camera,
    document,
    wash,
    setDisabledBtn,
    activeStep,
    uploadCostumerFile,
    clearUploadCostumerFileFailed,
    clearUploadCostumerFileSuccess,
    generalInfo,
    uploadFileSuccess,
    uploadFileFailed,
    existCostumer,
    isExistUploadCostumer,
    isEditRequest,
    requestById
  );

  const [
    didSubmitUrban,
    didSubmitOne,
    didSubmitTwo,
    specificErrorUrban,
    directionValidations,
    closeModalSnack,
  ] = useSaveRutDirection(
    urbanAddress,
    setGeneralInfo,
    addressType,
    setOpenModalAddress,
    showAddress,
    setUrbanAddress
  );

  const [
    didSubmitRural,
    didSubmitTwoRural,
    specificErrorRural,
    addressRuralValidations,
    closeRuralModalSnack,
  ] = useSaveRutRuralAddress(
    urbanAddress,
    setGeneralInfo,
    addressType,
    setOpenModalAddress,
    showAddress,
    setUrbanAddress
  );

  const [returnSaveMethod] = useSaveMethod(
    activeStep,
    handleSave,
    saveSalesInfo,
    saveFiscalInfo,
    saveUploadFiles
  );

  const saveMethod = returnSaveMethod();

  const navBreadCrumbArray = [
    { path: "/", active: "", word: "Inicio" },
    {
      path: "/Clientes/Crear",
      active: "",
      word: "Solicitud de creación cliente",
    },
    {
      path: "/Clientes/Crear/ClienteNacional",
      active: "BreadCrumb__link--active",
      word: "Registro cliente nacional",
    },
  ];

  useEffect(() => {
    if (state) {
      if (state.dataRequest) {
        costumerListGeneral(state.dataRequest.codeEnterprise);

        setWizardData((prevState) => ({
          ...prevState,
          id: state.clientId,
          codeEnterprise: state.dataRequest.codeEnterprise,
          codeAccountGroup: state.dataRequest.codeAccountGroup,
          codePartnership: state.dataRequest.codePartnership,
          stateId: state.dataRequest.stateId,
        }));
      }
    }

    if (match) {
      if (match.params.code) {
        costumerListGeneral(match.params.code);
        loadRejectionReasons();
        loadReturnReasons();
      }
    }

    loadDocumentType();
    loadAllUsers();
  }, []);

  useEffect(() => {
    if (generalCostumerList.length > 0) {
      if (match.params.id) {
        loadRequestById(match.params.id);
      }
    }
  }, [generalCostumerList]);

  useEffect(() => {
    if (requestById) {
      if (match.params.nivel !== "Editar") {
        setIsEditRequest(false);
        setGeneralDisabled(true);
        setWizardData((prevState) => ({
          ...prevState,
          stateId: requestById.stateId,
        }));
      } else {
        setIsEditRequest(true);
        regexEmailOnChange("email", requestById.generalInfo.email, true);
        setGeneralDisabled(false);
        setWizardData((prevState) => ({
          ...prevState,
          stateId: 3,
        }));
      }
      setWizardData((prevState) => ({
        ...prevState,
        id: requestById.id,
        codeEnterprise: requestById.codeEnterprise,
        codeAccountGroup: requestById.codeAccountGroup,
        codePartnership: requestById.codePartrnership,
      }));
      if (requestById.generalInfo.nif !== "") {
        setGeneralInfo(() => ({
          codeTypeNif: requestById.generalInfo.codeTypeNif,
          nif: requestById.generalInfo.nif,
          codeTypePerson: requestById.generalInfo.codeTypePerson,
          codeCIIU: requestById.generalInfo.codeCIIU,
          typeIndustry: `${requestById.generalInfo.typeIndustry}`,
          tittle: parseInt(requestById.generalInfo.tittle),
          businessName: requestById.generalInfo.businessName,
          firstName: requestById.generalInfo.firstName,
          secondName: requestById.generalInfo.secondName,
          firstSurname: requestById.generalInfo.thirdName,
          secondSurname: requestById.generalInfo.fourthName,
          codeCountry: requestById.generalInfo.codeCountry,
          codeRegion: requestById.generalInfo.codeRegion,
          codeCity: requestById.generalInfo.codeCity,
          address: requestById.generalInfo.address,
          cellphone: requestById.generalInfo.cellphone,
          email: requestById.generalInfo.email,
        }));
        if (
          requestById.generalInfo.legalRepresentativeName !== "" &&
          requestById.generalInfo.legalRepresentativeName !== null &&
          requestById.generalInfo.legalRepresentativeId !== "" &&
          requestById.generalInfo.legalRepresentativeId !== null
        ) {
          const legalName =
            requestById.generalInfo.legalRepresentativeName.split(" ");
          const legalRepresentativeName = legalName[0];
          const legalRepresentativeLastName = legalName[1];
          setLegalRepresentative({
            name: legalRepresentativeName,
            lastName: legalRepresentativeLastName,
          });
          setLegalId(requestById.generalInfo.legalRepresentativeId);
        }
        if (
          requestById.generalInfo.legalRepresentativeId === null &&
          requestById.generalInfo.legalRepresentativeName === null
        ) {
          setLegalId("");
          setLegalRepresentative({
            name: "",
            lastName: "",
          });
        }
        const homeTelephone = requestById.generalInfo.telephone.split("-");
        const homeTelephoneTwo = homeTelephone[1];
        setTelephoneData(homeTelephoneTwo);
      }

      if (requestById.salesInfo.salesOrganizationCode !== "") {
        setSalesInfo((prevState) => ({
          ...prevState,
          salesOrganizationCode: requestById.salesInfo.salesOrganizationCode,
          canalCode: requestById.salesInfo.canalCode,
          sectorCode: requestById.salesInfo.sectorCode,
          salesAreaCode: requestById.salesInfo.salesAreaCode,
          transportZoneCode: requestById.salesInfo.transportZoneCode,
        }));
      }

      if (requestById.fiscalInfo.length > 0) {
        setTimeout(() => {
          setDisabledBtn(false);
        }, 1000);
        setCodeImpCarbono((prevState) => ({
          ...prevState,
          value: requestById.fiscalInfo[0].value,
        }));
        setCodeImpNacional((prevState) => ({
          ...prevState,
          value: requestById.fiscalInfo[1].value,
        }));
        setCodeImpTimbre((prevState) => ({
          ...prevState,
          value: requestById.fiscalInfo[2].value,
        }));
        setCodeImpSobretasa((prevState) => ({
          ...prevState,
          value: requestById.fiscalInfo[3].value,
        }));
        setCodeImpIVA((prevState) => ({
          ...prevState,
          value: requestById.fiscalInfo[4].value,
        }));
      }
    }
  }, [requestById]);

  const costumerListGeneral = (codeEnterprise) => {
    loadGeneralCostumerLists([
      { ListId: 4, ParentCode: "" },
      { ListId: 5, ParentCode: "" },
      { ListId: 6, ParentCode: "CO" },
      { ListId: 17, ParentCode: "" },
      { ListId: 7, ParentCode: `${codeEnterprise}` },
      { ListId: 10, ParentCode: `${codeEnterprise}` },
      { ListId: 11, ParentCode: `${codeEnterprise}` },
      { ListId: 13, ParentCode: `${codeEnterprise}` },
      { ListId: 14, ParentCode: `${codeEnterprise}` },
      { ListId: 12, ParentCode: `${codeEnterprise}` },
      { ListId: 8, ParentCode: `${codeEnterprise}` },
      { ListId: 18, ParentCode: `${codeEnterprise}` },
      { ListId: 16, ParentCode: `${codeEnterprise}` },
    ]);
  };

  useEffect(() => {
    if (responseData !== undefined) {
      setWizardData((prevState) => ({
        ...prevState,
        modifiedBy: responseData[0].userId,
      }));

      setRut((prevState) => ({
        ...prevState,
        modifiedBy: responseData[0].userId,
      }));

      setCamera((prevState) => ({
        ...prevState,
        modifiedBy: responseData[0].userId,
      }));

      setDocument((prevState) => ({
        ...prevState,
        modifiedBy: responseData[0].userId,
      }));

      setWash((prevState) => ({
        ...prevState,
        modifiedBy: responseData[0].userId,
      }));
    }
  }, [responseData]);

  useEffect(() => {
    if (generalInfo.codeRegion !== "") {
      indicative = CODE_DEPARTMENT.filter(
        (item) => item.id === generalInfo.codeRegion
      );
      if (indicative.length > 0) {
        setIndData(indicative[0].code);
      }
    }
  }, [generalInfo.codeRegion]);

  useEffect(() => {
    if (
      existCostumer !== null &&
      existCostumer !== undefined &&
      existCostumer !== ""
    ) {
      if (existCostumer.codeEnterprise === "R") {
        legalRepresentativeId =
          existCostumer.generalInfo.legalRepresentativeId === null
            ? ""
            : existCostumer.generalInfo.legalRepresentativeId;
        legalRepresentativeName =
          existCostumer.generalInfo.legalRepresentativeName === null
            ? ""
            : existCostumer.generalInfo.legalRepresentativeName;
        isBusinessName =
          existCostumer.generalInfo.businessName === "" ? true : false;
        setTelephoneData(existCostumer.generalInfo.telephone);
        setGeneralInfo((prevState) => ({
          ...prevState,
          codeTypePerson: existCostumer.generalInfo.codeTypePerson,
          codeCIIU: existCostumer.generalInfo.codeCIIU,
          businessName: `${
            isBusinessName ? "" : existCostumer.generalInfo.businessName
          }`,
          firstName: `${
            isBusinessName ? existCostumer.generalInfo.firstName : ""
          }`,
          secondName: `${
            isBusinessName ? existCostumer.generalInfo.secondName : ""
          }`,
          firstSurname: `${
            isBusinessName ? existCostumer.generalInfo.thirdName : ""
          }`,
          secondSurname: `${
            isBusinessName ? existCostumer.generalInfo.fourthName : ""
          }`,
          codeRegion: existCostumer.generalInfo.codeRegion,
          codeCity: existCostumer.generalInfo.codeCity,
          address: existCostumer.generalInfo.address,
          cellphone: existCostumer.generalInfo.cellphone,
          email: existCostumer.generalInfo.email,
          legalRepresentativeId: legalRepresentativeId,
          legalRepresentativeName: legalRepresentativeName,
        }));
      }
      setDeleteJson((prevState) => ({
        ...prevState,
        deletedBy: responseData[0].userId,
        requestId: existCostumer.id,
      }));
    }
  }, [existCostumer]);

  useEffect(() => {
    setTelIndicative();
  }, [generalInfo]);

  const setTelIndicative = () => {
    if (generalInfo.codeRegion !== "") {
      indicative = CODE_DEPARTMENT.filter(
        (item) => item.id === generalInfo.codeRegion
      );

      if (indicative.length > 0) {
        setIndData(indicative[0].code);
      }
    }
  };

  useEffect(() => {
    setWizardData((prevState) => ({
      ...prevState,
      generalInfo: generalInfo,
    }));
  }, [generalInfo]);

  useEffect(() => {
    setWizardData((prevState) => ({
      ...prevState,
      salesInfo: salesInfo,
    }));
  }, [salesInfo]);

  useEffect(() => {
    setWizardData((prevState) => ({
      ...prevState,
      fiscalInfo: fiscalArray,
    }));
  }, [fiscalArray]);

  useEffect(() => {
    if (codeImpCarbono.value) {
      setFiscalArray((prevState) => [...prevState, codeImpCarbono]);
    }
  }, [codeImpCarbono]);

  useEffect(() => {
    if (codeImpNacional.value) {
      setFiscalArray((prevState) => [...prevState, codeImpNacional]);
    }
  }, [codeImpNacional]);

  useEffect(() => {
    if (codeImpTimbre.value) {
      setFiscalArray((prevState) => [...prevState, codeImpTimbre]);
    }
  }, [codeImpTimbre]);

  useEffect(() => {
    if (codeImpSobretasa.value) {
      setFiscalArray((prevState) => [...prevState, codeImpSobretasa]);
    }
  }, [codeImpSobretasa]);

  useEffect(() => {
    if (codeImpIVA.value) {
      setFiscalArray((prevState) => [...prevState, codeImpIVA]);
    }
  }, [codeImpIVA]);

  useEffect(() => {
    if (generalInfo.codeTypePerson === "PN") {
      setLegalRepresentative((prevState) => ({
        ...prevState,
        name: "",
        lastName: "",
      }));
    }
  }, [generalInfo.codeTypePerson]);

  useEffect(() => {
    if (generalInfo.codeTypeNif !== "" && generalInfo.nif !== "") {
      if (state) {
        if (state.dataRequest) {
          loadExistCostumerMDS({
            codeTypeNif: generalInfo.codeTypeNif,
            nif: generalInfo.nif,
            codeEnterprise: state.dataRequest.codeEnterprise,
          });
        }
      }

      if (match.params.code) {
        loadExistCostumerMDS({
          codeTypeNif: generalInfo.codeTypeNif,
          nif: generalInfo.nif,
          codeEnterprise: match.params.code,
        });
      }

      if (generalInfo.codeTypeNif === "31") {
        loadVerificationCode(generalInfo.nif);
      }
    }
  }, [generalInfo.nif]);

  useEffect(() => {
    if (generalInfo.codeTypeNif !== "" && generalInfo.nif !== "") {
      if (state) {
        if (state.dataRequest) {
          loadExistCostumerMDS({
            codeTypeNif: generalInfo.codeTypeNif,
            nif: generalInfo.nif,
            codeEnterprise: state.dataRequest.codeEnterprise,
          });
        }
      }

      if (match.params.code) {
        loadExistCostumerMDS({
          codeTypeNif: generalInfo.codeTypeNif,
          nif: generalInfo.nif,
          codeEnterprise: match.params.code,
        });
      }

      if (generalInfo.codeTypeNif === "31") {
        loadVerificationCode(generalInfo.nif);
      }
    }
  }, [generalInfo.codeTypeNif]);

  const switchOtherUserRequest = () => {
    if (!generalDisabled) {
      if (existCostumer && responseData) {
        if (existCostumer.createdBy === responseData[0].userId) {
          setOtherUserRequest(false);
          if (requestById) {
            if (
              requestById.generalInfo.nif !== generalInfo.nif &&
              requestById.generalInfo.codeTypeNif !== generalInfo.codeTypeNif
            ) {
              setOpenModalExistRequest(true);
            }
          } else {
            setOpenModalExistRequest(true);
          }
        } else {
          setOtherUserRequest(true);
          setOpenModalExistRequest(true);
        }
      }
    }
  };

  useEffect(() => {
    if (
      existCostumerMDS !== undefined &&
      existCostumerMDS !== "" &&
      existCostumerMDS.codeEnterprise === null
    ) {
      if (state) {
        if (state.dataRequest) {
          loadExistCostumer({
            codeTypeNif: generalInfo.codeTypeNif,
            nif: generalInfo.nif,
            codeEnterprise: state.dataRequest.codeEnterprise,
          });
        }
      }

      if (match.params.code) {
        loadExistCostumer({
          codeTypeNif: generalInfo.codeTypeNif,
          nif: generalInfo.nif,
          codeEnterprise: match.params.code,
        });
      }
    }
  }, [existCostumerMDS]);

  useEffect(() => {
    if (
      existCostumer !== null &&
      existCostumer !== undefined &&
      existCostumer !== ""
    ) {
      if (state) {
        if (state.dataRequest) {
          if (
            existCostumer.codeEnterprise === state.dataRequest.codeEnterprise
          ) {
            setTelIndicative();
          }
        }
      }

      if (match.params.code) {
        if (existCostumer.codeEnterprise === match.params.code) {
          setTelIndicative();
        }
      }
    }

    switchOtherUserRequest();
  }, [existCostumer]);

  useEffect(() => {
    if (indData === "0" || indData === 0) {
      setIndData("");
    }

    if (indData === "3" || indData === 3) {
      setIndData("");
    }

    if (indData === "9" || indData === 9) {
      setIndData("");
    }
  }, [indData]);

  const handleChangeTel = (e) => {
    const { value } = e.target;
    setTelephoneData(value);
  };

  const handleChangeInd = (e) => {
    const { value } = e.target;
    setIndData(value);
  };

  const handleChangeLegal = (name, value) => {
    setLegalRepresentative((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeLegalId = (name, value) => {
    setLegalId(value);
  };

  const handleCloseModalAddress = () => {
    setOpenModalAddress(false);
  };

  const handleOpenModalAddress = () => {
    setOpenModalAddress(true);
  };

  const fillData =
    generalInfo !== false && generalInfo !== undefined ? true : false;

  const attachmentsType = existCostumer ? existCostumer.attachments : [];

  const componentsWizard = [
    {
      number: 1,
      component: (
        <ClientFormOne
          SpecialClasses={SpecialClasses}
          classes={classes}
          generalFormNames={generalFormNames}
          generalFormStateNames={generalFormStateNames}
          wizardData={fillData ? generalInfo : ""}
          maxLength={maxLength}
          indData={indData}
          telephoneData={telephoneData}
          required={didSubmit}
          requiredCompany={didSubmitCompany}
          requiredNames={didSubmitNames}
          requiredCIIU={didSubmitCIIU}
          didSubmitTel={didSubmitTel}
          legalId={legalId}
          handleChange={handleChange}
          handleChangeNif={handleChangeNif}
          handleChangeTel={handleChangeTel}
          handleChangeInd={handleChangeInd}
          verification={verification}
          legalRepresentative={legalRepresentative}
          handleChangeLegal={handleChangeLegal}
          handleChangeLegalId={handleChangeLegalId}
          idTypeList={
            generalCostumerList !== undefined &&
            generalCostumerList.length > 0 &&
            generalCostumerList[0].list[0].values
          }
          peopleType={
            generalCostumerList !== undefined &&
            generalCostumerList.length > 0 &&
            generalCostumerList[1].list
          }
          departmentList={
            generalCostumerList !== undefined &&
            generalCostumerList.length > 0 &&
            generalCostumerList[2].list[0].values
          }
          industryType={
            generalCostumerList.length > 0 &&
            generalCostumerList[3].list[0].values
          }
          state={state}
          updateValue={updateValue}
          regexEmailOnChange={regexEmailOnChange}
          writeAddress={handleOpenModalAddress}
          generalDisabled={generalDisabled}
        />
      ),
    },
    {
      number: 2,
      component: (
        <ClientFormTwo
          classes={classes}
          saleNames={saleNames}
          salesInfo={salesInfo}
          setSalesInfo={setSalesInfo}
          saleFormNames={saleFormNames}
          handleSaleChange={handleSaleChange}
          didSubmitSale={didSubmitSale}
          fullData={generalCostumerList}
          salesList={
            generalCostumerList.length > 0 &&
            generalCostumerList[4].list[0].values.length !== undefined &&
            generalCostumerList[4].list[0].values.length > 0
              ? generalCostumerList[4].list[0].values
              : []
          }
          state={state}
          requestById={requestById}
          generalDisabled={generalDisabled}
          setValidateEmailSales={setValidateEmailSales}
          didSubmitContact={didSubmitContact}
          setDidSubmitContact={setDidSubmitContact}
        />
      ),
    },
    {
      number: 3,
      component: (
        <ClientFormThree
          classes={classes}
          SpecialClasses={SpecialClasses}
          fiscalNames={fiscalNames}
          fiscalFormNames={fiscalFormNames}
          didSubmitFiscal={didSubmitFiscal}
          codeImpCarbono={codeImpCarbono}
          handleCodeImpCarbonoChange={handleCodeImpCarbonoChange}
          codeImpNacional={codeImpNacional}
          handleCodeImpNacionalChange={handleCodeImpNacionalChange}
          codeImpTimbre={codeImpTimbre}
          handlecodeImpTimbreChange={handlecodeImpTimbreChange}
          codeImpSobretasa={codeImpSobretasa}
          handleCodeImpSobretasaChange={handleCodeImpSobretasaChange}
          codeImpIVA={codeImpIVA}
          handleCodeImpIVAChange={handleCodeImpIVAChange}
          carbonList={
            generalCostumerList.length > 0 &&
            generalCostumerList[5].list[0].values
          }
          nationalList={
            generalCostumerList.length > 0 &&
            generalCostumerList[6].list[0].values
          }
          surchargeList={
            generalCostumerList.length > 0 &&
            generalCostumerList[7].list[0].values
          }
          ivaList={
            generalCostumerList.length > 0 &&
            generalCostumerList[8].list[0].values
          }
          timbreList={
            generalCostumerList.length > 0 &&
            generalCostumerList[9].list[0].values
          }
          generalDisabled={generalDisabled}
        />
      ),
    },
    {
      number: 4,
      component: (
        <ClientFormFour
          classes={classes}
          checked={checked}
          rut={rut}
          camera={camera}
          document={document}
          wash={wash}
          setRut={setRut}
          setCamera={setCamera}
          setDocument={setDocument}
          setWash={setWash}
          handleCheckedChange={handleCheckedChange}
          handleRutChange={handleRutChange}
          handleCameraChange={handleCameraChange}
          handleDocumentChange={handleDocumentChange}
          handleWashChange={handleWashChange}
          rutNameFile={rutNameFile}
          cameraNameFile={cameraNameFile}
          documentNameFile={documentNameFile}
          washNameFile={washNameFile}
          codeTypePerson={generalInfo.codeTypePerson}
          documentType={documentType !== undefined ? documentType : []}
          existCostumerAttachments={
            requestById ? requestById.attachments : attachmentsType
          }
          generalDisabled={generalDisabled}
        />
      ),
    },
  ];

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseModalExistRequest = () => {
    setOpenModalReconfirm(true);
  };

  const handleConfirmGetExistRequest = () => {
    setOpenModalExistRequest(false);
    setIsExistUploadCostumer(true);
    setWizardData((prevState) => ({
      ...prevState,
      id: existCostumer.id,
      codeEnterprise: existCostumer.codeEnterprise,
      codeAccountGroup: existCostumer.codeAccountGroup,
      codePartnership: existCostumer.codePartrnership,
      stateId: existCostumer.stateId,
    }));
    if (existCostumer.generalInfo.nif !== "") {
      setGeneralInfo(() => ({
        codeTypeNif: existCostumer.generalInfo.codeTypeNif,
        nif: existCostumer.generalInfo.nif,
        codeTypePerson: existCostumer.generalInfo.codeTypePerson,
        codeCIIU: existCostumer.generalInfo.codeCIIU,
        typeIndustry: `${existCostumer.generalInfo.typeIndustry}`,
        tittle: parseInt(existCostumer.generalInfo.tittle),
        businessName: existCostumer.generalInfo.businessName,
        firstName: existCostumer.generalInfo.firstName,
        secondName: existCostumer.generalInfo.secondName,
        firstSurname: existCostumer.generalInfo.thirdName,
        secondSurname: existCostumer.generalInfo.fourthName,
        codeCountry: existCostumer.generalInfo.codeCountry,
        codeRegion: existCostumer.generalInfo.codeRegion,
        codeCity: existCostumer.generalInfo.codeCity,
        address: existCostumer.generalInfo.address,
        cellphone: existCostumer.generalInfo.cellphone,
      }));
      regexEmailOnChange("email", existCostumer.generalInfo.email, true);

      if (
        existCostumer.generalInfo.legalRepresentativeName !== "" &&
        existCostumer.generalInfo.legalRepresentativeName !== null &&
        existCostumer.generalInfo.legalRepresentativeId !== "" &&
        existCostumer.generalInfo.legalRepresentativeId !== null
      ) {
        const legalName =
          existCostumer.generalInfo.legalRepresentativeName.split(" ");
        const legalRepresentativeName = legalName[0];
        const legalRepresentativeLastName = legalName[1];
        setLegalRepresentative({
          name: legalRepresentativeName,
          lastName: legalRepresentativeLastName,
        });
        setLegalId(existCostumer.generalInfo.legalRepresentativeId);
      }
      if (
        existCostumer.generalInfo.legalRepresentativeId === null &&
        existCostumer.generalInfo.legalRepresentativeName === null
      ) {
        setLegalId("");
        setLegalRepresentative({
          name: "",
          lastName: "",
        });
      }
      const homeTelephone = existCostumer.generalInfo.telephone.split("-");
      const homeTelephoneTwo = homeTelephone[1];
      setTelephoneData(homeTelephoneTwo);
      setActiveStep(2);
    }

    if (existCostumer.salesInfo.salesOrganizationCode !== "") {
      setSalesInfo((prevState) => ({
        ...prevState,
        salesOrganizationCode: existCostumer.salesInfo.salesOrganizationCode,
        canalCode: existCostumer.salesInfo.canalCode,
        sectorCode: existCostumer.salesInfo.sectorCode,
        salesAreaCode: existCostumer.salesInfo.salesAreaCode,
        transportZoneCode: existCostumer.salesInfo.transportZoneCode,
        email: existCostumer.salesInfo.email,
        telephone: existCostumer.salesInfo.telephone,
        codefunction: existCostumer.salesInfo.codefunction,
      }));
      setActiveStep(3);
    }

    if (existCostumer.fiscalInfo.length > 0) {
      setTimeout(() => {
        setDisabledBtn(false);
      }, 1000);
      setCodeImpCarbono((prevState) => ({
        ...prevState,
        value: existCostumer.fiscalInfo[0].value,
      }));
      setCodeImpNacional((prevState) => ({
        ...prevState,
        value: existCostumer.fiscalInfo[1].value,
      }));
      setCodeImpTimbre((prevState) => ({
        ...prevState,
        value: existCostumer.fiscalInfo[2].value,
      }));
      setCodeImpSobretasa((prevState) => ({
        ...prevState,
        value: existCostumer.fiscalInfo[3].value,
      }));
      setCodeImpIVA((prevState) => ({
        ...prevState,
        value: existCostumer.fiscalInfo[4].value,
      }));
      setActiveStep(4);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleValue = (value, code) => {
    if (value) {
      setDidSubmitApprover(false);
      setWizardData((prevState) => ({
        ...prevState,
        approvedBy: value.id,
        RequestUrl: `${process.env.REACT_APP_OFFICIAL_URL}/Clientes/ClienteNacional/${code}/Aprobador/${wizardData.id}`,
        stateId: 4,
      }));
    } else {
      setDidSubmitApprover(true);
      setWizardData((prevState) => ({
        ...prevState,
        approvedBy: null,
        RequestUrl: `${process.env.REACT_APP_OFFICIAL_URL}/Clientes/ClienteNacional/${code}/Aprobador/${wizardData.id}`,
        stateId: 4,
      }));
    }
  };

  const handleApprover = (event, value, name) => {
    setDidSubmitApprover(false);
    if (match.params.code) {
      handleValue(value, match.params.code);
    } else {
      handleValue(value, location.state.dataRequest.codeEnterprise);
    }
  };

  const [didSubmitApprover, setDidSubmitApprover] = useState(false);
  let validateApprover = false;
  const handleConfirmApprover = () => {
    validateApprover = false;
    setDidSubmitApprover(false);
    if (wizardData.approvedBy === null) {
      validateApprover = true;
      setDidSubmitApprover(true);
    }

    if (!validateApprover) {
      updateCostumer(wizardData);
    }
  };

  useEffect(() => {
    if (updateCostumerSuccess && wizardData.approvedBy !== null) {
      setTimeout(() => {
        redirectToCostumerDashBoard();
      }, 2000);
    }
  }, [updateCostumerSuccess]);

  useEffect(() => {
    if (saveApproverManageSuccess) {
      setTimeout(() => {
        redirectToCostumerDashBoard();
      }, 2000);
    }
  }, [saveApproverManageSuccess]);

  const redirectToCostumerDashBoard = () => {
    history.push("/Clientes/Consultar");
  };

  const approvers =
    allUsers.length > 0
      ? allUsers.filter((subModule) =>
          subModule.subModules.find((item) =>
            item.subModules.find((item2) => item2.code === "DMC_AP_CLIFA")
          )
        )
      : [];

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArray} />
      <h3 className={classes.titleRegister}>
        <strong>Registro cliente nacional</strong>
      </h3>
      <h6>
        <strong>
          Sistema de gestión de calidad gerencia de servicios compartidos
        </strong>
      </h6>
      <Wizard
        titlesWizard={titlesWizard}
        componentsWizard={componentsWizard}
        handleBack={handleBack}
        handleNext={
          componentsWizard.length === activeStep ? handleOpenModal : handleNext
        }
        activeStep={activeStep}
        handleCancel={handleClickOpen}
        classes={classes}
        isSave={true}
        handleSave={saveMethod}
        showPreview={true}
        isDisabled={disabledBtn}
        finalBtnName={"Seleccionar aprobador"}
        approver={
          match.params.nivel && match.params.nivel !== "Editar" ? true : false
        }
        Component={() => (
          <ApproversBtnsRequest
            handleBack={handleBack}
            handleNext={handleNext}
            rejectionRequest={rejectionRequest}
            returnRequest={returnRequest}
            approveRequest={approveRequest}
            disabledNext={componentsWizard.length === activeStep ? true : false}
            disabledBack={activeStep === 1 ? true : false}
            levelOne={match.params.nivel === "NivelUno" ? true : false}
          />
        )}
        otherHandleNext={handleNext}
      />
      <DialogCommon
        open={open}
        handleClose={handleClose}
        title="Cancelar"
        medium={match.path === "/Admin/RolesCrear" ? "crear" : "editar"}
        messageEdit="Cambios pendientes por guardar. ¿Desea salir?"
        messageCreate="¿Está seguro que desea cancelar la creación de la información?"
        confirmCancelDialog={confirmCancelDialog}
        classes={classes}
      />
      <SnackBarCommon
        success={updateCostumerSuccess}
        error={specificError || updateCostumerFailed}
        handleCloseSnack={handleCloseSnack}
        successMessage={
          updateCostumerSuccess && wizardData.approvedBy !== null
            ? `solicitud ${wizardData.id} ha sido enviada para aprobación`
            : "Información guardada satisfactoriamente."
        }
        errorMessage={
          updateCostumerFailed
            ? "Ha ocurrido un error, intenta nuevamente"
            : messageSpecificError
        }
      />
      <SnackBarCommon
        success={false}
        error={specificErrorSale}
        handleCloseSnack={handleCloseSnackSales}
        successMessage={""}
        errorMessage={messageSpecificErrorSale}
      />
      <SnackBarCommon
        success={false}
        error={specificErrorFiscal}
        handleCloseSnack={handleCloseSnackFiscal}
        successMessage={""}
        errorMessage={messageSpecificErrorFiscal}
      />
      <SnackBarCommon
        success={uploadFileSuccess}
        error={specificErrorFile || uploadFileFailed}
        handleCloseSnack={handleCloseSnackFile}
        successMessage={"Archivos guardados exitosamente"}
        errorMessage={
          uploadFileFailed
            ? "Ha ocurrido un error intenta nuevamente"
            : messageSpecificErrorFile
        }
      />
      <SnackBarCommon
        success={false}
        error={showMessageFileRut}
        handleCloseSnack={closeSnackRut}
        successMessage={""}
        errorMessage={messageFileRut}
      />
      <SnackBarCommon
        success={false}
        error={showMessageFileCamera}
        handleCloseSnack={closeSnackCamera}
        successMessage={""}
        errorMessage={messageFileCamera}
      />
      <SnackBarCommon
        success={false}
        error={showMessageFileDocument}
        handleCloseSnack={closeSnackDocument}
        successMessage={""}
        errorMessage={messageFileDocument}
      />
      <SnackBarCommon
        success={false}
        error={showMessageFileWash}
        handleCloseSnack={closeSnackWash}
        successMessage={""}
        errorMessage={messageFileWash}
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
        handleClose={handleCloseModalAddress}
        open={openModalAddress}
        disableBackdropClick={true}
        title={"Dirección RUT"}
        handleConfirm={
          addressType.id === 2 ? directionValidations : addressRuralValidations
        }
        cancel={"Cancelar"}
        confirm={"Guardar"}
      >
        <RutAddress
          classes={classes}
          urbanAddress={urbanAddress}
          UrbanAddressChange={UrbanAddressChange}
          setUrbanAddress={setUrbanAddress}
          addressType={addressType}
          addressOnChange={addressOnChange}
          didSubmitUrban={didSubmitUrban}
          didSubmitOne={didSubmitOne}
          didSubmitTwo={didSubmitTwo}
          specificErrorUrban={specificErrorUrban}
          showAddress={showAddress}
          setShowAddress={setShowAddress}
          closeModalSnack={closeModalSnack}
          didSubmitRural={didSubmitRural}
          didSubmitTwoRural={didSubmitTwoRural}
          specificErrorRural={specificErrorRural}
          addressRuralValidations={addressRuralValidations}
          closeRuralModalSnack={closeRuralModalSnack}
        />
      </ModalCommon>
      <ModalCommon
        classes={classes}
        handleOptions={""}
        handleClose={
          !otherUserRequest
            ? handleCloseModalExistRequest
            : redirectToCostumerDashBoard
        }
        open={openModalExistRequest}
        disableBackdropClick={true}
        title={""}
        handleConfirm={handleConfirmGetExistRequest}
        cancel={!otherUserRequest ? "No" : ""}
        confirm={!otherUserRequest ? "Si" : ""}
        hideButtons={!otherUserRequest ? false : true}
      >
        {!otherUserRequest ? (
          <UpdateOrDelete
            openModalReconfirm={openModalReconfirm}
            setOpenModalReconfirm={setOpenModalReconfirm}
            deleteCostumerRequest={deleteCostumerRequest}
            deleteJson={deleteJson}
            setOpenModalExistRequest={setOpenModalExistRequest}
            classes={classes}
          />
        ) : (
          <RequestOtherUser
            redirectToCostumerDashBoard={redirectToCostumerDashBoard}
            userCreator={existCostumer && existCostumer.createdByName}
            classes={classes}
          />
        )}
      </ModalCommon>
      <ModalCommon
        classes={classes}
        handleOptions={""}
        handleClose={closeApproverManageModal}
        open={approverManageModal}
        disableBackdropClick={true}
        title={tittleModalApprover}
        handleConfirm={approverManageSave}
        cancel={"Cancelar"}
        confirm={"Guardar"}
      >
        <ApproverManage
          rejectionReasons={
            tittleModalApprover !== "Aprobar" &&
            tittleModalApprover !== "Devolver"
              ? rejectionReasons
              : returnReasons
          }
          tittleModalApprover={tittleModalApprover}
          handleChangeApproveManage={handleChangeApproveManage}
          approveManageJson={approveManageJson}
          handleCloseApproverManageSnack={handleCloseApproverManageSnack}
          saveApproverManageSuccess={saveApproverManageSuccess}
          saveApproverManageFailed={saveApproverManageFailed}
          didSubmitApproverManage={didSubmitApproverManage}
          approverManageMessageError={approverManageMessageError}
          showApproveScreen={showApproveScreen}
          approverTipe={match.params.nivel ? match.params.nivel : ""}
        />
      </ModalCommon>
    </>
  );
};

export default withRouter(CostumerWizard);
