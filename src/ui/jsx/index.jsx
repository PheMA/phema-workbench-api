import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/configureStore";
import App from "./containers/app/App.jsx";

class PhEx extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default PhEx;
