import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { NavBreadCrumb } from "../../../../../sharedComponents";
import { navBreadCrumbArrayManagmentList } from "../../../constants";
import { forceLoadUrl } from "../../../../../utils/Function";
import HeaderContext from "../../../../../context/Header/headerContext";

export const GestionMateriales = () => {
  const history = useHistory();

  const goManagment = () => {
    forceLoadUrl("/MaterialesNoCore/CreacionMaterial");
  };
  const goGestionS = () => {
    forceLoadUrl("/MaterialesNoCore/GestionSolicitudes");
  };
  const goModificationM = () => {
    forceLoadUrl("/MaterialesNoCore/ConsultaModificacion");
  };

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArrayManagmentList} />
      <h3 className="TitleView">
        Creación, Modificación y gestión de solicitudes
      </h3>
      <Grid>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid lg={3} className="customCard " onClick={goGestionS}>
            <CardContent>
              <h6 className="eco_titulo_tabla">Materiales No Core</h6>
              <h3 className="TitleCard">Gestión de solicitudes</h3>
              <Typography variant="body2" color="text.secondary">
                Ingrese aquí para visualizar el estado de sus solicitudes y/o
                realizar la gestión requerida.
              </Typography>
            </CardContent>
          </Grid>
          <Grid lg={3} className="customCard" onClick={goManagment}>
            <CardContent>
              <h6 className="eco_titulo_tabla">Materiales No Core</h6>
              <h3 className="TitleCard">Creación de material</h3>
              <Typography variant="body2" color="text.secondary">
                Ingrese aquí para solicitar los materiales y gestionar la
                solicitud de creación.
              </Typography>
            </CardContent>
          </Grid>
          <Grid lg={3} className="customCard" onClick={goModificationM}>
            <CardContent>
              <h6 className="eco_titulo_tabla">Materiales No Core</h6>
              <h3 className="TitleCard">Modificación de material</h3>
              <Typography variant="body2" color="text.secondary">
                Ingrese aquí para solicitar modificación de materiales y
                crear la solicitud de modificación.
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
