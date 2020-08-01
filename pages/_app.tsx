// import "../styles.css";
import { ReactType } from "react";
import "../components/global.scss";
import "highlight.js/styles/monokai.css";
import { getAllDomains } from "../lib/getSiteData";

interface AppWrapperProps {
  Component: ReactType;
  pageProps: {};
}

function AppWrapper(props: AppWrapperProps) {
  const { Component, pageProps } = props;
  // console.log(props);
  return <Component {...pageProps} />;
}

export default AppWrapper;
