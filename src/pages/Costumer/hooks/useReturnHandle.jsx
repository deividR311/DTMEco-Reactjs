import React from "react";

export const useReturnHandle = (
  item,
  handleRutChange,
  handleCameraChange,
  handleDocumentChange,
  handleWashChange
) => {

  const returnHandle = () => {
    switch (item.id) {
      case 1:
        return handleRutChange;

      case 3:
        return handleCameraChange;

      case 5:
        return handleDocumentChange;

      case 6:
        return handleWashChange;

      default:
        return handleRutChange;
    }
  };

  return [returnHandle];
};
