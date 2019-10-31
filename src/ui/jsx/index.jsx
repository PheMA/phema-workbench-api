import "babel-polyfill";
import localForage from "localforage";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/configureStore";
import App from "./containers/app/App.jsx";

localForage.config({
  driver: localForage.LOCALSTORAGE,
  name: "phex-local"
});

class PhEx extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App localForage={localForage} />
      </Provider>
    );
  }
}

export default PhEx;
