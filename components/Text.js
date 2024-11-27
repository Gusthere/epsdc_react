import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Texto= ({ children, style }) => {
  return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 16,
    color: '#000', // Color de texto predeterminado
  },
});

export default Texto;
