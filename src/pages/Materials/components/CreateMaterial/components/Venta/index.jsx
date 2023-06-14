import * as React from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo, InputCustom, StateColor, TitlePage } from "../../../../widgets/";
import { CheckboxCommon }  from "../../../../../../sharedComponents"
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
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
//import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ValidarConfiguracionCampo } from "../../ConfiguracionValidacion";

//initialStateTabGeneralInformation HOOK
const initialStateTabGeneralInformation = {
    transportGroup: "",
};


export const Venta = ({
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

    const materialContext = useContext(MaterialContext);
    const { LIST_MDS, dataVenta, setDataVenta, configurationInputs } = materialContext;

    const [list, setList] = useState({
        taxClassification:[],
        transportGroupList: [],
        materialSizeGroupList: [],
        availabilityVerificationList: [],
        loadGroupList: [],
        materialStatusCDList: [],
        orderUnitmeasureList: [],
        materialStatisticalGroupList: [],
        groupMaterialList: [],
        materialImputationGroupList: [], 
        positionTypeGroupList: [],
        commissionsGroupList: [],
        materialGroupOneList: [],
        materialGroupTwoList: [],
        orderUnitmeasureList: [],
      });

    const [taxList, setTaxList] = useState([]);

    const [panelTab, setPanelTab] = useState('1');
    
    const [valuesTabGeneralInformation, setValuesTabGeneralInformation] = useState(initialStateTabGeneralInformation);
    const [valuesTabGeneralInformationTax, setValuesTabGeneralInformationTax] = useState({"taxs":[]});

    const [fieldStoreRequerid, setFieldStoreRequerid] = useState({
      orderUnitmeasure:((ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).isRequired ),
      materialStatusCD:((ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).isRequired ),
      initDateStatusMAterial:((ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).isRequired ),
      materialStatisticalGroup:((ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).isRequired ),
      groupMaterial:((ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).isRequired ),
      materialImputationGroup:((ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).isRequired ),
      positionTypeGroup:((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isRequired ),
      commissionsGroup:((ValidarConfiguracionCampo("CommissionGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("CommissionGroup",configurationInputs).isRequired ),
      materialGroupOne: ((ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).isRequired ),
      materialGroupTwo: ((ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).isRequired ),
            
    })
    const [fieldCenterRequerid, setFieldCenterRequerid] = useState({
      materialSizeGroup:((ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).existeCampo === false) ? typeCompany==="R" ? false : true : ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).isRequired ),
      loadGroup:((ValidarConfiguracionCampo("LoadingGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("LoadingGroup",configurationInputs).isRequired ),            
      availabilityVerification:((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isRequired ),            
    })

    // tyope 1 initial values, type 2 error values
  const getCenterListStoreList = (type = 1) =>{
    let storeList = [];
    let centerList = [];

    logisticCenterstoreList.map(element => {
      centerList.push( {
        id: element.id,
        name: element.logisticCenter,
        materialSizeGroup: (type===1 ? "" : []),
        availabilityVerification: (type===1 ? "" : []),
        loadGroup: (type===1 ? "" : []),
        open: (type===1 ? false : [])
      });

      element.subrows.map(subElement => {
        storeList.push( {
          id: subElement.id,
          name: subElement.store,
          initDateStatusMAterial: (type===1 ? "" : []),
          materialStatusCD: (type===1 ? "" : []),
          rightToDiscount: (type===1 ? "" : []),
          materialStatisticalGroup: (type===1 ? "" : []),
          groupMaterial: (type===1 ? "" : []),
          materialImputationGroup: (type===1 ? "" : []),     
          positionTypeGroup: (type===1 ? "" : []),
          commissionsGroup: (type===1 ? "" : []),
          materialGroupOne: (type===1 ? "" : []),
          materialGroupTwo: (type===1 ? "" : []),
          orderUnitmeasure: (type===1 ? "" : []),
          open: (type===1 ? false : [])
        });
      });
    });
    return {
      centerList: centerList,
      storeList: storeList
    };
  }

    useEffect(()=>{
      if(taxList.tax){
        let taxs = []
        taxList.tax.map((el)=>{
          let objtax= {};
          objtax[`${el.id}.TaxClassification`] = "";
          taxs.push(objtax);
        })
        setValuesTabGeneralInformationTax({ "taxs": taxs });      
      }
      
    },[taxList])

    useEffect(()=>{   
      
      if(valuesTabGeneralInformationTax["taxs"].length>0){
        const errorDataTabGeneralInformationTax = {}

        valuesTabGeneralInformationTax["taxs"].forEach((el)=>{
          Object.keys(el).forEach((fieldTax)=>{
            let namefield = fieldTax.split(".")[0].split("_")[0]        
            errorDataTabGeneralInformationTax[namefield] = []
          })
        })
        
        setErrorFieldTabGeneralInformation({...errorFieldTabGeneralInformation,...errorDataTabGeneralInformationTax});
      }   

    },[valuesTabGeneralInformationTax])

  
      const [valuesTabInformationByCenter, setValuesTabInformationByCenter] = useState({
        centerList: getCenterListStoreList(1).centerList
      });

      const [errorFieldTabInformationByCenter, setErrorFieldTabInformationByCenter] = useState({
        centerList: getCenterListStoreList(2).centerList
      });

      const [valuesTabInformationByStore, setValuesTabInformationByStore] = useState({
        storeList: getCenterListStoreList(1).storeList
      });

      useEffect(() => {
        if (Object.keys(dataVenta).length !== 0) {

          const removeTax = 'tax';
          const removeCenterList = 'centerList';
          const removeStoreList = 'storeList';


        const { [removeTax]: removeOne, [removeCenterList]: removeTwo, [removeStoreList]: removeThree , ...generalInformation } = dataVenta;

          setValuesTabGeneralInformation({...generalInformation});
          setTaxList({tax: dataVenta.tax});
          setValuesTabInformationByCenter({centerList: dataVenta.centerList});
          setValuesTabInformationByStore({storeList: dataVenta.storeList});
        }
      },[]);

      const [errorFieldTabInformationByStore, setErrorFieldTabInformationByStore] = useState({
        storeList: getCenterListStoreList(2).storeList
      });
  
      const [errorFieldTabGeneralInformation, setErrorFieldTabGeneralInformation] = useState(() =>{
        const inicial = Object.keys(initialStateTabGeneralInformation).reduce((acum, key) => {
          acum[key] = [];
          return acum;
        }, {});
        const Impuestos = LIST_MDS.filter(
          (element) => element.listName === "Impuesto"
        )[0].list[0].values[0].subValues;

        let taxs = []
        Impuestos.map((el)=>{
          let objtax= {};
          objtax[`${el.id}.TaxClassification`] = "";
          taxs.push(objtax);
        })

        const inicialTax = {}

        taxs.forEach((el)=>{
          Object.keys(el).forEach((fieldTax)=>{
            let namefield = fieldTax.split(".")[0].split("_")[0]        
            inicialTax[namefield] = []
          })
        })
        
        return {...inicial,...inicialTax}
      })
        
    
    useEffect(() => {
      if (isSubmitting) {
        const errorDataTabGeneralInformation = Object.values(errorFieldTabGeneralInformation).every(
          (data) => data.length == 0 && data !== ""
        );
          //center validation error
        const errorDataTabInformationByCenter = [];
        let errorFieldTabInformationByCenterTemp = JSON.parse(JSON.stringify(errorFieldTabInformationByCenter));
        
        errorFieldTabInformationByCenterTemp.centerList.map( element => {
          element.id = [];
          element.name = [];
          errorDataTabInformationByCenter.push(Object.values(element).every(
            (data) => data.length == 0 && data !== ""
          ));
        });

        const errorDataTabInformationByCenterResult = Object.values(errorDataTabInformationByCenter).every(
          (data) => data
        );

         //store validation error
        const errorDataTabInformationByStore = [];
        let errorFieldTabInformationByStoreTemp = JSON.parse(JSON.stringify(errorFieldTabInformationByStore));
        
        errorFieldTabInformationByStoreTemp.storeList.map( element => {
          element.id = [];
          element.name = [];
          errorDataTabInformationByStore.push(Object.values(element).every(
            (data) => data.length == 0 && data !== ""
          ));
        });

        const errorDataTabInformationByStoreResult = Object.values(errorDataTabInformationByStore).every(
          (data) => data
        );
        
        if (errorDataTabGeneralInformation && errorDataTabInformationByCenterResult && errorDataTabInformationByStoreResult) {
          setForm({
            ...valuesTabGeneralInformation,
            ...valuesTabInformationByCenter,
            ...valuesTabInformationByStore,
            ...taxList
          });
          setDataVenta({
            ...valuesTabGeneralInformation,
            ...valuesTabInformationByCenter,
            ...valuesTabInformationByStore,
            ...taxList
          });
        }
      }
      setIsSubmitting(false);
    }, [errorFieldTabGeneralInformation, errorFieldTabInformationByCenter, errorFieldTabInformationByStore]);
    
    const changeDataTabGeneralInformation = (e) => {
      const { name, value } = e.target;
      setErrorFieldTabGeneralInformation(() => {
        const validations = validateError(value, valuesTabGeneralInformation)[name]() ;
        return { ...errorFieldTabGeneralInformation, [name]: validations};
      });
      setValuesTabGeneralInformation({ ...valuesTabGeneralInformation, [name]: value });
    };

    const changeDataTabGeneralInformationTax = (e) => {
      const { name, value } = e.target;
      setErrorFieldTabGeneralInformation(() => {
        const validations = validateError(value, valuesTabGeneralInformation)["TaxClassification"]() ;
        return { ...errorFieldTabGeneralInformation, [name]: validations};
      });
      setValuesTabGeneralInformation({ ...valuesTabGeneralInformation, [name]: value });
    };

    const changeDataTabInformationByCenter= (e) => {
      const { name, value } = e.target;
      const [center, nameField] = name.split('.', 2);

      let listErrorData = errorFieldTabInformationByCenter;
      let valuesData = valuesTabInformationByCenter;

      let errorCenter = listErrorData.centerList.find( e => e.id === center);
      let valueCenter = valuesData.centerList.find( e => e.id === center);

      setErrorFieldTabInformationByCenter(() => {
        const validations = validateError(value, valueCenter, fieldCenterRequerid[nameField])[nameField]() ;
        errorCenter[nameField] = validations;
        return { ...listErrorData};
      });
      valueCenter[nameField]= value;
      setValuesTabInformationByCenter({ ...valuesData });
    };

    const changeDataTabInformationByStore= (e) => {
      const { name, value } = e.target;
      const [store, nameField] = name.split('.', 2);

      let listErrorData = errorFieldTabInformationByStore;
      let valuesData = valuesTabInformationByStore;

      let errorStore = listErrorData.storeList.find( e => e.id === store);
      let valueStore = valuesData.storeList.find( e => e.id === store);

      setErrorFieldTabInformationByStore(() => {
        const validations = validateError(value, valueStore, fieldStoreRequerid[nameField])[nameField]() ;
        errorStore[nameField] = validations;
        return { ...listErrorData};
      });
      valueStore[nameField]= value;
      setValuesTabInformationByStore({ ...valuesData });
    };

    const handleCheckedChange = (event) => {
      const { name, checked } = event.target;
      const [store, nameField] = name.split('.', 2);

      let valuesData = valuesTabInformationByStore;
      let valueStore = valuesData.storeList.find( e => e.id === store);
      valueStore[nameField]= checked;
      setValuesTabInformationByStore({ ...valuesData });
    };
    
    useEffect(() => {
      if (isSubmitting) {
        submitValidate();
      }
    }, [isSubmitting]);
    
    const submitValidate = () => {
      const errorDataTabGeneralInformation = {};
      Object.keys(initialStateTabGeneralInformation).forEach((data) => {
        errorDataTabGeneralInformation[data] = validateError(valuesTabGeneralInformation[data], valuesTabGeneralInformation)[data] ? validateError(valuesTabGeneralInformation[data], valuesTabGeneralInformation)[data]() : [];        
      });

      //validar los impuestos del tab información general
      valuesTabGeneralInformationTax["taxs"].forEach((el)=>{
        Object.keys(el).forEach((fieldTax)=>{
          let namefield = fieldTax.split(".")[0].split("_")[0]
          let validadorTax = fieldTax.split(".")[1]
          errorDataTabGeneralInformation[namefield] = validateError(valuesTabGeneralInformation[namefield], valuesTabGeneralInformation)[validadorTax]()
        })
      })
      
      // validation error by center
      const errorDataTabInformationByCenter = [];
      let errorFieldTabInformationByCenterTemp = JSON.parse(JSON.stringify(errorFieldTabInformationByCenter));
      
      errorFieldTabInformationByCenterTemp.centerList.map( element => {
        let dataCenter = valuesTabInformationByCenter.centerList.find( x => x.id === element.id);

        Object.keys(element).forEach((data) => {
          if (!['id','name'].includes(data))
          element[data] = validateError(dataCenter[data], dataCenter)[data] ? validateError(dataCenter[data], dataCenter, fieldCenterRequerid[data])[data]() : [];
        });
      });

      // validation error by store
      const errorDataTabInformationByStore = [];
      let errorFieldTabInformationByStoreTemp = JSON.parse(JSON.stringify(errorFieldTabInformationByStore));
      
      errorFieldTabInformationByStoreTemp.storeList.map( element => {
        let dataStore = valuesTabInformationByStore.storeList.find( x => x.id === element.id);

        Object.keys(element).forEach((data) => {
          if (!['id','name'].includes(data))
          element[data] = validateError(dataStore[data], dataStore)[data] ? validateError(dataStore[data], dataStore, fieldStoreRequerid[data])[data]() : [];
        });
      });

      setErrorFieldTabGeneralInformation(errorDataTabGeneralInformation);
      setErrorFieldTabInformationByCenter(errorFieldTabInformationByCenterTemp);
      setErrorFieldTabInformationByStore(errorFieldTabInformationByStoreTemp);
    };
    
    const printError = (error) => {
      if (error.length > 0) {
        return error[0];
      } else {
        return "";
      }
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


      /* Se hace un filtro a la lista que viene de MDS 
  y se agrega a un objecto para mostrar en el select */

    useEffect(() => {
      try {
        if (LIST_MDS.length) {
          //TAB INFORMACION GENERAL
          const Impuestos = LIST_MDS.filter(
            (element) => element.listName === "Impuesto"
          )[0].list[0].values[0].subValues;
          setTaxList({tax: Impuestos});

          const ClasificacionFiscal = LIST_MDS.filter(
            (element) => element.listName === "ClasificacionFiscal"
          );
          
          const GrupoTransporte = LIST_MDS.filter(
            (element) => element.listName === "GrupoTransporte"
          );
              // TAB INFORMACION POR CENTRO
          const GrupoPorteMaterial = LIST_MDS.filter(
            (element) => element.listName === "GrupoPorteMaterial"
          );

          const GrupoCarga = LIST_MDS.filter(
            (element) => element.listName === "GrupoCarga"
          );
          
          const VerificacionDisponibilidad = LIST_MDS.filter(
            (element) => element.listName === "VerificacionDisponibilidad"
          );
          // TAB INFORMACION POR ALMACEN
          const UnidadMedidaPedido = LIST_MDS.filter(
            (element) => element.listName === "UnidadMedidaPedido"
          );

          const GrupoMateriales = LIST_MDS.filter(
            (element) => element.listName === "GrupoMateriales"
          );
          
          const GrupoEstadisticaMaterial = LIST_MDS.filter(
            (element) => element.listName === "GrupoEstadisticaMaterial"
          );

          const GrupoImputacionMateriales = LIST_MDS.filter(
            (element) => element.listName === "GrupoImputacionMateriales"
          );

          const GruposTiposPosicionGeneral = LIST_MDS.filter(
            (element) => element.listName === "GruposTiposPosiciónGeneral"
          );

          const GrupoComisiones = LIST_MDS.filter(
            (element) => element.listName === "GrupoComisiones"
          );

          const GrupoMateriales1 = LIST_MDS.filter(
            (element) => element.listName === "GrupoMateriales1"
          );

          const GrupoMateriales2 = LIST_MDS.filter(
            (element) => element.listName === "GrupoMateriales2"
          );



          setList({
            taxClassification: ClasificacionFiscal[0]?.list[0]?.values,
            transportGroupList: GrupoTransporte[0]?.list[0]?.values,
            materialSizeGroupList: GrupoPorteMaterial[0]?.list[0]?.values,
            availabilityVerificationList: VerificacionDisponibilidad[0]?.list[0]?.values,
            loadGroupList: GrupoCarga[0]?.list[0]?.values,
            orderUnitmeasureList: UnidadMedidaPedido[0]?.list[0]?.values,
            materialStatisticalGroupList: GrupoEstadisticaMaterial[0]?.list[0]?.values,
            groupMaterialList: GrupoMateriales[0]?.list[0]?.values,
            materialImputationGroupList: GrupoImputacionMateriales[0]?.list[0]?.values,
            positionTypeGroupList: GruposTiposPosicionGeneral[0]?.list[0]?.values,
            commissionsGroupList: GrupoComisiones[0]?.list[0]?.values,
            materialGroupOneList: GrupoMateriales1[0]?.list[0]?.values,
            materialGroupTwoList: GrupoMateriales2[0]?.list[0]?.values,
          });
        }
      } catch (error) {
        setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
      }
    }, [LIST_MDS]);
    
  
  const handleChange = (event, newPanelTab) => {
      setPanelTab(newPanelTab);
  };

const handleOpenCenter = (row) =>{
  let dataCenterList = JSON.parse(JSON.stringify(valuesTabInformationByCenter));
  let valueDataCenter = dataCenterList.centerList.find( x => x.id === row.id);
  valueDataCenter.open =  !valueDataCenter.open;
  setValuesTabInformationByCenter(dataCenterList);
};

const handleOpenStore = (row) =>{
  let dataStoreList = JSON.parse(JSON.stringify(valuesTabInformationByStore));
  let valueDataStore = dataStoreList.storeList.find( x => x.id === row.id);
  valueDataStore.open =  !valueDataStore.open;
  setValuesTabInformationByStore(dataStoreList);
};

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
            {row.name.split(' - ')[1]}
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
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).isVisible ) && 
                      <SearchSelect
                        isRequired={((ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).existeCampo === false) ? typeCompany==="R" ? false : true : ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).isRequired )}
                        label={"Grupo de porte del material"}
                        isDisabled={((ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).existeCampo === false ) ? typeCompany==="R" ? true : false : !ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).isEnabled)}
                        listOpt={list.materialSizeGroupList}
                        errors={((ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).existeCampo === false) ? typeCompany==="R" ? false : true : ValidarConfiguracionCampo("MaterialCarryingGroup",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByCenter.centerList.find( x => x.id === row.id).materialSizeGroup)}
                        placeholder="Seleccione el grupo de porte del material"
                        valueId={row.materialSizeGroup}
                        optionList={`${row.id}.materialSizeGroup`}
                        onChange={changeDataTabInformationByCenter}
                      />}
                    </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isRequired )}
                      label={"Verificación Disponibilidad"}
                      isDisabled={((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isEnabled)}
                      listOpt={list.availabilityVerificationList}
                      errors={printError(errorFieldTabInformationByCenter.centerList.find( x => x.id === row.id).availabilityVerification)}
                      placeholder="Seleccione la verificación"
                      valueId={row.availabilityVerification}
                      optionList={`${row.id}.availabilityVerification`}
                      onChange={changeDataTabInformationByCenter}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("LoadingGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("LoadingGroup",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("LoadingGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("LoadingGroup",configurationInputs).isRequired )}
                      label={"Grupo Carga"}
                      isDisabled={((ValidarConfiguracionCampo("LoadingGroup",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("LoadingGroup",configurationInputs).isEnabled)} 
                      listOpt={list.loadGroupList}
                      errors={((ValidarConfiguracionCampo("LoadingGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("LoadingGroup",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByCenter.centerList.find( x => x.id === row.id).loadGroup)}
                      placeholder="Seleccione el grupo carga"
                      valueId={row.loadGroup}
                      optionList={`${row.id}.loadGroup`}
                      onChange={changeDataTabInformationByCenter}
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
      <TableContainer>
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
  

  function RowStore({row, disable}) {
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleOpenStore(row)}            
            >
              {row.open ? <KeyboardArrowUpIcon sx={{ color: '#0F0C5A' }} /> : <KeyboardArrowDownIcon sx={{ color: '#0F0C5A' }}/>}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name.split(' - ')[1]}
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
                <Grid item xs={12}>
                  <h4> Ventas 1</h4>
                </Grid>
                <Grid item xs={4}>{((ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).isRequired )}
                      label={"Unidad de medida de venta"}
                      isDisabled={((ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).isEnabled)}
                      listOpt={list.orderUnitmeasureList}
                      errors={printError(((ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("SaleUnitMeasure",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).orderUnitmeasure))}
                      placeholder="Seleccione la unidad de medida"
                      valueId={row.orderUnitmeasure}
                      optionList={`${row.id}.orderUnitmeasure`}
                      onChange={changeDataTabInformationByStore}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).isRequired )}
                      label={"Estado material para todas las Cad. Dist"}
                      isDisabled={((ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).isEnabled)}
                      listOpt={list.materialStatusCDList}
                      errors={printError(((ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("MaterialStatusSpecificDistributionChannel",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).materialStatusCD))}
                      placeholder="Seleccione el estado de material"
                      valueId={row.materialStatusCD}
                      optionList={`${row.id}.materialStatusCD`}
                      onChange={changeDataTabInformationByStore}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).isVisible ) && 
                    <InputCustom
                        isRequired={((ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).isRequired )}
                        isDisabled={((ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).existeCampo === false ) ? false : !ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).isEnabled)}
                        label={"Fecha validez estado material Cad. Dist"}
                        name={`${row.id}.initDateStatusMAterial`}
                        value={row.initDateStatusMAterial}
                        onChange={changeDataTabInformationByStore}
                        errors={((ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ValidDateFromSpecificMaterialDistributionChannel",configurationInputs).isRequired ) === false ? [] : (errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).initDateStatusMAterial)}
                        widthInput={"fullInput"}
                        type= {"date"}
                      />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("CashDiscount",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("CashDiscount",configurationInputs).isVisible ) && 
                    <CheckboxCommon              
                      handleChange={handleCheckedChange}
                      disabled={((ValidarConfiguracionCampo("CashDiscount",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("CashDiscount",configurationInputs).isEnabled)}
                      label={"Derecho a descuento"}
                      checked={row.rightToDiscount}
                      name = {`${row.id}.rightToDiscount`} 
                    />}
                  </Grid>
                  <Grid item xs={12}>
                    <h4> Ventas 2</h4>
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).isRequired )}
                      label={"Grupo EstadÍstico Material"}
                      isDisabled={((ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).isEnabled)}
                      listOpt={list.materialStatisticalGroupList}
                      errors={((ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialStatisticsGroup",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).materialStatisticalGroup)}
                      placeholder="Seleccione.."
                      valueId={row.materialStatisticalGroup}
                      optionList={`${row.id}.materialStatisticalGroup`}
                      onChange={changeDataTabInformationByStore}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).isRequired )}
                      label={"Grupo materiales"}
                      isDisabled={((ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).isEnabled)}
                      listOpt={list.groupMaterialList}
                      errors={((ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialPriceGroup",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).groupMaterial)}
                      placeholder="Seleccione.."
                      valueId={row.groupMaterial}
                      optionList={`${row.id}.groupMaterial`}
                      onChange={changeDataTabInformationByStore}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).isRequired )}
                      label={"Grupo Imputación Material"}
                      isDisabled={((ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).isEnabled)}
                      listOpt={list.materialImputationGroupList}
                      errors={((ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AccountAssignmentGroupMaterial",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).materialImputationGroup)}
                      placeholder="Seleccione.."
                      valueId={row.materialImputationGroup}
                      optionList={`${row.id}.materialImputationGroup`}
                      onChange={changeDataTabInformationByStore}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isRequired )}
                      label={"Grupo Tipo posición"}
                      isDisabled={((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isEnabled)}
                      listOpt={list.positionTypeGroupList}
                      errors={((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).positionTypeGroup)}
                      placeholder="Seleccione.."
                      valueId={row.positionTypeGroup}
                      optionList={`${row.id}.positionTypeGroup`}
                      onChange={changeDataTabInformationByStore}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("CommissionGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("CommissionGroup",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("CommissionGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("CommissionGroup",configurationInputs).isRequired )}
                      label={"Grupo Comisiones"}
                      isDisabled={((ValidarConfiguracionCampo("CommissionGroup",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("CommissionGroup",configurationInputs).isEnabled)}
                      listOpt={list.commissionsGroupList}
                      errors={((ValidarConfiguracionCampo("CommissionGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("CommissionGroup",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).commissionsGroup)}
                      placeholder="Seleccione.."
                      valueId={row.commissionsGroup}
                      optionList={`${row.id}.commissionsGroup`}
                      onChange={changeDataTabInformationByStore}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).isRequired )}
                      label={"Grupo Materiales 1"}
                      isDisabled={((ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).isEnabled)}
                      listOpt={list.materialGroupOneList}
                      errors={((ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialGroup1",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).materialGroupOne)}
                      placeholder="Seleccione.."
                      valueId={row.materialGroupOne}
                      optionList={`${row.id}.materialGroupOne`}
                      onChange={changeDataTabInformationByStore}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).isRequired )}
                      label={"Grupo Materiales 2"}
                      isDisabled={((ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).isEnabled)}
                      listOpt={list.materialGroupTwoList}
                      errors={((ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialGroup2",configurationInputs).isRequired ) === false ? [] : printError(errorFieldTabInformationByStore.storeList.find( x => x.id === row.id).materialGroupTwo)}
                      placeholder="Seleccione.."
                      valueId={row.materialGroupTwo}
                      optionList={`${row.id}.materialGroupTwo`}
                      onChange={changeDataTabInformationByStore}
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
  
  
  const StoreGrid = ({
      titleColumns,
      titleSubColumns,
      rows,
      handleDelete,
      disable = false
  }) => {
  
    return (
      <TableContainer>
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
              <RowStore key={row.name} row={row} titleSubColumns={titleSubColumns} handleDelete= {handleDelete} disable= {disable}/>
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
            <TitlePage tittle={"Ventas"} tooltip={"Texto de apoyo"}/>
            {/* <Grid item xs={12}></Grid> */}
            <Grid item xs={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={panelTab}>
                <Box sx={{  justifyContent: 'center' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Información general" value="1" sx={{ width: '33.3%',  }} style={{ color: panelTab==='1' ? "#FFFFFF" : "#4a4a4a" , fontWeight: "bold" , background: panelTab==='1' ? "#0F0C5A" : "#ebebeb", margin: '5px'}}/>
                    <Tab label="Información por Centro" value="2"  sx={{ width: '33.3%' }} style={{ color: panelTab==='2' ? "#FFFFFF" : "#4a4a4a", fontWeight: "bold", background:  panelTab==='2' ? "#0F0C5A" : "#ebebeb",margin: '5px'}} />
                    <Tab label="Información por canal" value="3"  sx={{ width: '33.3%'}} style={{ color: panelTab==='3' ? "#FFFFFF" : "#4a4a4a", fontWeight: "bold", background:  panelTab==='3' ? "#0F0C5A" : "#ebebeb",margin: '5px'}}/>
                  </TabList>
                </Box>
                <TabPanel value="1">
                <Grid container spacing={4}>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6} style={{  overflow:"auto" }}>
                      <TableContainer component={Paper} >
                        <Table size="medium" aria-label="a dense table">
                          <TableHead style={{ background: '#5052A3', borderRadius: "10px"}}>
                            <TableRow >
                              <TableCell style={{ color: "#FFFFFF", fontWeight: "bold"}}>Tipo de impuesto</TableCell>
                              <TableCell align="right" style={{ color: "#FFFFFF", fontWeight: "bold"}}>Clasificación fiscal</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            { taxList.tax?.map((tax) => (
                              // <RowStore key={row.id} row={row} titleSubColumns={titleSubColumns} handleDelete= {handleDelete} disable= {disable}/>
                              <TableRow
                                key={tax.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row"> 
                                  {((ValidarConfiguracionCampo("TaxCategory",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("TaxCategory",configurationInputs).isVisible ) && 
                                    tax.name.split(' - ')[1]
                                  }
                                </TableCell>
                                <TableCell align="right">{((ValidarConfiguracionCampo("TaxClassification",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("TaxClassification",configurationInputs).isVisible ) && 
                                  <SearchSelect
                                        isRequired={((ValidarConfiguracionCampo("TaxClassification",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("TaxClassification",configurationInputs).isRequired )}
                                        isDisabled={((ValidarConfiguracionCampo("TaxClassification",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("TaxClassification",configurationInputs).isEnabled)}
                                        listOpt={list.taxClassification.filter( e => e.id === tax.id)[0]?.subValues}
                                        // style={{ zIndex: "1000", position:"absolute" }}
                                        placeholder="Seleccione la caracteristica"
                                        valueId={valuesTabGeneralInformation[tax.name.split(' - ')[0]]}
                                        optionList={tax.name.split(' - ')[0]}
                                        name={`${tax.id}.TaxClassification`}
                                        errors={printError(((ValidarConfiguracionCampo("TaxClassification",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("TaxClassification",configurationInputs).isRequired ) === false ? [] : errorFieldTabGeneralInformation[tax.name.split(' - ')[0]])}
                                        onChange={changeDataTabGeneralInformationTax}
                                      />}
                                </TableCell>
                              </TableRow>
                            ))}  
                          </TableBody>
                        </Table>
                      </TableContainer> 
                    </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("TransportGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("TransportGroup",configurationInputs).isVisible ) &&
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("TransportGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("TransportGroup",configurationInputs).isRequired )}
                      label={"Grupo de transporte"}
                      isDisabled={((ValidarConfiguracionCampo("TransportGroup",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("TransportGroup",configurationInputs).isEnabled)}
                      listOpt={list.transportGroupList}
                      errors={printError(errorFieldTabGeneralInformation.transportGroup)}
                      placeholder="Seleccione el grupo de transporte"
                      valueId={valuesTabGeneralInformation.transportGroup}
                      optionList={"transportGroup"}
                      onChange={changeDataTabGeneralInformation}
                    />}
                  </Grid>
                </Grid>
                </TabPanel>
                <TabPanel value="2">
                  <CenterGrid 
                    titleColumns={["Centro logístico", "Código", "Estado"]}
                    rows = {valuesTabInformationByCenter.centerList}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <StoreGrid 
                      titleColumns={["Organizaciones de ventas", "Código", "Estado"]}
                      rows = {valuesTabInformationByStore.storeList}
                    />
                </TabPanel>
              </TabContext>
            </Box>
            </Grid>
            <Grid item xs={12}></Grid>
    </Grid>
    </>
  );
};
