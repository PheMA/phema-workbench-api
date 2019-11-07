import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Icon,
  ContextMenuTarget,
  Menu,
  MenuItem
} from "@blueprintjs/core";

import Welcome from "./Welcome";
import { CqlWindow } from "../cql";

const ContextMenuCqlHeader = ContextMenuTarget(
  class CqlTabHeader extends React.Component {
    renderContextMenu() {
      // return a single element, or nothing to use default browser behavior
      return (
        <Menu>
          <MenuItem icon="download" onClick={this.handleSave} text="Download" />
          <MenuItem icon="trash" onClick={this.handleDelete} text="Delete" />
        </Menu>
      );
    }

    render() {
      return (
        <div className="details__cqlTabHeader">
          <Icon icon="document" /> CQL Script
        </div>
      );
    }
  }
);

const renderCqlTabs = (tabs, resized, connections, saveLibrary) => {
  return tabs.map((tab, index) => (
    <Tab
      key={tab.id}
      id={tab.id}
      title={<ContextMenuCqlHeader />}
      panel={
        <CqlWindow
          scriptId={tab.id}
          resized={resized}
          library={tab.library}
          connections={connections}
          saveLibrary={saveLibrary}
        />
      }
    />
  ));
};

const Details = props => {
  // console.log("Details", props);

  const { cqlScripts, selectedTab, resized, connections, saveLibrary } = props;

  const [selectedTabId, setSelectedTabId] = useState("welcome");

  useEffect(() => {
    setSelectedTabId(selectedTab);
  }, [selectedTab]);

  const title = (
    <div className="details__welcome">
      <Icon icon="info-sign" /> Welcome
    </div>
  );

  return (
    <div className="detailsContainer">
      <Tabs
        id="details"
        selectedTabId={selectedTabId}
        onChange={setSelectedTabId}
        large
      >
        <Tab key="welcome" id="welcome" title={title} panel={<Welcome />} />
        {renderCqlTabs(cqlScripts, resized, connections, saveLibrary)}
      </Tabs>
    </div>
  );
};

export default Details;
