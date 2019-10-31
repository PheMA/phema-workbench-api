import * as React from "react";

import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

const PhemaMenu = props => {
  const { addCqlScript } = props;

  return (
    <Menu>
      <MenuItem icon="play" text="New CQL Script" onClick={addCqlScript} />
      <MenuItem icon="draw" text="Author Phenotype" disabled={true} />
      <MenuItem icon="cog" text="Settings" disabled={true} />
      <MenuDivider />
      <MenuItem
        target="_blank"
        href="https://projectphema.org/"
        icon="info-sign"
        text="About"
      />
    </Menu>
  );
};

export default PhemaMenu;
