import React, { useState } from "react";
import { Tabs, Tab, Dialog } from "@blueprintjs/core";
import ActionHeader from "../common/ActionHeader.jsx";

import AddCqlConnection from "./AddCqlConnection";

const ConnectionPanel = props => {
  return null;
};

const ConnectionContainer = props => {
  const { selectedTab, setSelectedTab } = props;

  return (
    <div className="connectionContainer">
      <Tabs
        id="connections"
        selectedTabId={selectedTab}
        onChange={setSelectedTab}
        large
      >
        <Tab id="i2b2" title="i2b2" panel={<ConnectionPanel />} />
        <Tab id="omop" title="OMOP" panel={<ConnectionPanel />} />
        <Tab id="cql" title="CQL" panel={<ConnectionPanel />} />
        <Tab id="fhir" disabled title="FHIR" panel={<ConnectionPanel />} />
      </Tabs>
    </div>
  );
};

const renderAddComponent = selectedTab => {
  switch (selectedTab) {
    case "cql":
      return <AddCqlConnection />;
    default:
      return null;
  }
};

const Connections = props => {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState("cql");

  return (
    <div className="connections">
      <ActionHeader
        title="Remote Connections"
        addAction={() => {
          setModalOpen(true);
        }}
        addText="Add"
      />
      <ConnectionContainer
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Dialog
        isOpen={modalOpen}
        title={`ADD ${selectedTab.toUpperCase()} CONNECTION`}
        style={{ width: "800px" }}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        {renderAddComponent(selectedTab)}
      </Dialog>
    </div>
  );
};

export default Connections;
