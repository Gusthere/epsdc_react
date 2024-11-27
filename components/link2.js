// Link.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Link = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    color: '#5478ff',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Link;