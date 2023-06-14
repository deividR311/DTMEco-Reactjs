import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { TextField, InputLabel } from "@material-ui/core";
import { validateError } from "./validator";
import { Grid } from "@material-ui/core";
import { HeaderDataInfo, TitlePage, InputCustom} from "../../../../widgets";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import { Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { ValidarConfiguracionCampo } from "../../ConfiguracionValidacion";


//InitialState HOOK
const initialState = {
  observations: "",
  unitMeasure: "",
  labelUnitMeasure: "",
  unitMeasureDataList:[],
  numerator: "",
  denominator: "",
  alternativeText: "",
  language: "",
  labelLanguage: "",
  additionalTextDataList: []
};

export const InformacionAdicional = ({
  setForm,
  isEdited,
  setError,
  dataEdit,
  isSubmitting,
  setIsSubmitting,
  typeCompany,
  materialType,
  materialName,
  orderUnitmeasure,
}) => {
  const materialContext = useContext(MaterialContext);
  const { LIST_MDS, dataInformacionAdicional, setDataInformacionAdicional,configurationInputs } = materialContext;

  //HOOK
  const [list, setList] = useState({
    unitMeasureList: []
  });

  const [panelTab, setPanelTab] = useState('1');

  const [values, setValues] = useState(initialState);

  const [fieldAdicionalRequerid, setFieldAdicionalRequerid] = useState({
    unitMeasure:((ValidarConfiguracionCampo("AlternativeUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AlternativeUnitMeasure",configurationInputs).isRequired ),
    numerator:((ValidarConfiguracionCampo("Numerator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Numerator",configurationInputs).isRequired ),
    denominator:((ValidarConfiguracionCampo("Denominator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Denominator",configurationInputs).isRequired ),
    language:((ValidarConfiguracionCampo("MaterialLanguage",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialLanguage",configurationInputs).isRequired ),
    observations:((ValidarConfiguracionCampo("Observations",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Observations",configurationInputs).isRequired )
  })

  useEffect(() => {    
    if (Object.keys(dataInformacionAdicional).length !== 0) {
      setValues({...dataInformacionAdicional});
    }
  },[]);

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
      setDataInformacionAdicional(values);
    }
  }
  setIsSubmitting(false);
}, [errorField]);

// useEffect(() => {
//   if (isSubmitting) {
//     submitValidate();
//   }
// }, [isSubmitting]);

const handleChange = (event, newPanelTab) => {
  setPanelTab(newPanelTab);
};

const printError = (error) => {
  if (errorField?.denominator[0] === 0) {
    return errorField.msg;
  }
  if (error?.length > 0) {
    return error[0];
  } else {
    return "";
  }
};

const changeData = (e) => {
  const { name, value } = e.target;
  const {label} = e;

  switch (name) {
    case "unitMeasure":
      setValues({ ...values, [name]: value,
        labelUnitMeasure: label
      });
      break;
    case "language":
      setValues({ ...values, [name]: value,
        labelLanguage: label
      });
      break;
    case "denominator":
      setErrorField(() => {
        const validations = validateError(value, "",fieldAdicionalRequerid[name]) ;
        return { ...errorField, [name]:[validations?.denominator?.response], 'msg':[validations?.denominator?.msg] }
      });    
      parseInt(value)!==0 && setValues({ ...values, [name]:value })
      break;
    case "observations":
      setValues({ ...values, [name]: value
      });
      
      setErrorField(() => {
        const validations = validateError(value, "",fieldAdicionalRequerid[name])[name]() ;
        return { ...errorField, [name]:validations }
      });
      break;
    default:
      setValues({ ...values, [name]: value
      });
      break;
  }
};

useEffect(() => {
  let listUnitMeasure =values.unitMeasureDataList;

  let unitMeasure = listUnitMeasure.find(unitMeasure => unitMeasure.id === orderUnitmeasure);
  if (orderUnitmeasure && !unitMeasure){
    const unitMeasureRow = {
      unitMeasure: "",
      id: orderUnitmeasure,
      numerator: "",
      denominator:"",
      action: false
    };

    listUnitMeasure.push(unitMeasureRow);

    setValues({...values,
      unitMeasureList: listUnitMeasure
    })
  }
  try {
    if (LIST_MDS !== undefined) {
      if (LIST_MDS.length) {

        const UnidadMedidaPedido = LIST_MDS.filter(
          (element) => element.listName === "UnidadMedidaPedido"
        );

        const Idioma = LIST_MDS.filter(
          (element) => element.listName === "Idioma"
        );

        setList({
          unitMeasureList: UnidadMedidaPedido[0].list[0].values,
          languageList: Idioma[0].list[0].values
        });
      }
    }
  } catch (error) {
    setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
  }
}, [LIST_MDS]);

const handleClickAddUnitMeasure = () => {

  if (values.unitMeasure!=="" && values.labelUnitMeasure!=="" && values.numerator!== "" && values.denominator !== ""){
    let dataUnitMeasureList = values.unitMeasureDataList;
  
    let unitMeasure = dataUnitMeasureList.find(unitMeasure => unitMeasure.id === values.unitMeasure);
  
    if (!unitMeasure){
      const unitMeasureRow = {
        unitMeasure: values.labelUnitMeasure,
        id: values.unitMeasure,
        numerator: values.numerator,
        denominator: values.denominator,
        action: true
      };
  
      dataUnitMeasureList.push(unitMeasureRow);
  
      setValues({...values,
        unitMeasureList: dataUnitMeasureList
      })
    }
  }
  
};

const handleClickAddAdditionalText = () => {

  if (values.alternativeText!=="" && values.labelLanguage!=="" && values.alternativeText!==""){
    let dataAdditionalTextList = values.additionalTextDataList;
  
    let additionalText = dataAdditionalTextList.find(additionalText => additionalText.id === values.language);
  
    if (!additionalText){
      const additionalTextRow = {
        language: values.labelLanguage,
        id: values.language,
        alternativeText: values.alternativeText,
        action: true
      };
  
      dataAdditionalTextList.push(additionalTextRow);
  
      setValues({...values,
        additionalTextDataList: dataAdditionalTextList
      })
    }
  }
  
};

const handleDeleteUnitMeasure = (row) => {
  let unitMeasureDataList = values.unitMeasureDataList;

  let list = unitMeasureDataList.filter(function(element){ 
    return element.id !== row.id; 
});

setValues({...values,
  unitMeasureDataList: list
});

};

 const changeDataTabUnitMeasure= (e) => {
   const { name, value } = e.target;
   const [unitMeasure, nameField] = name.split('.', 2);
   let listErrorData = errorField;
   let valuesData = values;
   let errorUnitMeasure = listErrorData.unitMeasureDataList.find( e => e.id === unitMeasure);
   let valueUnitMeasure = valuesData.unitMeasureDataList.find( e => e.id === unitMeasure);
   setErrorField(() => {
     const validations = validateError(value, valueUnitMeasure)[nameField]() ;
     errorUnitMeasure[nameField] = validations;
     return { ...listErrorData};
   });
   valueUnitMeasure[nameField]= value;
   setValues({ ...valuesData });
 };

const handleDeleteAdditionalText = (row) => {
  let additionalTextDataList = values.additionalTextDataList;

  let list = additionalTextDataList.filter(function(element){ 
    return element.id !== row.id; 
});

setValues({...values,
  additionalTextDataList: list
});

};

const UnitMeasureGrid = ({
  titleColumns,
  rows,
}) => {

return (
  <TableContainer component={Paper} >
    <Table size="medium" aria-label="a dense table">
      <TableHead style={{ background: '#5052A3', borderRadius: "10px"}}>
        <TableRow >
        {titleColumns.map((titleColumn) => (
                <TableCell style={{ color: "#FFFFFF", fontWeight: "bold"}}>{titleColumn} </TableCell>
              ))}
        </TableRow>
      </TableHead>
      <TableBody>
        { rows?.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row"> 
              {row.id.split('_')[0]}
            </TableCell>
            <TableCell> {row.action ? (row.numerator): (                    
              <InputCustom
                required={true}
                name={`${row.id}.numerator`}
                value={row.numerator}
                onChange={changeData}
                widthInput={"fullInput"}
                inputMode={"numeric"}
                pattern={"[0-9]*"}
              />)}
            </TableCell>
            <TableCell>
            {row.action ? (row.denominator): (                    
              <InputCustom
                required={true}
                name={`${row.id}.denominator`}
                value={row.denominator}
                onChange={changeData}
                widthInput={"fullInput"}
                inputMode={"numeric"}
                pattern={"[1-9]*"}
              />)}
            </TableCell>
            {row.action &&<TableCell>
              <IconButton aria-label="close" onClick={() => handleDeleteUnitMeasure(row)}> 
                  <DeleteIcon style={{ color: "#9F9D9D" }} />
              </IconButton>
            </TableCell>}
          </TableRow>
        ))}  
      </TableBody>
    </Table>
  </TableContainer> 
);
}

const AdditionalText = ({
  titleColumns,
  rows,
}) => {

return (
  <TableContainer component={Paper} >
    <Table size="medium" aria-label="a dense table">
      <TableHead style={{ background: '#5052A3', borderRadius: "10px"}}>
        <TableRow >
        {titleColumns.map((titleColumn) => (
                <TableCell style={{ color: "#FFFFFF", fontWeight: "bold"}}>{titleColumn} </TableCell>
              ))}
        </TableRow>
      </TableHead>
      <TableBody>
        { rows?.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row"> 
              {row.id}
            </TableCell>
            <TableCell>
              {row.alternativeText}
            </TableCell>
            {row.action &&<TableCell>
              <IconButton aria-label="close" onClick={() => handleDeleteAdditionalText(row)}> 
                  <DeleteIcon style={{ color: "#9F9D9D" }} />
              </IconButton>
            </TableCell>}
          </TableRow>
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
        <TitlePage tittle={"Datos adicionales"} tooltip={"texto de ayuda"}/>
        <Grid item xs={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={panelTab}>
                <Box sx={{  justifyContent: 'center' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Unidades de medida" value="1" sx={{ width: '33.3%',  }} style={{ color: panelTab==='1' ? "#FFFFFF" : "#4a4a4a" , fontWeight: "bold" , background: panelTab==='1' ? "#0F0C5A" : "#ebebeb", margin: '5px'}}/>
                    <Tab label="Texto Adicional" value="2"  sx={{ width: '33.3%' }} style={{ color: panelTab==='2' ? "#FFFFFF" : "#4a4a4a", fontWeight: "bold", background:  panelTab==='2' ? "#0F0C5A" : "#ebebeb",margin: '5px'}} />
                    <Tab label="Observaciones" value="3"  sx={{ width: '33.3%'}} style={{ color: panelTab==='3' ? "#FFFFFF" : "#4a4a4a", fontWeight: "bold", background:  panelTab==='3' ? "#0F0C5A" : "#ebebeb",margin: '5px'}}/>
                  </TabList>
                </Box>
                <TabPanel value="1">
                <Grid container spacing={4}>
                  <Grid item xs={3}>{((ValidarConfiguracionCampo("AlternativeUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AlternativeUnitMeasure",configurationInputs).isVisible ) && 
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("AlternativeUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("AlternativeUnitMeasure",configurationInputs).isRequired )}
                      label={"Unidad de medida"}
                      isDisabled={((ValidarConfiguracionCampo("AlternativeUnitMeasure",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("AlternativeUnitMeasure",configurationInputs).isEnabled)}
                      listOpt={list.unitMeasureList}
                      placeholder="Seleccione..."
                      valueId={values.unitMeasure}
                      optionList={"unitMeasure"}
                      onChange={changeData}
                    />}
                  </Grid>
                  <Grid item xs={3}>{((ValidarConfiguracionCampo("Numerator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Numerator",configurationInputs).isVisible ) && 
                    <InputCustom
                      required={((ValidarConfiguracionCampo("Numerator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Numerator",configurationInputs).isRequired )}
                      disabled={((ValidarConfiguracionCampo("Numerator",configurationInputs).existeCampo === false ) ? false : !ValidarConfiguracionCampo("Numerator",configurationInputs).isEnabled)}
                      label={"Numerador (X)"}
                      name={"numerator"}
                      value={values.numerator}
                      onChange={changeData}
                      errors={errorField?.numerator}
                      widthInput={"fullInput"}
                    />}
                  </Grid>
                  <Grid item xs={3}>{((ValidarConfiguracionCampo("Denominator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Denominator",configurationInputs).isVisible ) &&
                    <InputCustom
                      required={((ValidarConfiguracionCampo("Denominator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Denominator",configurationInputs).isRequired )}
                      disabled={((ValidarConfiguracionCampo("Denominator",configurationInputs).existeCampo === false ) ? false : !ValidarConfiguracionCampo("Denominator",configurationInputs).isEnabled)}
                      label={"Denomindador (Y)"}
                      name={"denominator"}
                      value={values.denominator}
                      onChange={changeData}
                      errors={((ValidarConfiguracionCampo("Denominator",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Denominator",configurationInputs).isRequired ) === true ? printError(errorField?.denominator) : ""}
                      widthInput={"fullInput"}
                      pattern={"[1-9]{1,15}"}
                    />}
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickAddUnitMeasure}
                      className="ButtonAdd"
                    >
                      Agregar
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <UnitMeasureGrid titleColumns= {["Unidad de medida", "Numerador (X)", "Denominador (Y)", "Acciones"]} rows={values.unitMeasureDataList} ></UnitMeasureGrid>
                  </Grid>
                </Grid>
                </TabPanel>
                <TabPanel value="2">
                <Grid container spacing={4}>
                  <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialLanguage",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialLanguage",configurationInputs).isVisible ) &&
                    <SearchSelect
                      isRequired={((ValidarConfiguracionCampo("MaterialLanguage",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("MaterialLanguage",configurationInputs).isRequired )}
                      label={"Idioma"}
                      isDisabled={((ValidarConfiguracionCampo("MaterialLanguage",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialLanguage",configurationInputs).isEnabled)}
                      listOpt={list.languageList}
                      errors={printError(errorField?.language)}
                      placeholder="Seleccione..."
                      valueId={values.language}
                      optionList={"language"}
                      onChange={changeData}
                    />}
                  </Grid>
                  <Grid item xs={4}>
                    <InputCustom
                      required={true}
                      label={"Texto alternativo"}
                      name={"alternativeText"}
                      value={values.alternativeText}
                      onChange={changeData}
                      errors={errorField?.alternativeText}
                      widthInput={"fullInput"}
                      showCharacters={true}
                      lengthCharacters={values.alternativeText}
                      max={40}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickAddAdditionalText}
                      className="ButtonAdd"
                    >
                      Agregar
                    </Button>
                  </Grid>
                    <Grid item xs={12}>
                      <AdditionalText titleColumns= {["Idioma", "Texto Alternativo", "Acciones"]} rows={values.additionalTextDataList} ></AdditionalText>
                    </Grid>
                </Grid>
                </TabPanel>
                <TabPanel value="3">
                  <Grid item xs={12}>{((ValidarConfiguracionCampo("Observations",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Observations",configurationInputs).isVisible ) &&  
                    <>
                      <InputLabel
                          className="__labelInputOBSERVATIONS"
                          error={errorField?.observations?.length > 0 ? errorField?.observations[0] : ""}
                        >
                        Observaciones
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          {((ValidarConfiguracionCampo("Observations",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Observations",configurationInputs).isRequired ) && " *"}
                        </span>
                      </InputLabel>
                      <TextField
                        rows={12}
                        multiline
                        autoComplete="off"
                        name={"observations"}
                        onChange={changeData}
                        value={values.observations}
                        error={errorField?.observations?.length > 0 ? errorField?.observations[0] : ""}                         
                        helperText={
                          errorField?.observations?.length > 0 ? errorField?.observations[0] : ""
                        }
                        inputProps={{
                          maxLength: 900,
                        }}
                        variant="outlined"
                        placeholder="Ingrese las observaciones"
                        style={{ width: '100%' }}
                        disabled={((ValidarConfiguracionCampo("Observations",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("Observations",configurationInputs).isEnabled)}
                      />
                      <p>
                        Caracteres: {values.observations.length} (max. 900)
                      </p>
                    </>
                    }
                </Grid>
                </TabPanel>
              </TabContext>
            </Box>
            </Grid>
      </Grid>
    </>
  );
};
