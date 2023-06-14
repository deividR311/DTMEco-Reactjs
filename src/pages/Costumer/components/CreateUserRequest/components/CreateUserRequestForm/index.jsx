import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HeaderContext from "../../../../../../context/Header/headerContext";
import { useForm } from "../../../../../../hooks/useForm";
import { SnackBarCommon } from "../../../../../../sharedComponents";
import { createUserRequestNames, titlesTooltip } from "../../../../constants";
import { RequestInputs } from "./components";

const CreateUserRequestForm = ({
  classes,
  requestUserCreateList,
  createGeneralCostumer,
  createGeneralCostumerSuccess,
  createGeneralCostumerFailed,
  clearCreateGeneralCostumerFailed,
  clearCreateGeneralCostumerSuccess,
  clientId,
}) => {
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;
  const history = useHistory();
  const [didSubmit, setDidSubmit] = useState(false);
  const [specificError, setSpecificError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [messageSpecificError, setMessageSpecificError] = useState("");
  const [dataRequest, handleOnChange, setDataRequest] = useForm({
    codeEnterprise: "",
    codeAccountGroup: "",
    codePartnership: "",
    observations: "",
    stateId: 3,
    level2Info: {
      operationType: "",
      name: "",
      firstName: "",
      function: "",
      associatedAccount: "",
    },
    generalInfo: {
      codeTypeNif: "",
      nif: "",
      codeTypePerson: "",
      codeCIIU: "",
      industryType: "",
      tittle: 0,
      businessName: "",
      firstName: "",
      secondName: "",
      firstSurname: "",
      secondSurname: "",
      codeCountry: "CO",
      codeRegion: "",
      codeCity: "",
      address: "",
      telephone: "",
      cellphone: "",
      email: "",
      legalRepresentativeId: "",
      legalRepresentativeName: "",
    },
    salesInfo: {
      salesOrganizationCode: "",
      canalCode: "",
      sectorCode: "",
      salesAreaCode: "",
      creditControlAreaCode: "",
    },
    fiscalInfo: [],
    createdBy: "",
    approvedBy: null,
    verifiedBy: null,
    finalizedBy: null,
    modifiedBy: null,
  });
  let isValidate = false;

  const handleCancel = () => {
    history.push("/Clientes/Consultar");
  };

  const handleCloseSnack = () => {
    setSpecificError(false);
    if (createGeneralCostumerSuccess) {
      setDisabled(false);
      history.push({
        pathname: "/Clientes/Crear/ClienteNacional",
        state: {
          clientId: clientId,
          dataRequest: dataRequest,
          userLogged: responseData !== undefined ? responseData[0].userId : "",
        },
      });
    }
    clearCreateGeneralCostumerFailed();
    clearCreateGeneralCostumerSuccess();
  };

  const handleValidations = () => {
    setMessageSpecificError("");
    setDidSubmit(true);
    setSpecificError(false);

    if (
      dataRequest.codeAccountGroup === "" ||
      dataRequest.codeEnterprise === "" ||
      dataRequest.codePartnership === ""
    ) {
      isValidate = true;
      setSpecificError(true);
      setMessageSpecificError("Hay campos requeridos sin diligenciar");
    } else {
      createGeneralCostumer(dataRequest);
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (createGeneralCostumerFailed) {
      setDisabled(false);
    }
  }, [createGeneralCostumerFailed]);

  useEffect(() => {
    if (responseData !== undefined) {
      setDataRequest((prevState) => ({
        ...prevState,
        createdBy: responseData[0].userId,
      }));
    }
  }, [responseData]);

  return (
    <>
      <div className={classes.createRequestCtnSon}>
        <RequestInputs
          classes={classes}
          companyList={requestUserCreateList[1]}
          costumerType={requestUserCreateList[0]}
          societyList={requestUserCreateList[2]}
          createUserRequestNames={createUserRequestNames}
          dataRequest={dataRequest}
          isRequired={didSubmit}
          disabled={disabled}
          handleOnChange={handleOnChange}
          titlesTooltip={titlesTooltip}
          handleValidations={handleValidations}
          handleCancel={handleCancel}
        />
      </div>
      <SnackBarCommon
        success={createGeneralCostumerSuccess}
        error={specificError || createGeneralCostumerFailed}
        handleCloseSnack={handleCloseSnack}
        successMessage={"Solicitud creada exitosamente"}
        errorMessage={
          createGeneralCostumerFailed
            ? "Ha ocurrido un error, intenta nuevamente"
            : messageSpecificError
        }
      />
    </>
  );
};

export default CreateUserRequestForm;
