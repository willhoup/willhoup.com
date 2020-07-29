import InternalHead from "next/head";
import { IMetadata } from "../lib/getPostData";

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
    <InternalHead>
      <title>{title} | willhoup.com</title>

      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />

      {og_title && <meta property="og:title" content={og_title} />}
      {description && <meta property="og:description" content={description} />}

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

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=PT+Sans&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "IBM Plex Mono", monospace;
          color: #333;
        }

        body {
          padding: 10px;
        }

        * {
          box-sizing: border-box;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 500;
          margin: 0;
          font-family: "PT Sans", sans-serif;
        }

        h1 {
          font-size: 34px;
        }

        p {
          font-weight: 400;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        a,
        a:visited {
          color: #326891;
        }

        a.project-link {
          color: #000;
        }
      `}</style>
    </InternalHead>
  );
}

export default Head;
