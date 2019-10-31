import React from "react";
import SplitPane from "react-split-pane";
import Phenotypes from "../phenotypes/Phenotypes.jsx";
import Connections from "../connections/Connections.jsx";
import Details from "../details/Details.jsx";
import ExecutionLog from "../log/ExecutionLog";

const Main = props => {
  const { localForage, cqlScripts } = props;

  console.log("Rendering main");

  return (
    <div className="main">
      <SplitPane
        split="vertical"
        defaultSize={"25%"}
        maxSize={-50}
        className="primary"
      >
        <SplitPane split="horizontal" defaultSize={"35%"} maxSize={-50}>
          <Phenotypes localForage={localForage} />
          <Connections />
        </SplitPane>
        <SplitPane split="horizontal" defaultSize={"65%"} maxSize={-50}>
          <Details cqlScripts={cqlScripts} />
          <ExecutionLog />
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default Main;
