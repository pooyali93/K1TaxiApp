import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const Input = ({ label, value, onChangeText, error }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={`Enter ${label.toLowerCase()}`}
      returnKeyType="done"
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#e3e4e5",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: COLORS.white,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9FA7AA",
  },
  input: {
    height: "100%",
    width: "100%",
    //marginTop: 10,
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  error: {
    position: "absolute",
    left: 20,
    bottom: 5,
    color: "red",
    textAlign: "center",
  },
});
export default Input;
