import React from "react";
import ActionHeader from "../common/ActionHeader.jsx";

const logLines = [
  "2019-01-29T03:50:42+00:00 PhEMA Executer v0.1.1 starting",
  "2019-01-29T03:51:16+00:00 Loading the configuration settings for this phenotype",
  "2019-01-29T03:51:28+00:00 Configuration settings have been loaded",
  "2019-01-29T03:51:39+00:00 Finding phenotype logic file path",
  "2019-01-29T03:51:52+00:00 Using CQL ELM file located at BPH-eMERGE.xml",
  "2019-01-29T03:51:59+00:00 Found CQL ELM file path",
  "2019-01-29T03:52:11+00:00 Parsing the CQL ELM document",
  "2019-01-29T03:52:25+00:00 The CQL ELM document has been parsed and is ready to process",
  "2019-01-29T03:52:32+00:00 Loading the specific OHDSI configuration information",
  "2019-01-29T03:52:40+00:00 OHDSI configuration details have been loaded",
  "2019-01-29T03:52:47+00:00 Establishing concept sets in OHDSI",
  "2019-01-29T03:52:57+00:00 Created 10 new concept sets in OHDSI"
];

class ExecutionLog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      logLines
    };
  }

  render() {
    const lines = this.state.logLines.map((l, i) => (
      <div className="log__content__line" key={i}>
        {l}
      </div>
    ));

    return (
      <div className="log">
        <ActionHeader title="Execution Log" />
        <div className="log__content">{lines}</div>
      </div>
    );
  }
}

export default ExecutionLog;
