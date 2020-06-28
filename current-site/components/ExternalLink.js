import InternalLink from "next/link";
import PropTypes from "prop-types";

function ExternalLink({
  href,
  openInNewTab,
  forceExternal,
  children,
  ...props
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
      {children}
    </a>
  );
}

ExternalLink.defaultProps = {
  openInNewTab: false,
  forceExternal: false,
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  openInNewTab: PropTypes.bool,
  forceExternal: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ExternalLink;
