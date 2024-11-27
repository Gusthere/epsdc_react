import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ value, onChangeText, placeholder, secureTextEntry, keyBoardType = "default", regex = /.+/u}) => {
    const KeyPress = (string, regex, setValue) =>{
        var value = regex.test(string.slice(-1))? string : string.slice(0, -1);
        setValue(value);
    }
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={(text)=>{KeyPress(text, regex, onChangeText)}}
      placeholder={placeholder}
      keyBoardType = {keyBoardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingLeft: 8,
    width: "80%"
  },
});

export default Input;
