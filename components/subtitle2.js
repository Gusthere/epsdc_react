// Subtitle.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Subtitle = ({ children }) => {
  return <Text style={styles.subtitle}>{children}</Text>;
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: '#484849',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Subtitle;