import * as React from "react";
import { useState, useEffect, useContext } from "react";
import schema from "../../../../schema/Forms/form1.schema";
import { SelectCustom } from "../../../../../Materials/widgets";
import { useValidateForm } from "../../../../../../hooks/useValidateForm";
import ServicesContext from "../../../../../../context/Services/servicesContext";

const initialState = {
  companyService: "",
  bussinesAreaService: "",
  typeMaterialService: "",
};

export const Form1 = ({
  isEdit,
  setForm,
  setError,
  dataEdit,
  dataForm,
  isSubmitting,
  setIsSubmitting,
}) => {
  //CONTEXT SERVICE
  const servicesContext = useContext(ServicesContext);
  const { companyMDS, getDataByCompany, ListsMDS } = servicesContext;

  const { error, values, setValues, handleInputs, submitValidate } =
    useValidateForm(initialState, schema);

  useEffect(() => {
    if (isEdit) {
      const { company, businessArea, serviceType } = dataEdit;
      setValues({
        companyService: company === "Ecopetrol" ? "E" : "R",
        bussinesAreaService: businessArea,
        typeMaterialService: serviceType,
      });
    }
  }, [isEdit]);

  const [list, setList] = useState({
    bussinesAreaServiceList: [],
    typeMaterialServiceList: [],
  });

  useEffect(() => {
    try {
      if (ListsMDS !== undefined) {
        if (ListsMDS.length) {
          const AreaNegocio = ListsMDS.filter(
            (element) => element.listName === "AreaNegocio"
          );
          const TipoMaterialServicio = ListsMDS.filter(
            (element) => element.listName === "TipoMaterialServicio"
          );

          setList({
            bussinesAreaServiceList: AreaNegocio[0].list[0].values,
            typeMaterialServiceList: TipoMaterialServicio[0].list[0].values,
          });
        }
      }
    } catch (err) {
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
    if (values.companyService) {
      getDataByCompany(values.companyService);
    }
  }, [values.companyService]);

  useEffect(() => {
    if (list.typeMaterialServiceList.length > 0) {
      if (values.companyService === "E") {
        setValues({ ...values, typeMaterialService: "ZDIE_E" });
      } else {
        setValues({ ...values, typeMaterialService: "DIEN_R" });
      }
    }
  }, [list.typeMaterialServiceList]);

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
            required={true}
            label={"Empresa"}
            disabled={isEdit}
            items={companyMDS}
            errors={error.companyService}
            placeholder="Seleccione la empresa"
            handleInputs={handleInputs("companyService")}
          />
        </div>
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Área de negocio"}
            errors={error.bussinesAreaService}
            items={list.bussinesAreaServiceList}
            disabled={!values.companyService.length}
            placeholder="Seleccione el area de negocio"
            handleInputs={handleInputs("bussinesAreaService")}
          />
        </div>
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            disabled={true}
            label={"Tipo de material"}
            errors={error.typeMaterialService}
            items={list.typeMaterialServiceList}
            placeholder="Seleccione el tipo de material"
            handleInputs={handleInputs("typeMaterialService")}
          />
        </div>
      </div>
    </>
  );
};
