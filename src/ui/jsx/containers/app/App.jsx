import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";

import { Header, Main, Footer } from "../../components";

const addCqlScript = (localForage, setCqlScripts, setSelectedTab) => () => {
  localForage.getItem("cqlScripts").then(cqlScripts => {
    if (cqlScripts === null) {
      cqlScripts = [];
    }

    const tabId = uuid();

    setSelectedTab(tabId);

    cqlScripts.push({ id: tabId, library: "" });

    localForage.setItem("cqlScripts", cqlScripts).then(() => {
      setCqlScripts(cqlScripts);
    });
  });
};

const App = props => {
  const { localForage } = props;

  const [cqlScripts, setCqlScripts] = useState([]);

  useEffect(() => {
    localForage.getItem("cqlScripts").then(tabs => {
      setCqlScripts(tabs ? tabs : []);
    });
  }, []);

  const [selectedTab, setSelectedTab] = useState(undefined);

  return (
    <div className="app">
      <Header
        localForage={localForage}
        addCqlScript={addCqlScript(localForage, setCqlScripts, setSelectedTab)}
      />
      <Main
        localForage={localForage}
        cqlScripts={cqlScripts}
        selectedTab={selectedTab}
      />
      <Footer />
    </div>
  );
};

export default App;
