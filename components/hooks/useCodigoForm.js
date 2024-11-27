// hooks/useCodigoForm.js
//sirven como validaciones y son las que aparecen en la vista
import { useState } from 'react';
import { Alert } from 'react-native';

const useCodigoForm = (navigation) => {// se usa en la vista de codigo
  const [codigo, setCodigo] = useState('');

  const onRecover = () => {
    if (codigo.trim() === '') {
      Alert.alert('Campo vacío', 'Por favor, introduce el código de recuperación.');
      return;
    }

    if (codigo.length !== 8) {
      Alert.alert('Error', 'El código debe tener 8 dígitos.');
      return;
    }

    axios
        .get("info.json")
        .then((response) => {
          Alert.alert('Éxito', `Código verificado: ${codigo}`);
        })
        .catch((error) => {
          Alert.alert('Éxito', `Código verificado: ${codigo}`);
        });
  };

  return { codigo, setCodigo, onRecover };
};

export default useCodigoForm;
