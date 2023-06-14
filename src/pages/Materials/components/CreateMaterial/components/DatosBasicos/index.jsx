import { Grid } from "@material-ui/core";
import { useEffect, useContext, useState } from "react";
import { validateError } from "./validator";
import { SearchSelect } from "../../../../../../sharedComponents/SearchSelectCommon";
import MaterialContext from "../../../../../../context/Materials/materialContext";
import { HeaderDataInfo, TitlePage } from "../../../../widgets";
import { InputCustom, ProductHierarchy } from "../../../../widgets";
import { ValidarConfiguracionCampo } from "../../ConfiguracionValidacion";

//InitialState HOOK
const initialState = {
  businessArea: "",
  productFather: "",
  sector: "",
  articleGroup: "",
  baseUnitMeasure: "",
  manufacturingInformation:"",
  externalArticleGroup:"",
  basicProduct:"",
  statusMaterialCenter: "",
  baseProductUnitMeasure: "",
  productHierarchy: "",
  unitOfWeight: "",
  groupstypesgeneralposition: "",
  materialStatusCD: "",
  initDateStatusMAterial: "",
  typePurchase: "",
  levelHierarchyList: [],
  levelHierarchyLength: 0,
  levelHierarchyOne: "",
  levelHierarchyTwo: "",
  levelHierarchyThree: "",
  levelHierarchyFour: "",
  levelHierarchyFive: "",
};

export const DatosBasicos = ({
  setForm,
  isEdited,
  dataEdit,
  typeCompany,
  setError,
  company,
  isSubmitting,
  setIsSubmitting,
  materialType,
  materialName
}) => {

  //*****************************>
  //ReactContext
  //---MATERIALES
  const materialContext = useContext(MaterialContext);
  const { LIST_MDS, dataDatosBasicos, setDataDatosBasicos, configurationInputs} = materialContext;

  //useState
  const [list, setList] = useState({
    businessAreaList: [],
    productFatherList: [],
    sectorList: [],
    articleGroupList: [],
    baseUnitMeasureList: [],
    basicProductList:[],
    statusMaterialCenterList:[],
    baseProductUnitMeasureList: [],
    unitOfWeight: [],
    groupstypesgeneralposition: [],
    typePurchaseList: [],
    levelHierarchyOneList: [],
    levelHierarchyTwoList: [],
    levelHierarchyThreeList: [],
    levelHierarchyFourList: [],
    levelHierarchyFiveList: [],
  });

  // const getData = () =>{
  //     return {
  //       ...dataDatosBasicos,
  //     productHierarchy: "",
  //     levelHierarchyList: [],
  //     levelHierarchyLength: 0,
  //     levelHierarchyOne: "",
  //     levelHierarchyTwo: "",
  //     levelHierarchyThree: "",
  //     levelHierarchyFour: "",
  //     levelHierarchyFive: "",
  //     };
  // };
  const [values, setValues] = useState({...initialState, materialType, company, typeCompany});
  const [confiCampos, setConfiCampos] = useState({
    productFather: ((ValidarConfiguracionCampo("ProductFather",configurationInputs).existeCampo === false ) ? false : ValidarConfiguracionCampo("ProductFather",configurationInputs).isRequired),
    sector: ((ValidarConfiguracionCampo("Sector",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Sector",configurationInputs).isRequired),
    articleGroup: ((ValidarConfiguracionCampo("ArticleGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ArticleGroup",configurationInputs).isRequired),
    baseUnitMeasure: ((ValidarConfiguracionCampo("BaseUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("BaseUnitMeasure",configurationInputs).isRequired ),
    manufacturingInformation:((ValidarConfiguracionCampo("ManufacturingInspectionInformation",configurationInputs).existeCampo === false ) ? false : ValidarConfiguracionCampo("ManufacturingInspectionInformation",configurationInputs).isRequired),
    externalArticleGroup:((ValidarConfiguracionCampo("ExternalArticleGroup",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("ExternalArticleGroup",configurationInputs).isRequired),
    basicProduct:((ValidarConfiguracionCampo("BasicProduct",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("BasicProduct",configurationInputs).isRequired),
    statusMaterialCenter: ((ValidarConfiguracionCampo("MaterialStatusCenter",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("MaterialStatusCenter",configurationInputs).isRequired),
    baseProductUnitMeasure: ((ValidarConfiguracionCampo("UnitMeasureOfBasicProduct (UoM)",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("UnitMeasureOfBasicProduct (UoM)",configurationInputs).isRequired),
    unitOfWeight: ((ValidarConfiguracionCampo("UnitOfWeight",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("UnitOfWeight",configurationInputs).isRequired),
    groupstypesgeneralposition: ((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false ) ? true : ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isRequired),
    oldMaterialNumber: ((ValidarConfiguracionCampo("OldMaterialNumber",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("OldMaterialNumber",configurationInputs).isRequired),
  });

  useEffect(() => {   
    if (Object.keys(dataDatosBasicos).length !== 0) {
        setValues({...dataDatosBasicos,
         productHierarchy: "",
         levelHierarchyList: [],
         levelHierarchyLength: 0,
         levelHierarchyOne: "",
         levelHierarchyTwo: "",
         levelHierarchyThree: "",
         levelHierarchyFour: "",
         levelHierarchyFive: "",
        });
    }
  },[]);

  const [errorField, setErrorField] = useState(() =>
  Object.keys(initialState).reduce((acum, key) => {
    acum[key] = [];
    return acum;
  }, [])
);

const updateList = () =>{
  try {
    if (LIST_MDS !== undefined) {
      if (LIST_MDS.length) {
        let JerarquiaProductoNivel2PorPadre = [];
        let JerarquiaProductoNivel3PorPadre = [];
        let JerarquiaProductoNivel4PorPadre = [];
        let JerarquiaProductoNivel5PorPadre = [];
        

        let dataList = {
          levelHierarchyOneList: [],
          levelHierarchyTwoList: [],
          levelHierarchyThreeList: [],
          levelHierarchyFourList: [],
          levelHierarchyFiveList: [],
        };

        const JerarquiaProductoNivel1  = LIST_MDS.filter(
          (element) => element.listName === "JerarquiaProductoNivel1"
        );
        if(JerarquiaProductoNivel1.length){
          dataList.levelHierarchyOneList = JerarquiaProductoNivel1[0].list[0].values;
        }

        if(values.levelHierarchyOne &&  list.levelHierarchyOneList.length >= 1){
          const JerarquiaProductoNivel2  = LIST_MDS.filter(
            (element) => element.listName === "JerarquiaProductoNivel2" 
          );
          JerarquiaProductoNivel2PorPadre  = JerarquiaProductoNivel2[0].list.filter(
            (element) => element.parent.id === values.levelHierarchyOne
          );
          if(JerarquiaProductoNivel2PorPadre.length){
            dataList.levelHierarchyTwoList = JerarquiaProductoNivel2PorPadre[0].values;
          }
        }
        
        if(values.levelHierarchyTwo && JerarquiaProductoNivel2PorPadre.length >= 1){
          const JerarquiaProductoNivel3  = LIST_MDS.filter(
            (element) => element.listName === "JerarquiaProductoNivel3" 
          );
          JerarquiaProductoNivel3PorPadre  = JerarquiaProductoNivel3[0].list.filter(
            (element) => element.parent.id === values.levelHierarchyTwo
          );
          if(JerarquiaProductoNivel3PorPadre.length){
            dataList.levelHierarchyThreeList = JerarquiaProductoNivel3PorPadre[0].values;
          }
        }

        if(values.levelHierarchyThree && JerarquiaProductoNivel3PorPadre.length >= 1){
          const JerarquiaProductoNivel4  = LIST_MDS.filter(
            (element) => element.listName === "JerarquiaProductoNivel4" 
          );
          JerarquiaProductoNivel4PorPadre  = JerarquiaProductoNivel4[0].list.filter(
            (element) => element.parent.id === values.levelHierarchyOne + values.levelHierarchyTwo + values.levelHierarchyThree
          );
          if(JerarquiaProductoNivel4PorPadre.length){
            dataList.levelHierarchyFourList = JerarquiaProductoNivel4PorPadre[0].values;
          }
       }
        if(values.levelHierarchyFour && JerarquiaProductoNivel4PorPadre.length >= 1){
          const JerarquiaProductoNivel5  = LIST_MDS.filter(
            (element) => element.listName === "JerarquiaProductoNivel5" 
          );
          JerarquiaProductoNivel5PorPadre  = JerarquiaProductoNivel5[0].list.filter(
            (element) => element.parent.id === values.levelHierarchyOne + values.levelHierarchyTwo + values.levelHierarchyThree + values.levelHierarchyFour
          );
          if(JerarquiaProductoNivel5PorPadre.length){
            dataList.levelHierarchyFiveList = JerarquiaProductoNivel5PorPadre[0].values;
          }
       }

        setList({
          ...list,
          levelHierarchyOneList: dataList.levelHierarchyOneList,
          levelHierarchyTwoList: dataList.levelHierarchyTwoList,
          levelHierarchyThreeList: dataList.levelHierarchyThreeList,
          levelHierarchyFourList: dataList.levelHierarchyFourList,
          levelHierarchyFiveList: dataList.levelHierarchyFiveList,
        });

      }
    }
  } catch (error) {
    //setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
  }
}

useEffect(() => {
  updateList();
},[]);

useEffect(() => {
  if (isSubmitting) {
    const value = Object.values(errorField).every(
      (data) => data.length === 0 && data !== ""
    );
    if (value) {
      setForm(values);
      setDataDatosBasicos(values);
    }
  }
  setIsSubmitting(false);
}, [errorField]);

const changeData = (e) => {
  const { name, value } = e.target;
    // if (!["productFather", "manufacturingInformation", "externalArticleGroup","statusMaterialCenter"].includes(name) ){
    
    setErrorField(() => {
      let campoRequerido = confiCampos[name] === undefined ? true : confiCampos[name];
      const validations = validateError(value, values, list,campoRequerido)[name]() ;
      return { ...errorField, [name]: validations};
    });
  // }
  setValues({ ...values, [name]: value });
};

const validate = () => {
  setIsSubmitting(true);
};

  /* Disparador para validar el fomulario (El botón cambia un state
    en el componente padre y este useEffect ejecuta la validación)*/
useEffect(() => {
  if (isSubmitting) {
    let cleanErrors = {};

    Object.keys(initialState).forEach((data) => {
      cleanErrors[data] = ""; 
    });

      setErrorField({
        ...cleanErrors
      });
    submitValidate();
  }
}, [isSubmitting]);

const submitValidate = () => {
  const errors = {};
  Object.keys(initialState).forEach((data) => {
      let campoRequerido = confiCampos[data] === undefined ? true : confiCampos[data];
      errors[data] = validateError(values[data], values, list,campoRequerido)[data] ? validateError(values[data], values, list,campoRequerido)[data]() : []; 
  });
  setErrorField({...errors,
    materialType: [],
    typeCompany: [],
    company: []
  });
};

const printError = (error) => {
  if (error.length > 0) {
    return error[0];
  } else {
    return "";
  }
};

  useEffect(() => {
    try {
      if (LIST_MDS !== undefined) {
        if (LIST_MDS.length) {
          const AreaNegocio = LIST_MDS.filter(
            (element) => element.listName === "AreaNegocio"
          );
          const ProductoPadre = LIST_MDS.filter(
            (element) => element.listName === "ProductoPadre"
          );
            /* LISTA SECTOR */
          const Sector = LIST_MDS.filter(
            (element) => element.listName === "Sector"
          );
          const sectorByMaterial = Sector[0].list[0].values.filter(
            (element) => element.id === materialType
          );
          const ProductoBasico = LIST_MDS.filter(
            (element) => element.listName === "ProductoBasico"
          );
          const StatusMaterialCentro = LIST_MDS.filter(
            (element) => element.listName === "StatusMaterialCentro"
          );

          /* LISTA GRUPO ARTICULO */
          const GrupoArticulos = LIST_MDS.filter(
            (element) => element.listName === "GrupoArticulos"
          );
          const articulosByMaterial = GrupoArticulos[0].list[0].values.filter(
            (element) => element.id === materialType
          );

          /* LISTA UNIDAD DE MEDIDA BASE*/
          const UnidadMedidaBase = LIST_MDS.filter(
            (element) => element.listName === "UnidadMedidaBase"
          );
          const baseUnitByMaterial = UnidadMedidaBase[0].list[0].values.filter(
            (element) => element.id === materialType
          );
          const unidadDePeso = LIST_MDS.filter(
            (element) => element.listName === "UnidadDePeso"
          );
          const GruposTiposPosiciónGeneral = LIST_MDS.filter(
            (element) => element.listName === "GruposTiposPosiciónGeneral"
          );
          const statusMaterialCD = LIST_MDS.filter(
            (element) => element.listName === "StatusMaterialCD"
          );
          const tipoCompra = LIST_MDS.filter(
            (element) => element.listName === "TipoCompra"
          );

          setList({
            businessAreaList: AreaNegocio[0].list[0].values,
            productFatherList: ProductoPadre[0].list[0].values,
            sectorList:
            typeCompany === "E"
              ? sectorByMaterial[0].subValues
              : materialType === "FERT_R"
              ? sectorByMaterial[0].subValues
              : [],
            articleGroupList: articulosByMaterial[0].subValues,
            baseUnitMeasureList: baseUnitByMaterial[0].subValues,
            basicProductList: ProductoBasico[0].list[0].values,
            statusMaterialCenterList: StatusMaterialCentro[0].list[0].values,
            unitOfWeightList: unidadDePeso[0].list[0].values,
            groupstypesgeneralpositionList: GruposTiposPosiciónGeneral[0].list[0].values,
            materialStatusCDList: statusMaterialCD[0].list[0].values,
            typePurchaseList: tipoCompra[0].list[0].values,
          });
        }
      }
    } catch (err) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!");
    }
  }, [LIST_MDS]);


  const Sector = () => {
    return (
          <>{ ((ValidarConfiguracionCampo("Sector",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Sector",configurationInputs).isVisible)  &&
            <SearchSelect
              isRequired={((ValidarConfiguracionCampo("Sector",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("Sector",configurationInputs).isRequired)}
              label={"Sector"}
              isDisabled={((ValidarConfiguracionCampo("Sector",configurationInputs).existeCampo === false) ? isEdited : !ValidarConfiguracionCampo("Sector",configurationInputs).isEnabled)}
              listOpt={list.sectorList}
              errors={printError(errorField.sector)}
              placeholder="Seleccione el sector"
              valueId={values.sector}
              optionList={"sector"}
              onChange={changeData}
            />}
          </>
    );
  };

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
          <TitlePage tittle={"Datos básicos"} tooltip={"texto de ayuda"}/>
          <Grid item xs={8}>
            <SearchSelect
              isRequired={true}
              label={"Área de negocio"}
              isDisabled={isEdited}
              listOpt={list.businessAreaList}
              errors={printError(errorField.businessArea)}
              placeholder="Seleccione el área de negocio"
              valueId={values.businessArea}
              autoFocus={true}
              optionList={"businessArea"}
              onChange={changeData}
            />
          </Grid>
          <Grid item xs={4}>{((ValidarConfiguracionCampo("BaseUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("BaseUnitMeasure",configurationInputs).isVisible ) &&
            <SearchSelect
              isRequired={((ValidarConfiguracionCampo("BaseUnitMeasure",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("BaseUnitMeasure",configurationInputs).isRequired )}
              label={"Unidad medida base"}
              isDisabled={((ValidarConfiguracionCampo("BaseUnitMeasure",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("BaseUnitMeasure",configurationInputs).isEnabled)}
              listOpt={list.baseUnitMeasureList}
              errors={printError(errorField.baseUnitMeasure)}
              placeholder="Seleccione la Unidad medida base"
              valueId={values.baseUnitMeasure}
              optionList={"baseUnitMeasure"}
              onChange={changeData}
            />}
          </Grid>
          <Grid item xs={8}>{((ValidarConfiguracionCampo("ArticleGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ArticleGroup",configurationInputs).isVisible) &&
              <SearchSelect
                isRequired={((ValidarConfiguracionCampo("ArticleGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ArticleGroup",configurationInputs).isRequired)}
                label={"Grupo artículos"}
                isDisabled={((ValidarConfiguracionCampo("ArticleGroup",configurationInputs).existeCampo === false) ? isEdited : !ValidarConfiguracionCampo("ArticleGroup",configurationInputs).isEnabled)}
                listOpt={list.articleGroupList}
                errors={printError(errorField.articleGroup)}
                placeholder="Seleccione el grupo artículo"
                valueId={values.articleGroup}
                optionList={"articleGroup"}
                onChange={changeData}
              />}
            </Grid>
            <Grid item xs={4}>{((ValidarConfiguracionCampo("ExternalArticleGroup",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ExternalArticleGroup",configurationInputs).isVisible) &&
            <InputCustom
              required={((ValidarConfiguracionCampo("ExternalArticleGroup",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("ExternalArticleGroup",configurationInputs).isRequired)}
              label={"Grupo artículos Externos"}
              name={"externalArticleGroup"}
              value={values.externalArticleGroup}
              onChange={changeData}
              errors={errorField.externalArticleGroup}
              showCharacters={true}
              widthInput={"fullInput"}
              max={1}
              lengthCharacters={values.externalArticleGroup}
              maxLength={1}
              disabled={((ValidarConfiguracionCampo("ExternalArticleGroup",configurationInputs).existeCampo === false ) ? true : !ValidarConfiguracionCampo("ExternalArticleGroup",configurationInputs).isEnabled)}
            />}
          </Grid>
          {typeCompany === "E" ? (
                  <Grid item xs={4}><Sector/></Grid>
                  ) : (
                    materialType === "FERT_R" && <Grid item xs={4}><Sector/></Grid>
                  )} 

          <Grid item xs={4}>{((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false ) ? true : ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isVisible) &&
            <SearchSelect
              isRequired={((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false ) ? true : ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isRequired)}
              label={"Grupo de tipos de posición general"}
              isDisabled={((ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("ItemCategoryGroup",configurationInputs).isEnabled)}
              listOpt={list.groupstypesgeneralpositionList}
              errors={printError(errorField.groupstypesgeneralposition)}
              placeholder="Seleccione el grupo"
              valueId={values.groupstypesgeneralposition}
              optionList={"groupstypesgeneralposition"}
              onChange={changeData}
            />}
          </Grid>
          <Grid item xs={4}>{((ValidarConfiguracionCampo("UnitOfWeight",configurationInputs).existeCampo === false ) ? true : ValidarConfiguracionCampo("UnitOfWeight",configurationInputs).isVisible) &&            
            <SearchSelect
              isRequired={((ValidarConfiguracionCampo("UnitOfWeight",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("UnitOfWeight",configurationInputs).isRequired)}
              label={"Unidad de peso"}
              isDisabled={((ValidarConfiguracionCampo("UnitOfWeight",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("UnitOfWeight",configurationInputs).isEnabled)}
              listOpt={list.unitOfWeightList}
              errors={printError(errorField.unitOfWeight)}
              placeholder="Seleccione la Unidad de peso"
              valueId={values.unitOfWeight}
              optionList={"unitOfWeight"}
              onChange={changeData}
            />}
          </Grid>
          <Grid item xs={4}>{((ValidarConfiguracionCampo("MaterialStatusCenter",configurationInputs).existeCampo === false ) ? true : ValidarConfiguracionCampo("MaterialStatusCenter",configurationInputs).isVisible) &&
            <SearchSelect
              isRequired={((ValidarConfiguracionCampo("MaterialStatusCenter",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("MaterialStatusCenter",configurationInputs).isRequired)}
              label={"Estado material para todos los centros"}
              isDisabled={((ValidarConfiguracionCampo("MaterialStatusCenter",configurationInputs).existeCampo === false ) ? isEdited : !ValidarConfiguracionCampo("MaterialStatusCenter",configurationInputs).isEnabled)}
              listOpt={list.statusMaterialCenterList}
              errors={printError(errorField.statusMaterialCenter)}
              placeholder="Seleccione el estado material"
              valueId={values.statusMaterialCenter}
              optionList={"statusMaterialCenter"}
              onChange={changeData}
            />}
          </Grid>

          <Grid item xs={4}>{((ValidarConfiguracionCampo("OldMaterialNumber",configurationInputs).existeCampo === false ) ? true : ValidarConfiguracionCampo("OldMaterialNumber",configurationInputs).isVisible) &&
            <InputCustom
                required={((ValidarConfiguracionCampo("OldMaterialNumber",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("OldMaterialNumber",configurationInputs).isRequired)}
                label={"Número material antiguo"}
                name={"oldMaterialNumber"}
                value={values.oldMaterialNumber}
                onChange={changeData}
                errors={errorField.oldMaterialNumber}
                showCharacters={true}
                widthInput={"fullInput"}
                max={11}
                lengthCharacters={values.oldMaterialNumber}
                maxLength={11}
                disabled={((ValidarConfiguracionCampo("OldMaterialNumber",configurationInputs).existeCampo === false) ? true : !ValidarConfiguracionCampo("OldMaterialNumber",configurationInputs).isEnabled)}
              />}
          </Grid>
          <Grid item xs={4}>{((ValidarConfiguracionCampo("BasicProduct",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("BasicProduct",configurationInputs).isVisible) &&
            <SearchSelect
              isRequired={((ValidarConfiguracionCampo("BasicProduct",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("BasicProduct",configurationInputs).isRequired)}
              label={"Producto básico"}
              isDisabled={((ValidarConfiguracionCampo("BasicProduct",configurationInputs).existeCampo === false) ? isEdited : !ValidarConfiguracionCampo("BasicProduct",configurationInputs).isEnabled)}
              listOpt={list.basicProductList}
              errors={printError(errorField.basicProduct)}
              placeholder="Seleccione el producto básico"
              valueId={values.basicProduct}
              optionList={"basicProduct"}
              onChange={changeData}
            />}
          </Grid> 
          <Grid item xs={4}>{((ValidarConfiguracionCampo("UnitMeasureOfBasicProduct (UoM)",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("UnitMeasureOfBasicProduct (UoM)",configurationInputs).isVisible) &&
            <SearchSelect
              isRequired={((ValidarConfiguracionCampo("UnitMeasureOfBasicProduct (UoM)",configurationInputs).existeCampo === false) ? false : ValidarConfiguracionCampo("UnitMeasureOfBasicProduct (UoM)",configurationInputs).isRequired)}
              label={"Unidad medida producto básico"}
              isDisabled={((ValidarConfiguracionCampo("UnitMeasureOfBasicProduct (UoM)",configurationInputs).existeCampo === false) ? isEdited : !ValidarConfiguracionCampo("UnitMeasureOfBasicProduct (UoM)",configurationInputs).isEnabled)}
              listOpt={list.baseProductUnitMeasureList}
              errors={printError(errorField.baseProductUnitMeasure)}
              placeholder="Seleccione la unidad medida base"
              valueId={values.baseProductUnitMeasure}
              optionList={"baseProductUnitMeasure"}
              onChange={changeData}
            />}
          </Grid>
          <Grid item xs={4}>{((ValidarConfiguracionCampo("ManufacturingInspectionInformation",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ManufacturingInspectionInformation",configurationInputs).isVisible) &&
            <InputCustom
              required={((ValidarConfiguracionCampo("ManufacturingInspectionInformation",configurationInputs).existeCampo === false ) ? false : ValidarConfiguracionCampo("ManufacturingInspectionInformation",configurationInputs).isRequired)}
              label={"Información de fabricación/inspección"}
              name={"manufacturingInformation"}
              value={values.manufacturingInformation}
              onChange={changeData}
              errors={errorField.manufacturingInformation}
              showCharacters={true}
              widthInput={"fullInput"}
              max={18}
              lengthCharacters={values.manufacturingInformation}
              maxLength={18}
              disabled={((ValidarConfiguracionCampo("ManufacturingInspectionInformation",configurationInputs).existeCampo === false) ? false : !ValidarConfiguracionCampo("ManufacturingInspectionInformation",configurationInputs).isEnabled)}
            />}
          </Grid>
          <Grid item xs={4}>
            <SearchSelect
              required={false}
              label={"Tipo compra"}
              isDisabled={isEdited}
              listOpt={list.typePurchaseList}
              errors={printError(errorField.typePurchase)}
              placeholder="Seleccione el tipo de compra"
              valueId={values.typePurchase}
              optionList={"typePurchase"}
              onChange={changeData}
            />
          </Grid>
          <Grid item xs={4}>{((ValidarConfiguracionCampo("ProductFather",configurationInputs).existeCampo === false) ? true : ValidarConfiguracionCampo("ProductFather",configurationInputs).isVisible) &&
            <SearchSelect
              label={"Producto padre"}
              isRequired={((ValidarConfiguracionCampo("ProductFather",configurationInputs).existeCampo === false ) ? false : ValidarConfiguracionCampo("ProductFather",configurationInputs).isRequired)}
              isDisabled={((ValidarConfiguracionCampo("ProductFather",configurationInputs).existeCampo === false) ? isEdited : !ValidarConfiguracionCampo("ProductFather",configurationInputs).isEnabled)}
              listOpt={list.productFatherList}
              errors={printError(errorField.productFather)}
              placeholder="Seleccione el producto padre"
              valueId={values.productFather}
              optionList={"productFather"}
              onChange={changeData}
            />}
          </Grid>
          <Grid item xs={4}>
            <ProductHierarchy
              value = {values.productFather}
              LIST_MDS = {LIST_MDS}
              validateError = {validateError}
              isSubmitting = {isSubmitting}
              //setValuesForm2={(element) => setValues(element)}
              setIsSubmitting={() => setIsSubmitting(false)}
              setErrorField = {setErrorField}
              errorField = {errorField}
              values = {values}
              setValues = {setValues}
              list = {list}
              setList = {setList}
              updateList = {updateList}
            />
          </Grid>
        </Grid>
    </>
  );
};
