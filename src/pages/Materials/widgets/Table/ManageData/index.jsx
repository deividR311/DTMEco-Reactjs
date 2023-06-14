import React from "react";
import "../__TableMaterial.scss";

export const ManageData = ({ children: [HeaderTable, BodyTable] }) => {
  return (
    <div className="manage-data-container">
      <div className="manage-data--header">{HeaderTable}</div>
      <div className="manage-data--table">{BodyTable}</div>
    </div>
  );
};

ManageData.defaultProps = {
  children: [],
};
