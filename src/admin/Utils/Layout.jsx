import React from "react";
import Sidebar from "./Sidebar"
import "./common.css"

const Layout = ({childern}) => {
  return <div className="dashboard-admin">
    <Sidebar/>
    <div className="content">{childern}</div>
    </div>;
};

export default Layout;
