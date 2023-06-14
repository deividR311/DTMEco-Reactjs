import * as React from "react";
import "./_company.scss";
import { SelectCustom } from "../index";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useValidateForm } from "../../../../hooks/useValidateForm";

export const CompanyCustom = ({ items, schema, setCompany, initialState }) => {
  const { error, values, handleInputs, submitValidate } = useValidateForm(
    initialState,
    schema
  );

  const [validate, setValidate] = useState(false);

  useEffect(() => {
    if (validate) {
      const value = Object.values(error).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        setCompany(values);
      }
    }
    setValidate(false);
  }, [error]);

  const ValidateCompany = () => {
    submitValidate();
    setValidate(true);
  };

  return (
    <div className="container_company">
      <div className="row_company">
        <div className="col_company">
          <SelectCustom
            items={items}
            required={true}
            label={"Empresa"}
            errors={error.company}
            placeholder="Seleccione la empresa"
            handleInputs={handleInputs("company")}
          />
        </div>
        <div className="col_company">
          <Button
            variant="contained"
            onClick={ValidateCompany}
            className="btnNextCompany"
          >
            Siguente
          </Button>
        </div>
      </div>
    </div>
  );
};
