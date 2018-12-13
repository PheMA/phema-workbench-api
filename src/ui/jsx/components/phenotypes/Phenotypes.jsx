import React from "react";

import { List } from "antd";

const data = [ "one", "two", "three", "four", "five", "six", "one", "two", "three", "four", "five", "six" ];

const PhenoTypes = () => (
    <div className="phenotypes">
        <h1>Phenotypes</h1>
        <div className="phenotypes__list">
            <List
                dataSource={data}
                renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        </div>
    </div>
);

export default PhenoTypes;
