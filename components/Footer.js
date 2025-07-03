import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>
      Copyright © EPSDC "Noel Rodriguez" 2024
    </Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#ff4343',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerText: {
    color: '#000000',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default Footer;