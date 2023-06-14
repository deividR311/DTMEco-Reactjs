import React from 'react';

export const useSaveMethod = ( activeStep, handleSave, saveSalesInfo, saveFiscalInfo, saveUploadFiles ) => {
    
    const returnSaveMethod = () => {
        switch (activeStep) {
            case 1:
            return handleSave;

            case 2:
            return saveSalesInfo;

            case 3:
            return saveFiscalInfo;

            case 4:
            return saveUploadFiles;
        
            default:
            return handleSave;
        }
    }

    return [ returnSaveMethod ];

}
