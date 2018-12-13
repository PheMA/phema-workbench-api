import React from "react";
import SplitPane from 'react-split-pane';

import Phenotypes from "../phenotypes/Phenotypes";

const Main = () => (
    <div className="main">
        <SplitPane
            split="vertical"
            defaultSize={"30%"}
            maxSize={-50}
            className="primary"
        >
            <SplitPane split="horizontal" defaultSize={"50%"} maxSize={-50}>
                <div>
                    <Phenotypes/>
                </div>
                <div>
                    asdaSD
                </div>
            </SplitPane>
            <div>min: 50px, max: 300px</div>
        </SplitPane>
    </div>
);

export default Main;
