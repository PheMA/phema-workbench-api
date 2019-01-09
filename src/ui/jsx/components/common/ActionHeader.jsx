import React from "react";
import PropTypes from "prop-types";
import { Button } from "@blueprintjs/core";

const ActionHeader = props => (
  <div className="actionHeader">
    <div className="actionHeader__title">{props.title}</div>
    <div className="actionHeader__actions">
      {props.addAction && (
        <Button icon="add" onClick={props.addAction}>
          {props.addText}
        </Button>
      )}
    </div>
  </div>
);

ActionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  addAction: PropTypes.func,
  addText: PropTypes.string
};

export default ActionHeader;
