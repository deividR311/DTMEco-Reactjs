import React, { useContext, useEffect, useState } from "react";
import { InputCustom } from "../../../../../Materials/widgets";
import MaterialNoCore from "../../../../../../context/MaterialsNoCore/materialsNoCoreContext";
import "../../../../../Materials/widgets/Table/__Table.scss";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";

export const FiltersRequest = () => {
  //CONTEXT MATERIAL NO CORE
  const materialNoCore = useContext(MaterialNoCore);
  const {
    TypeMaterial,
    getTypeMaterial,
    stateMaterialNoCore,
    getMaterialNoCoreState,
  } = materialNoCore;

  const { FilterByInputsPackage, FilterPackage } = materialNoCore;

  const [values, setValues] = useState({
    ticket: "",
    stateId: "",
    typeMaterial: "",
    search: "",
  });

  useEffect(() => {
    getTypeMaterial();
    getMaterialNoCoreState(2);
    setValues({ ...values, typeMaterial: "Todos", stateId: "Todos" });
  }, []);

  const [err, setErr] = useState({});

  const validateError = (name, value) => {
    let validado = false;
    if (name === "ticket") {
      setErr({ ticket: [] });
      if (value.length >= 15) {
        setErr({ ticket: ["Máximo 15 carácteres"] });
      } else {
        if (value.length !== 0) {
          if (!/^[a-z0-9ñ]+$/i.test(value)) {
            setErr({ ticket: ["No se permiten carácteres especiales"] });
            validado = true;
          }
        }
      }
    }
    return validado;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let validLength = validateError(name, value);
    if (name === "search" ) {
      FilterByInputsPackage(value, name);
      
      setValues({
        ...values,
        typeMaterial: "Todos",
        stateId: "Todos",
        [name]: value,
      });

    }else if(name === "ticket"){
      
      const valueRegex = value.replace(/[\s]/g, "");
      const valueState = valueRegex.replace(/[^a-zA-Z0-9ñ]+$/, "");
      FilterByInputsPackage(valueState, name);
      setValues({
        ...values,
        typeMaterial: "Todos",
        stateId: "Todos",
        [name]: valueState
      });
    } else if (name === "typeMaterial") {
      FilterPackage(values.stateId, value);
      setValues({ ...values, ticket: "", search: "", [name]: value });
    } else if (name === "stateId") {
      FilterPackage(value, values.typeMaterial);
      setValues({ ...values, ticket: "", search: "", [name]: value });
    }
  };

  return (
    <>
      <div style={{ width: "400%" }}>
        <Grid container spacing={1}>
          <Grid item xs>
            <InputCustom
              value={values.ticket}
              name="ticket"
              withHook={false}
              widthInput={"w180"}
              errors={err.ticket}
              label="N° de ticket"
              onChange={handleOnChange}
              placeholder="Escriba aquí"
              maxLength={15}
            />
          </Grid>
          <Grid item xs>
            <SearchSelect
              valueId={values.stateId}
              optionList={"stateId"}
              label={"Estado"}
              listOpt={stateMaterialNoCore}
              onChange={handleOnChange}
              placeholder={"Escribe aquí"}
            />
          </Grid>
          <Grid item xs>
            <SearchSelect
              valueId={values.typeMaterial}
              optionList={"typeMaterial"}
              label={"Tipo material"}
              listOpt={TypeMaterial}
              onChange={handleOnChange}
              placeholder={"Escribe aquí"}
            />
          </Grid>
          <Grid item xs>
            <InputCustom
              value={values.search}
              name="search"
              label="Buscar"
              withHook={false}
              widthInput={"w180"}
              placeholder="Buscar"
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
