import { Redirect } from "expo-router";

export default function Screen() {
  const isAuthorized = true;

  if (isAuthorized) {
    return <Redirect href="/protected" />;
  }

  return <Redirect href="/login" />;
}
