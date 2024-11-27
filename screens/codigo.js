// CodigoForm.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Title from '../components/title2';
import Subtitle from '../components/subtitle2';
import Input from '../components/input2';
import Button from '../components/button2';
import Link from '../components/link2';
import axios from "axios";
import useCodigoForm from '../components/hooks/useCodigoForm';

const CodigoForm = ({ navigation }) => {
  const { codigo, setCodigo, onRecover } = useCodigoForm(navigation);//con esto activamos las alertas

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Title>¿Recibió su código?</Title>
        <Subtitle>
          Por favor, ingrese el código de 8 dígitos que le hemos enviado a su correo.
        </Subtitle>
        <Input
          value={codigo}
          onChangeText={setCodigo}
          placeholder={"Ingresa tu código de 8 dígitos..."}
          placeholderTextColor="#888"
        />
        <Button onPress={onRecover}>Verificar Código</Button>
        <View style={styles.linksContainer}>
          <Link onPress={() => navigation.navigate('recuperar_cuenta')}>Pedir otro código!</Link>
        </View>
        <View style={styles.linksContainer}>
          <Link onPress={() => navigation.navigate('login')}>Ingresa a tu cuenta</Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4343',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  container2: {
    width: '100%',
    height: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default CodigoForm;
