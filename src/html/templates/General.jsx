import React from "react";
import Sidebar from "html/chunks/Sidebar/";
import Header from "html/chunks/Header/";

function GeneralHtml(props) {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <main className="main"></main>
    </div>
  );
}

export default GeneralHtml;
