import React from "react";
import { ListMaterial } from "./components";
import "./_materials.scss";

const Materials = ({flow}) => {
  return (
    <div>
      <ListMaterial flow={flow} />
    </div>
  );
};

export default Materials;
