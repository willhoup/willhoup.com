import { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  openInNewTab?: boolean;
  children: ReactNode;
  [s: string]: any;
}

function ExternalLink(props: ExternalLinkProps) {
  const { href, openInNewTab, children, ...attributes } = props;
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" {...attributes}>
      {children}
    </a>
  );
}

export default ExternalLink;
