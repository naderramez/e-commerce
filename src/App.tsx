import React, { Component } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient/client";

import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import store from "./redux/store";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
