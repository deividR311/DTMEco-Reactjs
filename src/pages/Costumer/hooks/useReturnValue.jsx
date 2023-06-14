import React from "react";

export const useReturnValue = (
  item,
  rut,
  camera,
  document,
  wash
) => {

  const returnValue = () => {
    switch (item.id) {
      case 1:
        return rut;

      case 3:
        return camera;

      case 5:
        return document;

      case 6:
        return wash;

      default:
        return rut;
    }
  };

  return [returnValue];
};