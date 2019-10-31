import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Toaster, Position, Dialog, Button, Icon } from "@blueprintjs/core";
import Dropzone from "react-dropzone";
// import localForage from "localforage";
import numeral from "numeral";
import moment from "moment";

import ActionHeader from "../common/ActionHeader.jsx";

import { phenotypeListSelector } from "../../../store/phenotypes/selectors";
import { fetchPhenotypeList } from "../../../store/phenotypes/actions";

// localForage.config({
//   driver: localForage.LOCALSTORAGE,
//   name: "phex-local"
// });

const acceptedFiles = [".zip", ".ZIP"];

const PheExToaster = Toaster.create({
  className: "toaster",
  position: Position.TOP
});

const PhenotypeItem = (item, index) => {
  return (
    <div key={index} className="phenotypes__list__item">
      <span className="phenotypes__list__item__name">
        <Icon icon="small-plus" />
        <a href="#">{item.name}</a>
      </span>
      <span className="phenotypes__list__item__size">
        {numeral(item.size).format("0.0 b")}
      </span>
    </div>
  );
};

PhenotypeItem.propTypes = {
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

const DropArea = (getRootProps, getInputProps, isDragActive) => (
  <div
    className={`dropArea${isDragActive ? "--active" : ""}`}
    {...getRootProps()}
  >
    <div className={`dropArea__text${isDragActive ? "--active" : ""}`}>
      Drop phenotypes here or click to select
    </div>
    <div className={`dropArea__icon${isDragActive ? "--active" : ""}`}>
      <Icon icon={isDragActive ? "confirm" : "add"} iconSize={45} />
    </div>
    <input {...getInputProps()} />
  </div>
);

class AddPhenotype extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      queue: []
    };
  }

  queueFiles(files) {
    const queue = this.state.queue.concat(files);
    this.setState({ queue });
  }

  async handleUpload() {
    const files = this.state.queue;

    const transformFiles = files =>
      files.map(file => {
        return {
          modified: file.lastModified,
          name: file.name,
          size: file.size
        };
      });

    let phenotypes = await this.props.localForage.getItem("phenotypes");

    if (phenotypes == null) {
      phenotypes = transformFiles(files);
    } else {
      phenotypes = phenotypes.concat(transformFiles(files));
    }

    this.props.localForage.setItem("phenotypes", phenotypes);

    // clear the queue
    this.setState({
      queue: []
    });

    // close the dialog
    this.props.onCancel();

    // reload from localStorage
    this.props.reloadStorage();
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.queueFiles(acceptedFiles);

    if (rejectedFiles.length) {
      PheExToaster.show({
        icon: "warning-sign",
        intent: "warning",
        message: "Only phenotype ZIP files are allowed."
      });
    }
  }

  render() {
    const { onCancel } = this.props;

    return (
      <div className="addPhenotype">
        <Dropzone onDrop={this.onDrop.bind(this)} accept={acceptedFiles}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return DropArea(getRootProps, getInputProps, isDragActive);
          }}
        </Dropzone>
        <PhenotypeUploadQueue queue={this.state.queue} />
        <div className="addPhenotype__actions">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            intent="primary"
            icon="upload"
            onClick={this.handleUpload.bind(this)}
          >
            Upload
          </Button>
        </div>
      </div>
    );
  }
}

const PhenotypeUploadQueue = props => {
  if (props.queue.length === 0) {
    return null;
  }

  const items = props.queue.map((file, i) => (
    <li key={i}>
      <span className="addPhenotype__selected__phenotypes__name">
        {file.name}
      </span>
      <span className="addPhenotype__selected__phenotypes__size">
        {numeral(file.size).format("0.0 b")}
      </span>
      <span className="addPhenotype__selected__phenotypes__modified">
        Modified {moment(file.lastModified).format("lll")}
      </span>
    </li>
  ));

  return (
    <div className="addPhenotype__selected">
      <h5 className="bp3-heading addPhenotype__selected__title">
        SELECTED FILES
      </h5>
      <div className="addPhenotype__selected__phenotypes">
        <ul className="bp3-list">{items}</ul>
      </div>
    </div>
  );
};

const PhenotypeList = props => {
  const data = _.get(props, "phenotypes", []);

  return (
    <div className="phenotypes__list">
      {data.map((item, index) => PhenotypeItem(item, index))}
    </div>
  );
};

class Phenotypes extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      phenotypes: []
    };
  }

  reloadStorage() {
    // Hack until we have a backend
    this.props.localForage.getItem("phenotypes").then(data => {
      this.setState({
        phenotypes: data
      });
    });
  }

  componentDidMount() {
    this.reloadStorage();

    this.props.fetchPhenotypeList();
  }

  render() {
    return (
      <div className="phenotypes">
        <ActionHeader
          title="Phenotypes"
          addAction={() => {
            this.setState({ modalOpen: true });
          }}
          addText="Add"
        />
        <PhenotypeList phenotypes={this.props.phenotypes} />
        <Dialog
          isOpen={this.state.modalOpen}
          title="UPLOAD PHENOTYPE"
          style={{ width: "800px" }}
          onClose={() => {
            this.setState({ modalOpen: false });
          }}
        >
          <AddPhenotype
            onCancel={() => {
              this.setState({ modalOpen: false });
            }}
            reloadStorage={this.reloadStorage.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  phenotypes: phenotypeListSelector(state)
});

const mapDispatchToProps = {
  fetchPhenotypeList
};

const ConnectedPhenotypes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Phenotypes);

export default ConnectedPhenotypes;
