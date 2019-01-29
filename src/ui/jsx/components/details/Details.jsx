import React from "react";
import { Tabs, Tab, Dialog } from "@blueprintjs/core";
import Welcome from "./Welcome";

class Details extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabId: "welcome"
    };
  }

  handleTabClick(selectedTabId) {
    this.setState({ selectedTabId });
  }

  render() {
    return (
      <div className="detailsContainer">
        <Tabs
          id="details"
          selectedTabId={this.state.selectedTabId}
          onChange={this.handleTabClick.bind(this)}
          large
        >
          <Tab id="welcome" title="Welcome" panel={<Welcome />} />
        </Tabs>
      </div>
    );
  }
}

export default Details;
