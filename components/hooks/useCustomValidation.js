import { useState, useEffect } from 'react';

const useCustomValidation = (dni, password) => {
  const [errors, setErrors] = useState({});
  const validatedni = (dni) => {
    const regex = /^[0-9]{7,9}$/;
    return regex.test(dni);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[A-ZÑñ])(?=.*[\W_,;]).{8,20}$/;
    return regex.test(password);
  };

  useEffect(() => {
    const newErrors = {};
    if (dni && !validatedni(dni)) {
      newErrors.dni = 'dni no válido';
    }
    if (password && !validatePassword(password)) {
      newErrors.password = 'La contraseña debe tener no cumple con el formato';
    }
    setErrors(newErrors);
  }, [dni, password]); // Validar cada vez que cambian dni o password
  return { errors };
};

export default useCustomValidation;