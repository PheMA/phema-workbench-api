import React, { useState } from "react";
import SplitPane from "react-split-pane";

import PhEx from "../../../api/phex";
import { CqlEditor } from "./cql-editor";
import { Header, CqlResult } from "./";

const execute = (setResult, connections, library) => connectionId => {
  const connection = connections.cql.find(conn => conn.id == connectionId);

  const phexApi = new PhEx();

  const body = {};

  body[connection.codeProperty] = library;

  // TODO: add extra fields

  phexApi
    .run(connection.url, body, { "Content-Type": "application/json" })
    .then(result => {
      if (result.status) {
        // FIXME: this is not robust
        setResult({
          type: "error",
          status: result.status,
          text: result.text
        });
      } else {
        setResult({
          type: "json",
          value: result
        });
      }
    })
    .catch(e => {
      console.log("Error", e);
    });
};

const CqlWindow = props => {
  //console.log("Window", props);

  const { scriptId, resized, connections, saveLibrary, library } = props;

  const [result, setResult] = useState(undefined);

  const width = result ? "50%" : "100%";

  return (
    <div className="cqlWindow__wrapper">
      <Header
        connections={connections}
        execute={execute(setResult, connections, library)}
      />
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
          <CqlResult result={result} />
        </SplitPane>
      </div>
    </div>
  );
};

export default CqlWindow;
