import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface FromInputProps {
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    onBlur: (e: any) => void,
    placeholder: string,
    secureTextEntry?: boolean,
    error?: string
}
const FormInput: React.FC<FromInputProps> = ({ label, value, onChangeText, onBlur, placeholder, secureTextEntry, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 5, color: "#374151" },
  input: {
    borderWidth: 1, padding: 10, borderRadius: 5, borderColor: "#ccc", fontSize: 16,},
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginTop: 3 },
});

export default FormInput;
