import { Authorizer } from "@/utils/authorizer";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

export default function Screen() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const _setIsAuthorized = async () => {
      const _isAuthorized = await Authorizer.isAuthorized();
      setIsAuthorized(_isAuthorized);
      setIsLoading(false);
    };
    _setIsAuthorized();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <Redirect href={isAuthorized ? "/protected" : "/login"} />;
}
