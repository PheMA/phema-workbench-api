import React from "react";
import SplitPane from "react-split-pane";
import Phenotypes from "../phenotypes/Phenotypes.jsx";
import Connections from "../connections/Connections.jsx";
import Details from "../details/Details.jsx";
import ExecutionLog from "../log/ExecutionLog";

const resized = () => {
  document.getElementById("phexMain").dispatchEvent(new Event("phex-resized"));
};

const Main = props => {
  const { localForage, cqlScripts } = props;

  return (
    <div id="phexMain" className="main">
      <SplitPane
        split="vertical"
        defaultSize={"25%"}
        maxSize={-50}
        className="primary"
        onDragFinished={resized}
      >
        <SplitPane
          split="horizontal"
          defaultSize={"35%"}
          maxSize={-50}
          onDragFinished={resized}
        >
          <Phenotypes localForage={localForage} />
          <Connections localForage={localForage} />
        </SplitPane>
        <SplitPane
          split="horizontal"
          defaultSize={"65%"}
          maxSize={-50}
          onDragFinished={resized}
        >
          <Details cqlScripts={cqlScripts} />
          <ExecutionLog />
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default Main;
