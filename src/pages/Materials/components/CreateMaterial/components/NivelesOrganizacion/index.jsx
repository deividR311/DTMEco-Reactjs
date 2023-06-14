import * as React from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo } from "../../../../widgets/HeaderDataInfo";
import { StorageLogisticCenter, TitlePage } from "../../../../widgets";
import { Button } from "@material-ui/core";
import { ValidarConfiguracionCampo } from "../../ConfiguracionValidacion";


//InitialState HOOK
 const initialState = {
   center: "",
   labelCenter: "",
   labelStore:"",
   store: "",
   logisticCenterstoreList:[],
 };

export const NivelesOrganizacion = ({
  setForm,
  isEdited,
  dataEdit,
  isSubmitting,
  setIsSubmitting,
  setError,
  typeCompany,
  materialType,
  materialName
}) => {

  //*****************************>
  //ReactContext
  //---MATERIALES
  const materialContext = useContext(MaterialContext);
  const { LIST_MDS, dataNivelesOrganizacion,  setDataNivelesOrganizacion, configurationInputs} = materialContext;

  //<*************

    //useState
    const [list, setList] = useState({
      centerList: [],
      storeList: [],
      businessProcessList: []
    });

    const [values, setValues] = useState(initialState);

    useEffect(() => {
      
      if (Object.keys(dataNivelesOrganizacion).length !== 0) {
          setValues({...dataNivelesOrganizacion});
          
          if(dataNivelesOrganizacion.logisticCenterstoreList.length > 0 ){
            let _errors = [];
            dataNivelesOrganizacion.logisticCenterstoreList.map((row)=>{      
              let error = {}; 
              
              if(row.businnessProcessList.length>0){
                error[row.id] = [];
              }else{
                error[row.id] = ["Este campo es requerido"];
              }
              
              _errors.push(error); 
            })
            
            setErrorlogisticCenterstoreList(_errors);
          }
      }
    },[]);

    const [errorField, setErrorField] = useState(() =>
  Object.keys(initialState).reduce((acum, key) => {
    acum[key] = [];
    return acum;
  }, {})
);

const [confiCampos, setConfiCampos] = useState({
  center: ((ValidarConfiguracionCampo("Center",configurationInputs).existeCampo === false) ? !values.logisticCenterstoreList.length : ValidarConfiguracionCampo("Center",configurationInputs).isRequired ),
  store: ((ValidarConfiguracionCampo("Sector",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Sector",configurationInputs).isRequired),
});

const [ErrorlogisticCenterstoreList, setErrorlogisticCenterstoreList] = useState([])

useEffect(() => {
  if (isSubmitting) {
    const value = Object.values(errorField).every(
      (data) => data.length == 0 && data !== ""
    );
    
    let valueBusinessProcess = false;
    if(ErrorlogisticCenterstoreList.length > 0){
      valueBusinessProcess = ErrorlogisticCenterstoreList.every(
        (data) => { 
          return Object.values(data)[0].length == 0
        }
      );
    }
    
    if (value && valueBusinessProcess) {
      setForm(values);
      setDataNivelesOrganizacion(values);
    }
  }
  setIsSubmitting(false);
}, [errorField,ErrorlogisticCenterstoreList]);

const changeData = (e) => {
  const { name, value } = e.target;
  const {label} = e;

  switch (name) {
    case "center":
      setValues({ ...values, [name]: value,
        labelCenter: label
       });
      break;
    case "store":
      setValues({ ...values, [name]: value,
        labelStore: label
       });
      break;
    default:
      setValues({ ...values, [name]: value
       });
       break;
  }
};

useEffect(() => {
  if (isSubmitting) {
    submitValidate();
  }
}, [isSubmitting]);

const submitValidate = () => {
  const errors = {};

  errors["center"] =  validateError(values["center"], values, confiCampos["center"])["center"]();
  errors["store"] =  validateError(values["store"], values, confiCampos["store"])["store"]();
  setErrorField(errors);
};

const printError = (error) => {
  if (error.length > 0) {
    return error[0];
  } else {
    return "";
  }
};

const handleDeleteCenterStore = (row, id) => {
  let dataCenterStoreList = values.logisticCenterstoreList;

  let center =  dataCenterStoreList.find(center => center.id === row.id);
  let list = center.subrows.filter(function(element){ 
     return element.id != id; 
 });

  if(list.length===0){
    let newCenterList = dataCenterStoreList.filter(center => center.id !== row.id);

    setValues({...values,
      logisticCenterstoreList: newCenterList
    });
  }else{
    center.subrows = list;

    setValues({...values,
     logisticCenterstoreList: dataCenterStoreList
   });
  }
 };


const handleClickAddCenterStore = () => {

if (values.center!=="" && values.store!=="" && values.labelCenter!=="" && values.labelStore!==""){
  let dataCenterStoreList = values.logisticCenterstoreList;

  let center = dataCenterStoreList.find(center => center.id === values.center);

  if (center){
    let store = center.subrows.find(store => store.id === values.store);

    if (!store){
      const newStore =
      {
        store: values.labelStore,
        id: values.store,
      }
      dataCenterStoreList.find(center => center.id === values.center).subrows.push(newStore);
        setValues({...values,
          logisticCenterstoreList: dataCenterStoreList
        })
    }
  }else{
    const logisticCenterStoreRow = {
      businnessProcessList: [],
      logisticCenter:values.labelCenter,
      id :values.center,
      subrows: [
        {
          store: values.labelStore,
          id: values.store,
        }
      ]
    };

    dataCenterStoreList.push(logisticCenterStoreRow);

    setValues({...values,
      logisticCenterstoreList: dataCenterStoreList
    })

  }
}

};

  /* Se hace un filtro a la lista que viene de MDS 
  y se agrega a un objecto para mostrar en el select */
  useEffect(() => {
    try {
      if (LIST_MDS.length) {
        /* LISTA CENTRO */
        const Centro = LIST_MDS.filter(
          (element) => element.listName === "Centro"
        );

        const ProcesoNegocio = LIST_MDS.filter(
          (element) => element.listName === "ProcesoNegocio"
        );

        setList({
          ...list,
          centerList: Centro[0].list[0].values,
          businessProcessList: ProcesoNegocio[0].list[0].values,
        });
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
    }
  }, [LIST_MDS]);

  /* useEffect está escuchando a VALUES y valida cuando se selecciona 
  un valor en la lista de centro y hace filtro en almacen por centro*/
  useEffect(() => {
    try {
      if (values.center !== "") {
        setValues({
          ...values,
          store: ""
        });
        if (LIST_MDS.length) {
          /* LISTA ALMACÉN */
          const Almacen = LIST_MDS.filter(
            (element) => element.listName === "Almacen"
          );
          if (Almacen.length) {
            if (Almacen[0].list.length) {
              if (Almacen[0].list[0].values.length) {
                const store = Almacen[0].list[0].values.filter(
                  (element) => element.id === values.center
                );
                  setList({
                    ...list,
                    storeList: store[0] ? store[0].subValues : [],
                  });
                }
            }
          }
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
    }
  }, [values.center]);


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
          <TitlePage tittle={"Niveles de organización"} tooltip={"Texto de apoyo"}/>
          <Grid item xs={4}>{((ValidarConfiguracionCampo("Center",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Center",configurationInputs).isVisible ) &&
            <SearchSelect
              isRequired={((ValidarConfiguracionCampo("Center",configurationInputs).existeCampo === false) ? !values.logisticCenterstoreList.length : ValidarConfiguracionCampo("Center",configurationInputs).isRequired ) }
              label={"Centro"}
              isDisabled={((ValidarConfiguracionCampo("Center",configurationInputs).existeCampo === false) ? isEdited : !ValidarConfiguracionCampo("Center",configurationInputs).isEnabled)}
              listOpt={list.centerList}
              errors={printError(errorField.center)}
              placeholder="Seleccione un centro"
              valueId={values.center}
              autoFocus={true}
              optionList={"center"}
              onChange={changeData}
            />}
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isRequired={ !values.logisticCenterstoreList.length }
              label={"Almacén"}
              isDisabled={isEdited}
              listOpt={list.storeList}
              errors={printError(errorField.store)}
              placeholder="Seleccione un almacén"
              valueId={values.store}
              optionList={"store"}
              onChange={changeData}
            />
          </Grid>
          <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickAddCenterStore}
            className="ButtonAdd"
          >
            Agregar
          </Button>
          </Grid>
          <Grid item xs={4}></Grid>
            <StorageLogisticCenter
            titleColumns={["Centro logístico", "Código", "No almacenes", "Proceso de negocio"]}
            titleSubColumns={["Almacén", "Código"]}
            rows = {values.logisticCenterstoreList}
            handleDelete = {handleDeleteCenterStore}
            businessProcessList = {list.businessProcessList}
            setRows= {setValues}
            values = {values}
            isRequired = {((ValidarConfiguracionCampo("BusinessProcess",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("BusinessProcess",configurationInputs).isRequired )}
            ErrorlogisticCenterstoreList={ErrorlogisticCenterstoreList}
            setErrorlogisticCenterstoreList={setErrorlogisticCenterstoreList}
            ></StorageLogisticCenter>
        <Grid item xs={12}></Grid>
        </Grid>
          
    </>
  );
};
