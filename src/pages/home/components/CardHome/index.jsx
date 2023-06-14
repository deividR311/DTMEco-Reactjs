import * as React from "react";
import { NavLink } from "react-router-dom";

export const CardHome = ({ items }) => {
  return (
    <>
      {items.map((element, index) => (
        <div className="cardHome" index={index} key={index}>
          <h6>{element.module}</h6>
          <div className="subMod">
            <ul id={element.module}>
              {element.subModules.map(
                (item, i) =>
                  item.visible && (
                    <li key={i}>
                      <NavLink exact to={item.path}>
                        { item.subModule==="Materiales CORE"
                          ? "Gestión de solicitudes" 
                          : item.subModule==="Servicios CORE" 
                            ? ""
                            : item.subModule }
                      </NavLink>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};
