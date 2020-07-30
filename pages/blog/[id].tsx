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

      <main className="tight">
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
