import React, { useContext, useEffect } from "react";
import CostumerContext from "../../../../context/Costumer/costumerContext";
import { NavBreadCrumb } from "../../../../sharedComponents";
import { useStyles } from "../../styles";
import { CreateUserRequestForm } from "./components";

const CreateUserRequest = () => {
  const classes = useStyles();
  const costumerContext = useContext(CostumerContext);
  const {
    requestUserCreateList,
    loadRequestUserCreateList,
    createGeneralCostumer,
    createGeneralCostumerSuccess,
    createGeneralCostumerFailed,
    clearCreateGeneralCostumerFailed,
    clearCreateGeneralCostumerSuccess,
    clientId
  } = costumerContext;
  const navBreadCrumbArray = [
    { path: "/", active: "", word: "Inicio" },
    { path: "/Clientes/Consultar", active: "", word: "Listado de solicitudes" },
    {
      path: "/Clientes/Crear",
      active: "BreadCrumb__link--active",
      word: "Solicitud de creación cliente",
    },
  ];

  useEffect(() => {
    loadRequestUserCreateList([
      { ListId: 1, ParentCode: "" },
      { ListId: 2, ParentCode: "" },
      { ListId: 3, ParentCode: "" },
    ]);
  }, []);

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArray} />
      <h3>
        <strong>Solicitud de creación cliente</strong>
      </h3>
      <div className={classes.createRequestCtn}>
        {requestUserCreateList.length > 0 && (
          <CreateUserRequestForm
            classes={classes}
            requestUserCreateList={requestUserCreateList}
            createGeneralCostumer={createGeneralCostumer}
            createGeneralCostumerSuccess={createGeneralCostumerSuccess}
            createGeneralCostumerFailed={createGeneralCostumerFailed}
            clearCreateGeneralCostumerFailed={clearCreateGeneralCostumerFailed}
            clearCreateGeneralCostumerSuccess={clearCreateGeneralCostumerSuccess}
            clientId={clientId}
          />
        )}
      </div>
    </>
  );
};

export default CreateUserRequest;
