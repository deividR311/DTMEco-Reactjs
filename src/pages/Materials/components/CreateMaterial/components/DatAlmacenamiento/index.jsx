import * as React from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo } from "../../../../widgets/HeaderDataInfo";
import { CheckboxCommon }  from "../../../../../../sharedComponents/"
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
import { StateColor, TitlePage } from "../../../../widgets";
import { ValidarConfiguracionCampo } from "../../ConfiguracionValidacion";

//InitialState HOOK
const initialState = {
  expirationDateIndicator: "",
  indicatorDatePeriodicExpiration: "D",
  indicatorSubjectLot: false,
  storageConditions: ""

};

export const DatAlmacenamiento = ({
  setForm,
  isEdited,
  dataEdit,
  setError,
  isSubmitting,
  setIsSubmitting,
  typeCompany,
  materialType,
  materialName,
  logisticCenterstoreList
}) => {
  //HOOK
  // const { error, values, setValues, handleInputs, submitValidate } =
  //   useValidateForm(initialState, schema);

  //*****************************>
  //ReactContext
  //---MATERIALES
  const materialContext = useContext(MaterialContext);
  const { LIST_MDS, dataDatAlmacenamiento, setDataDatAlmacenamiento,configurationInputs } = materialContext;

  //<*************

  //useState
  const [list, setList] = useState({
    benefitCenterList: [],
    expirationDateIndicatorList: [],
    outputMeasurementUnitList: [],
    storageConditionsList: []
  });

  const [values, setValues] = useState(initialState);
  const [panelTab, setPanelTab] = useState('1');

  const [errorField, setErrorField] = useState(() =>
    Object.keys(initialState).reduce((acum, key) => {
      acum[key] = [];
      return acum;
    }, [])
  );

  const getCenterListStorage = (type = 1) =>{
    let centerList = [];

    logisticCenterstoreList.map(element => {
      centerList.push( {
        id: element.id,
        name: element.logisticCenter.split(" - ")[1],
        open: (type===1 ? false : []),

        outputMeasurementUnit:(type===1 ? "" : []),
        benefitCenter:(type===1 ? "" : []),
        negativeStockCenter: (type===1 ? "" : [])

      });

    });
    return {
      centerList: centerList
    };
  }

  const [valuesStorageByCenter, setValuesStorageCenter] = useState({
    centerList: getCenterListStorage(1).centerList
  });

  useEffect(() => {
    if (Object.keys(dataDatAlmacenamiento).length !== 0) {

      const removeCenterList = 'centerList';
      const { [removeCenterList]: removeOne, ...valuesData } = dataDatAlmacenamiento;
      setValues({...valuesData});
      setValuesStorageCenter({centerList: dataDatAlmacenamiento.centerList});
    }
  },[]);

  const [errorFieldStorageCenter, setErrorFieldStorageCenter] = useState({
    centerList: getCenterListStorage(2).centerList
  });

  const [fieldGeneralRequerid, setFieldGeneralRequerid] = useState({
    storageConditions:((ValidarConfiguracionCampo("StorageCondition",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("StorageCondition",configurationInputs).isRequired ),
    indicatorDatePeriodicExpiration:((ValidarConfiguracionCampo("ExpirationPeriod",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ExpirationPeriod",configurationInputs).isRequired ),
    expirationDateIndicator:((ValidarConfiguracionCampo("ExpirationDateIndicator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ExpirationDateIndicator",configurationInputs).isRequired ), 
  })
  const [fieldCenterRequerid, setFieldCenterRequerid] = useState({
    outputMeasurementUnit:((ValidarConfiguracionCampo("OutputMeasurementUnit",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("OutputMeasurementUnit",configurationInputs).isRequired ),
    benefitCenter:((ValidarConfiguracionCampo("ProfitCenter",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProfitCenter",configurationInputs).isRequired ),
    
  })

  useEffect(() => {
    if (isSubmitting) {
      const errorValue = Object.values(errorField).every(
        (data) => data.length == 0 && data !== ""
      );

        //center validation error
      const errorDataStorageCenter = [];
      let errorFieldStorageCenterTemp = JSON.parse(JSON.stringify(errorFieldStorageCenter));
      
      errorFieldStorageCenterTemp.centerList.map( element => {
        element.id = [];
        element.name = [];
        errorDataStorageCenter.push(Object.values(element).every(
          (data) => data.length == 0 && data !== ""
        ));
      });

      const errorDataStorageCenterResult = Object.values(errorDataStorageCenter).every(
        (data) => data
      );
      
      if ( errorDataStorageCenterResult && errorValue) {
        setForm({
          ...valuesStorageByCenter,
          ...values
        });
        setDataDatAlmacenamiento({
          ...valuesStorageByCenter,
          ...values
        });
      }
    }
    setIsSubmitting(false);
  }, [errorFieldStorageCenter,errorField]);

  const changeDataStorageByCenter= (e) => {
    const { name, value } = e.target;
    const [center, nameField] = name.split('.', 2);
    
    let listErrorData = errorFieldStorageCenter;
    let valuesData = valuesStorageByCenter;

    let errorCenter = listErrorData.centerList.find( e => e.id === center);
    let valueCenter = valuesData.centerList.find( e => e.id === center);

    setErrorFieldStorageCenter(() => {
      const validations = validateError(value, valueCenter,fieldCenterRequerid[nameField])[nameField]() ;
      errorCenter[nameField] = validations;
      return { ...listErrorData};
    });
    valueCenter[nameField]= value;
    setValuesStorageCenter({ ...valuesData });
  };

  const handleOpenCenter = (row) =>{
    let dataCenterList = JSON.parse(JSON.stringify(valuesStorageByCenter));
    let valueDataCenter = dataCenterList.centerList.find( x => x.id === row.id);
    valueDataCenter.open =  !valueDataCenter.open;
    setValuesStorageCenter(dataCenterList);
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
    submitValidate();
  }
}, [isSubmitting]);

const submitValidate = () => {

  const errors = {};
  Object.keys(initialState).forEach((data) => {
    errors[data] = validateError(values[data], values)[data] ? validateError(values[data], values,fieldGeneralRequerid[data])[data]() : [];
  });

  let errorFieldStorageCenterTemp = JSON.parse(JSON.stringify(errorFieldStorageCenter));
  errorFieldStorageCenterTemp.centerList.map( element => {
    let dataCenter = valuesStorageByCenter.centerList.find( x => x.id === element.id);

    Object.keys(element).forEach((data) => {
      if (!['id','name'].includes(data))
      element[data] = validateError(dataCenter[data], dataCenter)[data] ? validateError(dataCenter[data], dataCenter,fieldCenterRequerid[data])[data]() : [];
    });
  });

  setErrorFieldStorageCenter(errorFieldStorageCenterTemp);
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

const handleCenterCheckedChange = (event) => {
  const { name, checked } = event.target;
  const [center, nameField] = name.split('.', 2);

  let valuesData = valuesStorageByCenter;
  let valueCenter = valuesData.centerList.find( e => e.id === center);
  valueCenter[nameField]= checked;
  setValuesStorageCenter({ ...valuesData });
}

const handleChange = (event, newPanelTab) => {
  setPanelTab(newPanelTab);
};

  /* Se hace un filtro a la lista que viene de MDS 
  y se agrega a un objecto para mostrar en el select */
  useEffect(() => {
    try {
      if (LIST_MDS !== undefined) {
        if (LIST_MDS.length) {
          /* LISTA CENTRO DE BENEFICIO */
          const CentroBeneficio = LIST_MDS.filter(
            (element) => element.listName === "CentroBeneficio"
          );

          const UnidadMedidaSalida = LIST_MDS.filter(
            (element) => element.listName === "UnidadMedidaBase"
          );

          const CondicionesAlmacenaje = LIST_MDS.filter(
            (element) => element.listName === "CondicionesAlmacenaje"
          );

          const IndicadorFechaPCaducidad = LIST_MDS.filter(
            (element) => element.listName === "IndicadorFechaPCaducidad"
          );

          const FechaDeCaducidadFechaDeExpiracion = LIST_MDS.filter(
            (element) => element.listName === "FechadecaducidadFechadeexpiracion"
          );

          setList({
            benefitCenterList: CentroBeneficio[0].list[0].values,
            outputMeasurementUnitList: UnidadMedidaSalida[0].list[0].values.filter((e)=> e.id === materialType)[0].subValues,
            expirationDateIndicatorList: FechaDeCaducidadFechaDeExpiracion[0].list[0].values,            
            indicatorDatePeriodicExpirationList: IndicadorFechaPCaducidad[0].list[0].values,
            storageConditionsList: CondicionesAlmacenaje[0].list[0].values,
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
            {row.name}
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
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("OutputMeasurementUnit",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("OutputMeasurementUnit",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("OutputMeasurementUnit",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("OutputMeasurementUnit",configurationInputs).isRequired )}
                        label={"Unidad med. salida"}
                        isDisabled={((ValidarConfiguracionCampo("OutputMeasurementUnit",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("OutputMeasurementUnit",configurationInputs).isEnabled)}
                        listOpt={list.outputMeasurementUnitList}                        
                        errors={printError(errorFieldStorageCenter.centerList.find( x => x.id === row.id).outputMeasurementUnit)}
                        placeholder="Seleccione una unidad med. salida"
                        valueId={row.outputMeasurementUnit}
                        optionList={`${row.id}.outputMeasurementUnit`}
                        onChange={changeDataStorageByCenter}
                      />}
                    </Grid>
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("ProfitCenter",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProfitCenter",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("ProfitCenter",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProfitCenter",configurationInputs).isRequired )}
                        label={"Centro Beneficio"}
                        isDisabled={((ValidarConfiguracionCampo("ProfitCenter",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("ProfitCenter",configurationInputs).isEnabled)}
                        listOpt={list.benefitCenterList}                        
                        errors={printError(errorFieldStorageCenter.centerList.find( x => x.id === row.id).benefitCenter)}
                        placeholder="Seleccione un centro"
                        valueId={row.benefitCenter}
                        autoFocus={true}
                        optionList={`${row.id}.benefitCenter`}
                        onChange={changeDataStorageByCenter}
                      />}
                    </Grid>
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("NegativeStockAllowedInPlant",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("NegativeStockAllowedInPlant",configurationInputs).isVisible ) && 
                      <CheckboxCommon              
                        handleChange={handleCenterCheckedChange}
                        label={"Stock negativo centro"}
                        checked={row.negativeStockCenter} 
                        name = {`${row.id}.negativeStockCenter`}
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
          <TitlePage tittle={"Almacenamiento"} tooltip={"texto de ayuda"}/>
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
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("StorageCondition",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("StorageCondition",configurationInputs).isVisible ) && 
                      <SearchSelect
                        label={"Condiciones de almacenaje"}
                        isDisabled={((ValidarConfiguracionCampo("StorageCondition",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("StorageCondition",configurationInputs).isEnabled)}
                        isRequired={((ValidarConfiguracionCampo("StorageCondition",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("StorageCondition",configurationInputs).isRequired )}
                        listOpt={list.storageConditionsList}
                        errors={printError(errorField.storageConditions)}
                        placeholder="Seleccione un almacenaje"
                        valueId={values.storageConditions}
                        optionList={"storageConditions"}
                        onChange={changeData}
                      />}
                    </Grid>                    
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("ExpirationPeriod",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ExpirationPeriod",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("ExpirationPeriod",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ExpirationPeriod",configurationInputs).isRequired )}
                        label={"Indicador Periodo Fecha Caducidad"}                        
                        isDisabled={((ValidarConfiguracionCampo("ExpirationPeriod",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("ExpirationPeriod",configurationInputs).isEnabled)}
                        listOpt={list.indicatorDatePeriodicExpirationList}
                        errors={printError(errorField.indicatorDatePeriodicExpiration)}
                        placeholder="Seleccione una fecha"
                        valueId={values.indicatorDatePeriodicExpiration}
                        optionList={"indicatorDatePeriodicExpiration"}
                        onChange={changeData}
                      />}
                    </Grid>
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("ExpirationDateIndicator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ExpirationDateIndicator",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("ExpirationDateIndicator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ExpirationDateIndicator",configurationInputs).isRequired )}
                        label={"Indicador Periodo Fecha Expiración"}
                        isDisabled={((ValidarConfiguracionCampo("ExpirationDateIndicator",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("ExpirationDateIndicator",configurationInputs).isEnabled)}
                        listOpt={list.expirationDateIndicatorList}
                        errors={printError(errorField.expirationDateIndicator)}
                        placeholder="Seleccione una fecha"
                        valueId={values.expirationDateIndicator}
                        optionList={"expirationDateIndicator"}
                        onChange={changeData}
                      />}
                    </Grid>
                    <Grid item xs={4}>{((ValidarConfiguracionCampo("BatchSubjectIndicator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("BatchSubjectIndicator",configurationInputs).isVisible ) && 
                      <CheckboxCommon              
                        handleChange={handleCheckedChange}
                        disabled={((ValidarConfiguracionCampo("BatchSubjectIndicator",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("BatchSubjectIndicator",configurationInputs).isEnabled)}
                        label={"Indicador: Sujeto a lote "}
                        checked={values.indicatorSubjectLot}
                        name = {"indicatorSubjectLot"} 
                      />}
                    </Grid>              
                  </Grid>
                </TabPanel>
                <TabPanel value="2">                  
                  <Grid container spacing={4}>

                    <CenterGrid 
                      titleColumns={["Centro logístico", "Código", "Estado"]}
                      rows = {valuesStorageByCenter.centerList}
                    />
                    
                  </Grid>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
          
        </Grid>
    </>
  );
};
