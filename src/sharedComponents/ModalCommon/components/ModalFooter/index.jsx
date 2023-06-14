import React from 'react';
import { Button, Grid } from '@material-ui/core';

const ModalFooter = ({
    cancel, confirm, closeModal, handleConfirm, classes
}) => {
    return (
        <>
            <div className={classes.containerModalBtns}>
                <Grid container>
                    <Grid item xs={6}>
                        <Button className={classes.modalBtnCancel} onClick={closeModal}>
                            {cancel}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button className={classes.modalBtnConfirm} onClick={handleConfirm}>
                            {confirm}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ModalFooter;