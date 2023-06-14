import { useState } from 'react';

export const useFormFiscalInfo = ( initialState = [] ) => {
    
    const [values, setValues] = useState(initialState);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setValues((prevState) => ([{
            ...prevState,
            [name] : value
        }]))
    }

    return [ values, handleChange ];
}