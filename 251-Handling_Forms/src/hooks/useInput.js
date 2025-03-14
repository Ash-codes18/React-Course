import { useState } from 'react';

export const useInput = (defaultValue, validationFn) => {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    const handleInputBlur = () => {
        setDidEdit(true);
    };
    
      
    const handleInputChange = (e) => {
        setEnteredValue(e.target.value);
        setDidEdit(false);
    };
        

    return {
        value : enteredValue,
        handleInputBlur,
        handleInputChange,
        hasError : didEdit && !valueIsValid
    }

}
 