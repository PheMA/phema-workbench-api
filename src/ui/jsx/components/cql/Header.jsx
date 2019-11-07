import React from "react";

import { Navbar, Button, Alignment, HTMLSelect } from "@blueprintjs/core";

const Header = props => {
  const { connections, execute } = props;

  const options = connections.cql.map(conn => {
    const name = conn.name ? conn.name : conn.url;

    return (
      <option key={conn.id} value={conn.id}>
        {name}
      </option>
    );
  });

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <span className="cqlWindow__header__title">CQL EDITOR</span>
        </Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="download" text="Download" />
        <Button className="bp3-minimal" icon="trash" text="Delete" />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <div className="cqlWindow__header__runner">
          <HTMLSelect className="bp3-minimal">
            <option>Select backend...</option>
            {options}
          </HTMLSelect>
        </div>
        <Button
          minimal={true}
          rightIcon="play"
          intent="success"
          text="Run"
          onClick={() => {}}
        />
      </Navbar.Group>
    </Navbar>
  );
};

export default Header;
