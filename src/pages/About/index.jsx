import React from "react";
const { version } = require("../../../package.json");

export const About = () => {
  return (
    <p
      style={{
        margin: "15px",
        fontSize: "15px",
      }}
    >{`Versión del proyecto: v${version}`}</p>
  );
};
