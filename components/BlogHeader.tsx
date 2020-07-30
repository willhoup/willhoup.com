import React, { ReactNode } from "react";

interface BlogHeaderProps {
  title: string;
  byline: string;
  date: string;
  updated_at?: string;
  note?: string | ReactNode;
}

function BlogHeader(props: BlogHeaderProps) {
  const { title, byline, date, updated_at = "", note = "" } = props;
  return (
    <header className="blog-header">
      <h1>{title}</h1>
      <p className="byline">
        By {byline} | {date}
        {updated_at && (
          <>
            {" "}
            <br />
            {`Updated ${updated_at}`}
          </>
        )}
      </p>
      {note && <div className="header-note">{note}</div>}

      <style jsx>{`
        .blog-header {
          max-width: 550px;
          margin: 0 auto 32px;
        }

        .header-note {
          padding: 0.25em 1em;
          background: #fffcd9;
          border: 0.5px rgba(0, 0, 0, 0.05) solid;
          border-radius: 2px;
        }

        .byline {
          color: #666;
          line-height: 1.5;
        }
      `}</style>
    </header>
  );
}

export default BlogHeader;
