import React from "react";
import { Link } from "react-router-dom";

const NavBreadCrumb = ({ path }) => {
  return (
    <nav className="navBreadCrumb">
      Estás en:
      <ul className="BreadCrumb">
        {path.map((item, index) => (
          <li className="BreadCrumb__item" key={index}>
            <Link to={item.path} className={`BreadCrumb__link ${item.active}`}>
              {item.word}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBreadCrumb;
