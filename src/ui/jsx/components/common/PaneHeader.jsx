import React from "react";

const PanelHeader = props => (
  <div className={"panelHeader"}>
    <div className={"panelHeader__title"}>{props.title}</div>
    <div className={"panelHeader__actions"}>
      <div className={"panelHeader__actions__add"} />
    </div>
  </div>
);

export default PanelHeader;
