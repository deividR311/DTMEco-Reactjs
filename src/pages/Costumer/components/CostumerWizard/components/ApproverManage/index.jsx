import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ApproveRequest } from "..";
import {
  MultilineTextFieldCommon,
  SelectCommon,
  SnackBarCommon,
  TextFieldCommon,
} from "../../../../../../sharedComponents";
import { useSpecialStyles } from "../../styles";

export const ApproverManageStyle = makeStyles((theme) => ({
  simpleTextField: {
    width: '95%',
    marginTop: '0px'
  }
}))

const ApproverManage = ({
  rejectionReasons,
  handleChangeApproveManage,
  approveManageJson,
  tittleModalApprover,
  handleCloseApproverManageSnack,
  saveApproverManageSuccess,
  saveApproverManageFailed,
  didSubmitApproverManage,
  approverManageMessageError,
  showApproveScreen,
  approverTipe
}) => {
  const classes = useSpecialStyles();
  const manageClasses = ApproverManageStyle();
  let date = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let dateFormatted = date.toLocaleDateString("es-MX", options);
  const { data, isLogged } = useSelector((state) => state.auth);
  const { name, lastName, code } = data.data;
  const withGrid = tittleModalApprover === 'Aprobar' ? 5 : 8;

  return (
    <>
      <div className={classes.ctn__approverManage}>
        <div className={classes.header}>
          <Grid container>
            <Grid item xs={4}>
              <strong>Fecha: </strong>
              {dateFormatted}
            </Grid>
            { approverTipe !== 'NivelUno' ?
              <>
                <Grid item xs={4}>
                  <strong>Aprobador: </strong>
                  {name} {lastName}
                </Grid>
                <Grid item xs={4}>
                  <strong>Registro: </strong>
                  {code}
                </Grid>
              </>
              :
              <>
                { tittleModalApprover === 'Aprobar' &&
                  <Grid item xs={3}>
                    <TextFieldCommon
                      label={'Numero de caso'}
                      name={'titanCaseId'}
                      disabled={false}
                      value={approveManageJson.titanCaseId}
                      required={didSubmitApproverManage}
                      classes={manageClasses}
                      handleChange={handleChangeApproveManage}
                      maxLength={20}
                    />
                  </Grid>
                }
                <Grid item xs={withGrid}>
                  <TextFieldCommon
                    label={'Nombre del Asesor de Nivel 1'}
                    name={'approvingUserName'}
                    disabled={false}
                    value={approveManageJson.approvingUserName}
                    required={didSubmitApproverManage}
                    classes={manageClasses}
                    handleChange={handleChangeApproveManage}
                    maxLength={250}
                  />
                </Grid>
              </>
            }
            
          </Grid>
        </div>
        { !showApproveScreen ?
            <>
                <div className={classes.ctn__Observations}>
                    <Grid>
                        <SelectCommon
                        label={"Motivo"}
                        name={
                            tittleModalApprover !== "Aprobar" &&
                            tittleModalApprover !== "Devolver"
                            ? "rejectionReason"
                            : "returnReason"
                        }
                        classes={classes}
                        value={
                            tittleModalApprover !== "Aprobar" &&
                            tittleModalApprover !== "Devolver"
                            ? approveManageJson.rejectionReason
                            : approveManageJson.returnReason
                        }
                        selectOptions={rejectionReasons}
                        handleChange={handleChangeApproveManage}
                        required={didSubmitApproverManage}
                        disabled={false}
                        otherStyle={true}
                        />
                    </Grid>
                    <Grid>
                        <MultilineTextFieldCommon
                        rows={4}
                        defaultValue={""}
                        label={"Observaciones"}
                        name={"observations"}
                        value={approveManageJson.observations}
                        handleChange={handleChangeApproveManage}
                        classes={classes}
                        required={didSubmitApproverManage}
                        />
                    </Grid>
                </div>
            </>
            :
            <>
                <ApproveRequest
                    classes={classes}
                />
            </>
        }
        
      </div>
      <SnackBarCommon
        success={saveApproverManageSuccess}
        error={saveApproverManageFailed || didSubmitApproverManage}
        handleCloseSnack={handleCloseApproverManageSnack}
        successMessage={"Gestión guardada exitosamente"}
        errorMessage={
          didSubmitApproverManage
            ? approverManageMessageError
            : "Ha ocurrido un error intenta nuevamente"
        }
        time={5000}
      />
    </>
  );
};

export default ApproverManage;
