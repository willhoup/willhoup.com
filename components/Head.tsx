import InternalHead from "next/head";
import { IMetadata } from "../lib/getPostData";
import Navigation from "./Navigation";

interface HeadProps extends IMetadata {
  og_title?: string;
  url: string;
}

function Head(props: HeadProps) {
  const {
    title = "Will Houp",
    description,
    og_title = "Will Houp",
    url,
  } = props;
  return (
    <>
      <InternalHead>
        <title>{title} | willhoup.com</title>

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {og_title && <meta property="og:title" content={og_title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}

        <meta property="og:site_name" content="willhoup.com" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-48331664-1"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-48331664-1');
            `,
          }}
        />
      </InternalHead>
      <Navigation url={url} />
    </>
  );
}

export default Head;
