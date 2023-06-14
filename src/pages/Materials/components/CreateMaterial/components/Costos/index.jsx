import * as React from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo } from "../../../../widgets/HeaderDataInfo";
import { CheckboxCommon }  from "../../../../../../sharedComponents/"
import { InputCustom, TitlePage } from "../../../../widgets";

//InitialState HOOK
const initialState = {
    doNotCost: false,
    variancekey: "",
    costingLotSize: "",
    withQtyStructure: false,
    materialRelatedOrigin: false
};

export const Costos = ({
  setForm,
  isEdited,
  dataEdit,
  setError,
  isSubmitting,
  setIsSubmitting,
  typeCompany,
  materialType,
  materialName,
}) => {

    const materialContext = useContext(MaterialContext);
    const { LIST_MDS } = materialContext;

    const [list, setList] = useState({
        variancekeyList: []
      });
    
      const [values, setValues] = useState(initialState);
  
      const [errorField, setErrorField] = useState(() =>
      Object.keys(initialState).reduce((acum, key) => {
        acum[key] = [];
        return acum;
      }, {})
    );
    
    useEffect(() => {
      if (isSubmitting) {
        const value = Object.values(errorField).every(
          (data) => data.length == 0 && data !== ""
        );
        if (value) {
          setForm(values);
        }
      }
      setIsSubmitting(false);
    }, [errorField]);
    
    const changeData = (e) => {
      const { name, value } = e.target;
      setErrorField(() => {
        const validations = validateError(value, values)[name]() ;
        return { ...errorField, [name]: validations};
      });
      setValues({ ...values, [name]: value });
    };
    
    useEffect(() => {
      if (isSubmitting) {
        submitValidate();
      }
    }, [isSubmitting]);
    
    const submitValidate = () => {
      const errors = {};
      Object.keys(initialState).forEach((data) => {
        errors[data] = validateError(values[data], values)[data] ? validateError(values[data], values)[data]() : [];
      });
      setErrorField(errors);
    };
    
    const printError = (error) => {
      if (error.length > 0) {
        return error[0];
      } else {
        return "";
      }
    };

    const handleCheckedChange = (event) => {
        const { name, checked } = event.target;
        setValues({ ...values, [name]: checked });
      };

      /* Se hace un filtro a la lista que viene de MDS 
  y se agrega a un objecto para mostrar en el select */
  useEffect(() => {
    try {
      if (LIST_MDS !== undefined) {
        if (LIST_MDS.length) {
          /* LISTA GRUPO COMPRAS */

        const ClaveDesviacion = LIST_MDS.filter(
        (element) => element.listName === "ClaveDesviacion"
        );
             
        setList({
            variancekeyList: ClaveDesviacion[0].list[0].values,
        });
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
    }
  }, [LIST_MDS]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <HeaderDataInfo
            typeCompany = {typeCompany}
            materialType = {materialType}
            materialName = {materialName}
          /> 
        </Grid>
        <TitlePage tittle={"Contabilidad y Costos"} tooltip={"texto de ayuda"}/>
        <Grid item xs={4}>
          <SearchSelect
            label={"Clave de desviación"}
            isDisabled={isEdited}
            listOpt={list.variancekeyList}
            errors={printError(errorField.variancekey)}
            placeholder="Seleccione una clave de desviación"
            valueId={values.variancekey}
            optionList={"variancekey"}
            onChange={changeData}
          />
        </Grid>
        <Grid item xs={4}>
          <InputCustom
            label={"Tamaño de lote cc"}
            name={"costingLotSize"}
            value={values.costingLotSize}
            onChange={changeData}
            errors={errorField.costingLotSize}
            placeholder="Ingrese el tamaño de lote"
            widthInput={"fullInput"}
            max={13}
            lengthCharacters={values.costingLotSize}
            maxLength={13}
          />
        </Grid>
        <Grid item xs={4}> </Grid>
        <Grid item xs={4}>
          <CheckboxCommon              
            handleChange={handleCheckedChange}
            label={"No efectuar CC"}
            checked={values.doNotCost} 
            name={"doNotCost"}
          />
        </Grid>
        <Grid item xs={4}>
          <CheckboxCommon              
            handleChange={handleCheckedChange}
            label={"C/estruct. cuant"}
            checked={values.withQtyStructure} 
            name={"withQtyStructure"}
          />       
        </Grid>
        <Grid item xs={4}>
          <CheckboxCommon              
            handleChange={handleCheckedChange}
            label={"Origen material "}
            checked={values.materialRelatedOrigin} 
            name={"materialRelatedOrigin"}
          />              
        </Grid>
    </Grid>
    </>
  );
};
