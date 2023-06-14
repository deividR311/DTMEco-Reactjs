import React, { useContext, useEffect, useState } from "react";
import "./__home.scss";
import { CardHome } from "./components";
import { useDispatch } from "react-redux";
import HeaderContext from "../../context/Header/headerContext";
import { logOutUser } from "../../redux/authentication/authActions";
import { ModalCommon, SnackBarCommon } from "../../sharedComponents";
import NotPermissions from "./components/NotPermissions";
import { notPermissionsNames } from "./constants";
import { useStylesHome } from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;
  const classes = useStylesHome();
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(true);

  useEffect(() => {
    if (responseData !== undefined && responseData.length === 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [responseData]);

  const handleOptions = () => {
    setOpen(false);
    dispatch(logOutUser());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setOpenInfo(false);
  };

  return (
    <>
      <ModalCommon
        classes={classes}
        handleOptions={handleOptions}
        handleClose={handleOptions}
        open={open}
        disableBackdropClick={true}
      >
        <NotPermissions
          classes={classes}
          title={notPermissionsNames.title}
          description={notPermissionsNames.description}
          handleOptions={handleOptions}
        />
      </ModalCommon>
      <div className={classes.homeContainer}>
        <h3 className="login__titulo">
          Bienvenido a la herramienta de gestión de solicitudes de datos
          maestros <br /> MASTER DATA SERVICES
        </h3>
        <p>
          Esta herramienta permite la administración y control de las
          solicitudes de creación, <br /> modificación y eliminación de datos
          maestros y catálogos de Ecopetrol
        </p>
        {headerModuleUserPermissions !== undefined && (
          <>
            {responseData && (
              <>
                <h3 className="titleMods">Módulos asignados</h3>
                <div className="containerCardsHome">
                  <CardHome items={responseData} />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <SnackBarCommon
        success={openInfo}
        error={false}
        handleCloseSnack={handleCloseSnack}
        successMessage={
          "Para dar inicio al registro de la solicitud, diríjase al menú ubicado en la parte superior de la vista."
        }
        errorMessage={""}
        time={6000}
      />
    </>
  );
};

export default Home;
