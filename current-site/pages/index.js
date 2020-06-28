import Head from "next/head";
import { data } from "./api/data";
import ExternalLink from "../components/ExternalLink";
import InternalLink from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Will Houp | willhoup.com</title>
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
      </Head>

      <main>
        <header>
          <h1 className="title">Hi, I'm Will</h1>
          <img src="/family.jpg" />
        </header>

        <article>
          <p>
            Welcome. I work at The New York Times on the{" "}
            <a
              href="https://twitter.com/NYTInteractive"
              rel="noreferrer noopener"
              target="_blank"
            >
              Interactive News
            </a>{" "}
            team and live in Jersey City, NJ, with my beautiful wife and son.
          </p>

          <p>
            Before The Times, I made stops at CNN and The Virginian-Pilot. I
            earned my bachelor's at Asbury University and my master's from
            Northwestern University's Medill School of Journalism.
          </p>

          <p>
            I'm a big fan of the Philadelphia Eagles and{" "}
            <a
              href="https://media.giphy.com/media/MRLc0oJPeTcIw/giphy.gif"
              rel="noreferrer noopener"
              target="_blank"
            >
              Arrested Development
            </a>
            . You can reach me via{" "}
            <a
              href="https://twitter.com/williamhoup"
              rel="noreferrer noopener"
              target="_blank"
            >
              Twitter
            </a>{" "}
            or{" "}
            <a
              href="https://www.linkedin.com/in/will-houp/"
              rel="noreferrer noopener"
              target="_blank"
            >
              LinkedIn
            </a>
            .
          </p>
        </article>

        <article className="project-list">
          {data.map((project, index) => {
            const Link = project.url.includes("http")
              ? ExternalLink
              : InternalLink;

            return (
              <section key={`project-${index}`} className="project">
                <h3>
                  <Link className="project-link" href={project.url}>
                    {project.name}
                  </Link>
                </h3>
                {(project.publication || project.date) && (
                  <h6>
                    {project.publication}
                    {project.publication && project.date && " | "}
                    {project.date}
                  </h6>
                )}
              </section>
            );
          })}
        </article>
      </main>

      <style jsx>{`
        article {
          width: 100%;
        }

        .project-list {
          padding-top: 12px;
          margin-top: 24px;
          border-top: 1px solid #efefef;
        }

        .project {
          margin: 24px 0px;
        }

        h3 {
          font-size: 1em;
          line-height: 1.5;
          margin-bottom: 2px;
        }

        h6 {
          color: #666;
          font-size: 0.8em;
        }

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        img {
          border-radius: 50%;
          max-width: 100px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
        }

        p {
          font-size: 15px;
          line-height: 1.7;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          max-width: 550px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap");

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
        h6,
        h7 {
          font-weight: 500;
          margin: 0;
        }

        h1 {
          font-size: 34px;
        }

        p,
        h6 {
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

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>
    </div>
  );
}
