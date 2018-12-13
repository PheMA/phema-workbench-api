import React from "react";
import {Button} from 'antd';

const PanelHeader = (props) => (
    <div className={"panelHeader"}>
        <div className={"panelHeader__title"}>{props.title}</div>
        <div className={"panelHeader__actions"}>
            <div className={"panelHeader__actions__add"}/>
            <Button onClick={props.onButtonClick}>{props.buttonText || "Add"}</Button>
        </div>
    </div>
    < /div>
);

export default PanelHeader;