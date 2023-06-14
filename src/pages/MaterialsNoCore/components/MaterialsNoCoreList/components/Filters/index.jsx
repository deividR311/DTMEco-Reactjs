import React, { useContext, useEffect, useState } from "react";
import { InputCustom } from "../../../../../Materials/widgets";
import MaterialNoCore from "../../../../../../context/MaterialsNoCore/materialsNoCoreContext";
import "../../../../../Materials/widgets/Table/__Table.scss";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
export const Filters = () => {
  //CONTEXT MATERIAL NO CORE
  const materialNoCore = useContext(MaterialNoCore);
  const {
    TypeMaterial,
    getTypeMaterial,
    filtersByInputs,
    stateMaterialNoCore,
    getMaterialNoCoreState,
    materialNoCoreByFilters,
  } = materialNoCore;

  const [values, setValues] = useState({
    stateId: "",
    search: "",
    idRequest: "",
    typeMaterial: "",
  });

  useEffect(() => {
    getTypeMaterial();
    getMaterialNoCoreState();
  }, []);

  useEffect(() => {
    if (TypeMaterial.length && stateMaterialNoCore.length) {
      setValues({ ...values, typeMaterial: "Todos", stateId: "Todos" });
      materialNoCoreByFilters("Todos", "Todos");
    }
  }, [TypeMaterial, stateMaterialNoCore]);

  const [err, setErr] = useState({});

  const validateError = (name, value) => {
    if (name === "idRequest") {
      setErr({ idRequest: [] });
      if (value.length > 5) {
        setErr({ idRequest: ["Máximo 5 carácteres"] });
      } else {
        if (!/^([0-9])*$/.test(value)) {
          setErr({ idRequest: ["Este campo solo permite números"] });
        }
      }
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    validateError(name, value);
    setValues({ ...values, [name]: value });
    if (name === "idRequest" || name === "search") {
      filtersByInputs(value, name);
    } else if (name === "typeMaterial") {
      materialNoCoreByFilters(values.stateId, value);
    } else if (name === "stateId") {
      materialNoCoreByFilters(value, values.typeMaterial);
    }
  };

  const listData = () => {
    let result = Array();
    stateMaterialNoCore.map((value) => {
      result.push({ label: value.name, value: value.id });
    });
    return result;
  };

  return (
    <>
      <div style={{ width: "400%" }}>
        <Grid container spacing={1}>
          <Grid item xs>
            <InputCustom
              maxLength={5}
              type={"number"}
              name="idRequest"
              withHook={false}
              label="ID material"
              widthInput={"w180"}
              errors={err.idRequest}
              value={values.idRequest}
              onChange={handleOnChange}
              placeholder="Escriba aquí"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 5);
              }}
            />
          </Grid>
          <Grid item xs>
            <SearchSelect
              label={"Estado"}
              optionList={"stateId"}
              valueId={values.stateId}
              onChange={handleOnChange}
              placeholder={"Escribe aquí"}
              listOpt={stateMaterialNoCore}
            />
          </Grid>
          <Grid item xs>
            <SearchSelect
              listOpt={TypeMaterial}
              label={"Tipo material"}
              onChange={handleOnChange}
              optionList={"typeMaterial"}
              placeholder={"Escribe aquí"}
              valueId={values.typeMaterial}
            />
          </Grid>
          <Grid item xs>
            <InputCustom
              value={values.search}
              name="search"
              label="Buscar "
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
