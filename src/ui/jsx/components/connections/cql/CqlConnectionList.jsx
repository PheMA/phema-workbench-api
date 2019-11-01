import React from "react";

import {
  Icon,
  HTMLTable,
  Popover,
  PopoverInteractionKind
} from "@blueprintjs/core";

const CqlConnectionSummary = props => {
  const { connection } = props;

  const propertyRows = connection.otherProps.map((prop, index) => (
    <tr key={`${prop.name}-${index}`}>
      <td>{prop.name}</td>
      <td>{prop.value}</td>
    </tr>
  ));

  return (
    <div className="cqlConnectionSummary">
      <HTMLTable>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Server URL</td>
            <td>{connection.url}</td>
          </tr>
          <tr>
            <td>Code property</td>
            <td>{connection.codeProperty}</td>
          </tr>
          {propertyRows}
        </tbody>
      </HTMLTable>
    </div>
  );
};

const CqlConnectionListItem = props => {
  const { connection, index } = props;

  const displayName = connection.name || connection.url;

  return (
    <div key={connection.id} className="cqlConnectionList__item">
      <span className="cqlConnectionList__item__name">
        <Icon icon="database" />
        <Popover
          interactionKind={PopoverInteractionKind.HOVER}
          content={<CqlConnectionSummary connection={connection} />}
        >
          <a href="#">{displayName}</a>
        </Popover>
      </span>
      <span className="cqlConnectionList__item__url">{connection.url}</span>
    </div>
  );
};

const CqlConnectionList = props => {
  const { connections } = props;

  return connections.map((connection, index) => (
    <div key={connection.id} className="cqlConnectionList">
      <CqlConnectionListItem
        key={connection.id}
        connection={connection}
        index={index}
      />
    </div>
  ));
};

export default CqlConnectionList;
