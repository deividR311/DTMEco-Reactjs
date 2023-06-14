import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";

import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export const DialogMultiFunction = ({
  title = '',
  open = false,
  icono = '',
  menssage = '',
  buttons = <></>,
  handleClose = () => { },
}) => {

  return (
    <>
      <Dialog
        open={open}
        maxWidth={"xl"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEnforceFocus
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
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "stretch",
            flexDirection: "column",
            alignItems: "center",
            margin: "52px",
          }}
          >
            {icono}
            <p style={{ textAlign: "center" }}>
              {menssage}
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          {buttons}
        </DialogActions>
      </Dialog>
    </>
  )
}