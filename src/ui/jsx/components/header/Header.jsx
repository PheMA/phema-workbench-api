import React from "react";
import {Layout} from "antd";

const {Header} = Layout;

const PhExHeader = () => (
    <div className="header">
        <Header>
            <div className="header__logo"/>
            <span className="header__text">I HOPE THIS WORKS</span>
        </Header>
    </div>
);

export default PhExHeader;