import Select from "react-select";
import "./stylesHeaderDataGrid.scss";
import { TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState, useEffect } from "react";
import MaterialNoCore from "../../../../../../../context/MaterialsNoCore/materialsNoCoreContext";

export const HeaderDataGridModify = ({
  labelButton,
  handleOnClick,
  getInput,
}) => {
  const [inputFilter, setInputFilter] = useState({});
  const materialsNoCore = useContext(MaterialNoCore);
  const [typeMaterial, setTypeMaterial] = useState([]);
  const { TypeMaterial, getTypeMaterial } = materialsNoCore;
  const [disableInput, setDisableInput] = useState({
    tipoMaterial: false,
    codigoMaterial: false,
    searchKeywords: false,
  });

  const getChangeData = (event) => {
    const { name, value } = event.target;
    setInputFilter({ [name]: value });
    const obj = Object.entries(disableInput).reduce((acum, key) => {
      if (key[0] !== name) {
        acum[key[0]] = true;
      } else {
        acum[key[0]] = false;
      }
      if (value === "" || value === "Todos") {
        acum[key[0]] = false;
      }
      return acum;
    }, {});
    setDisableInput(obj);
  };

  const getChangeDataSelect = (e) => {
    getChangeData({ target: { name: "tipoMaterial", value: e.value } });
  };

  useEffect(() => {
    getInput(inputFilter);
  }, [inputFilter]);

  useEffect(() => {
    getTypeMaterial();
  }, []);

  useEffect(() => {
    let options = [];
    TypeMaterial.map((values) => {
      options.push({ value: values.id, label: values.name });
    });
    setTypeMaterial(options);
  }, [TypeMaterial]);

  return (
    <div className="containerHeaderDataGridModify">
      <div className="field">
        <div className="labelFieldModifyInput">Código material</div>
        <TextField
          type={"number"}
          name={"codigoMaterial"}
          variant={"outlined"}
          disabled={disableInput.codigoMaterial}
          className={"inputText"}
          onChange={getChangeData}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 11);
          }}
        />
      </div>
      <div className="field">
        <div className="labelFieldModify">Tipo material</div>
        <Select
          options={typeMaterial}
          className={"select-modify"}
          placeholder={""}
          isDisabled={disableInput.tipoMaterial}
          name={"tipoMaterial"}
          onChange={getChangeDataSelect}
        />
      </div>
      <div className="field">
        <div className="labelFieldModifyInput">Buscar por palabra clave</div>

        <TextField
          disabled={disableInput.searchKeywords}
          variant={"outlined"}
          className={"inputText"}
          onChange={getChangeData}
          name={"searchKeywords"}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </div>
      <div className="buttonModify" onClick={handleOnClick}>
        {labelButton}
      </div>
    </div>
  );
};
