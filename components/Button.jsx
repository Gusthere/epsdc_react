import React from 'react';
   import { TouchableOpacity, Text, StyleSheet } from 'react-native';

   const Button = ({ title, onPress }) => {
     return (
       <TouchableOpacity style={styles.button} onPress={onPress}>
         <Text style={styles.buttonText}>{title}</Text>
       </TouchableOpacity>
     );
   };

   const styles = StyleSheet.create({
     button: {
       backgroundColor: '#007BFF',
       padding: 10,
       alignItems: 'center',
       borderRadius: 10,
     },
     buttonText: {
       color: 'white',
       fontSize: 16,
     },
   });

   export default Button;