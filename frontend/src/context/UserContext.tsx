import {
  Exact,
  useWhoamiLazyQuery,
  WhoamiQuery,
} from "@/generated/graphql-types";
import { LazyQueryExecFunction } from "@apollo/client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type UserType = {
  id: number;
  email: string;
  role: string;
} | null;

type UserContextType = {
  user: UserType;
  changeUser: (value: UserType) => void;
  refetchUser: LazyQueryExecFunction<
    WhoamiQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>(null);

  const [whoami] = useWhoamiLazyQuery({
    fetchPolicy: "no-cache",
    onCompleted(data) {
      setUser(data.whoami ?? null);
    },
    onError() {
      setUser(null);
    },
  });

  const changeUser = (value: UserType) => {
    setUser(value);
  };

  useEffect(() => {
    whoami();
  }, []);

  return (
    <UserContext.Provider value={{ user, changeUser, refetchUser: whoami }}>
      {children}
    </UserContext.Provider>
  );
};
