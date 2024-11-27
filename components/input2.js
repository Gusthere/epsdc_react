// Input.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ value, onChangeText, placeholder, keyboardType, placeholderTextColor, autoCapitalize }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor} // Usa la prop aquí
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize} // Asegúrate de pasar la prop
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Input;