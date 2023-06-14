import React, { useContext, useEffect, useState } from "react";
import HeaderContext from "../../context/Header/headerContext";
import { forceLoadUrl } from "../../utils/Function";

export const MaterialesNoCore = () => {

  //---HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //---ESTADOS
  const [isApprover, setIsApprover] = useState(false);
  const [isApplicant, setIsApplicant] = useState(false);

  //--- MÉTODOS
  const goGestionM = () => {
    forceLoadUrl('/MaterialesNoCore/GestionMateriales')
  };

  const goGestionS = () => {
    forceLoadUrl("/MaterialesNoCore/GestionSolicitudes");
  };


  /* Se valida el rol para hacer el redirect a la página correspondiente */
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterialsNoCore = responseData.filter(
        (module) => module.moduleOrder === 5
      );

      if (moduleMaterialsNoCore.length) {
        if(
          moduleMaterialsNoCore[0].subModules.some(
            (element) => element.code === "DMMNC_ADMIN"
          )
        ){
          setIsApplicant(true);
        } else if (
          moduleMaterialsNoCore[0].subModules.some(
            (element) => element.code === "DMMNC_AP_MNC"
          )
        ) {
          setIsApprover(true);
        } else if (
          moduleMaterialsNoCore[0].subModules.some(
            (element) => element.code === "DMMNC_C_MNC"
          )
        ) {
          setIsApplicant(true);
        }
      }
    }
  }, [responseData]);

  return (
    <>
      {isApprover && goGestionS()}
      {isApplicant && goGestionM()}
    </>
  );
};
