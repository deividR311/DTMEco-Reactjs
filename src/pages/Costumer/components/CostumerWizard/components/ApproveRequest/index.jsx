import React from 'react';

const ApproveRequest = ({
    classes
}) => {
    return (
        <>
            <div className={classes.ctn__approveScreen}>
                <div className={classes.approveMessage}>
                    <strong>¿Está seguro de aprobar esta solicitud?</strong>
                </div>
            </div>
        </>
    )
}

export default ApproveRequest;