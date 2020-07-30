import React, { ReactNode } from "react";
import Head from "../../components/Head";
import Link from "next/link";
import { getAllPosts, IMetadata } from "../../lib/getPostData";

interface StaticProps {
  props: { allPosts: IMetadata[] };
}

function Blog(props: StaticProps["props"]) {
  const { allPosts } = props;
  return (
    <div className="container">
      <Head
        og_title="Will Houp's Blog"
        url="http://willhoup.com/blog"
        description="This is my blog I hardly ever update"
      />

      <main className="tight">
        <article>
          <section>
            <h1>Writings</h1>
            <p>
              This is my blog I hardly ever update. I'd like to write more, so
              hopefully I'll find the time at some point.
            </p>
          </section>
          <section className="project-list">
            {allPosts.map(
              ({ title, date, slug }, index): ReactNode => {
                return (
                  <section key={`project-${index}`} className="project">
                    <h3>
                      <Link href={`/blog/${slug}`}>
                        <a className="project-link">{title}</a>
                      </Link>
                    </h3>
                    {date}
                  </section>
                );
              }
            )}
          </section>
        </article>
      </main>

      <style jsx>{`
        .project-list {
          padding-top: 1em;
        }

        .project {
          margin: 30px 0px;
        }

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps(): Promise<StaticProps> {
  const allPosts = getAllPosts(["title", "date", "slug"], true);

  return {
    props: { allPosts },
  };
}

export default Blog;
