import React from "react";

import * as monaco from "monaco-editor";
import uuid from "uuid/v4";

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
    self.MonacoEnvironment = {
      getWorkerUrl: function(moduleId, label) {
        if (label === "json") {
          return "./json.worker.js";
        }
        if (label === "css") {
          return "./css.worker.js";
        }
        if (label === "html") {
          return "./html.worker.js";
        }
        if (label === "typescript" || label === "javascript") {
          return "./ts.worker.js";
        }
        return "./editor.worker.js";
      }
    };

    this.editor = monaco.editor.create(
      document.getElementById(`cqlEditor__container-${this.containerId}`),
      {
        value: "function hello() {\n\talert('Hello world!');\n}",
        language: "javascript"
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
