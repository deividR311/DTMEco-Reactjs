import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const DialogCommon = ({
  open,
  handleClose,
  title,
  medium,
  messageEdit,
  messageCreate,
  confirmCancelDialog,
  classes,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {medium === "crear" ? messageCreate : messageEdit}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.btnCloseModal}>
            No
          </Button>
          <Button
            onClick={confirmCancelDialog}
            color="primary"
            className={classes.btnAddPoint}
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogCommon;
