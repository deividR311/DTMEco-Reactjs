import { Button } from '@material-ui/core';
import React from 'react';

const RequestOtherUser = ({
    redirectToCostumerDashBoard, userCreator, classes
}) => {
    return (
        <>
            <p>
                Señor usuario existe una solicitud en curso para el cliente <br/>
                que usted desea crear, ingresada por el solicitante <strong>{userCreator}</strong>
            </p>
            <Button className={classes.modalBtnConfirm} onClick={redirectToCostumerDashBoard}>Aceptar</Button>
        </>
    )
}

export default RequestOtherUser;