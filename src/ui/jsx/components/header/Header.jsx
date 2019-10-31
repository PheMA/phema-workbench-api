import React from "react";
import { Button, Popover } from "@blueprintjs/core";

import Menu from "./Menu";

const PhExHeader = props => {
  const { addCqlScript } = props;

  return (
    <div className="header">
      <div className="header__logo" />
      <span className="header__text">PHENOTYPE EXECUTOR</span>
      <div className="header__group__right">
        <Popover content={<Menu addCqlScript={addCqlScript} />}>
          <Button minimal icon="menu" rightIcon="caret-down" text="Menu" />
        </Popover>
      </div>
    </div>
  );
};

export default PhExHeader;
