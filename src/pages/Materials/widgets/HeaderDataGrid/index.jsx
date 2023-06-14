import React from "react";
import { Button } from "@material-ui/core";
import { SplitButton } from "../../widgets/SplitButton/index";

const Core = ({ role, labelButton, handleOnClick, optionsSolicitud }) => {
  let _return = "boton"
  let _aux = [0, ""]
  for (const rol of role) {
    if(([40]).includes(rol.id)) { _aux[0] = 1; _aux[1] = (rol.name).split(' ')[1] }
    if(([42]).includes(rol.id)) { 
      if(_aux[0]===1) { _aux[0] = 3 } else { _aux[0] = 2; _aux[1] = (rol.name).split(' ')[1] }
    }
  }
  if (_aux[0]===3) {
    _return = (
      <SplitButton
        color="primary"
        labelButton={labelButton}
        buttonStyle="ButtonAccept"
        handleClick={handleOnClick}
        optionsSolicitud={optionsSolicitud}
      />
    )
  } else if (_aux[0]===1 || _aux[0]===2) {
    _return = (
      <Button
        color="primary"
        name={`Nuevo ${_aux[1]}`}
        variant="contained"
        className="ButtonAccept"
        onClick={()=>handleOnClick(_aux[0])}
      >{`Nuevo ${_aux[1]}`}</Button>
    )
  }
  return _return
}

export const HeaderDataGrid = (props) => {
  return (
    <>
      <div className="manage-data-container">
        <div className="manage-data--header">
          <div className="containerHeader">
            {props.showFilters
              ? props.children
              : props.isFiltered && props.children}
            <div className="containerHeader__Buttons" style={{zIndex:"50"}}>
              {props.showBtn && (
                props.pwd==="CORE" 
                ? <Core role={props.role} labelButton={props.labelButton} handleOnClick={props.handleOnClick} optionsSolicitud={props.optionsButtons} />
                : <Button
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
        </div>
      </div>
    </>
  );
};
