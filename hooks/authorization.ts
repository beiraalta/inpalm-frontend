import { omniAuth } from "@/services/omniauth";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



export function useAuthorization() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const token = await AsyncStorage.getItem("authToken");
  if (token && await omniAuth.verifyToken()) {
    setIsAuthorized(true);
  } else {
    setIsAuthorized(false);
  }

  return isAuthorized;
}