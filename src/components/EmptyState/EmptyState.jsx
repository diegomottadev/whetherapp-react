import PropTypes from 'prop-types';
import './EmptyState.css';

const EmptyState = ({ children }) => <p className="EmptyState">{children}</p>;

EmptyState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EmptyState;
