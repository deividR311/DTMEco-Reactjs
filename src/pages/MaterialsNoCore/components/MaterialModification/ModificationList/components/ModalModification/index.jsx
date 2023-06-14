import CloseIcon from "@material-ui/icons/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export const ModalCusntomModifi = ({
  error = false,
  bodyText,
  openModal,
  titleModal,
  handleClose,
  handelConfirm,
  goBack = false,
}) => {
  return (
    <Dialog
      open={openModal}
      handleClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          <span>{titleModal}</span>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon style={{ color: "#9F9D9D" }} />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignContent: "stretch",
              flexDirection: "column",
              alignItems: "center",
              margin: "52px",
            }}
          >
            {error ? (
              <HighlightOffIcon style={{ color: "red", fontSize: "50px" }} />
            ) : (
              <CheckCircleOutlineIcon
                style={{ color: "#2AE92E", fontSize: "50px" }}
              />
            )}
            {bodyText}
          </div>
        </DialogContentText>
        <DialogActions>
          {error ? (
            goBack ? (
              <>
                <Button className="ButtonCancelarModal" onClick={handleClose}>
                  NO
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="ButtonAcceptModal"
                  autoFocus
                  onClick={handelConfirm}
                >
                  SI
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  className="ButtonAcceptModal"
                  autoFocus
                  onClick={handleClose}
                >
                  OK
                </Button>
              </>
            )
          ) : (
            <>
              <Button className="ButtonCancelarModal" onClick={handleClose}>
                NO
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="ButtonAcceptModal"
                autoFocus
                onClick={handelConfirm}
              >
                SI
              </Button>
            </>
          )}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
