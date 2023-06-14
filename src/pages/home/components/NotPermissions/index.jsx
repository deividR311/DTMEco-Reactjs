import { Button } from '@material-ui/core';
import React from 'react';

const NotPermissions = ({
    classes, title, description, handleOptions
}) => {
    return (
        <>
            <div>
                <h2 id="transition-modal-title">{ title }</h2>
                <p id="transition-modal-description">{ description }</p>
                <Button onClick={handleOptions} variant="contained" color="primary">
                    Aceptar
                </Button>
            </div>
        </>
    )
}

export default NotPermissions;
