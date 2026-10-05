import PropTypes from 'prop-types';
import './ExternalLink.css';

const ExternalLink = ({ href, children }) => (
  <a className="ExternalLink" href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <span className="visually-hidden"> (opens in a new tab)</span>
  </a>
);

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ExternalLink;
