import { useEffect, useState } from "react";
import { useFormFile } from "../../../hooks/useFormFile";

export const useFormUploadFiles = ( clientId, userLogged, stateId ) => {
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setRut((prevState) => ({
      ...prevState,
      requestId : clientId,
      stateId : stateId
    }))

    setCamera((prevState) => ({
      ...prevState,
      requestId : clientId,
      stateId : stateId
    }))

    setDocument((prevState) => ({
      ...prevState,
      requestId : clientId,
      stateId : stateId
    }))

    setWash((prevState) => ({
      ...prevState,
      requestId : clientId,
      stateId : stateId
    }))
  }, [stateId])

  const [rut, handleRutChange, setRut, rutNameFile, messageFileRut, showMessageFileRut,
    closeSnackRut] = useFormFile({
    requestId: '',
    documentTypeId: '',
    stateId: '',
    createdBy: userLogged,
    modifiedBy: '',
    file: ''
  });

  const [camera, handleCameraChange, setCamera, cameraNameFile, messageFileCamera, showMessageFileCamera,
    closeSnackCamera] = useFormFile({
    requestId: clientId,
    documentTypeId: '',
    stateId: stateId,
    createdBy: userLogged,
    modifiedBy: '',
    file: ''
  });

  const [document, handleDocumentChange, setDocument, documentNameFile, messageFileDocument, showMessageFileDocument,
    closeSnackDocument] = useFormFile({
    requestId: clientId,
    documentTypeId: '',
    stateId: stateId,
    createdBy: userLogged,
    modifiedBy: '',
    file: ''
  });

  const [wash, handleWashChange, setWash, washNameFile, messageFileWash, showMessageFileWash,
    closeSnackWash] = useFormFile({
    requestId: clientId,
    documentTypeId: '',
    stateId: stateId,
    createdBy: userLogged,
    modifiedBy: '',
    file: ''
  });

  return [
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
    closeSnackWash
  ];
};
