import { ReactType } from "react";
import "../components/global.scss";
import "highlight.js/styles/monokai.css";

interface AppWrapperProps {
  Component: ReactType;
  pageProps: {};
}

function AppWrapper(props: AppWrapperProps) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}

export default AppWrapper;
