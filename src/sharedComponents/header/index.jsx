import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { logOutUser } from "../../redux/authentication/authActions";
import logoEcopetrol from "../../assets/images/logo_ecopetrol.png";
// import profileImage from "../../assets/images/profile.png";
import { Module } from "./components";
import HeaderContext from "../../context/Header/headerContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const answerCorrectionLogin = (item1, item2, resultLogin) => {
  let objString;
  if (resultLogin[item1] === undefined && resultLogin[item2] === undefined) {
    objString = `{"${item1}": "${resultLogin[item1.charAt(0).toLowerCase() + item1.slice(1)]}", "${item2}": "${resultLogin[item2.charAt(0).toLowerCase() + item2.slice(1)]}"}`;
  } else {
    objString = `{"${item1}": "${resultLogin[item1]}", "${item2}": "${resultLogin[item2]}"}`;
  }
  return JSON.parse(objString);
}

const Header = () => {
  const dispatch = useDispatch();
  const headerContext = useContext(HeaderContext);
  const {
    headerModuleUserPermissions,
    loadModuleUserPermission,
    rolesByUser,
    loadRolesByUser,
  } = headerContext;
  const { Code, Email } = useSelector((state) => {
    const resultLogin = state.auth.data.data;
    return answerCorrectionLogin('Code', 'Email', resultLogin);
  });
  const { refreshPermissions } = useSelector((state) => state.ui);
  const { responseData } = headerModuleUserPermissions;

  useEffect(() => {
    if (Email !== null && Email !== "" && Email !== undefined && Email !== 'null') {
      loadModuleUserPermission(Email);
    } else {
      loadModuleUserPermission(`${Code}@ecopetrol.com.co`);
    }
  }, [refreshPermissions]);

  useEffect(() => {
    if (responseData !== undefined && responseData.length > 0) {
      loadRolesByUser(responseData[0].userId);
    }
  }, [responseData]);

  const closeAuthUser = () => {
    dispatch(logOutUser());
  };

  const { loading } = useSelector((state) => state.ui);
  const { Name, LastName } = useSelector((state) => {
    const resultLogin = state.auth.data.data;
    return answerCorrectionLogin('Name', 'LastName', resultLogin)
  })


  const rolesTooltip =
    rolesByUser !== undefined && rolesByUser.length > 0
      ? rolesByUser.map((item) => (
        <li>
          {" "}
          <label className="header__tooltip">{item.name}</label>{" "}
        </li>
      ))
      : "";

  const titleRolesToolTip = [
    <label className="header__tooltip">Roles asignados</label>,
  ];

  const rolesWithTitle = titleRolesToolTip.concat(rolesTooltip);

  return (
    <>
      <header className="header__header m-0">
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <Link to="/" className="col-md-1">
                <img
                  className="header__imgLogo"
                  src={logoEcopetrol}
                  alt="logo ecopetrol"
                />
              </Link>
            </div>
            <div className="col-md-6">
              <div className="navBarHeader">
                <nav className="navbar header__menuPrincipal col-md-6">
                  {headerModuleUserPermissions !== undefined && (
                    <>
                      {responseData && <Module headerModules={responseData} />}
                    </>
                  )}
                </nav>
              </div>
            </div>
            <div className="header__contenedorFotoUsuario col-md-1 p-0">
              <AccountCircleIcon style={{ fontSize: 55, color: "white" }} />
            </div>
            <Tooltip title={rolesWithTitle} placement="bottom">
              <div className="header__nombreUsuarioHeaderPerfil col-md-2">
                <h6 className="header__h6NameUser">
                  {Name} {LastName}
                </h6>
              </div>
            </Tooltip>
            <div className="col-md-1">
              <button
                className="btn btnPrimary header__btn"
                onClick={closeAuthUser}
                disabled={loading}
                type="submit"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
