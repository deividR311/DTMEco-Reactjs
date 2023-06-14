import "./_modalModify.scss";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { RenderIf } from "../../../../widgets/RenderIf";
import { DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { InputFieldCustom } from "../../../DraftMaterialNoCore/components/CustomInput";

export const ModalModify = ({ tittleModal, open, handleClose, typeModal }) => {
  // const RenderIf

  return (
    <>
      <Dialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        className={"modalModifyContainer"}
      >
        <DialogTitle className="modalModifyContainer_title">
          {tittleModal}
          <CloseIcon className="iconCloseModify" onClick={handleClose} />
        </DialogTitle>
        <DialogContent className="modalModifyContainer_content">
          <RenderIf isTrue={typeModal === "reject"}>
            <Grid container spacing={0} className={"GridContainer"}>
              <Grid xs={6} className={"GridContainer_item"}>
                <SearchSelect
                  isRequired={true}
                  onChange={() => {}}
                  optionList={"stateRequest"}
                  label={"Tipo de solicitud"}
                  valueId={""}
                  placeholder={"Seleccione una categoría"}
                  listOpt={[{ id: 1, name: "hola" }]}
                  errors={""}
                />
              </Grid>
              <Grid xs={6} className={"GridContainer_item"}>
                <SearchSelect
                  isRequired={true}
                  onChange={() => {}}
                  optionList={"stateRequest"}
                  label={"Tipo de solicitud"}
                  valueId={""}
                  placeholder={"Seleccione una categoría"}
                  listOpt={[{ id: 1, name: "hola" }]}
                  errors={""}
                />
              </Grid>
              <Grid xs={12} className={"GridContainer_item last"}>
                <InputFieldCustom
                  max="500"
                  required={true}
                  name={"observations"}
                  onChange={() => {}}
                  showCharacterLength={true}
                  errors={[]}
                  value={""}
                  label="Observación acerca de la solicitud"
                  props={{
                    rows: 6,
                    maxRows: 6,
                    multiline: true,
                    name: "",
                  }}
                />
              </Grid>
            </Grid>
          </RenderIf>
          <RenderIf isTrue={typeModal === "approve"}>
            <input type="text" />
          </RenderIf>
        </DialogContent>
        <DialogActions className="modalModifyContainer_buttons">
          <div className={`ButtonCancelBorder`} onClick={handleClose}>
            Cancelar
          </div>
          <div className={`ButtonAccept`} onClick={() => {}}>
            Guardar
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};
