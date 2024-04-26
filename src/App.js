import React, { Component } from "react";
import { StatusBar } from "react-native";
import ToastifyReactNative from "toastify-react-native";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./navigations/Navigation";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
        <Navigation />
        <ToastifyReactNative />
      </Provider>
    );
  }
}

export default App;
