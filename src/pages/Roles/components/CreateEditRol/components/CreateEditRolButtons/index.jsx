import { Button, Grid } from "@material-ui/core";
import * as React from "react";

const CreateEditRolButtons = ({
  handleClickOpen, classes, handleValidations
}) => {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
            <Button onClick={handleClickOpen} className={classes.formBtnCancel} variant="outlined">
                Cancelar
            </Button>
        </Grid>
        <Grid item xs={6}>
            <Button onClick={handleValidations} className={classes.formBtns} variant="contained">
                Guardar
            </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateEditRolButtons;
