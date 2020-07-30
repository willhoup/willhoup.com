// import "../styles.css";
import { ReactType } from "react";
import "../components/global.css";
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
