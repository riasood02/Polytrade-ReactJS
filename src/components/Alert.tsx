import React from "react";

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
