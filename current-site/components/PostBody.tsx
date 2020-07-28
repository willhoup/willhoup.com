import markdownStyles from "./markdown.module.css";

export default function PostBody(props: { content: string }) {
  return (
    <div>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </div>
  );
}
