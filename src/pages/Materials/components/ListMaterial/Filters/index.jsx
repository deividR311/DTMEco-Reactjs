import React, { useContext, useState, useEffect } from "react";
import { SelectCustom, InputMaterial, MultipleSelectCheckmarks } from "../../../widgets";
import filterLogo from "../../../../../assets/images/filterLogo.svg";
import MaterialsContext from "../../../../../context/Materials/materialContext";

export const Filters = ({iconFilter=true}) => {
  const materialsContext = useContext(MaterialsContext);
  const {
    companyMDS,
    stateRequest,
    typeMaterial,
    getCompanyMDS,
    materialFilter,
    getMaterialType,
    getStateRequest,
    materialByFilters,
  } = materialsContext;

  useEffect(() => {
    getCompanyMDS();
    getStateRequest();
  }, []);

  const [values, setValues] = useState({
    stateId: "",
    company: "",
    search: "",
    idRequest: "",
    typeMaterial: "",
  });

  const handleOnChange = (e) => {
    if (!Array.isArray(e)) {
      const { name, value } = e.target;
      if (name === "company") {
        if (value !== "Todos") getMaterialType(value);
      }
      
      materialFilter(value, name);
      setValues({ ...values, [name]: value });
    } else {
      let Estado = []
      Estado["PENDIENTE APROBACIÓN"] = { id: 1 };
      Estado["APROBADO APROBADOR"] = { id: 2 };
      Estado["RECHAZADO APROBADOR"] = { id: 3 };
      Estado["DEVUELTO APROBADOR"] = { id: 4 };
      Estado["RECHAZADO DATO MAESTRO"] = { id: 5 };
      Estado["DEVUELTO DATO MAESTRO"] = { id: 6 };
      Estado["EN TRÁMITE"] = { id: 7 };
      Estado["EN CREACIÓN"] = { id: 8 };
      Estado["EN PRUEBAS"] = { id: 9 };
      Estado["DISPONIBLE PARA CREAR"] = { id: 10 };
      Estado["PRUEBAS FALLIDAS"] = { id: 11 };
      Estado["CREADO"] = { id: 12 };
      Estado["CREACIÓN FALLIDAS"] = { id: 13 };
      let value = []
      for (const state of e) {
        value.push(Estado[state.toUpperCase()].id)
      }
      materialFilter(value, "stateId");
      setValues({ ...values, "stateId": value });
    }
  };

  useEffect(() => {
    if (values.idRequest || values.stateId || values.company || values.typeMaterial || values.search) {
      materialByFilters(values.idRequest, values.stateId, values.company, values.typeMaterial, values.search);
    }
  }, [values]);

  return (
    <div className="containerHeader__Filters" style={{ width: "80%" }}>
      <div className="containerItems">
        {iconFilter && (<img className="" src={filterLogo} alt="filterLogo" />)}
        <div className="containerItems_item" style={{ width: "150px" }}>
          <InputMaterial
            name="idRequest"
            withHook={false}
            widthInput={"w120h44"}
            label={"N° solicitud"}
            onChange={handleOnChange}
            placeholder="#"
          />
        </div>
        <div className="containerItems_item" style={{ width: "18%" }}>
          <MultipleSelectCheckmarks 
            label="Estado"
            name="stateId"
            items={stateRequest}
            width={160}
            onChange={handleOnChange}
          />
        </div>
        <div className="containerItems_item" style={{ width: "18%" }}>
          <SelectCustom
            name="company"
            showId={false}
            showAll={true}
            label="Empresa"
            withHook={false}
            items={companyMDS}
            widthSelect={"w140"}
            value={values.company}
            placeholder="Seleccionar"
            onChange={handleOnChange}
            minWidth={{ minWidth: "50px" }}
          />
        </div>
        <div className="containerItems_item" style={{ width: "18%" }}>
          <SelectCustom
            showId={false}
            showAll={true}
            withHook={false}
            name="typeMaterial"
            items={typeMaterial}
            widthSelect={"w140"}
            label="Tipo material"
            placeholder="Seleccionar"
            onChange={handleOnChange}
            value={values.typeMaterial}
            minWidth={{ minWidth: "50px" }}
            disabled={!values.company || values.company === "Todos"}
          />
        </div>
        <div className="containerItems_item" style={{ width: "18%" }}>
          <InputMaterial
            name="search"
            label="Buscar"
            withHook={false}
            widthInput={"w180h44"}
            placeholder="Buscar"
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
};
