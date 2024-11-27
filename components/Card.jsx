import React from 'react';
   import { View, StyleSheet } from 'react-native';

   const Card = ({ children }) => {
     return <View style={styles.card}>{children}</View>;
   };

   const styles = StyleSheet.create({
     card: {
       padding: 20,
       width: 300,
       height: 400,
       minHeight: 300,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'white',
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.2,
       shadowRadius: 2,
       elevation: 5,
     },
   });

   export default Card;