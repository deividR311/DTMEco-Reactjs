import React, { useState } from 'react';
import { useForm } from '../../../hooks/useForm';

export const useDashboardSelectApprover = ( saveApproverManage, clearsaveApproverManageFailed,
    clearsaveApproverManageSuccess, saveApproverManageFailed) => {
    const [openModal, setOpenModal] = useState(false);
    const [didSubmitApprover, setDidSubmitApprover] = useState(false);
    const [ selectApprover, handleSelectApprover, setSelectApprover ] = useForm({
        stateId: 4,
        requestId: '',
        approvingUserId: '',
        approvingUserName: '',
        rejectionReason: null,
        returnReason: null,
        observations: '',
        titanCaseId: '',
        requestUrl: ''
    })
    let isValidate = false;

    const changeApprover = (item) => {
        setSelectApprover((prevState) => ({
            ...prevState,
            requestId: item.id,
            requestUrl: `${process.env.REACT_APP_OFFICIAL_URL}/Clientes/ClienteNacional/${item.codeEnterprise}/Aprobador/${item.id}`,
        }));
        setOpenModal(true);
    }

    const handleCloseSnack = () => {
        clearsaveApproverManageFailed();
        clearsaveApproverManageSuccess();
        if (!saveApproverManageFailed) {
            handleCloseModal();
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectApprover((prevState) => ({
            ...prevState,
            approvingUserId: ''
        }));
    };

    const handleConfirmApprover = () => {
        isValidate = false;
        setDidSubmitApprover(false);
        if (selectApprover.approvingUserId === '') {
            setDidSubmitApprover(true);
            isValidate = true;
        }

        if (!isValidate) {
            saveApproverManage(selectApprover)
        }
    };

    const handleApprover = (event, value, name) => {
        if (value !== null) {
            setSelectApprover((prevState) => ({
            ...prevState,
            approvingUserId: value.id
            }));
        } else {
            setSelectApprover((prevState) => ({
                ...prevState,
                approvingUserId: ''
            }));
        }
    };

    return [
        openModal,
        didSubmitApprover,
        selectApprover,
        handleSelectApprover,
        setSelectApprover,
        changeApprover,
        handleCloseModal,
        handleConfirmApprover,
        handleApprover,
        handleCloseSnack
    ];
}
