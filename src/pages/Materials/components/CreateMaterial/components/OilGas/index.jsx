import * as React from "react";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo, StateColor, TitlePage } from "../../../../widgets";
import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ValidarConfiguracionCampo } from "../../ConfiguracionValidacion";

//InitialState HOOK
const initialState = {
  groupUM: "",
  conversionGroup: "",
};

export const OilGas = ({
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
    const { LIST_MDS, dataOilGas, setDataOilGas, configurationInputs } = materialContext;

  const [list, setList] = useState({
    groupUMList: [],
    conversionGroupList: [],
  });

  const getCenterList = (type = 1) =>{
    let centerList = [];

    logisticCenterstoreList.map(element => {
      if (typeCompany ==="E"){
          centerList.push( {
            id: element.id,
            name: element.logisticCenter,
            groupUM: (type===1 ? "" : []),
            conversionGroup: (type===1 ? "" : []),
            open: (type===1 ? false : [])
        });
      }else{
        centerList.push( {
          id: element.id,
          name: element.logisticCenter,
          conversionGroup: (type===1 ? "" : []),
          open: (type===1 ? false : [])
        });
      }
    });
      return {
        centerList: centerList
      };

  };
  
    
        
    const [valuesOilGasByCenter, setValuesOilGasByCenter] = useState({
      centerList: getCenterList(1).centerList
    });

    useEffect(() => {
      if (Object.keys(dataOilGas).length !== 0) {
        setValuesOilGasByCenter({...dataOilGas});
      }
    },[]);

    const [errorFieldOilGasByCenter, setErrorFieldOilGasByCenter] = useState({
      centerList: getCenterList(2).centerList
    });
  
    useEffect(() => {
      if (isSubmitting) {

          //center validation error
        const errorDataOilGasByCenter = [];
        let errorFieldOilGasByCenterTemp = JSON.parse(JSON.stringify(errorFieldOilGasByCenter));
        
        errorFieldOilGasByCenterTemp.centerList.map( element => {
          element.id = [];
          element.name = [];
          errorDataOilGasByCenter.push(Object.values(element).every(
            (data) => data.length == 0 && data !== ""
          ));
        });

        const errorDataOilGasByCenterResult = Object.values(errorDataOilGasByCenter).every(
          (data) => data
        );
        
        if ( errorDataOilGasByCenterResult) {
          setForm({
            ...valuesOilGasByCenter
          });
          setDataOilGas({
            ...valuesOilGasByCenter
          });
        }
      }
      setIsSubmitting(false);
    }, [errorFieldOilGasByCenter]);
 

  // const [valuesOilGasByCenter, setValuesOilGasByCenter] = useState({
  //   centerList: getCenterList(1).centerList
  // });

  // const [errorFieldOilGasByCenter, setErrorFieldOilGasByCenter] = useState({
  //   centerList: getCenterList(2).centerList
  // });

  const [fieldRequerid, setFielRequerid] = useState({
    groupUM:{
      requerid:((ValidarConfiguracionCampo("UMGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("UMGroup",configurationInputs).isRequired ),
      visible:((ValidarConfiguracionCampo("UMGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("UMGroup",configurationInputs).isVisible ),
      enabled:((ValidarConfiguracionCampo("UMGroup",configurationInputs).existeCampo === false) ? isEdited : !ValidarConfiguracionCampo("UMGroup",configurationInputs).isEnabled)
    },
    conversionGroup:{
      requerid:((ValidarConfiguracionCampo("ConversionGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ConversionGroup",configurationInputs).isRequired ),
      visible:((ValidarConfiguracionCampo("ConversionGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ConversionGroup",configurationInputs).isVisible ),
      enabled:((ValidarConfiguracionCampo("ConversionGroup",configurationInputs).existeCampo === false) ? isEdited : !ValidarConfiguracionCampo("ConversionGroup",configurationInputs).isEnabled)
    }
  })
  
  useEffect(() => {
    if (isSubmitting) {

        //center validation error
      const errorDataOilGasByCenter = [];
      let errorFieldOilGasByCenterTemp = JSON.parse(JSON.stringify(errorFieldOilGasByCenter));
      
      errorFieldOilGasByCenterTemp.centerList.map( element => {
        element.id = [];
        element.name = [];
        errorDataOilGasByCenter.push(Object.values(element).every(
          (data) => data.length == 0 && data !== ""
        ));
      });

      const errorDataOilGasByCenterResult = Object.values(errorDataOilGasByCenter).every(
        (data) => data
      );
      
      if ( errorDataOilGasByCenterResult) {
        setForm({
          ...valuesOilGasByCenter
        });
      }
    }
    setIsSubmitting(false);
  }, [errorFieldOilGasByCenter]);

  const changeDataOilGasByCenter= (e) => {
    const { name, value } = e.target;
    const [center, nameField] = name.split('.', 2);

    let listErrorData = errorFieldOilGasByCenter;
    let valuesData = valuesOilGasByCenter;

    let errorCenter = listErrorData.centerList.find( e => e.id === center);
    let valueCenter = valuesData.centerList.find( e => e.id === center);

    setErrorFieldOilGasByCenter(() => {
      const validations = validateError(value, valueCenter, typeCompany,fieldRequerid[nameField].requerid)[nameField]() ;
      errorCenter[nameField] = validations;
      return { ...listErrorData};
    });
    valueCenter[nameField]= value;
    setValuesOilGasByCenter({ ...valuesData });
  };

  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);
  
  const submitValidate = () => {
    
    // validation error by center
    const errorDataOilGasByCenter = [];
    let errorFieldOilGasByCenterTemp = JSON.parse(JSON.stringify(errorFieldOilGasByCenter));
    
    errorFieldOilGasByCenterTemp.centerList.map( element => {
      let dataCenter = valuesOilGasByCenter.centerList.find( x => x.id === element.id);

      Object.keys(element).forEach((data) => {
        if (!['id','name','open'].includes(data))
        element[data] = validateError(dataCenter[data], dataCenter, typeCompany,fieldRequerid[data].requerid)[data] ? validateError(dataCenter[data], dataCenter, typeCompany,fieldRequerid[data].requerid)[data]() : [];
      });
    });

    setErrorFieldOilGasByCenter(errorFieldOilGasByCenterTemp);

  };
  
  const printError = (error) => {
    if (error.length > 0) {
      return error[0];
    } else {
      return "";
    }
  };

  const handleOpenCenter = (row) =>{
    let dataCenterList = JSON.parse(JSON.stringify(valuesOilGasByCenter));
    let valueDataCenter = dataCenterList.centerList.find( x => x.id === row.id);
    valueDataCenter.open =  !valueDataCenter.open;
    setValuesOilGasByCenter(dataCenterList);
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
      if (LIST_MDS !== undefined) {
        if (LIST_MDS.length) {
          /* LISTA GRUPO COMPRAS */

          const GrupoConversion = LIST_MDS.filter(
            (element) => element.listName === "GrupoConversion"
          );

          const grupoUM = LIST_MDS.filter(
            (element) => element.listName === "GrupoUM"
          );

          let groupUmFilteredValue = "";

          switch (materialType){
              case "FERT_E":
              case "ZCRU_E": 
                groupUmFilteredValue = "ZQ1_E"
                break;
              case "FERT_R":
              case "ZCRU_R":  
                groupUmFilteredValue = "ZQ1_R"
                break;
              case "ZGAS_E":
                groupUmFilteredValue = "ZQ5_E"
                break;
              case "ZGAS_R":
                groupUmFilteredValue = "ZQ5_R"
                break;
              default:
          }

          let grupoUmFiltered = [];
          if (typeCompany === "E"){
            grupoUmFiltered = grupoUM[0].list[0].values.filter(
              (element) => element.id === groupUmFilteredValue
            );
          }  
          
          setList({
            groupUMList: grupoUmFiltered,
            conversionGroupList: GrupoConversion[0].list[0].values,
          });

        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
    }
  }, [LIST_MDS]);

  useEffect(()=>{
    let valuesData = valuesOilGasByCenter
    if ( typeCompany ==="E" ) {
      for (const item of valuesOilGasByCenter.centerList) {
        let center = item.id
        let valueCenter = valuesData.centerList.find( e => e.id === center);
        if( materialType.split('_')[0]==="FERT" || materialType.split('_')[0]==="ZCRU" ) {
          valueCenter['groupUM'] = 'ZQ1_E'
        } else if(materialType.split('_')[0]==="ZGAS") {
          valueCenter['groupUM'] = 'ZQ5_E'
        }
      }
    }
  }, [valuesOilGasByCenter, materialType])

  function RowCenter({row, disable,fieldRequerid}) {
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
                    {typeCompany ==="E" && <Grid item xs={4}>{fieldRequerid["groupUM"].visible &&
                      <SearchSelect
                        isRequired={fieldRequerid["groupUM"].requerid}
                        label={"Grupo UM"}
                        isDisabled={fieldRequerid["groupUM"].enabled}
                        listOpt={list.groupUMList}
                        errors={printError(errorFieldOilGasByCenter.centerList.find( x => x.id === row.id).groupUM)}
                        placeholder="Seleccione un grupo UM"
                        valueId={row.groupUM}
                        optionList={`${row.id}.groupUM`}
                        onChange={changeDataOilGasByCenter}
                      />}
                    </Grid>}
                    <Grid item xs={4}>{fieldRequerid["conversionGroup"].visible &&
                      <SearchSelect
                        isRequired={fieldRequerid["conversionGroup"].requerid}
                        label={"Grupo conversión"}
                        isDisabled={fieldRequerid["conversionGroup"].enabled}
                        listOpt={list.conversionGroupList}
                        errors={printError(errorFieldOilGasByCenter.centerList.find( x => x.id === row.id).conversionGroup)}
                        placeholder="Seleccione el Grupo de conversión"
                        valueId={row.conversionGroup}
                        optionList={`${row.id}.conversionGroup`}
                        onChange={changeDataOilGasByCenter}
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
              <RowCenter key={row.name} row={row} titleSubColumns={titleSubColumns} handleDelete= {handleDelete} disable= {disable} fieldRequerid={fieldRequerid}/>
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
        <TitlePage tittle={"Oil and Gas"} tooltip={"Texto de apoyo"}/>
        <Grid item xs={12}>
          <CenterGrid 
            titleColumns={["Centro logístico", "Código", "Estado"]}
            rows = {valuesOilGasByCenter.centerList}
          />
        </Grid>
      </Grid>
    </>
  );
};
