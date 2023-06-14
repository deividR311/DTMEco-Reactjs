import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { InputCustom } from "../../../../widgets";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo } from "../../../../widgets/HeaderDataInfo";
import { CheckboxCommon }  from "../../../../../../sharedComponents/";
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
  standardPrice: "",
  ratingCategory: "",
  variablePrice: "",
  materialLedger: false,
  valuationType: "",
  valuationClass: "",
  materialPriceDetermination: "2",
  priceControlIndicator: "",
  unitPrice: ""
};

export const Contabilidad = ({
  setForm,
  isEdited,
  dataEdit,
  setError,
  isSubmitting,
  setIsSubmitting,
  typeCompany,
  materialType,
  materialName,
  company,
  logisticCenterstoreList
}) => {

//TODO:Hace falta la precarga de todos los campos relacionados en el Excel de la HU254
  //*****************************>
  //ReactContext
  //---MATERIALES
  const materialContext = useContext(MaterialContext);
  const { LIST_MDS, dataContabilidad, setDataContabilidad,configurationInputs } = materialContext;

  //<*************

  /* Se asignan los valores por defecto
   dependiendo de la empresa */
  // useEffect(() => {
  //   if (!isEdited) {
  //     if (typeCompany === "R") {
  //       if (materialType !== "FERT_R") {
  //         setValues({
  //           ...values,
  //           standardPrice: 0,
  //         });
  //       }
  //     }
  //   }
  // }, [typeCompany]);


  const [list, setList] = useState({
    ratingCategoryList: [],
    valuationTypeList: [],
    valuationAreaList: [],
    valuationClassList: [],
    materialPriceDeterminationList: [],
    priceControlIndicatorList: [],
  });

  const getAccountingListCostList = (type = 1) =>{
    let accounting = [];
    let cost = [];

    logisticCenterstoreList.map(element => {
      accounting.push( {
        id: element.id,
        name: element.logisticCenter.split(" - ")[1],                 
        open: (type===1 ? false : []),
        company:company,
        materialType:materialType,
        valuationType: (type===1 ? (typeCompany==="E" ? "" : "B_R") : []),
        ratingCategory: (type===1 ? "" : []),
        valuationClass: (type===1 ? "" : []),
        materialLedger: (type===1 ? "" : []),
        materialPriceDetermination: (type===1 ? "2" : []),
        priceControlIndicator: (type===1 ? (typeCompany==="E" ? "S_E" : "V_R") : []),
        variablePrice: (type===1 ? "" : []),
        standardPrice: (type===1 ? "" : []),
        unitPrice: (type===1 ? "" : [])
      });     
    });

    logisticCenterstoreList.map(element => {
      cost.push({
        id: element.id,
        name: element.logisticCenter.split(" - ")[1],
        open: (type===1 ? false : []),
        company:company,
        materialType:materialType,
        variancekey: (type===1 ? "" : []),
        costingLotSize: (type===1 ? "" : []),
        withQtyStructure: (type===1 ? 1 : []),
        doNotCost: (type===1 ? "" : []),
        materialRelatedOrigin: (type===1 ? "" : []),
      });
    });
    
    return {
      accounting: accounting,
      cost: cost
    };
  }

  const [valuesTabAccounting, setValuesTabAccounting] = useState({
    accounting: getAccountingListCostList(1).accounting
  });
  const [errorFieldAccounting, setErrorFieldAccounting] = useState({
    accounting: getAccountingListCostList(2).accounting
  });

  const [valuesTabCost, setValuesTabCost] = useState({
    cost: getAccountingListCostList(1).cost
  });

  const [errorFieldCost, setErrorFieldCost] = useState({
    cost: getAccountingListCostList(2).cost
  });

  // const [values, setValues] = useState({...initialState, materialType, company, typeCompany});

  useEffect(() => {
    if (Object.keys(dataContabilidad).length !== 0) {

      setValuesTabAccounting({accounting: dataContabilidad.accounting});
      setValuesTabCost({cost: dataContabilidad.cost});
    }
  },[]);

  const [panelTab, setPanelTab] = useState('1');

  const [inputFocus, setInputFocus] = useState({"name":false});

  const [fieldContabilidadRequerid, setFieldContabilidadRequerid] = useState({
    valuationType:((ValidarConfiguracionCampo("ValuationType",configurationInputs).existeCampo === false) ? typeCompany==="E" ? false : true : ValidarConfiguracionCampo("ValuationType",configurationInputs).isRequired ),
    ratingCategory:((ValidarConfiguracionCampo("ValuationCategory",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValuationCategory",configurationInputs).isRequired ),
    valuationClass:((ValidarConfiguracionCampo("ValuationClass",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValuationClass",configurationInputs).isRequired ),
    materialPriceDetermination:((ValidarConfiguracionCampo("MaterialPriceDetermination",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialPriceDetermination",configurationInputs).isRequired ),
    priceControlIndicator:((ValidarConfiguracionCampo("PriceControlIndicator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PriceControlIndicator",configurationInputs).isRequired ),
    variablePrice:((ValidarConfiguracionCampo("MovingAveragePrice",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MovingAveragePrice",configurationInputs).isRequired ),
    standardPrice:((ValidarConfiguracionCampo("StandardPrice",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("StandardPrice",configurationInputs).isRequired ),
    unitPrice:((ValidarConfiguracionCampo("PriceUnit",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PriceUnit",configurationInputs).isRequired ),

  })
  const [fieldCostRequerid, setFieldCostRequerid] = useState({
    variancekey:((ValidarConfiguracionCampo("VarianceKey",configurationInputs).existeCampo === false) ? typeCompany==="E" ? false : true : ValidarConfiguracionCampo("VarianceKey",configurationInputs).isRequired ),
    costingLotSize:((ValidarConfiguracionCampo("CostingLotSize",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("CostingLotSize",configurationInputs).isRequired )
  })

  const handleCheckedChangeAccounting = (event) => {
    const { name, checked } = event.target;
    const [center, nameField] = name.split('.', 2);

    let valuesData = valuesTabAccounting;
    let valueStore = valuesData.accounting.find( e => e.id === center);
    valueStore[nameField]= checked;
    setValuesTabAccounting({ ...valuesData });
    
  };

  const handleCheckedChangeCost = (event) => {
    const { name, checked } = event.target;
    const [center, nameField] = name.split('.', 2);

    let valuesData = valuesTabCost;
    let valueStore = valuesData.cost.find( e => e.id === center);
    valueStore[nameField]= checked;
    setValuesTabCost({ ...valuesData });
    
  };

  useEffect(() => {
    if (isSubmitting) {

      //Accounting validation error
      const errorDataTabAccounting = [];
      let errorFieldTabAccountingTemp = JSON.parse(JSON.stringify(errorFieldAccounting));
      
      errorFieldTabAccountingTemp.accounting.map( element => {
        element.id = [];
        element.name = [];
        errorDataTabAccounting.push(Object.values(element).every(
          (data) => data.length == 0 && data !== ""
        ));
      });

      //Cost validation error
      const errorDataTabCost = [];
      let errorFieldTabCostTemp = JSON.parse(JSON.stringify(errorFieldCost));
      
      errorFieldTabCostTemp.cost.map( element => {
        element.id = [];
        element.name = [];
        errorDataTabCost.push(Object.values(element).every(
          (data) => data.length == 0 && data !== ""
        ));
      });

      const errorDataTabAccountingResult = Object.values(errorDataTabAccounting).every(
        (data) => data
      );

      const errorDataTabCostResult = Object.values(errorDataTabCost).every(
        (data) => data
      );

      if (errorDataTabAccountingResult,errorDataTabCostResult) {
        setForm({
          ...valuesTabAccounting,
          ...valuesTabCost
        });
        setDataContabilidad({
          ...valuesTabAccounting,
          ...valuesTabCost
        });
      }
    }
    setIsSubmitting(false);
  }, [errorFieldAccounting,errorFieldCost]);


  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);

  const submitValidate = () => {
    
    // validation error by accounting
    let errorFieldTabAcountingTemp = JSON.parse(JSON.stringify(errorFieldAccounting));
        
    errorFieldTabAcountingTemp.accounting.map( element => {
      let dataStore = valuesTabAccounting.accounting.find( x => x.id === element.id);

      Object.keys(element).forEach((data) => {
        if (!['id','name'].includes(data))
        element[data] = validateError(dataStore[data], dataStore)[data] ? validateError(dataStore[data], dataStore , fieldContabilidadRequerid[data])[data]() : [];
      });
    });

      // validation error by cost
    let errorFieldTabCostTemp = JSON.parse(JSON.stringify(errorFieldCost));
        
    errorFieldTabCostTemp.cost.map( element => {
      let dataStore = valuesTabCost.cost.find( x => x.id === element.id);

      Object.keys(element).forEach((data) => {
        if (!['id','name'].includes(data))
        element[data] = validateError(dataStore[data], dataStore)[data] ? validateError(dataStore[data], dataStore, fieldCostRequerid[data])[data]() : [];
      });
    });

    setErrorFieldAccounting(errorFieldTabAcountingTemp);
    setErrorFieldCost(errorFieldTabCostTemp);

  };

  const printError = (error) => {
    if (error.length > 0) {
      return error[0];
    } else {
      return "";
    }
  };

  const handleChange = (event, newPanelTab) => {
    setPanelTab(newPanelTab);
  };

  const handleOpenAccounting = (row) =>{
    let dataStoreList = JSON.parse(JSON.stringify(valuesTabAccounting));
    let valueDataStore = dataStoreList.accounting.find( x => x.id === row.id);
    valueDataStore.open =  !valueDataStore.open;
    setValuesTabAccounting(dataStoreList);
  };

  const handleOpenCost = (row) =>{
    let dataStoreList = JSON.parse(JSON.stringify(valuesTabCost));
    let valueDataStore = dataStoreList.cost.find( x => x.id === row.id);
    valueDataStore.open =  !valueDataStore.open;
    setValuesTabCost(dataStoreList);
  };

  const changeDataAccounting= (e) => {
    const { name, value } = e.target;
    const [center, nameField] = name.split('.', 2);
    
    let listErrorData = errorFieldAccounting;
    let valuesData = valuesTabAccounting;

    let errorCenter = listErrorData.accounting.find( e => e.id === center);
    let valueCenter = valuesData.accounting.find( e => e.id === center);

    setErrorFieldAccounting(() => {
      const validations = validateError(value, valueCenter,fieldContabilidadRequerid[nameField])[nameField]() ;
      errorCenter[nameField] = validations;
      return { ...listErrorData};
    });
    valueCenter[nameField]= value;
    setValuesTabAccounting({ ...valuesData });
    
    let  _inputFocus = inputFocus;
    Object.keys(_inputFocus).map((el)=>{_inputFocus[el]=false});
    _inputFocus[name]=true;
    setInputFocus({..._inputFocus})
    
  };

  const changeDataCost= (e) => {
    const { name, value } = e.target;
    const [center, nameField] = name.split('.', 2);
    
    let listErrorData = errorFieldCost;
    let valuesData = valuesTabCost;

    let errorCenter = listErrorData.cost.find( e => e.id === center);
    let valueCenter = valuesData.cost.find( e => e.id === center);

    setErrorFieldCost(() => {
      const validations = validateError(value, valueCenter, fieldCostRequerid[nameField])[nameField]() ;
      errorCenter[nameField] = validations;
      return { ...listErrorData};
    });
    valueCenter[nameField]= value;
    setValuesTabCost({ ...valuesData });

    let  _inputFocus = inputFocus;
    Object.keys(_inputFocus).map((el)=>{_inputFocus[el]=false});
    _inputFocus[name]=true;
    setInputFocus({..._inputFocus});

  };

  const getStateColor = (row) => {
    let totalFields = 0;
    let completedFields = 0
  Object.keys(row).forEach((field) => {
    if(!['id','name','open','valuationClass','company','materialType'].includes(field)){
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

  /* Se hace un filtro a la lista que viene de MDS 
  y se agrega a un objecto para mostrar en el select */
  useEffect(() => {
    try {
      if (LIST_MDS !== undefined) {
        if (LIST_MDS.length) {
          /* LISTA CATEGORÍA VALORACIÓN */
          const CategoriaValoracion = LIST_MDS.filter(
            (element) => element.listName === "CategoríaValoración"
          );

          const TipoValoracion = LIST_MDS.filter(
            (element) => element.listName === "TipoValoracion"
          );

          const ClaseValoracion = LIST_MDS.filter(
            (element) => element.listName === "ClaseValoracion"
          );

          const DeterminacionPrecio = LIST_MDS.filter(
            (element) => element.listName === "DeterminacionPrecio"
          );

          const ControlPrecio = LIST_MDS.filter(
            (element) => element.listName === "ControlPrecio"
          );

          const ClaveDesviacion = LIST_MDS.filter(
            (element) => element.listName === "ClaveDesviacion"
          );

          const categoryByMaterial =
            CategoriaValoracion[0].list[0].values.filter(
              (element) => element.id === materialType
            );
          setList({
            ratingCategoryList: categoryByMaterial[0].subValues,
            valuationTypeList: TipoValoracion[0].list[0].values,
            valuationAreaList: [],
            valuationClassList: ClaseValoracion[0]?.list[0]?.values,
            materialPriceDeterminationList: DeterminacionPrecio[0].list[0].values,
            priceControlIndicatorList: ControlPrecio[0].list[0].values,
            variancekeyList: ClaveDesviacion[0].list[0].values,
          });
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
    }
  }, [LIST_MDS]);

  useEffect(()=>{

  },[valuesTabAccounting])

  function RowCost({row, disable}) {
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleOpenCost(row)}  
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
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("DoNotCost",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("DoNotCost",configurationInputs).isVisible ) && 
                    <CheckboxCommon              
                      handleChange={handleCheckedChangeCost}
                      label={"No Efectuar CC"}
                      checked={row.doNotCost}
                      name = {`${row.id}.doNotCost`}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("WithQuantityStructure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("WithQuantityStructure",configurationInputs).isVisible ) && 
                    <CheckboxCommon              
                      handleChange={handleCheckedChangeCost}
                      disabled={((ValidarConfiguracionCampo("WithQuantityStructure",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("WithQuantityStructure",configurationInputs).isEnabled)}
                      label={"Coste Estructura Cuantitativa"}
                      checked={row.withQtyStructure}
                      name = {`${row.id}.withQtyStructure`}
                    />}   
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialRelatedOrigin",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialRelatedOrigin",configurationInputs).isVisible ) && 
                    <CheckboxCommon              
                      handleChange={handleCheckedChangeCost}
                      disabled={((ValidarConfiguracionCampo("MaterialRelatedOrigin",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialRelatedOrigin",configurationInputs).isEnabled)}
                      label={"Origen material "}
                      checked={row.materialRelatedOrigin} 
                      name={`${row.id}.materialRelatedOrigin`}
                    />}
                  </Grid>  
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("VarianceKey",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("VarianceKey",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("VarianceKey",configurationInputs).existeCampo === false) ? typeCompany==="E" ? false : true : ValidarConfiguracionCampo("VarianceKey",configurationInputs).isRequired )}
                      label={"Clave de desviación"}
                      isDisabled={((ValidarConfiguracionCampo("VarianceKey",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("VarianceKey",configurationInputs).isEnabled)}
                      listOpt={list.variancekeyList}                      
                      errors={printError(errorFieldCost.cost.find( x => x.id === row.id).variancekey)}
                      placeholder="Seleccione una clave de desviación"
                      valueId={row.variancekey}
                      optionList={`${row.id}.variancekey`}
                      onChange={changeDataCost}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("CostingLotSize",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("CostingLotSize",configurationInputs).isVisible ) && 
                    <InputCustom
                      isRequired={((ValidarConfiguracionCampo("CostingLotSize",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("CostingLotSize",configurationInputs).isRequired )}
                      isDisabled={((ValidarConfiguracionCampo("CostingLotSize",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("CostingLotSize",configurationInputs).isEnabled)}
                      autoFocus={inputFocus[`${row.id}.costingLotSize`] === undefined ? false : inputFocus[`${row.id}.costingLotSize`]}
                      label={"Tamaño de lote cc"}
                      name={`${row.id}.costingLotSize`}
                      value={row.costingLotSize}
                      onChange={changeDataCost}                      
                      errors={(errorFieldCost.cost.find( x => x.id === row.id).costingLotSize)}
                      placeholder="Ingrese el tamaño de lote"
                      widthInput={"fullInput"}
                      showCharacters={true}
                      max={13}
                      lengthCharacters={row.costingLotSize}
                      maxLength={13}
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

  const CostgGrid = ({
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
              <RowCost key={row.name} row={row} titleSubColumns={titleSubColumns} handleDelete= {handleDelete} disable= {disable}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function RowContabilidad({row, disable}) {
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleOpenAccounting(row)}  
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
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("ValuationType",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValuationType",configurationInputs).isVisible ) && 
                    <SearchSelect                      
                      isRequired={((ValidarConfiguracionCampo("ValuationType",configurationInputs).existeCampo === false) ? typeCompany==="E" ? false : true : ValidarConfiguracionCampo("ValuationType",configurationInputs).isRequired )}
                      label={"Tipo Valoración"}                      
                      isDisabled={((ValidarConfiguracionCampo("ValuationType",configurationInputs).existeCampo === false ) ? typeCompany==="E" ? true : false : !ValidarConfiguracionCampo("ValuationType",configurationInputs).isEnabled)}
                      listOpt={list.valuationTypeList}                      
                      errors={printError(errorFieldAccounting.accounting.find( x => x.id === row.id).valuationType)}
                      placeholder="Seleccione un tipo de valoración"
                      valueId={row.valuationType}
                      optionList={`${row.id}.valuationType`}
                      onChange={changeDataAccounting}
                    />}
                  </Grid>       
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("ValuationCategory",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValuationCategory",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("ValuationCategory",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValuationCategory",configurationInputs).isRequired )}
                      label={"Categoría de Valoración"}
                      isDisabled={((ValidarConfiguracionCampo("ValuationCategory",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("ValuationCategory",configurationInputs).isEnabled)}
                      listOpt={list.ratingCategoryList}                      
                      errors={printError(errorFieldAccounting.accounting.find( x => x.id === row.id).ratingCategory)}
                      placeholder="Seleccione una categoría"
                      valueId={row.ratingCategory}
                      optionList={`${row.id}.ratingCategory`}
                      onChange={changeDataAccounting}
                    />}
                  </Grid>                   
                  <Grid item xs={4}>
                    {list.valuationClassList && ((ValidarConfiguracionCampo("ValuationClass",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValuationClass",configurationInputs).isVisible ) && 
                    <SearchSelect                      
                      label={"Clase de Valoración"}
                      isDisabled={((ValidarConfiguracionCampo("ValuationClass",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("ValuationClass",configurationInputs).isEnabled)}
                      isRequired={((ValidarConfiguracionCampo("ValuationClass",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValuationClass",configurationInputs).isRequired )}
                      listOpt={list.valuationClassList}                      
                      errors={printError(errorFieldAccounting.accounting.find( x => x.id === row.id).valuationClass)}
                      placeholder="Seleccione una clase valoración"
                      valueId={row.valuationClass}
                      optionList={`${row.id}.valuationClass`}
                      onChange={changeDataAccounting}
                    />
                    }                    
                  </Grid>                  
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialPriceDetermination",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialPriceDetermination",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("MaterialPriceDetermination",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialPriceDetermination",configurationInputs).isRequired )}
                      label={"Determinación de Precio Material"}
                      isDisabled={((ValidarConfiguracionCampo("MaterialPriceDetermination",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialPriceDetermination",configurationInputs).isEnabled)}
                      listOpt={list.materialPriceDeterminationList}                      
                      errors={printError(errorFieldAccounting.accounting.find( x => x.id === row.id).materialPriceDetermination)}
                      placeholder="Seleccione un control"
                      valueId={row.materialPriceDetermination}
                      optionList={`${row.id}.materialPriceDetermination`}
                      onChange={changeDataAccounting}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("PriceControlIndicator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PriceControlIndicator",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("PriceControlIndicator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PriceControlIndicator",configurationInputs).isRequired )}
                      label={"Control de Precio"}
                      isDisabled={((ValidarConfiguracionCampo("PriceControlIndicator",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("PriceControlIndicator",configurationInputs).isEnabled)}
                      listOpt={list.priceControlIndicatorList}                      
                      errors={printError(errorFieldAccounting.accounting.find( x => x.id === row.id).priceControlIndicator)}
                      placeholder="Seleccione un control de precio"
                      valueId={row.priceControlIndicator}
                      optionList={`${row.id}.priceControlIndicator`}
                      onChange={changeDataAccounting}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialLedgerActivated",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialLedgerActivated",configurationInputs).isVisible ) &&
                    <CheckboxCommon       
                      isRequired={true}   
                      disabled={((ValidarConfiguracionCampo("MaterialLedgerActivated",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialLedgerActivated",configurationInputs).isEnabled)}
                      handleChange={handleCheckedChangeAccounting}
                      label={"Material ledger"}
                      checked={row.materialLedger}
                      name = {`${row.id}.materialLedger`}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MovingAveragePrice",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MovingAveragePrice",configurationInputs).isVisible ) &&
                    <InputCustom
                      required={((ValidarConfiguracionCampo("MovingAveragePrice",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MovingAveragePrice",configurationInputs).isRequired )}
                      isDisabled={((ValidarConfiguracionCampo("MovingAveragePrice",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MovingAveragePrice",configurationInputs).isEnabled)}
                      autoFocus={inputFocus[`${row.id}.variablePrice`] === undefined ? false : inputFocus[`${row.id}.variablePrice`]}
                      label={"Precio Variable"}
                      name={`${row.id}.variablePrice`}
                      value={row.variablePrice}
                      onChange={changeDataAccounting}                      
                      errors={(errorFieldAccounting.accounting.find( x => x.id === row.id).variablePrice)}
                      placeholder="Ingrese el precio variable"
                      widthInput={"fullInput"}
                      showCharacters={true}
                      max={11}
                      lengthCharacters={row.variablePrice}
                      maxLength={11}
                    />}
                  </Grid>
                  <Grid item xs={4}>
                    {typeCompany === "E" ? ((ValidarConfiguracionCampo("StandardPrice",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("StandardPrice",configurationInputs).isVisible ) && (
                        <InputCustom
                          required={((ValidarConfiguracionCampo("StandardPrice",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("StandardPrice",configurationInputs).isRequired )}
                          isDisabled={((ValidarConfiguracionCampo("StandardPrice",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("StandardPrice",configurationInputs).isEnabled)}
                          autoFocus={inputFocus[`${row.id}.standardPrice`] === undefined ? false : inputFocus[`${row.id}.standardPrice`]}                          
                          label={"Precio Estandar"}
                          name={`${row.id}.standardPrice`}
                          value={row.standardPrice}
                          onChange={changeDataAccounting}
                          errors={(errorFieldAccounting.accounting.find( x => x.id === row.id).standardPrice)}
                          placeholder="Ingrese el precio estándar"
                          widthInput={"fullInput"}
                          showCharacters={true}
                          max={14}
                          lengthCharacters={row.standardPrice}
                          maxLength={14}
                        />                  
                    ) : (
                    materialType === "FERT_R" && ((ValidarConfiguracionCampo("StandardPrice",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("StandardPrice",configurationInputs).isVisible ) && (
                      <InputCustom
                        required={((ValidarConfiguracionCampo("StandardPrice",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("StandardPrice",configurationInputs).isRequired )}
                        isDisabled={((ValidarConfiguracionCampo("StandardPrice",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("StandardPrice",configurationInputs).isEnabled)}
                        autoFocus={inputFocus[`${row.id}.standardPrice`] === undefined ? false : inputFocus[`${row.id}.standardPrice`]}
                        label={"Precio Estandar"}
                        name={`${row.id}.standardPrice`}
                        value={row.standardPrice}
                        onChange={changeDataAccounting}
                        errors={(errorFieldAccounting.accounting.find( x => x.id === row.id).standardPrice)}
                        placeholder="Ingrese el precio estándar"
                        widthInput={"fullInput"}
                        showCharacters={true}
                        max={14}
                        lengthCharacters={row.standardPrice}
                        maxLength={14}
                      />
                      )
                    )}
                  </Grid>                  
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("PriceUnit",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PriceUnit",configurationInputs).isVisible ) &&
                    <InputCustom
                      required={((ValidarConfiguracionCampo("PriceUnit",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("PriceUnit",configurationInputs).isRequired )}
                      isDisabled={((ValidarConfiguracionCampo("PriceUnit",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("PriceUnit",configurationInputs).isEnabled)}
                      autoFocus={inputFocus[`${row.id}.unitPrice`] === undefined ? false : inputFocus[`${row.id}.unitPrice`]}
                      label={"Precio Unitario"}
                      name={`${row.id}.unitPrice`}
                      value={row.unitPrice}
                      onChange={changeDataAccounting}
                      errors={(errorFieldAccounting.accounting.find( x => x.id === row.id).unitPrice)}
                      placeholder="Ingrese el precio unitario"
                      widthInput={"fullInput"}
                      showCharacters={true}
                      max={14}
                      lengthCharacters={row.unitPrice}
                      maxLength={14}
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

  const AccountingGrid = ({
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
              <RowContabilidad key={row.name} row={row} titleSubColumns={titleSubColumns} handleDelete= {handleDelete} disable= {disable}/>
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
          <TitlePage tittle={"Contabilidad y Costos"} tooltip={"texto de ayuda"}/>
          <Grid item xs={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={panelTab}>
                <Box sx={{  justifyContent: 'center' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                    <Tab label="Contabilidad" value="1" sx={{ width: '50%',  }} style={{ color: panelTab==='1' ? "#FFFFFF" : "#4a4a4a" , fontWeight: "bold" , background: panelTab==='1' ? "#0F0C5A" : "#ebebeb", margin: '5px'}}/>
                    <Tab label="Costos" value="2"  sx={{ width: '50%' }} style={{ color: panelTab==='2' ? "#FFFFFF" : "#4a4a4a", fontWeight: "bold", background:  panelTab==='2' ? "#0F0C5A" : "#ebebeb",margin: '5px'}} />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Grid container spacing={4}>
                    <AccountingGrid 
                      titleColumns={["Centro logístico", "Código", "Estado"]}
                      rows = {valuesTabAccounting.accounting}
                    />
                  </Grid>
                </TabPanel>
                <TabPanel value="2">                  
                  <CostgGrid 
                    titleColumns={["Centro logístico", "Código", "Estado"]}
                    rows = {valuesTabCost.cost}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>          
        </Grid>
    </>
  );
};
