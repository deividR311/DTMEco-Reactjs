import { useContext, useEffect, useState } from "react";
import HeaderContext from "../context/Header/headerContext";
import { routes } from "./routes";

export const usePermissionRoutes = () => {
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;
  const [routesByUserPermissions, setRoutesByUserPermissions] = useState([]);
  const defaultRoutes = [routes[0]];
  const userRoutes = [];

  useEffect(() => {
    handleRoutesByUserPermissions();
  }, [responseData]);

  const handleRoutesByUserPermissions = () => {
    if (responseData) {
      responseData.map((module) => {
        module.subModules.map((subModule) => {
          routes.map((routeItem) => {
            if (subModule.path === routeItem.path) {
              userRoutes.push(routeItem);
            }
          });
        });
      });

      const joinDefaultWithUserRoutes = userRoutes.concat(defaultRoutes);
      setRoutesByUserPermissions(joinDefaultWithUserRoutes);
    }
  };

  return [ routesByUserPermissions ];
};
