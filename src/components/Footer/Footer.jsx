import PropTypes from 'prop-types';
import ExternalLink from '../ExternalLink';
import './Footer.css';

const Footer = ({ links }) => (
  <footer className="Footer">
    <ul className="Footer-links">
      {links.map(link => (
        <li key={link.id}>
          <ExternalLink href={link.href}>{link.label}</ExternalLink>
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
    })
  ).isRequired,
};

export default Footer;
