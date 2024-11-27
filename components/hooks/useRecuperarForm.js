// hooks/useRecuperarForm.js
//sirven como validaciones y son las que aparecen en la vista
import { useState } from 'react';
import { Alert } from 'react-native';
import axios from "axios";
const useRecuperarForm = (navigation) => {//se usa en la vista de recuperar cuenta
  const [email, setEmail] = useState('');

  const onRecover = () => {
      // Solo proceder si no hay errores
      if (email.trim() === '') {
        Alert.alert('Campo vacío', 'Por favor, introduce un correo electrónico.');
        return;
      }
      axios
        .get("info.json")
        .then((response) => {
          Alert.alert('Éxito', `Se ha enviado un código a: ${email}`);
        })
        .catch((error) => {
          Alert.alert('Éxito', `Se ha enviado un código a: ${email}`);
        });

    // Simular el envío de un correo
   // navigation.navigate('codigo', { email }); // Navega a la pantalla del código con el email ingresado
  };

  return { email, setEmail, onRecover };
};

export default useRecuperarForm;
