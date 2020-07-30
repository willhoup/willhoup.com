import { useRouter } from "next/router";
import Head from "../../components/Head";
import BlogHeader from "../../components/BlogHeader";
import PostBody from "../../components/PostBody";
import { getPostBySlug, getAllPosts, IMetadata } from "../../lib/getPostData";
import markdownHtml from "../../lib/markdownToHtml";

interface StaticProps {
  props: IMetadata;
}

interface Path {
  params: {
    id: string;
  };
}

interface StaticPaths {
  paths: Path[];
  fallback: boolean;
}

const Post = (props: StaticProps["props"]) => {
  const { title, description, content, date, updated_at, note } = props;
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container">
      <Head
        url={`http://willhoup.com/blog/${id}`}
        og_title={title}
        title={title}
        description={description}
      />

      <main>
        <article>
          <BlogHeader
            title={title}
            byline="Will Houp"
            date={date}
            updated_at={updated_at}
            note={note}
          />

          <PostBody content={content} />
        </article>
      </main>

      <style jsx>{`
        article {
          width: 100%;
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
          width: 100%;
        }

        main {
          padding: 5rem 0;
          max-width: 550px;
          flex: 1;
          display: flex;
          margin: 0 auto;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Post;

export async function getStaticProps(props: Path): Promise<StaticProps> {
  const { params } = props;
  const post = getPostBySlug(params.id, [
    "title",
    "slug",
    "description",
    "content",
    "date",
    "updated_at",
    "note",
  ]);

  const content = await markdownHtml(post.content || "");

  return {
    props: {
      ...post,
      content,
    },
  };
}

export async function getStaticPaths(): Promise<StaticPaths> {
  const posts = getAllPosts(["slug"], false);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          id: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
