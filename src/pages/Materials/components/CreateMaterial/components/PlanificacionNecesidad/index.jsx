import * as React from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo, StateColor, TitlePage } from "../../../../widgets";
import { CheckboxCommon }  from "../../../../../../sharedComponents/"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
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

const initialState = {
    featurePlanningNeed: "",
    procurementType: "",
    verificationAvailable: "",
    repetitiveManufacturingProfile: "",
    repetitiveManufacturing: true,
};

export const PlanificacionNecesidad = ({
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
  const { LIST_MDS, dataPlanificacionNecesidad, setDataPlanificacionNecesidad, configurationInputs } = materialContext;

  const [list, setList] = useState({
    featurePlanningNeedList: [],
    procurementTypeList: [],
    verificationAvailableList: [],
    repetitiveManufacturing: true,
    repetitiveManufacturingProfileList: []
  });

  const getCenterList = (type = 1) =>{
    let centerList = [];
    logisticCenterstoreList.map(element => {
      centerList.push( {
        id: element.id,
        name: element.logisticCenter,
        featurePlanningNeed: (type===1 ? "" : []),
        procurementType: (type===1 ? "" : []),
        verificationAvailable: (type===1 ? "" : []),
        repetitiveManufacturingProfile: (type===1 ? "0001_"+typeCompany : []),
        repetitiveManufacturing: (type===1 ? true : []),
        open: (type===1 ? false : [])
      });
    });

    return { centerList };
  }
  
  const [valuesPlan, setValuesPlan] = useState({ centerList: getCenterList(1).centerList });

  const [errorField, setErrorField] = useState({ centerList: getCenterList(2).centerList });

  const [fieldPlannigRequerid, setFieldPlannigRequerid] = useState({
    featurePlanningNeed:((ValidarConfiguracionCampo("MRPType",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MRPType",configurationInputs).isRequired ),
    procurementType:((ValidarConfiguracionCampo("ProcurementType",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProcurementType",configurationInputs).isRequired ),
    verificationAvailable:((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isRequired ),
    repetitiveManufacturingProfile:((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isRequired )
  })

  useEffect(() => {
    if (Object.keys(dataPlanificacionNecesidad).length !== 0) {
      setValuesPlan({...dataPlanificacionNecesidad});
    }
  },[]);


  useEffect(() => {
    if (isSubmitting) {
      const errorDataPlaNec = [];
        let errorFieldPlaNecTemp = JSON.parse(JSON.stringify(errorField));
        
        errorFieldPlaNecTemp.centerList.map( element => {
          element.id = [];
          element.name = [];
          errorDataPlaNec.push(Object.values(element).every(
            (data) => data.length == 0 && data !== ""
          ));
        });

        const errorDataPlaNecResult = Object.values(errorDataPlaNec).every(
          (data) => data
        );
        
        if ( errorDataPlaNecResult) {
          setForm({
            ...valuesPlan
          });

          setDataPlanificacionNecesidad({
            ...valuesPlan
          });
        }
      }
      setIsSubmitting(false);
  }, [errorField]);
  
  const changeDataPlanning = (e) => {
    const { name, value } = e.target;
    const [center, nameField] = name.split('.', 2);

    let listErrorData = errorField;
    let valuesData = valuesPlan;

    let errorCenter = listErrorData.centerList.find( e => e.id === center);
    let valueCenter = valuesData.centerList.find( e => e.id === center);
    
    setErrorField(() => {
      const validations = validateError(value, valueCenter, fieldPlannigRequerid[nameField])[nameField]() ;
      errorCenter[nameField] = validations;
      return {...listErrorData}
    });
    valueCenter[nameField]= value;
    setValuesPlan({ ...valuesData })
  };
  
  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);
  
  const submitValidate = () => {
    // const errorDataPlanNec = [];
    let errorFieldPlanNecTemp = JSON.parse(JSON.stringify(errorField));
    
    errorFieldPlanNecTemp.centerList.map( element => {
      let dataCenter = valuesPlan.centerList.find( x => x.id === element.id);

      Object.keys(element).forEach((data) => {
        if (!['id','name'].includes(data))
        element[data] = validateError(dataCenter[data], dataCenter)[data] ? validateError(dataCenter[data], dataCenter, fieldPlannigRequerid[data])[data]() : [];
      });
    });

    setErrorField(errorFieldPlanNecTemp);
  };
  
  const printError = (error) => {
    if (error?.length > 0) {
      return error[0];
    } else {
      return "";
    }
  };

  const handleCheckedChange = (event) => { 
    const { name, checked } = event.target;
    const [center, nameField] = name.split('.', 2);

    let valuesData = valuesPlan;
    let valueCenter = valuesData.centerList.find( e => e.id === center);
    valueCenter[nameField]= checked;
    setValuesPlan({ ...valuesData });
  };

  useEffect(() => {
    try {
      if (LIST_MDS !== undefined) {
        if (LIST_MDS.length) {

          const PerfilFabricaciónRepetitiva = LIST_MDS.filter(
            (element) => element.listName === "PerfilFabricaciónRepetitiva"
          );

          const VerificacionDisponibilidad = LIST_MDS.filter(
            (element) => element.listName === "VerificacionDisponibilidad"
          );

          const ClaseAprovisionamiento = LIST_MDS.filter(
            (element) => element.listName === "ClaseAprovisionamiento"
          );

          const PlanificacionNecesidad = LIST_MDS.filter(
            (element) => element.listName === "PlanificacionNecesidad"
          );
          
          setList({
            featurePlanningNeedList: PlanificacionNecesidad[0].list[0].values,
            procurementTypeList: ClaseAprovisionamiento[0].list[0].values,
            verificationAvailableList: VerificacionDisponibilidad[0].list[0].values,
            repetitiveManufacturingProfileList: PerfilFabricaciónRepetitiva[0].list[0].values,
          });
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
    }
  }, [LIST_MDS]);


  const handleOpenCenter = (row) =>{
    let dataCenterList = JSON.parse(JSON.stringify(valuesPlan));
    let valueDataCenter = dataCenterList.centerList.find( x => x.id === row.id);
    valueDataCenter.open =  !valueDataCenter.open;
    setValuesPlan(dataCenterList);
  };

  const getStateColor = (row) => {
    let totalFields = 0;
    let completedFields = 0
    Object.keys(row).forEach((field) => {
      if(!['id','name','repetitiveManufacturing','open'].includes(field)){
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

  function RowCenter({row}) {
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

          <TableCell component="th" scope="row"> {row.name.split('-')[1]} </TableCell>
          
          <TableCell>{row.id.split('_')[0]}</TableCell>
          
          <TableCell><StateColor stateColor={getStateColor(row)}/></TableCell>

        </TableRow>
        <TableRow  style={{ background: '#EFF4FD'  }}>
          <TableCell  colSpan={6}>
            <Collapse in={row.open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div"></Typography>
                <Grid container spacing={4}>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MRPType",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MRPType",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("MRPType",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MRPType",configurationInputs).isRequired )}
                      isDisabled={((ValidarConfiguracionCampo("MRPType",configurationInputs).existeCampo === false ) ?  false : !ValidarConfiguracionCampo("MRPType",configurationInputs).isEnabled)}
                      label={"Caract. Planif. Nec"}
                      listOpt={list.featurePlanningNeedList}
                      errors={printError(errorField.centerList.find( x => x.id === row.id).featurePlanningNeed)}
                      placeholder="Seleccione la caracteristica"
                      valueId={row.featurePlanningNeed}
                      optionList={`${row.id}.featurePlanningNeed`}
                      onChange={changeDataPlanning}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("ProcurementType",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProcurementType",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("ProcurementType",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProcurementType",configurationInputs).isRequired )}
                      isDisabled={((ValidarConfiguracionCampo("ProcurementType",configurationInputs).existeCampo === false ) ?  false : !ValidarConfiguracionCampo("ProcurementType",configurationInputs).isEnabled)}
                      label={"Clase aprovisionamiento"}
                      listOpt={list.procurementTypeList}
                      errors={printError(errorField.centerList.find( x => x.id === row.id).procurementType)}
                      placeholder="Seleccione el tipo de adquisición"
                      valueId={row.procurementType}
                      optionList={`${row.id}.procurementType`}
                      onChange={changeDataPlanning}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isRequired )}
                      isDisabled={((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false ) ?  false : !ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isEnabled)}
                      label={"Verificación disponibilidad"}
                      listOpt={list.verificationAvailableList}
                      errors={printError(errorField.centerList.find( x => x.id === row.id).verificationAvailable)}
                      placeholder="Seleccione la verificación de disponibilidad"
                      valueId={row.verificationAvailable}
                      optionList={`${row.id}.verificationAvailable`}
                      onChange={changeDataPlanning}
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("RepetitiveManufacturingAllow",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("RepetitiveManufacturingAllow",configurationInputs).isVisible ) && 
                    <CheckboxCommon              
                      handleChange={handleCheckedChange}
                      disabled={((ValidarConfiguracionCampo("RepetitiveManufacturingAllow",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("RepetitiveManufacturingAllow",configurationInputs).isEnabled)}
                      label={"Indicador de manufactura repetitiva"}
                      checked={row.repetitiveManufacturing}
                      name = {`${row.id}.repetitiveManufacturing`}  
                    />}
                  </Grid>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("RepetitiveManufacturingProfile",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("RepetitiveManufacturingProfile",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false) ? row.repetitiveManufacturing : ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isRequired )}
                      isDisabled={((ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).existeCampo === false ) ?  !row.repetitiveManufacturing : !ValidarConfiguracionCampo("AvailabilityCheck",configurationInputs).isEnabled)}                      
                      label={"Perfil de manufactura repetitiva"}                      
                      listOpt={list.repetitiveManufacturingProfileList}
                      errors={printError(errorField.centerList.find( x => x.id === row.id).repetitiveManufacturingProfile)}
                      placeholder="Seleccione el perfil de fabricación"
                      valueId={row.repetitiveManufacturingProfile}
                      optionList={`${row.id}.repetitiveManufacturingProfile`}
                      onChange={changeDataPlanning}
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
      rows,
  }) => {
  
    return (
      <TableContainer style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }} >
        <Table>
          <TableHead  style={{ backgroundColor: '#5052A3' }}>
            <TableRow>
              <TableCell  style={{ color: "#FFFFFF", fontWeight: "bold"}}/>
              {titleColumns.map((titleColumn) => (
                <TableCell style={{ color: "#FFFFFF", fontWeight: "bold"}}>{titleColumn} </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <RowCenter key={row.name} row={row} />
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
        <TitlePage tittle={"Planificación Necesidades"} tooltip={"En esta vista se puede visualizar todos los campos definidos para la vista de Planificación Necesidades para realizar la creación de una nueva solicitud de material"}/>
        <Grid item xs={12}>
          <CenterGrid 
            titleColumns={["Centro logístico", "Código", "Estado"]}
            rows = {valuesPlan.centerList}
          />
        </Grid>
      </Grid>
    </>
  );
};
