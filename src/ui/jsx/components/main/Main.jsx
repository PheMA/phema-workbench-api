import React from "react";
import SplitPane from "react-split-pane";
import Phenotypes from "../phenotypes/Phenotypes.jsx";
import Connections from "../connections/Connections.jsx";

const Main = () => (
  <div className="main">
    <SplitPane
      split="vertical"
      defaultSize={"25%"}
      maxSize={-50}
      className="primary"
    >
      <SplitPane split="horizontal" defaultSize={"35%"} maxSize={-50}>
        <Phenotypes />
        <Connections />
      </SplitPane>
      <SplitPane split="horizontal" defaultSize={"65%"} maxSize={-50}>
        <div>Phenotype Details</div>
        <div>Execution Log</div>
      </SplitPane>
    </SplitPane>
  </div>
);

export default Main;