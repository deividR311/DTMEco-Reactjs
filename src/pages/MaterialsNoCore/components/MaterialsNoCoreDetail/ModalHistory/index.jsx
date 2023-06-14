import {
  AccordionDetails,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect } from "react";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import MaterialNoCore from "../../../../../context/MaterialsNoCore/materialsNoCoreContext";
import { MakeAcordeon } from "./components";
import { Box } from "@mui/system";

export const ModalHistory = ({
  open = false,
  handleClose = () => {},
  confirmCancelDialog = () => {},
  title = "",
  id = 0,
}) => {
  const materialNoCore = useContext(MaterialNoCore);
  const { GetHistoryMaterial, historyMaterial } = materialNoCore;

  useEffect(() => {
    if (id > 0) {
      GetHistoryMaterial(id);
    }
  }, [id]);

  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        maxWidth={"xl"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>{title}</Box>
            <Box>
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon style={{ color: "#9F9D9D" }} />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            <MakeAcordeon data={historyMaterial} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            className="ButtonAcceptModal"
            autoFocus
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
