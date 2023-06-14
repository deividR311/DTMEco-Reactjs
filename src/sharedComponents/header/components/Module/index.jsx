import React from "react";
import { NavLink } from "react-router-dom";

const Module = ({ headerModules }) => {
  return (
    <>
      {headerModules.map((item, index) => (
        <div className="nav-item dropdown" key={index}>
          <a
            className="nav-link"
            href="#"
            id={item.module}
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {item.module}
          </a>
          <ul
            className="dropdown-menu header__subMenuCtn"
            id={item.module}
            aria-labelledby={item.module}
          >
            {item.subModules.map((subItem) => (
              <>
                {subItem.visible && (
                  <li key={subItem.subModule}>
                    <NavLink
                      activeClassName="active"
                      className="nav-item nav-link header__subMenuItem"
                      exact
                      to={subItem.path}
                    >
                      {subItem.subModule}
                    </NavLink>
                  </li>
                )}
              </>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Module;
