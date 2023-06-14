import { useEffect, useState } from 'react';

export const useDisabledBtn = ( updateCostumerSuccess, activeStep ) => {
    
    const [disabledBtn, setDisabledBtn] = useState(true);

    useEffect(() => {
        if ( updateCostumerSuccess && activeStep === 1 ) {
            setDisabledBtn(false);
        } else if ( updateCostumerSuccess && activeStep === 2 ) {
            setDisabledBtn(false);
        } else if ( updateCostumerSuccess && activeStep === 3 ) {
            setDisabledBtn(false);
        } else if ( updateCostumerSuccess && activeStep === 4 ) {
            setDisabledBtn(false);
        }
    }, [updateCostumerSuccess])

    return [ disabledBtn, setDisabledBtn ];
}