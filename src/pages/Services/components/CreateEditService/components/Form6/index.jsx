import * as React from "react";
import { useState, useEffect, useContext } from "react";
import schema from "../../../../schema/Forms/form6.schema";
import { SelectCustom } from "../../../../../Materials/widgets";
import { useValidateForm } from "../../../../../../hooks/useValidateForm";
import ServicesContext from "../../../../../../context/Services/servicesContext";

const initialState = {
  materialCarryingGroup: "",
  transportGroup: "",
  loadGroup: "",
  benefitCenterService: "",
};

export const Form6 = ({
  company,
  setForm,
  dataForm,
  setError,
  isSubmitting,
  setIsSubmitting,
  dataEdit,
  isEdit,
}) => {
  const { error, values, setValues, handleInputs, submitValidate } =
    useValidateForm(initialState, schema);

  useEffect(() => {
    if (company === "R") {
      setValues({
        ...values,
        loadGroup: "Z001_R",
        transportGroup: "ZGT5_R",
      });
    }
  }, [company]);

  useEffect(() => {
    if (isEdit) {
      const {
        materialCarryingGroup,
        transportGroup,
        loadGroup,
        beneficCenter,
      } = dataEdit;

      setValues({
        materialCarryingGroup,
        transportGroup,
        loadGroup,
        benefitCenterService: beneficCenter,
      });
    }
  }, [isEdit]);

  const servicesContext = useContext(ServicesContext);
  const { ListsMDS } = servicesContext;

  const [list, setList] = useState({
    loadGroupList: [],
    transportGroupList: [],
    materialCarryingGroupList: [],
    benefitCenterServiceList: [],
  });

  useEffect(() => {
    if (
      Object.values(dataForm).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      setValues(dataForm);
    }
  }, [dataForm]);

  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitting) {
      const value = Object.values(error).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        setForm(values);
      }
    }
    setIsSubmitting();
  }, [error]);

  useEffect(() => {
    try {
      if (ListsMDS !== undefined) {
        if (ListsMDS.length) {
          const GrupoPorteMaterial = ListsMDS.filter(
            (element) => element.listName === "GrupoPorteMaterial"
          );
          const GrupoTransporte = ListsMDS.filter(
            (element) => element.listName === "GrupoTransporte"
          );
          const GrupoCarga = ListsMDS.filter(
            (element) => element.listName === "GrupoCarga"
          );
          const CentroBeneficio = ListsMDS.filter(
            (element) => element.listName === "CentroBeneficio"
          );

          setList({
            ...list,
            loadGroupList: company === "R" ? GrupoCarga[0].list[0].values : [],
            transportGroupList:
              company === "R" ? GrupoTransporte[0].list[0].values : [],
            materialCarryingGroupList:
              company === "E" ? GrupoPorteMaterial[0].list[0].values : [],
            benefitCenterServiceList: CentroBeneficio[0].list[0].values,
          });
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  }, [ListsMDS]);

  return (
    <>
      <div className="formRow">
        {company === "E" && (
          <div className="formRow__campo">
            <SelectCustom
              showId={false}
              required={true}
              label={"Grupo porte material"}
              errors={error.materialCarryingGroup}
              items={list.materialCarryingGroupList}
              placeholder="Seleccione grupo porte material"
              handleInputs={handleInputs("materialCarryingGroup")}
            />
          </div>
        )}
        {company === "R" && (
          <>
            <div className="formRow__campo">
              <SelectCustom
                showId={false}
                required={true}
                label={"Grupo transporte"}
                errors={error.transportGroup}
                items={list.transportGroupList}
                placeholder="Seleccione grupo transporte"
                handleInputs={handleInputs("transportGroup")}
              />
            </div>

            <div className="formRow__campo">
              <SelectCustom
                showId={false}
                required={true}
                label={"Grupo carga"}
                errors={error.loadGroup}
                items={list.loadGroupList}
                placeholder="Seleccione grupo carga"
                handleInputs={handleInputs("loadGroup")}
              />
            </div>
          </>
        )}
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Centro beneficio"}
            errors={error.benefitCenterService}
            items={list.benefitCenterServiceList}
            placeholder="Seleccione centro beneficio"
            handleInputs={handleInputs("benefitCenterService")}
          />
        </div>
      </div>
    </>
  );
};
