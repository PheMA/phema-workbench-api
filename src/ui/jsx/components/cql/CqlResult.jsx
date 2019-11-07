import React from "react";
import ReactJson from "react-json-view";

const CqlResult = props => {
  const { result } = props;

  if (result == undefined) {
    return null;
  }

  let resultComp;

  if (result.type == "json") {
    resultComp = (
      <ReactJson
        displayObjectSize={false}
        displayDataTypes={false}
        src={result.value}
      />
    );
  } else {
    resultComp = <div>result.value</div>;
  }

  return <div className="cqlResults">{resultComp}</div>;
};

export default CqlResult;
