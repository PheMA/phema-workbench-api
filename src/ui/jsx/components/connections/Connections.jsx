import React, { useState, useEffect } from "react";
import { Tabs, Tab, Dialog } from "@blueprintjs/core";
import ActionHeader from "../common/ActionHeader.jsx";
import uuid from "uuid/v4";

import { AddCqlConnection, CqlConnectionList } from "./cql";

const defaultCQLConnections = () => {
  return [
    {
      name: "PhEMA ELM Translator",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/v1/elm`,
      codeProperty: "code",
      otherProps: []
    },
    {
      name: "PhEMA OMOP Cohort Definition Translator",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/v1/omop/cohortdefinition`,
      codeProperty: "code",
      otherProps: [
        {
          id: uuid(),
          name: "omopServerUrl",
          value: "http://omop.phema.science/WebAPI/"
        },
        {
          id: uuid(),
          name: "name",
          value: "In Initial Population"
        },
        {
          id: uuid(),
          name: "source",
          value: "OHDSI-CDMV5"
        }
      ]
    }
  ];
};

const emptyConfig = () => {
  return {
    i2b2: [],
    omop: [],
    cql: defaultCQLConnections(),
    fhir: []
  };
};

const ConnectionPanel = props => {
  return null;
};

const ConnectionContainer = props => {
  const { selectedTab, setSelectedTab, connections } = props;

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
        <Tab
          id="cql"
          title="CQL"
          panel={<CqlConnectionList connections={connections.cql} />}
        />
        <Tab id="fhir" disabled title="FHIR" panel={<ConnectionPanel />} />
      </Tabs>
    </div>
  );
};

const renderAddComponent = (selectedTab, setModalOpen, saveConfig) => {
  switch (selectedTab) {
    case "cql":
      return (
        <AddCqlConnection setModalOpen={setModalOpen} saveConfig={saveConfig} />
      );
    default:
      return null;
  }
};

const saveConfig = (localForage, setConnections, setGlobalConnections) => (
  type,
  config
) => {
  localForage.getItem("connections").then(connections => {
    let newConnections = connections ? connections : emptyConfig();

    newConnections[type].push(config);

    localForage.setItem("connections", newConnections).then(() => {
      setConnections(newConnections);

      // Set the connections in the main window
      setGlobalConnections(newConnections);
    });
  });
};

const Connections = props => {
  const { localForage } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState("cql");

  const [connections, setConnections] = useState(emptyConfig());

  useEffect(() => {
    localForage.getItem("connections").then(connections => {
      const newConnections = connections ? connections : emptyConfig();
      setConnections(newConnections);

      // Set the connections in the main window
      props.setConnections(newConnections);
    });
  }, []);

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
        connections={connections}
      />
      <Dialog
        isOpen={modalOpen}
        title={`ADD ${selectedTab.toUpperCase()} CONNECTION`}
        style={{ width: "800px" }}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        {renderAddComponent(
          selectedTab,
          setModalOpen,
          saveConfig(localForage, setConnections, props.setConnections)
        )}
      </Dialog>
    </div>
  );
};

export default Connections;
