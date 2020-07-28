import Head from "../components/Head";
import { ProjectList as data } from "./api/data";
import ExternalLink from "../components/ExternalLink";
import InternalLink from "next/link";
import { ReactNode } from "react";

export default function Home() {
  return (
    <div className="container">
      <Head url="http://willhoup.com" />

      <main>
        <header>
          <h1 className="title">Hi, I'm Will</h1>
          <img src="/family.jpg" />
        </header>

        <article>
          <p>
            Welcome. I work at The New York Times on the{" "}
            <ExternalLink href="https://twitter.com/NYTInteractive">
              Interactive News
            </ExternalLink>{" "}
            team and live in New Jersey with my beautiful wife and son.
          </p>

          <p>
            Before The Times, I made stops at CNN and The Virginian-Pilot. I
            earned my bachelor's at Asbury University and my master's from
            Northwestern University's Medill School of Journalism.
          </p>

          <p>
            I'm a big fan of the Philadelphia Eagles and{" "}
            <ExternalLink href="https://media.giphy.com/media/MRLc0oJPeTcIw/giphy.gif">
              Arrested Development
            </ExternalLink>
            . You can reach me via{" "}
            <ExternalLink href="https://twitter.com/williamhoup">
              Twitter
            </ExternalLink>{" "}
            or{" "}
            <ExternalLink href="https://www.linkedin.com/in/will-houp/">
              LinkedIn
            </ExternalLink>
            .
          </p>
        </article>

        <article className="project-list">
          {data.map(
            (project, index): ReactNode => {
              const external = project.url.includes("http");

              return (
                <section key={`project-${index}`} className="project">
                  <h3>
                    {external ? (
                      <ExternalLink className="project-link" href={project.url}>
                        {project.name}
                      </ExternalLink>
                    ) : (
                      <InternalLink href={project.url}>
                        <a className="project-link">{project.name}</a>
                      </InternalLink>
                    )}
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
            }
          )}
        </article>
      </main>

      <style jsx>{`
        article {
          width: 100%;
        }

        .project-list {
          padding-top: 1em;
          margin-top: 30px;
          border-top: 1px solid #efefef;
        }

        .project {
          margin: 30px 0px;
        }

        h3 {
          font-size: 1.1em;
          line-height: 1.5;
          margin-bottom: 2px;
        }

        h6 {
          color: #666;
          font-size: 0.85em;
          font-family: "IBM Plex Mono", monospace;
          font-weight: 400;
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
