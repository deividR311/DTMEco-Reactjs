import * as React from "react";
import schema from "../../schema/leveltwo.schema";
import { useState, useEffect, useContext } from "react";
import { ModalContact } from "../../widgets/ModalContact";
import { TableContact } from "../../widgets/TableContact";
import { useStyles } from "../../../../../Administration/styles";
import { DialogCommon } from "../../../../../../sharedComponents";
import { useValidateForm } from "../../../../../../hooks/useValidateForm";
import { SelectCustom, InputCustom } from "../../../../../Materials/widgets";
import CostumerContext from "../../../../../../context/Costumer/costumerContext";

const initialState = {
  operationType: "",
  associatedAccount: "",
  contactInformation: [],
};

export const LevelTwoFormThree = ({
  setForm,
  dataForm,
  isSubmitting,
  modalApprove,
  codeEnterprise,
  setIsSubmitting,
  setPassValidation,
}) => {
  const { error, values, setValues, handleInputs, submitValidate } =
    useValidateForm(initialState, schema);

  const costumerContext = useContext(CostumerContext);
  const { getListMDSlevel2, ListsLevelTwo } = costumerContext;

  const classes = useStyles();

  const [list, setList] = useState({
    functionList: [],
    operationTypeList: [],
  });

  useEffect(() => {
    const listId = [
      {
        listId: 16,
        parentCode: codeEnterprise,
        agrupador: 2,
      },
      {
        listId: 19,
        parentCode: codeEnterprise,
        agrupador: 2,
      },
    ];
    getListMDSlevel2(listId);
  }, []);

  useEffect(() => {
    if (ListsLevelTwo.length) {
      const Funcion = ListsLevelTwo.filter(
        (element) => element.listName === "Funcion"
      );
      const TipoOperacion = ListsLevelTwo.filter(
        (element) => element.listName === "TipoOperacion"
      );
      if (Funcion.length && TipoOperacion.length) {
        setList({
          ...list,
          functionList: Funcion[0].list[0].values,
          operationTypeList: TipoOperacion[0].list[0].values,
        });
      }
    }
  }, [ListsLevelTwo]);

  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitting) {
      const value = Object.values(error).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        modalApprove();
        setForm(values);
        setPassValidation(true);
      } else {
        setPassValidation(false);
      }
    }
    setIsSubmitting();
  }, [error]);

  //<---------------------------------->
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contactInfo, setContactInfo] = useState([]);
  const [info, setInfo] = useState({
    Name: "",
    Function: "",
    FirstName: "",
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleValues = (data) => {
    setValues({ ...values, contactInformation: data });
  };

  useEffect(() => {
    setValues({ ...values, contactInformation: contactInfo });
  }, [contactInfo]);

  useEffect(() => {
    if (Object.values(info).every((data) => data.length == 0) === false) {
      const newValue = { ...info };
      const List = contactInfo;
      List.push(newValue);
      setContactInfo(List);
      handleClose();
    }
  }, [info]);

  //<---------------------------------->

  return (
    <>
      <div className="formRow contentDistribution_flex-start">
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Tipo de operación"}
            errors={error.operationType}
            items={list.operationTypeList}
            placeholder="Seleccione tipo de operación"
            handleInputs={handleInputs("operationType")}
          />
        </div>
        <div className="formRow__campo">
          <InputCustom
            required={true}
            label={"Cuenta asociada"}
            errors={error.associatedAccount}
            placeholder="Ingrese la cuenta asociada"
            handleInputs={handleInputs("associatedAccount")}
          />
        </div>
      </div>
      <div className="formRow contentDistribution_flex-start">
        <TableContact
          items={contactInfo}
          handleValues={handleValues}
          setContactInfo={setContactInfo}
          functionList={list.functionList}
          handleClickOpen={handleClickOpen}
          errors={error.contactInformation}
          titleTable={"Información de contacto"}
        />
      </div>
      <DialogCommon
        open={openDialog}
        title="Confirmación para Eliminar"
        classes={classes}
        handleClose={handleCloseDialog}
        medium={"crear"}
        confirmCancelDialog={() => {}}
        messageEdit=""
        messageCreate="¿Está seguro que desea eliminar el contacto asignado?"
      />
      <ModalContact
        open={open}
        setContactInfo={setInfo}
        handleClose={handleClose}
        items={list.functionList}
      />
    </>
  );
};
