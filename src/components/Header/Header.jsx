import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ title, subtitle }) => (
  <header className="Header">
    <h1 className="Header-title">{title}</h1>
    {subtitle && <p className="Header-subtitle">{subtitle}</p>}
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default Header;
