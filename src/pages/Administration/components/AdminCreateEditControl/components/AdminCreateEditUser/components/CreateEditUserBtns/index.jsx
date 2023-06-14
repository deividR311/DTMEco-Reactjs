import React from 'react';
import { Grid, Button } from '@material-ui/core';

const CreateEditUserBtns = ({
    classes, handleValidations, handleClickOpen
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
    )
}

export default CreateEditUserBtns;
