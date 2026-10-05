import PropTypes from 'prop-types';
import ExternalLink from '../ExternalLink';
import './Footer.css';

const Footer = ({ links }) => (
  <footer className="Footer">
    <ul className="Footer-links">
      {links.map(link => (
        <li key={link.id}>
          {link.external ? (
            <ExternalLink href={link.href}>{link.label}</ExternalLink>
          ) : (
            <a className="Footer-link" href={link.href}>
              {link.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </footer>
);

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      external: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Footer;
