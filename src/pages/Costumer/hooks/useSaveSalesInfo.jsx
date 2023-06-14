import { useEffect, useState } from 'react';

export const useSaveSalesInfo = (salesInfo, setDisabledBtn, activeStep, updateCostumer,
    clearUpdateCostumerFailed, clearUpdateCostumerSuccess, wizardData, validateEmail) => {

    let isValidate = false;
    const [canSaveSalesInfo, setCanSaveSalesInfo] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [didSubmitContact, setDidSubmitContact] = useState(false);
    const [specificError, setSpecificError] = useState(false);
    const [messageSpecificError, setMessageSpecificError] = useState('');

    useEffect(() => {
        setDisabledBtn(true)
    }, [activeStep])

    const handleCloseSnack = () => {
        setSpecificError(false);
        clearUpdateCostumerFailed();
        clearUpdateCostumerSuccess();
    }

    const saveSalesInfo = () => {
        setMessageSpecificError('');
        setCanSaveSalesInfo(false);
        setSpecificError(false);
        setDidSubmitContact(false);
        if (salesInfo.salesOrganizationCode === '' || salesInfo.canalCode === '' ||
            salesInfo.sectorCode === '' || salesInfo.transportZoneCode === '' ||
            salesInfo.salesAreaCode === '') {
            isValidate = true;
            setDidSubmit(true);
            setSpecificError(true);
            setMessageSpecificError('Hay campos requeridos sin diligenciar');
        }
        if (salesInfo.codefunction !== '' && salesInfo.codefunction !== undefined) {
            if (!validateEmail) {
                isValidate = true;
                setSpecificError(true);
                setDidSubmitContact(true);
                setMessageSpecificError('El correo electrónico no es valido');
            }

            if (salesInfo.email === '' || salesInfo.telephone === '') {
                isValidate = true;
                setDidSubmit(true);
                setSpecificError(true);
                setDidSubmitContact(true);
                setMessageSpecificError('Hay campos requeridos sin diligenciar');
            }
        }

        if (!isValidate) {
            updateCostumer(wizardData);
        }
    }

    return [canSaveSalesInfo, didSubmit, specificError, messageSpecificError, didSubmitContact, handleCloseSnack, saveSalesInfo, setDidSubmitContact];

}
