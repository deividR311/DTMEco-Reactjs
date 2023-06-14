import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useStyles } from "../pages/Costumer/styles";
import { Footer, Header } from "../sharedComponents";
import { usePermissionRoutes } from "./usePermissionRoutes";
import { NoMatchPage } from "../pages";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { About } from "../pages/About";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress  {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}


export const DashboardRoutes = () => {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.ui);
  const [progress, setProgress] = useState(10);
  const [routesByUserPermissions] = usePermissionRoutes();
  useEffect(() => {
    if (progress === 100) {
      setProgress(0)
    }
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
    }, 1900);

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  return (
    <>
      <Header />

      {loading && (
        <>
          <div className={classes.ctnBlockDisplay}></div>
          <div className={classes.ctnLoading}>
            <div className={classes.ctnLoadingCenter}>
              <CircularProgressWithLabel value={progress} />
            </div>
          </div>
        </>
      )}
      <div className="container mt-8">
        <Switch>
          <Route
            exact={true}
            path={"/Acercade"}
            component={() => <About />}
          />
          {routesByUserPermissions.map((route, index) => (
            <Route
              exact={route.exact}
              path={route.path}
              key={index}
              component={route.component}
            />
          ))}
          {routesByUserPermissions.length > 0 && (
            <Route
              exact={true}
              path={"*"}
              key={"NoMatchPage"}
              component={NoMatchPage}
            />
          )}
        </Switch>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};
