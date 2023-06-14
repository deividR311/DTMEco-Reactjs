import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AdminState from "../context/Administration/adminState";
import HeaderState from "../context/Header/headerState";
import {
  logOutUser,
  updateLoginTime,
} from "../redux/authentication/authActions";
import { Login, NoMatchPage } from "../pages";
import { DashboardRoutes } from "./dashboardRoutes";
import { PrivateRoute } from "./privateRoute";
import { PublicRoute } from "./publicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.auth);
  const { loginTime } = useSelector((state) => state.auth);
  const timeNow = new Date();

  // useEffect(() => {
  //   if (loginTime) {
  //     const loginTimeDate = loginTime ? new Date(loginTime) : null;
  //     const diferencia =
  //       (timeNow.getTime() - loginTimeDate.getTime()) / (1000 * 60 * 60);

  //     if (loginTimeDate && timeNow) {
  //       if (diferencia > 1) {
  //         dispatch(logOutUser());
  //       }
  //     }
  //   }
  // });

  return (
    <Router>
      <>
        <div>
          <Switch>
            <HeaderState>
              <AdminState>
                <PublicRoute
                  exact
                  isAuthenticated={isLogged}
                  path="/login"
                  component={Login}
                />
                <PrivateRoute
                  isAuthenticated={isLogged}
                  path="/"
                  component={DashboardRoutes}
                />
              </AdminState>
            </HeaderState>
          </Switch>
        </div>
      </>
    </Router>
  );
};
