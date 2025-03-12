import React from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require("../assets/images/inpalm-banner.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Email Input */}
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry />

      {/* Authenticate Button */}
      <Button
        onPress={() => console.log("Authenticate Pressed")}
        style={styles.button}
        title="Autenticar"
      />

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logo: {
    width: 250,
    height: 120,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    paddingVertical: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: "#007bff",
    textDecorationLine: "underline",
  },
};

export default LoginScreen;
