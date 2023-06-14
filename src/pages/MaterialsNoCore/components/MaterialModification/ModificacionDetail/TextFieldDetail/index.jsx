import React from "react";

export const TextFieldDetail = ({
  label,
  value,
  modified = false,
  showCharacters = false,
  type = "header" || "section",
  typeField = "text",
  max = 500,
}) => {
  return (
    <div className="TextFieldDetail">
      <label className={`LabelTextField-${type}`}>{label}</label>
      <div
        className={`inputTextField ${
          modified ? "inputTextField-modified" : ""
        } ${typeField}`}
      >
        {value}
      </div>
      <div className="footerTextField">
        <span className="modifiedData"> {modified && "Dato modificado"}</span>

        <span className="characters">
          {showCharacters && `Caracteres: ${value.length} (max. ${max})`}
        </span>
      </div>
    </div>
  );
};
