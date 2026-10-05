import PropTypes from 'prop-types';
import './Stat.css';

// One label and value pair. It renders a dt and a dd, so it goes inside a <dl>.
const Stat = ({ label, value }) => (
  <div className="Stat">
    <dt className="Stat-label">{label}</dt>
    <dd className="Stat-value">{value}</dd>
  </div>
);

Stat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Stat;
