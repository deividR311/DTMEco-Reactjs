import * as React from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo } from "../../../../widgets/HeaderDataInfo";
import { SalesOrganizationDistributionChannel, TitlePage } from "../../../../widgets";
import { Button } from "@material-ui/core";

//InitialState HOOK
const initialState = {
  salesOrganization: "",
  distributionChannel: "",
  labelSalesOrganization: "",
  labelDistributionChannel: "",
  salesOrganizationDistributionChannelList: []
};



export const AreaVenta = ({
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
  const { LIST_MDS, dataAreaVenta, setDataAreaVenta } = materialContext;

  //<*************

    //useState
    const [list, setList] = useState({
    //   centerList: [],
    //   storeList: [],
      salesOrganizationList: [],
      distributionChannelList: [],
    });

    const [values, setValues] = useState(initialState);

    useEffect(() => {
      
      if (Object.keys(dataAreaVenta).length !== 0) {
          setValues({...dataAreaVenta});
      }
    },[]);

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
      setDataAreaVenta(values);
    }
  }
  setIsSubmitting(false);
}, [errorField]);

const changeData = (e) => {
  const { name, value } = e.target;
  const {label} = e;
  // setErrorField(() => {
  //   const validations = validateError(value, values)[name]() ;
  //   return { ...errorField, [name]: validations};
  // });

  switch (name) {
    case "distributionChannel":
      setValues({ ...values, [name]: value,
        labelDistributionChannel: label
        });
      break;
    case "salesOrganization":
      setValues({ ...values, [name]: value,
        labelSalesOrganization: label
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

  errors["distributionChannel"] =  validateError(values["distributionChannel"], values)["distributionChannel"]();
  errors["salesOrganization"] =  validateError(values["salesOrganization"], values)["salesOrganization"]();
  setErrorField(errors);
};

const printError = (error) => {
  if (error.length > 0) {
    return error[0];
  } else {
    return "";
  }
};


 const handleDeleteSalesOrganizationDistributionChannel = (row, id) => {
  let salesOrganizationDistributionChannelList = values.salesOrganizationDistributionChannelList;

  let SalesOrganizationDistributionChannel =  salesOrganizationDistributionChannelList.find(SalesOrganizationDistributionChannel => SalesOrganizationDistributionChannel.id === row.id);
  let list = SalesOrganizationDistributionChannel.subrows.filter(function(element){ 
     return element.id != id; 
 });

  if(list.length===0){
    let newSaleDistributionList = salesOrganizationDistributionChannelList.filter(dataRow => dataRow.id !== row.id);

    setValues({...values,
      salesOrganizationDistributionChannelList: newSaleDistributionList
    });
  }else{
    SalesOrganizationDistributionChannel.subrows = list;

    setValues({...values,
      salesOrganizationDistributionChannelList: salesOrganizationDistributionChannelList
   });
  }
 };


const handleClickAddSalesOrganizationDistributionChannel = () => {

  if (values.salesOrganization!=="" && values.distributionChannel!=="" && values.labelSalesOrganization!=="" && values.labelDistributionChannel!==""){
    let salesOrganizationDistributionChannelList = values.salesOrganizationDistributionChannelList;
  
    let salesOrganization = salesOrganizationDistributionChannelList.find(salesOrganization => salesOrganization.id === values.salesOrganization);
  
    if (salesOrganization){
      let distributionChannel = salesOrganization.subrows.find(distributionChannel => distributionChannel.id === values.distributionChannel);
  
      if (!distributionChannel){
        const newDistributionChannel =
        {
          distributionChannel: values.labelDistributionChannel,
          id: values.distributionChannel,
        }
        salesOrganizationDistributionChannelList.find(salesOrganization => salesOrganization.id === values.salesOrganization).subrows.push(newDistributionChannel);
          setValues({...values,
            salesOrganizationDistributionChannelList: salesOrganizationDistributionChannelList
          })
      }
    }else{
      const newRow = {
        salesOrganization : values.labelSalesOrganization,
        id : values.salesOrganization,
        subrows: [
          {
            distributionChannel: values.labelDistributionChannel,
            id: values.distributionChannel,
          }
        ]
      };
  
      salesOrganizationDistributionChannelList.push(newRow);
  
      setValues({...values,
        salesOrganizationDistributionChannelList: salesOrganizationDistributionChannelList
      })
  
    }
  }
  
  };
  

  /* Se hace un filtro a la lista que viene de MDS 
  y se agrega a un objecto para mostrar en el select */
  useEffect(() => {
    try {
      if (LIST_MDS.length) {

        const OrganizacionVentas = LIST_MDS.filter(
          (element) => element.listName === "OrganizacionVentas"
        );

        const CanalDistribucion = LIST_MDS.filter(
          (element) => element.listName === "CanalDistribucion"
        );
        setList({
          ...list,
          salesOrganizationList: OrganizacionVentas[0].list[0].values,
          distributionChannelList: CanalDistribucion[0].list[0].values,
        });
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
        <TitlePage tittle={"Área de ventas"} tooltip={"Texto de apoyo"}/>
        {/* <Grid item xs={12}></Grid> */}
        <Grid item xs={4}>
            <SearchSelect
              isRequired={!values.salesOrganizationDistributionChannelList.length }
              label={"Organización de ventas"}
              isDisabled={isEdited}
              listOpt={list.salesOrganizationList}
              errors={printError(errorField.salesOrganization)}
              placeholder="Seleccione una organización de ventas"
              valueId={values.salesOrganization}
              optionList={"salesOrganization"}
              onChange={changeData}
            />
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              isRequired={ !values.salesOrganizationDistributionChannelList.length }
              label={"Canal de distribución"}
              isDisabled={isEdited}
              listOpt={list.distributionChannelList}
              errors={printError(errorField.distributionChannel)}
              placeholder="Seleccione un canal de distribución"
              valueId={values.distributionChannel}
              optionList={"distributionChannel"}
              onChange={changeData}
            />
          </Grid>
          <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickAddSalesOrganizationDistributionChannel}
            className="ButtonAdd"
          >
            Agregar
          </Button>
          </Grid>
          <Grid item xs={4}></Grid>
            <SalesOrganizationDistributionChannel
            titleColumns={["Organización de ventas", "Código", "No canales de distribución"]}
            titleSubColumns={["Canal de distribución", "Código"]}
            rows = {values.salesOrganizationDistributionChannelList}
            handleDelete = {handleDeleteSalesOrganizationDistributionChannel}
            ></SalesOrganizationDistributionChannel>
        </Grid>
          
    </>
  );
};
