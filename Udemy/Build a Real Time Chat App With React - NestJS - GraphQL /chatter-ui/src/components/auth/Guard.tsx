import { useGetMe } from "../../hooks/useGetMe.ts";
import excludedRoutes from "../../constants/excluded-routes.ts";
import { useEffect } from "react";
import { authenticatedVar } from "../../constants/authenticated.ts";
import { snackVar } from "../../constants/snack.ts";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors.ts";
import { usePath } from "../../hooks/usePath.ts";

type GuardProps = {
  children: JSX.Element;
};

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return <>{excludedRoutes.includes(path) ? children : user && children}</>;
};

export default Guard;
