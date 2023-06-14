import * as React from "react";
import { useState, useEffect, useContext } from "react";
import schema from "../../../../schema/Forms/form5.schema";
import { SelectCustom } from "../../../../../Materials/widgets";
import { useValidateForm } from "../../../../../../hooks/useValidateForm";
import ServicesContext from "../../../../../../context/Services/servicesContext";

const initialState = {
  materialGroupService: "",
  materialsImputationGroup: "",
  materialGroup1: "",
  materialGroup2: "",
  commissionGroup: "",
};

export const Form5 = ({
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
    if (company === "E") {
      setValues({
        ...values,
        materialGroup1: "999_E",
        materialGroup2: "999_E",
      });
    } else if (company === "R") {
      setValues({
        ...values,
        materialGroup1: "999_R",
        materialGroup2: "999_R",
      });
    }
  }, [company]);

  useEffect(() => {
    if (isEdit) {
      const {
        materialGroup,
        materialImputationGroup,
        materialGroup1,
        materialGroup2,
        commissionGroup,
      } = dataEdit;
      setValues({
        materialGroupService: materialGroup,
        materialsImputationGroup: materialImputationGroup,
        materialGroup1: materialGroup1,
        materialGroup2: materialGroup2,
        commissionGroup,
      });
    }
  }, [isEdit]);

  const servicesContext = useContext(ServicesContext);
  const { ListsMDS } = servicesContext;

  const [list, setList] = useState({
    materialGroup1List: [],
    materialGroup2List: [],
    commissionGroupList: [],
    materialGroupServiceList: [],
    materialsImputationGroupList: [],
  });

  useEffect(() => {
    try {
      if (ListsMDS.length) {
        const GrupoMateriales = ListsMDS.filter(
          (element) => element.listName === "GrupoMateriales"
        );
        const GrupoImputacionMateriales = ListsMDS.filter(
          (element) => element.listName === "GrupoImputacionMateriales"
        );
        const GrupoComisiones = ListsMDS.filter(
          (element) => element.listName === "GrupoComisiones"
        );
        const GrupoMateriales1 = ListsMDS.filter(
          (element) => element.listName === "GrupoMateriales1"
        );
        const GrupoMateriales2 = ListsMDS.filter(
          (element) => element.listName === "GrupoMateriales2"
        );

        setList({
          ...list,
          materialsImputationGroupList:
            GrupoImputacionMateriales[0].list[0].values,
          commissionGroupList: GrupoComisiones[0].list[0].values,
          materialGroup1List: GrupoMateriales1[0].list[0].values,
          materialGroup2List: GrupoMateriales2[0].list[0].values,
          materialGroupServiceList: GrupoMateriales[0].list[0].values,
        });
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  }, [ListsMDS]);

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

  return (
    <>
      <div className="formRow">
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Grupo imputación materiales"}
            errors={error.materialsImputationGroup}
            items={list.materialsImputationGroupList}
            placeholder="Seleccione grupo imputación materiales"
            handleInputs={handleInputs("materialsImputationGroup")}
          />
        </div>
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Grupo de comisiones"}
            errors={error.commissionGroup}
            items={list.commissionGroupList}
            placeholder="Seleccione grupo de comisiones"
            handleInputs={handleInputs("commissionGroup")}
          />
        </div>
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Grupo materiales 1"}
            errors={error.materialGroup1}
            items={list.materialGroup1List}
            placeholder="Seleccione grupo materiales 1"
            handleInputs={handleInputs("materialGroup1")}
          />
        </div>
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Grupo materiales 2"}
            errors={error.materialGroup2}
            items={list.materialGroup2List}
            placeholder="Seleccione grupo materiales 2"
            handleInputs={handleInputs("materialGroup2")}
          />
        </div>
      </div>
      {company === "E" && (
        <div className="formRow">
          <div className="formRow__campo">
            <SelectCustom
              showId={false}
              required={true}
              label={"Grupo materiales"}
              errors={error.materialGroupService}
              items={list.materialGroupServiceList}
              placeholder="Seleccione grupo materiales"
              handleInputs={handleInputs("materialGroupService")}
            />
          </div>
        </div>
      )}
    </>
  );
};
