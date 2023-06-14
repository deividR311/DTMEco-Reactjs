import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { InputSelectModal } from "./components";

export const ReassignApprover = (
  {
    open = false,
    title = '',
    handleClose = () => { },
    getListF = () => { },
    getData = [],
    valueId,
    onChange,
    handleSend = () => { }
  }
) => {
  useEffect(() => {
    getListF()
  }, [])
  return (
    <>
      <Dialog
        open={open}
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
          <Box flexGrow={3}>
            <div style={{ height: '200px', width: '600px' }}>
              <InputSelectModal
                data={getData}
                valueId={valueId}
                onChange={onChange}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={7}></Grid>
            <Grid item xs={2}>
              <Button
                className="ButtonCancelarModal"
                onClick={handleClose}
                style={{ height: '40px', width: '100px' }}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                className="ButtonAcceptModal"
                onClick={handleSend}
                style={{ height: '40px', width: '80px' }}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}