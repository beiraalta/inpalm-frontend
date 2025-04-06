import { Authorizer } from "@/shared/authorizer";
import { Redirect } from "expo-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {isLoadingAtom, Spinner} from "@/components/spinner";

export default function Screen() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

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
