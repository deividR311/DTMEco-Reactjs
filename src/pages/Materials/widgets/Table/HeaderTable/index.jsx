import React, { useState } from "react";
import { Button } from "@material-ui/core";

export const HeaderTable = (props) => {
  return (
    <div className="containerHeader">
      {props.hasData ? props.children : props.Filtered && props.children}
      <div className="containerHeader__Buttons">
        {props.showBtn && (
          <Button
            color="primary"
            variant="contained"
            className="ButtonAccept"
            onClick={props.handleOnClick}
          >
            {props.labelButton}
          </Button>
        )}
      </div>
    </div>
  );
};

HeaderTable.defaultProps = {
  showBtn: true,
};
