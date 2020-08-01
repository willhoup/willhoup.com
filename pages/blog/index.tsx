import React, { ReactNode } from "react";
import { GetStaticProps } from "next";
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
        description="I don't write as much anymore. I'm hoping this blog will help change that."
      />

      <main className="tight">
        <article>
          <section>
            <h1>Writings</h1>
            <p>
              I don't write as much anymore. I'm hoping this blog will help
              change that.
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
                    <h6>{date}</h6>
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
          margin: 24px 0px;
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

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug"], true);

  return {
    props: { allPosts },
  };
};

export default Blog;
