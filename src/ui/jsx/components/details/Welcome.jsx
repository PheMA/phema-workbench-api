import React from "react";

const Welcome = props => (
  <div className="welcome">
    <span className="welcome__title">
      <h1>Welcome to the PhEMA Phenotype Executer (PhEx)</h1>
    </span>
    <p>
      There are a few things you can do to ge started running a phenotype:
      <ol>
        <li>Add an OHDSI or i2b2 connection</li>
        <li>Add a phentype</li>
      </ol>
    </p>
  </div>
);

export default Welcome;
