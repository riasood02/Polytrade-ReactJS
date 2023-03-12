import React from "react";

/**
 * Alert Box
 * @param {object} props Component props
 * @param {{message: string | null; type: string | null;}} props.alert alert box with message to be displayed and its type
 * @param {(message: string | null, type: string | null) => void} props.showAlert function to set alert
 */
const Alert = (props: {
  alert: {
    message: string | null;
    type: string | null;
  };
  showAlert: (message: string | null, type: string | null) => void;
}) => {
  return (
    props.alert && (
      <span
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{props.alert.type}</strong>: {props.alert.message}
      </span>
    )
  );
};

export default Alert;
