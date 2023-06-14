import { useState } from "react";
let options = {
  materialType: "",
  company: "",
  companyService: "",
  stateId: "",
};

export const useValidateForm = (initialState = {}, schema) => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(() =>
    Object.keys(initialState).reduce((acum, key) => {
      acum[key] = [];
      return acum;
    }, {})
  );

  const submitValidate = () => {
    const errors = {};
    Object.keys(initialState).forEach((data) => {
      if (data === "company") {
        options = { ...options, company: values[data] };
      }
      if (data === "materialType") {
        options = { ...options, materialType: values[data] };
      }
      if (data === "companyService") {
        options = { ...options, companyService: values[data] };
      }
      if (data === "stateId") {
        options = { ...options, stateId: values[data] };
      }
      errors[data] = schema(
        values[data],
        options.company,
        options.materialType,
        options.companyService,
        options.stateId
      )[data]();
    });
    setError(errors);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "company") {
      options = { ...options, company: value };
    }
    if (name === "materialType") {
      options = { ...options, materialType: value };
    }
    if (name === "companyService") {
      options = { ...options, companyService: value };
    }
    if (name === "stateId") {
      options = { ...options, stateId: value };
    }
    setError(() => {
      const validations = schema(
        value,
        options.company,
        options.materialType,
        options.companyService,
        options.stateId
      );
      return { ...error, [name]: validations[name]() };
    });
    setValues({ ...values, [name]: value });
  };

  const handleInputs = (name) => ({
    name,
    value: values[name] || "",
    onChange,
  });

  return { values, handleInputs, error, submitValidate, setValues, setError };
};
