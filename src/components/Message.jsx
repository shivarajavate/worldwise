import PropTypes from "prop-types";
import styles from "./Message.module.css";

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
