const validator = require('validator');


export const validateEmpty = (
    e: React.ChangeEvent<HTMLInputElement>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>
) => {
    const { name, value } = e.target;

    let isEmpty = validator.isEmpty(value);

    if (isEmpty) {
        e.target.classList.add("input-error");
        setErrors((prevErrors) => ({ ...prevErrors, [name]: `Please insert ${[name]}` }));
    } else {
        e.target.classList.remove("input-error");
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
};

export const validateNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>
) => {
    const { name, value } = e.target;


    let isNumeric = validator.isNumeric(value)
    console.log(isNumeric)
    if (!isNumeric) {
        e.target.classList.add("input-error");

        setErrors((prevErrors) => ({ ...prevErrors, [name]: `Please insert number only` }));
    } else {
        e.target.classList.remove("input-error");
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
};