import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const useDialog = ( state ) => {
    
    const history = useHistory();
    const [open, setOpen] = useState(state);

    const handleClickOpen = () => { setOpen(true) };

    const handleClose = () => { setOpen(false) }

    const goBack = () => { history.goBack() };

    const confirmCancelDialog = () => { setOpen(false); goBack(); }

    return [ open, handleClickOpen, handleClose, confirmCancelDialog ];
}