import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";

export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export type CustomAppProps<P = {}> = AppProps<P> & {
  Component: CustomNextPage;
};
