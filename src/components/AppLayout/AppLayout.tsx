import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export class AppLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
  }
}

export default AppLayout;
