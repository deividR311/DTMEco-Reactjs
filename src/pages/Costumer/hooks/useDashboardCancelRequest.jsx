import React, { useState } from 'react';
import CostumerContext from '../../../context/Costumer/costumerContext';
export const useDashboardCancelRequest = (history, costumerContext) => {
    const checkValues = history.location.state;
    const [openModalCancel, setOpenModalCancel] = useState(false);
    const [saveModalApproval, setHandleApprovalModal] = useState(false);
    const {
        saveApproverManage
    } = costumerContext;

    const handleCloseModalCancel = () => {
        setOpenModalCancel(false);
    };
    const handleApprovalModal = () => {
        saveApproverManage({
            stateId: 16,
            requestId: checkValues.cancelRequestFullData.id,
            approvingUserId: checkValues.cancelRequestFullData.modifiedBy
        });
        setOpenModalCancel(false);
        document.location.reload();
    }
    return [openModalCancel, saveModalApproval, setOpenModalCancel, handleCloseModalCancel, handleApprovalModal];
}
