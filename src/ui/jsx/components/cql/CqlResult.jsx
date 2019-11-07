import React from "react";
import ReactJson from "react-json-view";

import { NonIdealState } from "@blueprintjs/core";

const CqlResult = props => {
  const { result } = props;

  if (result == undefined) {
    return null;
  }

  let resultComp;

  if (result.type === "json") {
    resultComp = (
      <ReactJson
        displayObjectSize={false}
        displayDataTypes={false}
        src={result.value}
      />
    );
  } else if (result.type === "error") {
    resultComp = (
      <NonIdealState
        icon="error"
        title={`Response code ${result.status}`}
        description={result.text}
      />
    );
  } else {
    resultComp = <div>result.value</div>;
  }

  return <div className="cqlResults">{resultComp}</div>;
};

export default CqlResult;
