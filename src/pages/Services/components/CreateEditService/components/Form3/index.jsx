import * as React from "react";
import { useState, useEffect, useContext } from "react";
import schema from "../../../../schema/Forms/form3.schema";
import { useValidateForm } from "../../../../../../hooks/useValidateForm";
import { SelectCustom, InputMaterial } from "../../../../../Materials/widgets";
import ServicesContext from "../../../../../../context/Services/servicesContext";

const initialState = {
  serviceNameService: "",
  articleGroupService: "",
  baseUnitMeasureService: "",
};
export const Form3 = ({
  isEdit,
  setForm,
  company,
  setError,
  dataForm,
  dataEdit,
  typeMaterial,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { error, values, setValues, handleInputs, submitValidate } =
    useValidateForm(initialState, schema);

  const servicesContext = useContext(ServicesContext);
  const { ListsMDS } = servicesContext;

  const [list, setList] = useState({
    articleGroupServiceList: [],
    baseUnitMeasureServiceList: [],
  });

  useEffect(() => {
    if (company === "E") {
      setValues({
        ...values,
        baseUnitMeasureService: "UN_ZDIE_E",
      });
    } else if (company === "R") {
      setValues({
        ...values,
        baseUnitMeasureService: "UN_DIEN_R",
        articleGroupService: "B030_R",
      });
    }
  }, [company]);

  useEffect(() => {
    try {
      if (ListsMDS !== undefined) {
        const UnidadMedidaBase = ListsMDS.filter(
          (element) => element.listName === "UnidadMedidaBase"
        );
        const UmbByType = UnidadMedidaBase[0].list[0].values.filter(
          (umb) => umb.id === typeMaterial
        );
        const GrupoArticulos = ListsMDS.filter(
          (element) => element.listName === "GrupoArticulos"
        );
        const GroupByType = GrupoArticulos[0].list[0].values.filter(
          (ga) => ga.id === typeMaterial
        );
        setList({
          ...list,
          articleGroupServiceList:
            company === "R" ? GroupByType[0].subValues : [],
          baseUnitMeasureServiceList: UmbByType[0].subValues,
        });
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  }, [ListsMDS]);

  useEffect(() => {
    if (isEdit) {
      const { serviceName, articleGroup, baseUnitMeasure } = dataEdit;
      setValues({
        serviceNameService: serviceName,
        articleGroupService: articleGroup,
        baseUnitMeasureService: baseUnitMeasure,
      });
    }
  }, [isEdit]);

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
          <InputMaterial
            required={true}
            label={"Nombre del servicio"}
            errors={error.serviceNameService}
            placeholder="Ingrese nombre del servicio"
            handleInputs={handleInputs("serviceNameService")}
          />
        </div>
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Unidad medida base"}
            errors={error.baseUnitMeasureService}
            items={list.baseUnitMeasureServiceList}
            placeholder="Seleccione unidad medida base"
            handleInputs={handleInputs("baseUnitMeasureService")}
          />
        </div>
        {company === "R" && (
          <div className="formRow__campo">
            <SelectCustom
              showId={false}
              required={true}
              label={"Grupo artículos"}
              errors={error.articleGroupService}
              items={list.articleGroupServiceList}
              placeholder="Seleccione grupo artículos"
              handleInputs={handleInputs("articleGroupService")}
            />
          </div>
        )}
      </div>
    </>
  );
};
