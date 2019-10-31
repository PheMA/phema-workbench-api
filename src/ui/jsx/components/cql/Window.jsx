import React from "react";

import { CqlEditor } from "./cql-editor";
import { Header } from "./";

const CqlWindow = props => {
  const { scriptId } = props;

  return (
    <div className="cqlWindow__wrapper">
      <Header />
      <CqlEditor scriptId={scriptId} />
    </div>
  );
};

export default CqlWindow;
