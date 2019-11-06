import React from "react";

import * as monaco from "monaco-editor";
import uuid from "uuid/v4";

import * as CqlMonarch from "./monarch-cql";

class CqlEditor extends React.Component {
  componentDidMount() {
    this.initMonaco();

    document.getElementById("phexMain").addEventListener("phex-resized", () => {
      this.editor.layout();
    });
  }

  componentDidUpdate(prevProps) {
    this.editor.layout();
  }

  initMonaco() {
    monaco.languages.register({ id: "cql" });

    monaco.languages.setMonarchTokensProvider("cql", CqlMonarch);

    self.MonacoEnvironment = {
      getWorkerUrl: function(moduleId, label) {
        return "./editor.worker.js";
      }
    };

    this.editor = monaco.editor.create(
      document.getElementById(`cqlEditor__container-${this.containerId}`),
      {
        value:
          "library \"phema-demo\" version '0.0.1'\n\ndefine test:\n  1 + 1",
        language: "cql"
      }
    );
  }

  render() {
    const { scriptId } = this.props;

    if (!this.containerId) {
      this.containerId = scriptId ? scriptId : uuid();
    }

    return (
      <div className="cqlEditor">
        <div
          id={`cqlEditor__container-${this.containerId}`}
          className="cqlEditor__editor"
        />
      </div>
    );
  }
}

export default CqlEditor;
