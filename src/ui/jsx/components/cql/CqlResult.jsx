import React from "react";
import ReactJson from "react-json-view";

import { NonIdealState } from "@blueprintjs/core";

const CqlResult = props => {
  const { result } = props;

  if (result == undefined) {
    return null;
  }

  if (!result.ok) {
    return (
      <NonIdealState
        icon="error"
        title={`Response code ${result.body.status}`}
        description={result.body.statusText}
      />
    );
  }

  let resultComp;
  if (result.type === "json") {
    resultComp = (
      <ReactJson
        displayObjectSize={false}
        displayDataTypes={false}
        src={result.body}
      />
    );
  } else {
    resultComp = <div>{result.value}</div>;
  }

  return <div className="cqlResults">{resultComp}</div>;
};

export default CqlResult;
