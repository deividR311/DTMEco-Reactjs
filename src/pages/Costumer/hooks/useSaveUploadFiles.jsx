import { useEffect, useState } from "react";

export const useSaveUploadFiles = (
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
) => {
  let isValidate = false;
  const [didSubmit, setDidSubmit] = useState(false);
  const [specificError, setSpecificError] = useState(false);
  const [messageSpecificError, setMessageSpecificError] = useState("");

  useEffect(() => {
    if (uploadFileSuccess) {
      setDisabledBtn(false);
    }
  }, [uploadFileSuccess]);

  useEffect(() => {
    if (activeStep === 4) {
      if (rut.file !== "" ||
      camera.file !== "" ||
      document.file !== "" ||
      wash.file !== "") {
        if (isEditRequest) {
          setDisabledBtn(false); 
        }
  
        if (isExistUploadCostumer) {
          setDisabledBtn(false);
        }
      } else {
        setDisabledBtn(true);
      }
    } 
  }, [activeStep])

  useEffect(() => {
    if (uploadFileFailed) {
      setDisabledBtn(true);
    }
  }, [uploadFileFailed]);

  const handleCloseSnack = () => {
    setSpecificError(false);
    clearUploadCostumerFileFailed();
    clearUploadCostumerFileSuccess();
  };

  const fillFiles = () => {
    if (rut.file !== "") {
      uploadCostumerFile(rut);
    }

    if (camera.file !== "") {
      uploadCostumerFile(camera);
    }

    if (document.file !== "") {
      uploadCostumerFile(document);
    }

    if (wash.file !== "") {
      uploadCostumerFile(wash);
    }
  }

  const validateExistCostumerFiles = () => {
    if ( !isValidate && isExistUploadCostumer ) {

      if (generalInfo.codeTypePerson === 'PJ') {
        if (existCostumer.attachments.length === 0) {
          if ( rut.file === "" ||
            camera.file === "" ||
            document.file === "" ||
            wash.file === ""
          ) {
            isValidate = true;
            setDidSubmit(true);
            setSpecificError(true);
            setMessageSpecificError("Faltan archivos por cargar");
          }

          if (rut.file !== "" &&
          camera.file !== "" &&
          document.file !== "" &&
          wash.file !== "") {
            fillFiles();
          }
        } else {
          fillFiles();
        }
      }
      
      if (generalInfo.codeTypePerson === 'PN') {
        if (existCostumer.attachments.length === 0) {
          if (rut.file === "" ||
          document.file === "" ||
          camera.file === "") {
            isValidate = true;
            setDidSubmit(true);
            setSpecificError(true);
            setMessageSpecificError("Faltan archivos por cargar");
          }

          if (rut.file !== "" &&
          camera.file !== "" &&
          document.file !== "") {
            fillFiles();
          }
        } else {
          fillFiles();
        }
      }
    }
  }

  const validateEditRequestFiles = () => {
    if ( !isValidate && isEditRequest ) {
      if (generalInfo.codeTypePerson === 'PJ') {
        if (requestById.attachments.length === 0) {
          if ( rut.file === "" ||
            camera.file === "" ||
            document.file === "" ||
            wash.file === ""
          ) {
            isValidate = true;
            setDidSubmit(true);
            setSpecificError(true);
            setMessageSpecificError("Faltan archivos por cargar");
          }

          if (rut.file !== "" &&
          camera.file !== "" &&
          document.file !== "" &&
          wash.file !== "") {
            fillFiles();
          }
        } else {
          fillFiles();
        }
      }
      
      if (generalInfo.codeTypePerson === 'PN') {
        if (requestById.attachments.length === 0) {
          if (rut.file === "" ||
          document.file === "" ||
          camera.file === "") {
            isValidate = true;
            setDidSubmit(true);
            setSpecificError(true);
            setMessageSpecificError("Faltan archivos por cargar");
          }

          if (rut.file !== "" &&
          camera.file !== "" &&
          document.file !== "") {
            fillFiles();
          }
        } else {
          fillFiles();
        }
      }
    }
  }

  const saveUploadFiles = () => {
    setMessageSpecificError("");
    setSpecificError(false);

    if (
      (generalInfo.codeTypePerson === 'PJ' && !isExistUploadCostumer && !isEditRequest) &&
      ( rut.file === "" ||
      camera.file === "" ||
      document.file === "" ||
      wash.file === "" )
    ) {
      isValidate = true;
      setDidSubmit(true);
      setSpecificError(true);
      setMessageSpecificError("Faltan archivos por cargar");
    }

    if (
      (generalInfo.codeTypePerson === 'PN' && !isExistUploadCostumer && !isEditRequest) && 
      ( rut.file === "" ||
      document.file === "" ||
      camera.file === "")
    ) {
      isValidate = true;
      setDidSubmit(true);
      setSpecificError(true);
      setMessageSpecificError("Debe adjuntar Cédula, copia del Rut y cámara de comercio");
    }

    if (!checked) {
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError("Se debe certificar la veracidad de la información");
    }

    if (!isValidate && !isExistUploadCostumer && !isEditRequest) {
      if (generalInfo.codeTypePerson === 'PJ') {
        uploadCostumerFile(rut);
        uploadCostumerFile(camera);
        uploadCostumerFile(document);
        uploadCostumerFile(wash);
      } else {
        uploadCostumerFile(rut);
        uploadCostumerFile(document);
        uploadCostumerFile(camera);
      }
    }

    validateExistCostumerFiles();
    validateEditRequestFiles();
  };

  return [
    didSubmit,
    specificError,
    messageSpecificError,
    handleCloseSnack,
    saveUploadFiles
  ];
};
