import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { NavBreadCrumb, Table } from "../../../../sharedComponents";
import { rolesTableTitles, rolesCellNames } from "../../constant";
import RolesContext from "../../../../context/Roles/rolesContext";
import { useStyles } from "../../styles";

const ListRoles = () => {
  const classes = useStyles();
  const history = useHistory();
  const rolesContext = useContext(RolesContext);
  const { allRoles, loadAllRoles } = rolesContext;
  const [wordFilter, setWordFilter] = useState({
    word: "",
  });
  let rolesFiltered = [];
  const navBreadCrumbArray = [
    { path: '/', active: '', word: 'Inicio' },
    { path: '/Admin/Roles/Consultar', active: 'BreadCrumb__link--active', word: 'Gestión de roles' }
  ];

  useEffect(() => {
    loadAllRoles();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setWordFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (wordFilter.word !== "") {
    rolesFiltered = allRoles.filter((rol) => {
      return rol.name.includes(wordFilter.word);
    });
  }

  const editUser = (item) => {
    history.push({
      pathname: "/Admin/Roles/Modificar",
      state: item,
    });
  };

  const RedirectCreateNewRol = () => {
    history.push("/Admin/Roles/Crear");
  };

  return (
    <>
      <NavBreadCrumb
        path={navBreadCrumbArray}
      />
      <h3 className="eco_titulo_tabla">Gestión de roles</h3>
      <Table
        titles={rolesTableTitles}
        data={rolesFiltered.length > 0 ? rolesFiltered : allRoles}
        isFiltered={rolesFiltered.length > 0 ? true : false}
        cellNames={rolesCellNames}
        editMethod={editUser}
        classes={classes}
        title={"Nombre rol"}
        wordFilter={wordFilter}
        handleOnChange={handleOnChange}
        redirectCreateRegister={RedirectCreateNewRol}
        btnLabel={"Nuevo rol"}
        Icon={() => (<EditIcon />)}
        enabledClass={classes.ctnEditIcon}
      />
    </>
  );
};

export default ListRoles;
