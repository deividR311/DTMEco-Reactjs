import * as React from "react";
import { useContext, useState, useEffect } from "react";
import filterLogo from "../../../../../assets/images/filterLogo.svg";
import { SelectCustom, InputMaterial } from "../../../../Materials/widgets";
import ServicesContext from "../../../../../context/Services/servicesContext";

export const Filters = () => {
  const servicesContext = useContext(ServicesContext);
  const {
    getCompany,
    companyMDS,
    stateRequest,
    servicesFilter,
    getStateRequest,
    servicesByFilters,
  } = servicesContext;

  const [values, setValues] = useState({
    idRequest: "",
    stateId: "",
    company: "",
    search: "",
  });

  useEffect(() => {
    getCompany();
    getStateRequest();
  }, []);

  useEffect(() => {
    if (stateRequest.length) {
      servicesByFilters(1, "");
      setValues({ ...values, stateId: 1, company: "Todos" });
    }
  }, [stateRequest]);

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

  const [err, setErr] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    validateError(name, value);
    servicesFilter(value, name);
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (values.stateId || values.company) {
      servicesByFilters(values.stateId, values.company);
    }
  }, [values.stateId, values.company]);

  return (
    <div className="containerHeader__Filters">
      <div className="containerItems">
        <img className="" src={filterLogo} alt="filterLogo" />
        <div className="containerItems_item">
          <InputMaterial
            name="idRequest"
            withHook={false}
            widthInput={"w180"}
            errors={err.idRequest}
            onChange={handleOnChange}
            placeholder="Escriba aquí"
            label="# solicitud"
          />
        </div>
        <div className="containerItems_item">
          <SelectCustom
            name="stateId"
            label="Estado"
            showId={false}
            showAll={true}
            withHook={false}
            widthSelect={"w180"}
            items={stateRequest}
            value={values.stateId}
            onChange={handleOnChange}
            minWidth={{ minWidth: "50px" }}
            placeholder="Seleccione el estado"
          />
        </div>
        <div className="containerItems_item">
          <SelectCustom
            name="company"
            label="Empresa"
            showId={false}
            showAll={true}
            withHook={false}
            items={companyMDS}
            widthSelect={"w180"}
            value={values.company}
            onChange={handleOnChange}
            minWidth={{ minWidth: "50px" }}
            placeholder="Seleccione la empresa"
          />
        </div>
        <div className="containerItems_item">
          <InputMaterial
            name="search"
            label="Buscar"
            withHook={false}
            widthInput={"w180"}
            placeholder="Buscar"
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
};
