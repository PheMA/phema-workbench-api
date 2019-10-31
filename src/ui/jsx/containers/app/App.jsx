import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";

import { Header, Main, Footer } from "../../components";

const addCqlScript = (localForage, setCqlScripts) => () => {
  localForage.getItem("cqlScripts").then(cqlScripts => {
    if (cqlScripts === null) {
      cqlScripts = [];
    }

    console.log(uuid());

    cqlScripts.push({ id: uuid(), library: "" });

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

  return (
    <div className="app">
      <Header
        localForage={localForage}
        addCqlScript={addCqlScript(localForage, setCqlScripts)}
      />
      <Main localForage={localForage} cqlScripts={cqlScripts} />
      <Footer />
    </div>
  );
};

export default App;
