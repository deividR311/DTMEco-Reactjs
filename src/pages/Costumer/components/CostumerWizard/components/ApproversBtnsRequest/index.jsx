import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useSpecialStyles } from '../../styles';

const ApproversBtnsRequest = ({
    handleBack, handleNext, disabledNext,
    disabledBack, rejectionRequest, returnRequest,
    approveRequest, levelOne
}) => {
    const classes = useSpecialStyles();
    return (
        <>
            <div className={classes.ctn__approverBtns}>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBack}
                        className={classes.buttonAccept}
                        disabled={disabledBack}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={approveRequest}
                        className={classes.buttonAccept}
                    >
                        Aprobar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={rejectionRequest}
                        className={classes.buttonAccept}
                    >
                        Rechazar
                    </Button>
                    { !levelOne &&
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={returnRequest}
                            className={classes.buttonAccept}
                        >
                            Devolver
                        </Button>
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.buttonAccept}
                        disabled={disabledNext}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ApproversBtnsRequest;