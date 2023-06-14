import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBarCommon = ({
  success,
  error,
  handleCloseSnack,
  successMessage,
  errorMessage,
  time = 3000,
}) => {
  return (
    <>
      <Snackbar
        open={success}
        autoHideDuration={time}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={time} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBarCommon;
