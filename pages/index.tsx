import Head from "../components/Head";
import { ProjectList as data } from "./api/data";
import ExternalLink from "../components/ExternalLink";
import InternalLink from "next/link";
import { ReactNode } from "react";

export default function Home() {
  return (
    <div className="container">
      <Head url="http://willhoup.com" />

      <main className="tight">
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
            . In my spare time, I want to get back into writing again,{" "}
            <InternalLink href="/blog/">
              <a>so I started a blog</a>
            </InternalLink>{" "}
            – but don't expect much there for now. You can reach me via{" "}
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
      `}</style>
    </div>
  );
}
