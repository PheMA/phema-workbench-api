import React from "react";
import { Tabs, Tab, Dialog } from "@blueprintjs/core";
import ActionHeader from "../common/ActionHeader.jsx";

const ConnectionPanel = props => {
  return null;
};

class ConnectionContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabId: "i2b2"
    };
  }

  handleTabClick(selectedTabId) {
    this.setState({ selectedTabId });
  }

  render() {
    return (
      <div className="connectionContainer">
        <Tabs
          id="connections"
          selectedTabId={this.state.selectedTabId}
          onChange={this.handleTabClick.bind(this)}
          large
        >
          <Tab id="i2b2" title="i2b2" panel={<ConnectionPanel />} />
          <Tab id="omop" title="OMOP" panel={<ConnectionPanel />} />
          <Tab id="fhir" disabled title="FHIR" panel={<ConnectionPanel />} />
        </Tabs>
      </div>
    );
  }
}

class Connections extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  render() {
    return (
      <div className="connections">
        <ActionHeader
          title="Data Connections"
          addAction={() => {
            this.setState({ modalOpen: true });
          }}
          addText="Add"
        />
        <ConnectionContainer />
        <Dialog
          isOpen={this.state.modalOpen}
          title="ADD DATA CONNECTION"
          style={{ width: "800px" }}
          onClose={() => {
            this.setState({ modalOpen: false });
          }}
        >
          Add connection
        </Dialog>
      </div>
    );
  }
}

export default Connections;
