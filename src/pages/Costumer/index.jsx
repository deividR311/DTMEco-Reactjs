import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CostumerContext from "../../context/Costumer/costumerContext";
import HeaderContext from "../../context/Header/headerContext";
import { ListCostumerRequest } from "./components";
import { useStyles } from "./styles";

const Costumer = () => {
  const classes = useStyles();
  const costumerContext = useContext(CostumerContext);
  const { allUserRequestList, loadAllUserRequest } = costumerContext;
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;
  const [approver, setApprover] = useState(null);
  const [approverCode, setApproverCode] = useState([]);
  const [userLevelOne, setuserLevelOne] = useState(null);
  const [userLevelTwo, setuserLevelTwo] = useState(false);
  const [serviceParameterName, setServiceParameterName] = useState("");
  const superUserData = [];
  const levelTwoUserData = [];

  useEffect(() => {
    if (responseData !== undefined) {
      responseData.find((item) => {
        if (item.module.includes("Client" || "client")) {
          findTwoLevelPermissions(item.subModules);
        }
      });
    }
  }, [responseData]);

  const findTwoLevelPermissions = async (array) => {
    await array.map((item) => {
      if (
        item.code === "DMC_AP_CLIN2" ||
        item.code === "DMC_RJ_CLIN2" ||
        item.code === "DMC_R_CLIN2"
      ) {
        setuserLevelTwo(true);
        setServiceParameterName("Nivel2");
        return levelTwoUserData.push(item);
      }
    });

    if (levelTwoUserData.length === 0) {
      findSuperUser(array);
    }
  };

  const findSuperUser = (array) => {
    array.map((item) => {
      if (
        item.code === "DMC_AP_CLIN1" ||
        item.code === "DMC_RJ_CLIN1" ||
        item.code === "DMC_R_CLIN1"
      ) {
        return superUserData.push(item);
      }
      setuserLevelOne(superUserData);
    });
  };

  useEffect(() => {
    if (userLevelOne && responseData) {
      if (userLevelOne.length < 3) {
        const data = responseData.filter((item) =>
          item.subModules.find((item) => item.code === "DMC_AP_CLIFA")
        );
        setApproverCode(data);
      }

      if (userLevelOne.length === 3) {
        setApprover(true);
        setServiceParameterName("verifiedBy");
      }
    }
  }, [userLevelOne]);

  useEffect(() => {
    if (approverCode.length > 0) {
      setApprover(true);
      setServiceParameterName("approvedBy");
    } else {
      setApprover(false);
    }
  }, [approverCode]);

  useEffect(() => {
    if (userLevelOne && responseData) {
      if (approverCode.length === 0 && !approver) {
        setServiceParameterName("createdBy");
      }
    }
  }, [approverCode]);

  useEffect(() => {
    if (responseData !== undefined) {
      if (serviceParameterName !== "") {
        if (serviceParameterName === "Nivel2") {
          loadAllUserRequest({
            [serviceParameterName]: true,
          });
        } else {
          loadAllUserRequest({
            [serviceParameterName]: responseData[0].userId,
          });
        }
      }
    }
  }, [serviceParameterName]);

  return (
    <>
      <ListCostumerRequest
        allUserRequestList={allUserRequestList}
        isApprover={approver}
        isLevelTwo={userLevelTwo}
        serviceParameterName={serviceParameterName}
      />
    </>
  );
};

export default Costumer;
