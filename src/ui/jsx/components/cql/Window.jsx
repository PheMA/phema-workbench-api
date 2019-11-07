import React, { useState } from "react";
import SplitPane from "react-split-pane";

import PhEx from "../../../api/phex";
import { CqlEditor } from "./cql-editor";
import { Header, CqlResults } from "./";

const execute = setResults => (library, backend) => {};

const CqlWindow = props => {
  const { scriptId, resized, connections, saveLibrary, library } = props;

  const [results, setResults] = useState({
    type: "json",
    value: "{ 'test': 123}"
  });

  const width = results ? "50%" : "100%";

  return (
    <div className="cqlWindow__wrapper">
      <Header connections={connections} execute={execute(setResults)} />
      <div className="cqlWindow__wrapper__pane">
        <SplitPane
          split="vertical"
          defaultSize={width}
          className="cqlWindow__splitpane"
          onDragFinished={resized}
        >
          <CqlEditor
            scriptId={scriptId}
            saveLibrary={saveLibrary}
            library={library}
          />
          <CqlResults results={results} />
        </SplitPane>
      </div>
    </div>
  );
};

export default CqlWindow;
