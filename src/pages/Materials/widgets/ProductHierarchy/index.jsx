import { useEffect, useContext } from "react";
import { InputCustom } from "../InputCustom";
import { Grid } from "@material-ui/core";
import { SearchSelect } from "../../../../sharedComponents/SearchSelectCommon";
import MaterialContext from "../../../../context/Materials/materialContext";
import { ValidarConfiguracionCampo } from "../../components/CreateMaterial/ConfiguracionValidacion";

export const ProductHierarchy = ({
    name,
    value,
    validateError,
    LIST_MDS,
    values,
    setValues,
    errorField,
    setErrorField,
    list,
    setList,
    updateList
}) => {

  const materialContext = useContext(MaterialContext);
  const { configurationInputs} = materialContext;

// const updateList = () =>{
//   try {
//     if (LIST_MDS !== undefined) {
//       if (LIST_MDS.length) {
//         let JerarquiaProductoNivel2PorPadre = [];
//         let JerarquiaProductoNivel3PorPadre = [];
//         let JerarquiaProductoNivel4PorPadre = [];
//         let JerarquiaProductoNivel5PorPadre = [];
        

//         let dataList = {
//           levelHierarchyOneList: [],
//           levelHierarchyTwoList: [],
//           levelHierarchyThreeList: [],
//           levelHierarchyFourList: [],
//           levelHierarchyFiveList: [],
//         };

//         const JerarquiaProductoNivel1  = LIST_MDS.filter(
//           (element) => element.listName === "JerarquiaProductoNivel1"
//         );
//         if(JerarquiaProductoNivel1.length){
//           dataList.levelHierarchyOneList = JerarquiaProductoNivel1[0].list[0].values;
//         }

//         if(values.levelHierarchyOne &&  list.levelHierarchyOneList.length >= 1){
//           const JerarquiaProductoNivel2  = LIST_MDS.filter(
//             (element) => element.listName === "JerarquiaProductoNivel2" 
//           );
//           JerarquiaProductoNivel2PorPadre  = JerarquiaProductoNivel2[0].list.filter(
//             (element) => element.parent.id === values.levelHierarchyOne
//           );
//           if(JerarquiaProductoNivel2PorPadre.length){
//             dataList.levelHierarchyTwoList = JerarquiaProductoNivel2PorPadre[0].values;
//           }
//         }
        
//         if(values.levelHierarchyTwo && JerarquiaProductoNivel2PorPadre.length >= 1){
//           const JerarquiaProductoNivel3  = LIST_MDS.filter(
//             (element) => element.listName === "JerarquiaProductoNivel3" 
//           );
//           JerarquiaProductoNivel3PorPadre  = JerarquiaProductoNivel3[0].list.filter(
//             (element) => element.parent.id === values.levelHierarchyTwo
//           );
//           if(JerarquiaProductoNivel3PorPadre.length){
//             dataList.levelHierarchyThreeList = JerarquiaProductoNivel3PorPadre[0].values;
//           }
//         }

//         if(values.levelHierarchyThree && JerarquiaProductoNivel3PorPadre.length >= 1){
//           const JerarquiaProductoNivel4  = LIST_MDS.filter(
//             (element) => element.listName === "JerarquiaProductoNivel4" 
//           );
//           JerarquiaProductoNivel4PorPadre  = JerarquiaProductoNivel4[0].list.filter(
//             (element) => element.parent.id === values.levelHierarchyThree
//           );
//           if(JerarquiaProductoNivel4PorPadre.length){
//             dataList.levelHierarchyFourList = JerarquiaProductoNivel4PorPadre[0].values;
//           }
//        }
//         if(values.levelHierarchyFour && JerarquiaProductoNivel4PorPadre.length >= 1){
//           const JerarquiaProductoNivel5  = LIST_MDS.filter(
//             (element) => element.listName === "JerarquiaProductoNivel5" 
//           );
//           JerarquiaProductoNivel5PorPadre  = JerarquiaProductoNivel5[0].list.filter(
//             (element) => element.parent.id === values.levelHierarchyFour
//           );
//           if(JerarquiaProductoNivel5PorPadre.length){
//             dataList.levelHierarchyFiveList = JerarquiaProductoNivel5PorPadre[0].values;
//           }
//        }

//         setList({
//           ...list,
//           levelHierarchyOneList: dataList.levelHierarchyOneList,
//           levelHierarchyTwoList: dataList.levelHierarchyTwoList,
//           levelHierarchyThreeList: dataList.levelHierarchyThreeList,
//           levelHierarchyFourList: dataList.levelHierarchyFourList,
//           levelHierarchyFiveList: dataList.levelHierarchyFiveList,
//         });

//       }
//     }
//   } catch (error) {
//     //setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
//   }
// }


useEffect(() => {
    if(value){
      const levelHierarchyList = value.match(/.{1,2}/g);
        setValues({
            ...values,
            levelHierarchyList:levelHierarchyList,
            levelHierarchyLength: levelHierarchyList.length,
            levelHierarchyOne: levelHierarchyList[0],
            levelHierarchyTwo: levelHierarchyList[1],
            levelHierarchyThree: levelHierarchyList[2],
            levelHierarchyFour: levelHierarchyList[3],
            levelHierarchyFive: levelHierarchyList[4],
        });
    }
    
}, [value]);

useEffect(() => {
  try {
    if (LIST_MDS !== undefined) {
      if (LIST_MDS.length) {
        const JerarquiaProductoNivel1  = LIST_MDS.filter(
          (element) => element.listName === "JerarquiaProductoNivel1"
        );
        setList({
          ...list,
          levelHierarchyOneList: JerarquiaProductoNivel1[0].list[0].values,
        });

      }
    }
  } catch (error) {
   // setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
  }
}, [LIST_MDS]);

useEffect(() => {
  let productFather = "";
  if(values.levelHierarchyOne !== undefined) productFather += values.levelHierarchyOne;
  if(values.levelHierarchyTwo !== undefined) productFather += values.levelHierarchyTwo;
  if(values.levelHierarchyThree !== undefined) productFather += values.levelHierarchyThree;
  if(values.levelHierarchyFour !== undefined) productFather += values.levelHierarchyFour;
  if(values.levelHierarchyFive !== undefined) productFather += values.levelHierarchyFive;
  setValues({ 
    ...values, 
    levelHierarchyList: [values.levelHierarchyOne, values.levelHierarchyTwo, values.levelHierarchyThree, values.levelHierarchyFour, values.levelHierarchyFive],
    productHierarchy: values.levelHierarchyOne + values.levelHierarchyTwo + values.levelHierarchyThree + values.levelHierarchyFour + values.levelHierarchyFive,
    productFather:productFather
  });

},[values.levelHierarchyOne, values.levelHierarchyTwo, values.levelHierarchyThree, values.levelHierarchyFour, values.levelHierarchyFive]);

useEffect(() => {
  updateList();
},[values.levelHierarchyList]);

const changeData = (e) => {
  const { name, value } = e.target;
    setErrorField(() => {
      const validations = validateError(value, values, list)[name]() ;
      return { ...errorField, [name]: validations};
    });
  
  if(name==='levelHierarchyOne'){
    setValues({ 
      ...values, 
      [name]: value,
      levelHierarchyTwo : "",
      levelHierarchyThree : "",
      levelHierarchyFour : "",
      levelHierarchyFive : ""
      });
  }

  if(name==='levelHierarchyTwo'){
    setValues({ 
      ...values, 
      [name]: value,
      levelHierarchyThree : "",
      levelHierarchyFour : "",
      levelHierarchyFive : ""
      });
  }

  if(name==='levelHierarchyThree'){
    setValues({ 
      ...values, 
      [name]: value,
      levelHierarchyFour : "",
      levelHierarchyFive : ""
      });
  }

  if(name==='levelHierarchyFour'){
    setValues({ 
      ...values, 
      [name]: value,
      levelHierarchyFive : ""
      });
  }

  if(name==='levelHierarchyFive'){
    setValues({ 
      ...values, 
      [name]: value,
      });
  }

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

  return(
    <Grid container spacing={4} style={{ backgroundColor: "#ededed", borderRadius: "5px"}}>
        <Grid item xs={12}>{((ValidarConfiguracionCampo("ProductHierarchy",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProductHierarchy",configurationInputs).isVisible) &&
          <InputCustom
            disabled={((ValidarConfiguracionCampo("ProductHierarchy",configurationInputs).existeCampo === false) ? true : !ValidarConfiguracionCampo("ProductHierarchy",configurationInputs).isEnabled)}
            required={((ValidarConfiguracionCampo("ProductHierarchy",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProductHierarchy",configurationInputs).isRequired)}
            label={"Jerarquía de productos"}
            name={name}
            value={values.levelHierarchyList.join('')}
            showCharacters={true}
            lengthCharacters={values.levelHierarchyList.join('')}
            max={10}
            widthInput={"fullInput"}
          />}
        </Grid>
        <Grid item xs={12}>
          <SearchSelect
            isRequired={true}
            label={"Jerarquía de producto nivel 1"}
            listOpt={list.levelHierarchyOneList}
            errors={printError(errorField.levelHierarchyOne)}
            placeholder="Seleccione el nivel 1"
            valueId={values.levelHierarchyOne}
            optionList={"levelHierarchyOne"}
            onChange={changeData}
          />
        </Grid>
        {values.levelHierarchyOne && list.levelHierarchyTwoList.length>=1 && 
        <Grid item xs={12}>
          <SearchSelect
            isRequired={true}
            label={"Jerarquía de producto nivel 2"}
            listOpt={list.levelHierarchyTwoList}
            errors={printError(errorField.levelHierarchyTwo)}
            placeholder="Seleccione el nivel 2"
            valueId={values.levelHierarchyTwo}
            optionList={"levelHierarchyTwo"}
            onChange={changeData}
          />
        </Grid>}
        {values.levelHierarchyTwo && list.levelHierarchyThreeList.length>=1 &&
        <Grid item xs={12}>
          <SearchSelect
            isRequired={true}
            label={"Jerarquía de producto nivel 3"}
            listOpt={list.levelHierarchyThreeList}
            errors={printError(errorField.levelHierarchyThree)}
            placeholder="Seleccione el nivel 3"
            valueId={values.levelHierarchyThree}
            optionList={"levelHierarchyThree"}
            onChange={changeData}
          />
        </Grid>}
        {values.levelHierarchyThree && list.levelHierarchyFourList.length>=1 ? 
        <Grid item xs={12}>
          <SearchSelect
            isRequired={true}
            label={"Jerarquía de producto nivel 4"}
            listOpt={list.levelHierarchyFourList}
            errors={printError(errorField.levelHierarchyFour)}
            placeholder="Seleccione el nivel 4"
            valueId={values.levelHierarchyFour}
            optionList={"levelHierarchyFour"}
            onChange={changeData}
          />
        </Grid>: <Grid item xs={12}></Grid> }
        {values.levelHierarchyFour && list.levelHierarchyFiveList.length >=1 &&
        <Grid item xs={12}>
          <SearchSelect
            isRequired={true}
            label={"Jerarquía de producto nivel 5"}
            listOpt={list.levelHierarchyFiveList}
            errors={printError(errorField.levelHierarchyFive)}
            placeholder="Seleccione el nivel 5"
            valueId={values.levelHierarchyFive}
            optionList={"levelHierarchyFive"}
            onChange={changeData}
          />
        </Grid>}
    </Grid>
  );
};

ProductHierarchy.defaultProps = {
    name: "",
    label: "",
    max: 0,
    lengthCharacters: 0,
    withHook: true,
    required: false,
    showCharacters: false,
    textTooltip: "",
    disabled: false,
    placeholder: "",
    textMessage: "",
    showError: true,
    widthInput: "w280",
    showMessage: false,
    withTooltip: false,
    value: "",
    props: {},
  };