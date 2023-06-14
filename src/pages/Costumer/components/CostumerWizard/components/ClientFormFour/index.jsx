import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { UploadCard } from "./components";
import { fileDescriptions } from "../../../../constants";
import IconUpload from "../../../../../../assets/images/upload.svg";
import { CheckboxCommon } from "../../../../../../sharedComponents";

const ClientFormFour = ({
  classes,
  checked,
  rut,
  camera,
  document,
  wash,
  setRut,
  setCamera,
  setDocument,
  setWash,
  handleCheckedChange,
  handleRutChange,
  handleCameraChange,
  handleDocumentChange,
  handleWashChange,
  rutNameFile,
  cameraNameFile,
  documentNameFile,
  washNameFile,
  documentType,
  codeTypePerson,
  existCostumerAttachments,
  generalDisabled
}) => {
  useEffect(() => {
    if (documentType.length > 0) {
      setRut((prevState) => ({
        ...prevState,
        documentTypeId: documentType[0].id,
      }));

      setCamera((prevState) => ({
        ...prevState,
        documentTypeId: documentType[1].id,
      }));

      setDocument((prevState) => ({
        ...prevState,
        documentTypeId: documentType[2].id,
      }));

      setWash((prevState) => ({
        ...prevState,
        documentTypeId: documentType[3].id,
      }));
    }
  }, [documentType]);

  const [documentFileNumber, setDocumentFileNumber] = useState(1);
  const [isAttachment, setIsAttachment] = useState(false);
  useEffect(() => {
    if (existCostumerAttachments !== undefined) {
      if (existCostumerAttachments.length >= 3) {
        setDocumentFileNumber(2);
      }

      if (existCostumerAttachments.length === 2) {
        setDocumentFileNumber(1);
      }
    }

    if (existCostumerAttachments.length > 0) {
      setIsAttachment(true);
    }
  }, [existCostumerAttachments]);

  return (
    <>
      <div className={classes.ctnFormFour}>
        <Grid container>
          {documentType.length > 0 ? (
            <>
              <Grid item xs={6}>
                <li>{documentType[0].name}*</li>
                <UploadCard
                  classes={classes}
                  fileDescriptions={fileDescriptions}
                  IconUpload={IconUpload}
                  value={rut}
                  nameFile={rutNameFile}
                  isAttachment={isAttachment}
                  attachment={
                    existCostumerAttachments
                      ? existCostumerAttachments.length > 0 &&
                        existCostumerAttachments[0].downloadURL
                      : ""
                  }
                  inputId={documentType[0].name}
                  handleChange={handleRutChange}
                  generalDisabled={generalDisabled}
                />
              </Grid>
              <Grid item xs={6}>
                <li>{documentType[1].name}*</li>
                <UploadCard
                  classes={classes}
                  fileDescriptions={fileDescriptions}
                  IconUpload={IconUpload}
                  value={camera}
                  nameFile={cameraNameFile}
                  isAttachment={isAttachment}
                  attachment={
                    existCostumerAttachments
                      ? existCostumerAttachments.length > 1 &&
                        existCostumerAttachments[1].downloadURL
                      : ""
                  }
                  inputId={documentType[1].name}
                  handleChange={handleCameraChange}
                  generalDisabled={generalDisabled}
                />
              </Grid>
              <Grid item xs={6}>
                <li>{documentType[2].name}*</li>
                <UploadCard
                  classes={classes}
                  fileDescriptions={fileDescriptions}
                  IconUpload={IconUpload}
                  value={document}
                  nameFile={documentNameFile}
                  isAttachment={isAttachment}
                  attachment={
                    existCostumerAttachments
                      ? existCostumerAttachments.length > 2 &&
                        existCostumerAttachments[2].downloadURL
                      : ""
                  }
                  inputId={documentType[2].name}
                  handleChange={handleDocumentChange}
                  generalDisabled={generalDisabled}
                />
              </Grid>
              {codeTypePerson === "PJ" && (
                <Grid item xs={6}>
                  <li>{documentType[3].name}*</li>
                  <UploadCard
                    classes={classes}
                    fileDescriptions={fileDescriptions}
                    IconUpload={IconUpload}
                    value={wash}
                    nameFile={washNameFile}
                    isAttachment={isAttachment}
                    attachment={
                      existCostumerAttachments
                        ? existCostumerAttachments.length === 4 &&
                          existCostumerAttachments[3].downloadURL
                        : ""
                    }
                    inputId={documentType[3].name}
                    handleChange={handleWashChange}
                    generalDisabled={generalDisabled}
                  />
                </Grid>
              )}
            </>
          ) : (
            <label htmlFor="">Cargando información...</label>
          )}
        </Grid>
        { !generalDisabled &&
          <Grid container>
            <Grid item xs={6}>
              <CheckboxCommon
                handleChange={handleCheckedChange}
                label={fileDescriptions.info}
                checked={checked}
              />
            </Grid>
          </Grid>
        }
      </div>
    </>
  );
};

export default ClientFormFour;
