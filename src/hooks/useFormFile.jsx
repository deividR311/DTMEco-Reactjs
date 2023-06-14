import { useState } from 'react';

export const useFormFile = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);
    const [messageFile, setMessageFile] = useState('');
    const [showMessageFile, setShowMessageFile] = useState(false);
    const maxSizeBytes = 4000000;
    let formData = new FormData();
    const [ fileName, setFileName ] = useState('');

    const closeSnack = () => {
        setShowMessageFile(false);
    }

    const handleChange = ({ target }) => {
        const { name, values, files } = target;
        setShowMessageFile(false);
        setMessageFile('')

        if (files.length > 0) {
            if (files[0].size < maxSizeBytes) {
                if (files[0].type === 'application/pdf') {
                    formData.append('file', files[0], files[0].name);
                    setFileName(files[0].name)

                    setValues((prevState) => ({
                        ...prevState,
                        file : formData
                    }))
                } else {
                    setShowMessageFile(true);
                    setMessageFile('El archivo debe ser tipo pdf')
                    target.value = null
                }
            } else {
                setShowMessageFile(true);
                setMessageFile('El archivo supera el tamaño permitido')
                target.value = null
            }
        }

        setValues((prevState) => ({
            ...prevState,
            [name] : values
        }))
    }

    return [ values, handleChange, setValues, fileName, messageFile, showMessageFile,
        closeSnack ];
}