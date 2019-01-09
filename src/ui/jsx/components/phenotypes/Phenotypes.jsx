import React from "react";
import PropTypes from "prop-types";
import { Toaster, Position, Dialog, Button, Icon } from "@blueprintjs/core";
import Dropzone from "react-dropzone";
import ActionHeader from "../common/ActionHeader.jsx";

const acceptedFiles = [".zip", ".ZIP"];

const data = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six"
];

const PheExToaster = Toaster.create({
  className: "toaster",
  position: Position.TOP
});

const PhenotypeItem = (item, index) => (
  <div key={index} className="phenotypes__list__item">
    {item}
  </div>
);

PhenotypeItem.propTypes = {
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

const handleUpload = () => {
  console.log("uploading...");
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
      selectedPhenotopes: []
    };
  }

  addFiles(files) {
    const newSelected = this.state.selectedPhenotopes.concat(files);

    this.setState({
      selectedPhenotopes: newSelected
    });
  }

  removeFile(file) {}

  onDrop(acceptedFiles, rejectedFiles) {
    // this.addFiles(acceptedFiles);
    console.log(acceptedFiles);

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
        <Dropzone onDrop={this.onDrop} accept={acceptedFiles}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return DropArea(getRootProps, getInputProps, isDragActive);
          }}
        </Dropzone>
        <div className="selectedPhenotypes" />
        <div className="addPhenotype__actions">
          <Button onClick={onCancel}>Cancel</Button>
          <Button intent="primary" icon="upload" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    );
  }
}

class Phenotypes extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
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
        <div className="phenotypes__list">
          {data.map((item, index) => PhenotypeItem(item, index))}
        </div>
        <Dialog
          isOpen={this.state.modalOpen}
          title="UPLOAD PHENOTYPE"
          onClose={() => {
            this.setState({ modalOpen: false });
          }}
        >
          <AddPhenotype
            onCancel={() => {
              this.setState({ modalOpen: false });
            }}
          />
        </Dialog>
      </div>
    );
  }
}

export default Phenotypes;
