import React, { useState } from "react";

import {
  Classes,
  Tooltip,
  Button,
  ControlGroup,
  Intent,
  FormGroup,
  InputGroup
} from "@blueprintjs/core";

import uuid from "uuid/v4";

const otherProperty = (prop, index, removeProp, cqlConfig, setCqlConfig) => {
  return (
    <div className="cqlProperty">
      <FormGroup label="Name" labelInfo="(required)">
        <InputGroup
          id={`${prop.id}-name`}
          placeholder="Property name"
          value={prop.name}
          onChange={e => {
            const thisProp = cqlConfig.otherProps.find(p => p.id === prop.id);
            thisProp.name = e.target.value;
            setCqlConfig(Object.assign({}, cqlConfig));
          }}
        />
      </FormGroup>
      <FormGroup label="Value" labelInfo="(required)">
        <InputGroup id={`${prop.id}-value`} placeholder="Property value" />
      </FormGroup>
      <div className="cqlProperty__button">
        <Button minimal={true} icon="cross" onClick={() => removeProp(index)} />
      </div>
    </div>
  );
};

const AddCqlConnection = props => {
  const [cqlConfig, setCqlConfig] = useState({
    url: "",
    codeProperty: "code",
    otherProps: []
  });

  console.log(cqlConfig);

  return (
    <React.Fragment>
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          helperText="The URL to send the CQL evaluation request"
          label="CQL Evaluation Server"
          labelFor="cql-evaluate-url"
          labelInfo="(required)"
        >
          <InputGroup
            id="cql-evaluate-url"
            placeholder="http://cql.dataphoria.org/cql/evaluate"
            value={cqlConfig.url}
            onChange={event => {
              setCqlConfig(
                Object.assign({}, cqlConfig, { url: event.target.value })
              );
            }}
          />
        </FormGroup>

        <FormGroup
          helperText="The JSON property containing the CQL source"
          label="Code Property"
          labelFor="cql-code-property"
          labelInfo="(required)"
        >
          <InputGroup
            id="cql-code-property"
            value="code"
            onChange={event => {
              setCqlConfig(
                Object.assign({}, cqlConfig, {
                  codeProperty: event.target.value
                })
              );
            }}
          />
        </FormGroup>

        <FormGroup
          helperText="Other fields to include in the JSON payload"
          label="Other Properties"
          labelInfo="(optional)"
        >
          {cqlConfig.otherProps.map((prop, index) =>
            otherProperty(
              prop,
              index,
              idx => {
                cqlConfig.otherProps.splice(idx, 1);
                setCqlConfig(Object.assign({}, cqlConfig));
              },
              cqlConfig,
              setCqlConfig
            )
          )}
          <Button
            intent={Intent.PRIMARY}
            minimal={true}
            icon="plus"
            onClick={() => {
              cqlConfig.otherProps.push({ id: uuid(), name: "", value: "" });
              setCqlConfig(Object.assign({}, cqlConfig));
            }}
          >
            Add
          </Button>
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Tooltip content="This button is hooked up to close the dialog.">
            <Button onClick={() => {}}>Close</Button>
          </Tooltip>
          <Button
            disabled={!(cqlConfig.url && cqlConfig.codeProperty)}
            icon="floppy-disk"
            intent={Intent.PRIMARY}
          >
            Save
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddCqlConnection;
