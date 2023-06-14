import * as React from "react";
// import { FormHelperText, Tooltip } from "@material-ui/core";
import { Paper, Container, Grid } from "@material-ui/core";
import { useEffect, useContext, useState } from "react";
// import { useStyles } from "../../../../../Roles/styles";
import { validateError } from "./validator";
import { InputCustom } from "../../../../widgets";
// import { TransferListCommon } from "../../../../../../sharedComponents";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo, TitlePage } from "../../../../widgets/";
import HeaderContext from "../../../../../../context/Header/headerContext";

//InitialState HOOK
const initialState = {
  company: "",
  ramo: "",
  materialType: "",
  materialName: "",
  typeCompany: "",
};

export const DatosGenerales = ({
  setForm,
  isEdited,
  dataEdit,
  isSubmitting,
  setIsSubmitting,
  flow = 1
}) => {

  //---MATERIALES
  const materialContext = useContext(MaterialContext);

  const { LIST_MDS, getDataByCompany, companyMDS, getCompanyMDS, setError, dataDatosGenerales, setDataDatosGenerales, setValuesConfigurationInputs} = materialContext;

  //useState
  const [list, setList] = useState({
    materialTypeList: [],
    ramoList: []
  });

  //headers
  const headerContext = useContext(HeaderContext);
  const { rolesByUser } = headerContext;

  const [values, setValues] = useState(Object.keys(dataDatosGenerales).length === 0? initialState: {...dataDatosGenerales});

  
const [errorField, setErrorField] = useState(() =>
  Object.keys(initialState).reduce((acum, key) => {
    acum[key] = [];
    return acum;
  }, [])
);

useEffect(() => {
  if (isSubmitting) {
    const value = Object.values(errorField).every(
      (data) => data.length == 0 && data !== ""
    );
    if (value) {
      setForm(values);
      setDataDatosGenerales(values);
    }
  }
  setIsSubmitting(false);
}, [errorField]);

const changeData = (e) => {
  const { name, value } = e.target;
  setErrorField(() => {
    const validations = validateError(value.toUpperCase(), values)[name]() ;
    return { ...errorField, [name]: validations};
  });

  if(name === "typeCompany"){
    let rol=1;
    if(flow ===1){
      if(rolesByUser.filter( e => e.id == 39 || e.id == 40 || e.id == 53 ).length > 0){
        if(rolesByUser.filter( e => e.id == 39 || e.id == 40 || e.id == 53 ).length > 0){
          rol = rolesByUser.filter( e => e.id == 39 || e.id == 40 || e.id == 53 )[0].id;
        }
        
      }
    }else{
      if(rolesByUser.filter( e => e.id == 41 || e.id == 52 || e.id == 54 ).length > 0){
        if(rolesByUser.filter( e => e.id == 41 || e.id == 52 || e.id == 54 ).length > 0){
          rol = rolesByUser.filter( e => e.id == 41 || e.id == 52 || e.id == 54 )[0].id
        }        
      }
    }
    setValuesConfigurationInputs(`{"Rol": ${rol},"Flujo": ${flow},"Empresa": "${value}"}`);
    
  }

  switch(name){

    case "typeCompany":
      setValues({ 
        ...values, 
        [name]: value,
        materialType:"",
        materialName: ""
      });
      break;
    case "materialType":
      setValues({ 
        ...values, 
        [name]: value,
        materialName:""
        });
        break;
    default:
      setValues({ 
        ...values, 
        [name]: value
        });
  }

  if(name=== "typeCompany"){
    setValues({ 
      ...values, 
      [name]: value,
      materialType:"",
      materialName: "",
    });
  }

  if(name=== "materialType"){
    setValues({ 
      ...values, 
      [name]: value,
      materialName:"",
    });
  }

  if(name=== "materialName"){
    setValues({ 
      ...values, [name]: (value).toUpperCase(),
    });
  }

}

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

useEffect(() => {
  if (values.typeCompany) {
    getDataByCompany(values.typeCompany, 1);
  }
}, [values.company]);

/* Se hace un filtro a la lista que viene de MDS 
  y se agrega a un objecto para mostrar en el select */
useEffect(() => {
  try {
    if (LIST_MDS !== undefined) {
      if (LIST_MDS.length) {
        const TipoMaterial = LIST_MDS.filter(
          (element) => element.listName === "TipoMaterial" || element.listName === "Ramo"
        );
        setList({
          materialTypeList: TipoMaterial[0].list[0].values,
          ramoList: TipoMaterial[1].list[0].values,
        });
        setValues({
          ...values,
          materialType: "",
          ramo: "",
        });
      }
    }
  } catch (error) {
    setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
  }
}, [LIST_MDS, values.typeCompany]);

  /* Se asignan los valores por defecto
  dependiendo de la empresa */
useEffect(() => {
  if (!isEdited &&  values.typeCompany) {
    if (values.typeCompany === "R") {
      setValues({
        ...values,
        company: "REFICAR",
        ramo: list?.ramoList[2]?.id
      });
    } else {
      setValues({
        ...values,
        company: "ECOPETROL",
        ramo: list?.ramoList[4]?.id
      });
    }
  }
}, [values.typeCompany, list]);

  useEffect(() => {
    setValues({
        ...values,
        materialName: "",
    });
  }, [values.materialType]);

  useEffect(() => {
    getCompanyMDS();
  }, []);

  const printError = (error) => {
    if (error.length > 0) {
      return error[0];
    } else {
      return "";
    }
  };
  
useEffect(()=>{
  if (values.company==="ECOPETROL") {
    setValues({ ...values, ramo: list?.ramoList[2]?.id }); 
  } else if (values.company==="REFICAR") {
    setValues({ ...values, ramo: list?.ramoList[4]?.id }); 
  }
},[values.company, values.typeCompany, list.ramoList])

  const typeCrudo = `Para CRUDOS se debe ingresar así: CRUDO + "espacio" + [NOMBRE DEL MATERIAL]`;
  const typeGas = `Para GAS se debe ingresar así: GAS + "espacio" + [NOMBRE DEL MATERIAL]`;
  const typeProdu = `Para PRODUCTO es libre, sin niguna regla: [NOMBRE DEL MATERIAL]`
  const longText = `
  El nombre del material debe cumplir con unas reglas específicas como por ejemplo: 
  \n${values.materialType
      ? values.materialType === "ZCRU_E" || values.materialType === "ZCRU_R"
        ? typeCrudo
        : values.materialType === "ZGAS_E" || values.materialType === "ZGAS_R"
          ? typeGas
          : typeProdu
      : '[TIPO MATERIAL] + "espacio" + [NOMBRE DEL MATERIAL]'
    }
  `;

  return (
    <>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <HeaderDataInfo
              typeCompany = {values.typeCompany}
              materialType = {values.materialType}
              businessArea = {""}
            /> 
          </Grid>
          <TitlePage tittle={"Datos iniciales"} tooltip={"texto de ayuda"}/>
          
          <Grid item xs={4}>
              <SearchSelect
                isRequired={true}
                label={"Empresa"}
                isDisabled={isEdited}
                listOpt={companyMDS}
                errors={printError(errorField.typeCompany)}
                placeholder="Seleccione la empresa"
                valueId={values.typeCompany}
                autoFocus={true}
                optionList={"typeCompany"}
                onChange={changeData}
              />
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isRequired={true}
              label={"Tipo de material"}
              errors={printError(errorField.materialType)}
              listOpt={list.materialTypeList}
              isDisabled={!list.materialTypeList.length}
              valueId={values.materialType}
              optionList={"materialType"}
              onChange={changeData}
              placeholder="Seleccione el tipo de material"
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <InputCustom
              disabled={values.materialType === ""}
              required={true}
              label={"Nombre material"}
              name={"materialName"}
              value={(values.materialName).toUpperCase()}
              onChange={changeData}
              errors={errorField.materialName}
              showCharacters={true}
              textTooltip={longText}
              widthInput={"fullInput"}
              lengthCharacters={values.materialName}
              max={40}
            />
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isRequired={true}
              label={"Ramo"}
              errors={printError(errorField.ramo)}
              listOpt={list.ramoList}
              isDisabled={!values.materialType}
              valueId={values.ramo}
              optionList={"ramo"}
              onChange={changeData}
              placeholder="Seleccionar"
            />
          </Grid>
      </Grid>
    </>
  );
};
