import React, { Fragment } from "react";
import { Sidebar } from "../component/Sidebar";

export const Layout = ({ children }) => (
  <Fragment>
    <div className="b-layout">
      <div className="b-layout__sidebar">
        <Sidebar/>
      </div>
      <div className="b-layout__content">
        {children}
      </div>
    </div>
  </Fragment>
);
