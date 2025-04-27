import { Authorizer } from "@/shared/authorizer";
import { Button, Image, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { componentStyle } from "../shared/components/styles";
import { isLoadingAtom, Spinner } from "@/shared/components/spinner";
import { OmniAuth } from "@/shared/services/omniauth";
import { useAtom } from "jotai";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import SHA512 from "crypto-js/sha512";

export default function LoginComponent() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [user, setUser] = useState("thiago.mennezes@gmail.com");
  const [password, setPassword] = useState("12345");
  const router = useRouter();

  async function authenticate() {
    setIsLoading(true);
    try {
      const omniAuth = new OmniAuth();
      const encrypted_password = SHA512(password).toString();
      const authToken = await omniAuth.authenticate(user, encrypted_password);
      Authorizer.saveToken(authToken);
    } catch (error) {
      alert(error);
      setPassword("");
    } finally {
      router.navigate("/protected");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={[componentStyle.container, componentStyle.containerBgColor]}>
      {/* Logo Image */}
      <Image
        source={require("../../assets/images/inpalm-banner.png")}
        style={componentStyle.imgBanner}
        resizeMode="contain"
      />

      {/* Email Input */}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        inputMode="email"
        keyboardType="email-address"
        onChangeText={setUser}
        placeholder="E-mail"
        style={componentStyle.inputLogin}
      />

      {/* Password Input */}
      <TextInput
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        style={componentStyle.inputLogin}
      />

      {/* Authenticate Button */}
      <Button
        onPress={() => authenticate()}
        style={styles.button}
        title="Autenticar"
      />

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
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
