import React from "react";

import { Navbar, Button, Alignment, HTMLSelect } from "@blueprintjs/core";

const Header = props => {
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
          </HTMLSelect>
        </div>
        <Button minimal={true} rightIcon="play" intent="success" text="Run" />
      </Navbar.Group>
    </Navbar>
  );
};

export default Header;
