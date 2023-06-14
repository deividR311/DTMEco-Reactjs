import React, { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";

export const useFormApproverManage = (
  saveApproverManage,
  clearsaveApproverManageFailed,
  clearsaveApproverManageSuccess,
  requestById,
  allUsers,
  responseData,
  match
) => {
  const [approverManageModal, setApproverManageModal] = useState(false);
  const [showApproveScreen, setShowApproveScreen] = useState(false);
  const [didSubmitApproverManage, setDidSubmitApproverManage] = useState(false);
  const [approverManageMessageError, setApproverManageMessageError] = useState(
    ""
  );
  const [tittleModalApprover, setTittleModalApprover] = useState("");
  let isValidate = false;
  const [
    approveManageJson,
    handleChangeApproveManage,
    setApproveManageJson,
  ] = useForm({
    stateId: "",
    requestId: "",
    approvingUserId: "",
    rejectionReason: null,
    returnReason: null,
    observations: "",
    approvingUserName: "",
    titanCaseId: "",
    requestUrl: ""
  });

  const approverOrOneLevelApprove = match.params.nivel === "NivelUno" ? 8 : 5;
  const approverOrOneLevelReject = match.params.nivel === "NivelUno" ? 9 : 6;

  const usersLevelOneApprove =
    allUsers.length > 0
      ? allUsers.filter((subModule) =>
          subModule.subModules.find((item) =>
            item.subModules.find((item2) => item2.code === "DMC_AP_CLIN1")
          )
        )
      : [];

  const usersLevelOneApproveAndReject =
    usersLevelOneApprove.length > 0
      ? allUsers.find((subModule) =>
          subModule.subModules.find((item) =>
            item.subModules.find((item2) => item2.code === "DMC_RJ_CLIN1")
          )
        )
      : "";

  useEffect(() => {
    assignRequestState();
  }, [tittleModalApprover]);

  useEffect(() => {
    if (match.params.nivel === 'Aprobador') {
      setApproveManageJson((prevState) => ({
        ...prevState,
        requestUrl: `${process.env.REACT_APP_OFFICIAL_URL}/Clientes/ClienteNacional/${match.params.code}/NivelUno/${requestById.id}`,
      }))
    }
  }, [requestById])

  useEffect(() => {
    if (requestById) {
      setApproveManageJson((prevState) => ({
        ...prevState,
        requestId: requestById.id,
      }));
    }
  }, [requestById]);

  let userApproverOrLevelOne;

  const assignRequestState = () => {
    if (responseData) {
      userApproverOrLevelOne =
        match.params.nivel === "NivelUno"
        ? responseData[0].userId
        : usersLevelOneApproveAndReject.id;

      if (tittleModalApprover === "Rechazar") {
        setApproveManageJson((prevState) => ({
          ...prevState,
          stateId: approverOrOneLevelReject,
          returnReason: null,
          approvingUserId: responseData[0].userId,
          observations: "",
        }));
      }

      if (tittleModalApprover === "Devolver") {
        setApproveManageJson((prevState) => ({
          ...prevState,
          stateId: 7,
          rejectionReason: null,
          approvingUserId: responseData[0].userId,
          observations: "",
        }));
      }
    }

    if (tittleModalApprover === "Aprobar") {
      setApproveManageJson((prevState) => ({
        ...prevState,
        stateId: approverOrOneLevelApprove,
        returnReason: null,
        rejectionReason: null,
        approvingUserId: userApproverOrLevelOne,
        observations: "",
      }));
    }
  };

  const handleCloseApproverManageSnack = () => {
    clearsaveApproverManageFailed();
    clearsaveApproverManageSuccess();
    setDidSubmitApproverManage(false);
  };

  const rejectionRequest = () => {
    setApproverManageModal(true);
    setShowApproveScreen(false);
    setTittleModalApprover("Rechazar");
  };

  const returnRequest = () => {
    setApproverManageModal(true);
    setShowApproveScreen(false);
    setTittleModalApprover("Devolver");
  };

  const approveRequest = () => {
    setApproverManageModal(true);
    setShowApproveScreen(true);
    setTittleModalApprover("Aprobar");
  };

  const closeApproverManageModal = () => {
    setApproverManageModal(false);
  };

  const approverManageSave = () => {
    setDidSubmitApproverManage(false);
    setApproverManageMessageError("");
    if (
      match.params.nivel !== "NivelUno" &&
      tittleModalApprover === "Rechazar" &&
      (approveManageJson.rejectionReason === null ||
        approveManageJson.observations === "")
    ) {
      isValidate = true;
      setDidSubmitApproverManage(true);
      setApproverManageMessageError("Hay campos requeridos sin diligenciar");
    }

    if (
      match.params.nivel === "NivelUno" &&
      tittleModalApprover === "Rechazar" &&
      (approveManageJson.rejectionReason === null ||
        approveManageJson.observations === "" ||
        approveManageJson.approvingUserName === "")
    ) {
      isValidate = true;
      setDidSubmitApproverManage(true);
      setApproverManageMessageError("Hay campos requeridos sin diligenciar");
    }

    if (
      match.params.nivel !== "NivelUno" &&
      tittleModalApprover === "Devolver" &&
      (approveManageJson.returnReason === null ||
        approveManageJson.observations === "")
    ) {
      isValidate = true;
      setDidSubmitApproverManage(true);
      setApproverManageMessageError("Hay campos requeridos sin diligenciar");
    }

    if (
      match.params.nivel !== "NivelUno" &&
      tittleModalApprover === "Aprobar"
    ) {
      isValidate = true;
      saveApproverManage(approveManageJson);
    }

    if ((match.params.nivel === "NivelUno" &&
        tittleModalApprover === "Aprobar") &&
        (approveManageJson.approvingUserName === "" ||
      approveManageJson.titanCaseId === "")
    ) {
      isValidate = true;
      setDidSubmitApproverManage(true);
      setApproverManageMessageError("Hay campos requeridos sin diligenciar");
    }

    if (!isValidate) {
      saveApproverManage(approveManageJson);
    }
  };

  return [
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
  ];
};
