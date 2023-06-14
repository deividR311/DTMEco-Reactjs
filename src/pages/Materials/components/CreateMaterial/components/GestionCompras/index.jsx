import * as React from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo, InputCustom, StateColor, TitlePage } from "../../../../widgets";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ValidarConfiguracionCampo } from "../../ConfiguracionValidacion";

//InitialState HOOK
const initialState = {
  umpVariable: "",
  manufacturingPartsProfile: "",
  purchasingValueKey: "",
  orderUnitmeasure: "",
  typePurchaseName: ""
};

export const GestionCompras = ({
  setForm,
  isEdited,
  dataEdit,
  setError,
  isSubmitting,
  typeCompany,
  materialType,
  materialName,
  setIsSubmitting,
  typePurchase,
  logisticCenterstoreList
}) => {
  //HOOK
  // const { error, values, setValues, handleInputs, submitValidate } =
  //   useValidateForm(initialState, schema);

  //*****************************>
  //---MATERIALES
  const materialContext = useContext(MaterialContext);
  const { LIST_MDS, dataGestionCompras, setDataGestionCompras, configurationInputs } = materialContext;

  //<*************
  const getCenterList = (type = 1) =>{
    let centerList = [];

    logisticCenterstoreList.map(element => {
      centerList.push( {
        id: element.id,
        name: element.logisticCenter,
        statusMaterialSpecificCenter: (type===1 ? "" : []),
        shoppingGroup: (type===1 ? "" : []),
        open: (type===1 ? false : [])
    });

  });
  return {
    centerList: centerList
  };
}

    
const [valuesPurchaseByCenter, setValuesPurchaseByCenter] = useState({
  centerList: getCenterList(1).centerList
});

const [errorFieldPurchaseByCenter, setErrorFieldPurchaseByCenter] = useState({
  centerList: getCenterList(2).centerList
});
  
  const [panelTab, setPanelTab] = useState('1');

  const [list, setList] = useState({
    shoppingGroupList: [],
    umpVariableList: [],
    manufacturingPartsProfileList:[],
    statusMaterialSpecificCenter: [],
    purchasingValueKeyList: [],
    orderUnitmeasureList: [],
  });

  const [values, setValues] = useState(initialState);

  
  useEffect(() => {

    const tipoCompra = LIST_MDS.filter(
      (element) => element.listName === "TipoCompra"
     )[0]?.list[0]?.values?.filter( e => e.id === typePurchase)[0]?.name;


    if (Object.keys(dataGestionCompras).length !== 0) {
      const removeCenterList = 'centerList';
      const { [removeCenterList]: removeOne, ...valuesData } = dataGestionCompras;

      setValues({...valuesData, typePurchaseName: tipoCompra});
      setValuesPurchaseByCenter({centerList: dataGestionCompras.centerList});
    }else{
      setValues({
        ...values,
        typePurchaseName: tipoCompra
      });
    }
    
  },[]);

  const [errorField, setErrorField] = useState(() =>
  Object.keys(initialState).reduce((acum, key) => {
    acum[key] = [];
    return acum;
  }, [])
);

const [fieldGeneralRequerid, setFieldGeneralRequerid] = useState({
  orderUnitmeasure:((ValidarConfiguracionCampo("PurchasingUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingUnitMeasure",configurationInputs).isRequired ),
  umpVariable:((ValidarConfiguracionCampo("UMPVariable",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("UMPVariable",configurationInputs).isRequired ),
  manufacturingPartsProfile:((ValidarConfiguracionCampo("ManufacturingPartsProfile",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ManufacturingPartsProfile",configurationInputs).isRequired ),
  purchasingValueKey:((ValidarConfiguracionCampo("PurchasingValueKey",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingValueKey",configurationInputs).isRequired ),
})

const [fieldCenterRequerid, setFieldCenterRequerid] = useState({
  shoppingGroup:((ValidarConfiguracionCampo("PurchasingGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingGroup",configurationInputs).isRequired ),
  statusMaterialSpecificCenter:((ValidarConfiguracionCampo("MaterialStatusSpecificCenter",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialStatusSpecificCenter",configurationInputs).isRequired ),
})

const changeData = (e) => {
  const { name, value } = e.target;
  setErrorField(() => {
    const validations = validateError(value, values,fieldGeneralRequerid[name])[name]() ;
    return { ...errorField, [name]: validations};
  });
  setValues({ ...values, [name]: value });
};

useEffect(() => {
  if (isSubmitting) {
    const errorValue = Object.values(errorField).every(
      (data) => data.length == 0 && data !== ""
    );

      //center validation error
    const errorDataPurchaseByCenter = [];
    let errorFieldPurchaseByCenterTemp = JSON.parse(JSON.stringify(errorFieldPurchaseByCenter));
    
    errorFieldPurchaseByCenterTemp.centerList.map( element => {
      element.id = [];
      element.name = [];
      errorDataPurchaseByCenter.push(Object.values(element).every(
        (data) => data.length == 0 && data !== ""
      ));
    });

    const errorDataPurchaseByCenterResult = Object.values(errorDataPurchaseByCenter).every(
      (data) => data
    );
    
    if ( errorDataPurchaseByCenterResult && errorValue) {
      setForm({
        ...valuesPurchaseByCenter,
        ...values
      });

      setDataGestionCompras({
        ...valuesPurchaseByCenter,
        ...values
      });
      
    }
  }
  setIsSubmitting(false);
}, [errorFieldPurchaseByCenter, errorField]);

const changeDataPurchaseByCenter= (e) => {
  const { name, value } = e.target;
  const [center, nameField] = name.split('.', 2);

  let listErrorData = errorFieldPurchaseByCenter;
  let valuesData = valuesPurchaseByCenter;

  let errorCenter = listErrorData.centerList.find( e => e.id === center);
  let valueCenter = valuesData.centerList.find( e => e.id === center);

  setErrorFieldPurchaseByCenter(() => {
    const validations = validateError(value, valueCenter,fieldCenterRequerid[nameField])[nameField]() ;
    errorCenter[nameField] = validations;
    return { ...listErrorData};
  });
  valueCenter[nameField]= value;
  setValuesPurchaseByCenter({ ...valuesData });
};

const submitValidate = () => {

  const errors = {};
  Object.keys(initialState).forEach((data) => {
    errors[data] = validateError(values[data], values)[data] ? validateError(values[data], values,fieldGeneralRequerid[data])[data]() : [];
  });
      
  // validation error by center
  const errorDataPurchaseByCenter = [];
  let errorFieldPurchaseByCenterTemp = JSON.parse(JSON.stringify(errorFieldPurchaseByCenter));
  
  errorFieldPurchaseByCenterTemp.centerList.map( element => {
    let dataCenter = valuesPurchaseByCenter.centerList.find( x => x.id === element.id);

    Object.keys(element).forEach((data) => {
      if (!['id','name'].includes(data))
      element[data] = validateError(dataCenter[data], dataCenter)[data] ? validateError(dataCenter[data], dataCenter,fieldCenterRequerid[data])[data]() : [];
    });
  });

  setErrorFieldPurchaseByCenter(errorFieldPurchaseByCenterTemp);
  setErrorField(errors);
};

useEffect(() => {
  if (isSubmitting) {
    submitValidate();
  }
}, [isSubmitting]);

// const submitValidate = () => {
//   const errors = {};
//   Object.keys(initialState).forEach((data) => {
//     errors[data] = validateError(values[data], values)[data] ? validateError(values[data], values)[data]() : [];
//   });
//   setErrorField(errors);
// };

const handleChange = (event, newPanelTab) => {
  setPanelTab(newPanelTab);
};

const handleOpenCenter = (row) =>{
  let dataCenterList = JSON.parse(JSON.stringify(valuesPurchaseByCenter));
  let valueDataCenter = dataCenterList.centerList.find( x => x.id === row.id);
  valueDataCenter.open =  !valueDataCenter.open;
  setValuesPurchaseByCenter(dataCenterList);
};

const getStateColor = (row) => {
  let totalFields = 0;
  let completedFields = 0
  Object.keys(row).forEach((field) => {
    if(!['id','name','open'].includes(field)){
      totalFields++;
      if ( row[field] !== "" ){
        completedFields++;
      }
    }
  });

  if (completedFields === 0) return "red";
  if (completedFields > 0 &&  completedFields < totalFields) return "yellow";
  if (totalFields === completedFields) return "green";
};

const printError = (error) => {
  if (error.length > 0) {
    return error[0];
  } else {
    return "";
  }
};

  /* Se hace un filtro a la lista que viene de MDS 
  y se agrega a un objecto para mostrar en el select */
  useEffect(() => {
    try {
      if (LIST_MDS !== undefined) {
        if (LIST_MDS.length) {
          /* LISTA GRUPO COMPRAS */
          const GrupoCompras = LIST_MDS.filter(
            (element) => element.listName === "GrupoCompras"
          );
          const grupo = GrupoCompras[0].list[0].values.filter(
            (element) => element.id === materialType
          );

          const UMPVar = LIST_MDS.filter(
            (element) => element.listName === "UMPVar"
          );

          const StatusMaterialCentro = LIST_MDS.filter(
            (element) => element.listName === "StatusMaterialCentro"
          );

          const MaterialPerfilPiezasFabricacion = LIST_MDS.filter(
            (element) => element.listName === "MaterialPerfilPiezasFabricacion"
          );

          const ClaveValoresCompras = LIST_MDS.filter(
            (element) => element.listName === "ClaveValoresCompras"
          );

          const UnidadMedidaPedido = LIST_MDS.filter(
            (element) => element.listName === "UnidadMedidaPedido"
          );

          const tipoCompra = LIST_MDS.filter(
            (element) => element.listName === "TipoCompra"
          )[0]?.list[0]?.values?.filter( e => e.id === typePurchase)[0]?.name;

          setValues({
            ...values,
            typePurchaseName: tipoCompra
          });

          setList({
            shoppingGroupList: grupo[0].subValues,
            umpVariableList: UMPVar[0].list[0].values,
            manufacturingPartsProfileList: MaterialPerfilPiezasFabricacion[0].list[0].values,
            statusMaterialSpecificCenterList: StatusMaterialCentro[0].list[0].values,
            purchasingValueKeyList: ClaveValoresCompras [0].list[0].values,
            orderUnitmeasureList: UnidadMedidaPedido[0].list[0].values,
          });
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
    }
  }, [LIST_MDS]);

  function RowCenter({row, disable}) {
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleOpenCenter(row)}  
            >
              {row.open ? <KeyboardArrowUpIcon sx={{ color: '#0F0C5A' }} /> : <KeyboardArrowDownIcon sx={{ color: '#0F0C5A' }}/>}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name.split('-')[1]}
          </TableCell>
          <TableCell>{row.id.split('_')[0]}</TableCell>
          <TableCell><StateColor stateColor={getStateColor(row)}/></TableCell>
        </TableRow>
        <TableRow  style={{ background: '#EFF4FD'  }}>
          <TableCell  colSpan={6}>
            <Collapse in={row.open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("PurchasingGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingGroup",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("PurchasingGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingGroup",configurationInputs).isRequired )}
                        label={"Grupo de compras"}
                        isDisabled={((ValidarConfiguracionCampo("PurchasingGroup",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("PurchasingGroup",configurationInputs).isEnabled)}
                        listOpt={list.shoppingGroupList}
                        errors={printError(errorFieldPurchaseByCenter.centerList.find( x => x.id === row.id).shoppingGroup)}
                        placeholder="Seleccione un grupo de compras"
                        valueId={row.shoppingGroup}
                        optionList={`${row.id}.shoppingGroup`}
                        onChange={changeDataPurchaseByCenter}
                      />}
                    </Grid>
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialStatusSpecificCenter",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialStatusSpecificCenter",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("MaterialStatusSpecificCenter",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialStatusSpecificCenter",configurationInputs).isRequired )}
                        label={"Status material específico centro"}
                        isDisabled={((ValidarConfiguracionCampo("MaterialStatusSpecificCenter",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialStatusSpecificCenter",configurationInputs).isEnabled)}
                        listOpt={list.statusMaterialSpecificCenterList}
                        errors={printError(errorFieldPurchaseByCenter.centerList.find( x => x.id === row.id).statusMaterialSpecificCenter)}
                        placeholder="Seleccione el status material"
                        valueId={row.statusMaterialSpecificCenter}
                        optionList={`${row.id}.statusMaterialSpecificCenter`}
                        onChange={changeDataPurchaseByCenter}
                      />}
                    </Grid>
                </Grid>             
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const CenterGrid = ({
    titleColumns,
    titleSubColumns,
    rows,
    handleDelete,
    disable = false
}) => {

  return (
    <TableContainer style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
      <Table>
        <TableHead  style={{ background: '#5052A3', borderRadius: "10px"}}>
          <TableRow>
            <TableCell  style={{ color: "#FFFFFF", fontWeight: "bold"}}/>
            {titleColumns.map((titleColumn) => (
            <TableCell style={{ color: "#FFFFFF", fontWeight: "bold"}}>{titleColumn} </TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <RowCenter key={row.name} row={row} titleSubColumns={titleSubColumns} handleDelete= {handleDelete} disable= {disable}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
            <TitlePage tittle={"Compras"} tooltip={"Texto de apoyo"}/>
            <Grid item xs={12}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={panelTab}>
                  <Box sx={{  justifyContent: 'center' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                      <Tab label="Información general" value="1" sx={{ width: '50%',  }} style={{ color: panelTab==='1' ? "#FFFFFF" : "#4a4a4a" , fontWeight: "bold" , background: panelTab==='1' ? "#0F0C5A" : "#ebebeb", margin: '5px'}}/>
                      <Tab label="Información por Centro" value="2"  sx={{ width: '50%' }} style={{ color: panelTab==='2' ? "#FFFFFF" : "#4a4a4a", fontWeight: "bold", background:  panelTab==='2' ? "#0F0C5A" : "#ebebeb",margin: '5px'}} />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                  <Grid container spacing={4}>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("PurchasingUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingUnitMeasure",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("PurchasingUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingUnitMeasure",configurationInputs).isRequired )}
                      label={"Unidad de medida de pedido"}
                      isDisabled={((ValidarConfiguracionCampo("PurchasingUnitMeasure",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("PurchasingUnitMeasure",configurationInputs).isEnabled)}
                      listOpt={list.orderUnitmeasureList}
                      errors={printError(errorField.orderUnitmeasure)}
                      placeholder="Seleccione la unidad de medida"
                      valueId={values.orderUnitmeasure}
                      optionList={`orderUnitmeasure`}
                      onChange={changeData}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("UMPVariable",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("UMPVariable",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("UMPVariable",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("UMPVariable",configurationInputs).isRequired )}
                        label={"Unidad var. de med. de ped. act. (UM var)"}
                        isDisabled={((ValidarConfiguracionCampo("UMPVariable",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("UMPVariable",configurationInputs).isEnabled)}
                        listOpt={list.umpVariableList}
                        errors={printError(errorField.umpVariable)}
                        placeholder="Seleccione Um var"
                        valueId={values.umpVariable}
                        optionList={"umpVariable"}
                        onChange={changeData}
                      />}
                    </Grid>
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("ManufacturingPartsProfile",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ManufacturingPartsProfile",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("ManufacturingPartsProfile",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ManufacturingPartsProfile",configurationInputs).isRequired )}
                        label={"Perf. piezas. fab"}
                        isDisabled={((ValidarConfiguracionCampo("ManufacturingPartsProfile",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("ManufacturingPartsProfile",configurationInputs).isEnabled)}
                        listOpt={list.manufacturingPartsProfileList}
                        errors={printError(errorField.manufacturingPartsProfile)}
                        placeholder="Seleccione un Perf. piezas. fab"
                        valueId={values.manufacturingPartsProfile}
                        optionList={"manufacturingPartsProfile"}
                        onChange={changeData}
                      />}
                    </Grid>
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("PurchasingValueKey",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingValueKey",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("PurchasingValueKey",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PurchasingValueKey",configurationInputs).isRequired )}
                        label={"Clave de valores de compra"}
                        isDisabled={((ValidarConfiguracionCampo("PurchasingValueKey",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("PurchasingValueKey",configurationInputs).isEnabled)}
                        listOpt={list.purchasingValueKeyList}
                        errors={printError(errorField.purchasingValueKey)}
                        placeholder="Seleccione la clave"
                        valueId={values.purchasingValueKey}
                        optionList={"purchasingValueKey"}
                        onChange={changeData}
                      />}
                    </Grid>
                    <Grid item xs={4}>
                      <InputCustom
                        required={false}
                        label={"Tipo Compra"}
                        name={"typePurchaseName"}
                        value={values.typePurchaseName}
                        widthInput={"fullInput"}
                        disabled = {true}
                      />
                    </Grid>
                  </Grid>
                  </TabPanel>
                  <TabPanel value="2">
                  <Grid item xs={12}>
                    <CenterGrid 
                      titleColumns={["Centro logístico", "Código", "Estado"]}
                      rows = {valuesPurchaseByCenter.centerList}
                    />
                  </Grid>
                  </TabPanel>
                </TabContext>
              </Box>
            </Grid>
          
        </Grid>
      {/* <div className="formRow contentDistribution_flex-start">
        <div className="formRow__campo">
          <SelectCustom
            required={true}
            label={"Grupo de compras"}
            errors={error.shoppingGroup}
            items={list.shoppingGroupList}
            placeholder="Seleccione el grupo de compras"
            handleInputs={handleInputs("shoppingGroup")}
          />
        </div>
      </div> */}
    </>
  );
};
