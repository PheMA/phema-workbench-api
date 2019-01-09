import React from "react";

const data = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six"
];

const PhenoTypeItem = item => (
  <div className="phenotypes__list__item">{item}</div>
);

const PhenoTypes = () => (
  <div className="phenotypes">
    <h1>Phenotypes</h1>
    <div className="phenotypes__list">
      {data.map(item => PhenoTypeItem(item))}
    </div>
  </div>
);

export default PhenoTypes;
