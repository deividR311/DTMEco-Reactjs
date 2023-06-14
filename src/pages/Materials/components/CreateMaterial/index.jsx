import * as React from "react";
import { Button } from "@material-ui/core";
import { TITLES_WIZARD } from "./constants";
import { useHistory } from "react-router-dom";
import { Wizard } from "../../../../sharedComponents";
import { useState, useEffect, useContext } from "react";
import { useStyles } from "../../../Administration/styles";
import { useStylesMaterial } from "../../../Materials/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HeaderContext from "../../../../context/Header/headerContext";
import schema from "../../schemas/CreateMaterial/createMaterial.schema";
import MaterialContext from "../../../../context/Materials/materialContext";

//FORMULARIO
import {
  DatosGenerales,
  DatosBasicos,
  NivelesOrganizacion,
  GestionCompras,
  DatAlmacenamiento,
  Contabilidad,
  InformacionAdicional,
  OilGas,
  PlanificacionNecesidad,
  Costos,
  Venta,
  AreaVenta
} from "./components";

import {
  DialogCommon,
  NavBreadCrumb,
  SnackBarCommon,
} from "../../../../sharedComponents";

const initialState = {
 // company: "",
};

export const CreateMaterial = () => {
  //Styles
  const classes = useStyles();
  const classesMaterial = useStylesMaterial();

  //History
  const history = useHistory();
  const { location } = history;
  const { state } = location;

  //ReactContext  ****************************************************************>
  //---MATERIALES
  const materialContext = useContext(MaterialContext);
 // const { getCompanyMDS } = materialContext;
  //METODOS API
  const { editMaterial, createMaterial } = materialContext;

  //---HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions,rolesByUser } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //Manejar Errores
  const { clear, Error, Success, setError, MessageError, MessageSuccess } =
    materialContext;

  if (Success || Error) {
    setTimeout(() => {
      clear();
      history.push("/Materiales/Consultar");
    }, 8000);
  }

  //ReactContext  ****************************************************************>

  //States
  const [open, setOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState({ createdBy: 0 });

  /* STATES FORMULARIOS */
  const [dataDatosGenerales, setDataDatosGenerales] = useState({});
  const [dataDatosBasicos, setDataDatosBasicos] = useState({});
  const [dataNivelesOrganizacion, setDataNivelesOrganizacion] = useState({});
  const [dataAreaVenta, setDataAreaVenta] = useState({});
  const [dataOilGas, setDataOilGas] = useState({});
  const [dataGestionCompras, setDataGestionCompras] = useState({});
  const [dataPlanificacionNecesidad, setDataPlanificacionNecesidad] = useState({});
  const [dataDatAlmacenamiento, setDataDatAlmacenamiento] = useState({});
  const [dataContabilidad, setDataContabilidad] = useState({});
  const [dataCotos, setDataCostos] = useState({});
  const [dataInformacionAdicional, setDataInformacionAdicional] = useState({});
  const [dataVenta, setDataVenta] = useState({});

  // useEffect(() => {
  //   clear();
  //   getCompanyMDS();
  //   if (location.pathname === "/Materiales/Modificar") {
  //     setIsEdited(true);
  //   }
  // }, []);
  

  /* SE VALIDAN LOS ROLES Y PERMISOS */
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 4
      );
      const isApplicant = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_C_MTR"
      );
      if (location.pathname === "/Materiales/Crear") {
        if (!isApplicant) {
          alert("No tiene permiso para crear");
          history.push("/");
        }
      }
      const isEdit = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_U_MTR"
      );
      if (location.pathname === "/Materiales/Modificar") {
        if (!isEdit) {
          alert("No tiene permiso para editar");
          history.push("/");
        }
      }
      setCurrentUser({
        createdBy: moduleMaterials[0].userId,
      });
    }
  }, [responseData]);

  /* Validar que el objecto COMPANY tenga información y 
  consulta la información a MDS por tipo de empresa*/
  // useEffect(() => {
  //   if (
  //     Object.values(company).every(
  //       (data) => data.length == 0 && data !== ""
  //     ) === false
  //   ) {
  //     setShowCompany(false);
  //     getDataByCompany(company.company);
  //   }
  // }, [dataDatosGenerales.company]);

  /*Valida que el state que va a guardar la información del formulario 1 
  no esté vacío, en caso que sea verdadera la condición pasa al siguiente step*/
  useEffect(() => {
    if (
      Object.values(dataDatosGenerales).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataDatosGenerales]);

  /*Valida que el state que va a guardar la información del formulario 2 
  no esté vacío, en caso que sea verdadera la condición pasa al siguiente step*/
  useEffect(() => {
    if (
      Object.values(dataDatosBasicos).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataDatosBasicos]);

  /*Valida que el state que va a guardar la información del formulario 3 
  no esté vacío, en caso que sea verdadera la condición pasa al siguiente step*/
  useEffect(() => {
    if (
      Object.values(dataNivelesOrganizacion).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataNivelesOrganizacion]);

  useEffect(() => {
    if (
      Object.values(dataAreaVenta).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataAreaVenta]);

  useEffect(() => {
    if (
      Object.values(dataVenta).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataVenta]);

    /*Valida que el state que va a guardar la información del formulario 3 
  no esté vacío, en caso que sea verdadera la condición pasa al siguiente step*/
  useEffect(() => {
    if (
      Object.values(dataOilGas).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataOilGas]);

  /*Valida que el state que va a guardar la información del formulario 4 
  no esté vacío, en caso que sea verdadera la condición pasa al siguiente step*/
  useEffect(() => {
    if (
      Object.values(dataGestionCompras).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataGestionCompras]);


  useEffect(() => {
    if (
      Object.values(dataPlanificacionNecesidad).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataPlanificacionNecesidad]);

  /*Valida que el state que va a guardar la información del formulario 5 
  no esté vacío, en caso que sea verdadera la condición pasa al siguiente step*/
  useEffect(() => {
    if (
      Object.values(dataDatAlmacenamiento).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataDatAlmacenamiento]);

  /*Valida que el state que va a guardar la información del formulario 6 
  no esté vacío, en caso que sea verdadera la condición pasa al siguiente step*/
  useEffect(() => {
    if (
      Object.values(dataContabilidad).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataContabilidad]);


  useEffect(() => {
    if (
      Object.values(dataCotos).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataCotos]);


  /*Valida que el state que va a guardar la información del formulario 8 
  no esté vacío, en caso que sea verdadera la condición ejecuta el metodo 
  para guardar y en caso de edición, el de editar*/
  useEffect(() => {
    if (
      Object.values(dataInformacionAdicional).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      if (!isEdited) {
        saveForm();
      } else {
        editForm();
      }
    }
  }, [dataInformacionAdicional]);

  /****************** METODOS PARA GUARDAR Y EDITAR  ********************/
  const saveForm = () => {
    try {
      const dataRequest = {
        materialType: dataDatosGenerales.materialType,
        materialName: dataDatosGenerales.materialName,
        department: dataDatosGenerales.department,
        sector: dataDatosBasicos.sector,
        articleGroup: dataDatosBasicos.articleGroup,
        baseUnitMeasure: dataDatosBasicos.baseUnitMeasure,
        center: dataNivelesOrganizacion.center,
        store: dataNivelesOrganizacion.store,
        shoppingGroup: dataGestionCompras.shoppingGroup,
        benefitCenter: dataDatAlmacenamiento.benefitCenter,
        observations: dataInformacionAdicional.observations,    
        createdBy: currentUser.createdBy,
        businessArea: dataDatosBasicos.businessArea,
        company: dataDatosGenerales.typeCompany,
        productFather: dataDatosBasicos.productFather,
        ratingCategory: dataContabilidad.ratingCategory,
        conversionGroup: dataDatosBasicos.conversionGroup,
        standardPrice: parseFloat(dataContabilidad.standardPrice),
        businessProcess: businessProcessDTO(dataDatosGenerales.businessProcess),
        productHierarchy: dataDatosBasicos.productHierarchy,
      };
      createMaterial(dataRequest);
    } catch (error) {
      setError("Ha ocurrido un error al crear la solicitud");
    }
  };

  const editForm = () => {
    try {
      const { id, createdBy, dateCreated, approverBy } = state;
      const dataRequest = {
        id,
        createdBy,
        approverBy,
        dateCreated,
        ...dataDatosBasicos,
        ...dataNivelesOrganizacion,
        ...dataGestionCompras,
        ...dataDatAlmacenamiento,
        ...dataContabilidad,
        //...dataForm8,
        modifiedBy: currentUser.createdBy,
        businessArea: dataDatosGenerales.businessArea,
        company: companyDTO(dataDatosGenerales.company),
        productFather: dataDatosGenerales.productFather,
        ratingCategory: dataInformacionAdicional.ratingCategory,
        conversionGroup: dataDatosGenerales.conversionGroup,
        standardPrice: parseFloat(dataInformacionAdicional.standardPrice),
        businessProcess: businessProcessDTO(dataDatosGenerales.businessProcess),
        productHierarchy: productHierarchy(
          dataDatosGenerales.company,
          dataDatosGenerales.productFather
        ),
      };
      editMaterial(dataRequest);
    } catch (error) {
      setError("Ha ocurrido un error al editar la solicitud");
    }
  };

  //transformar los datos para el registro y/o edición
  const companyDTO = (nameCompany) => {
    if (nameCompany === "REFICAR" || nameCompany === "Reficar") return "R";
    if (nameCompany === "ECOPETROL" || nameCompany === "Ecopetrol") return "E";
  };

   //convertir id a nombre
  const nameCompany = (typeCompany) => {
    if (typeCompany === "R") return "Reficar";
    if (typeCompany === "E") return "Ecopetrol";
  };

  const productHierarchy = (typeCompany, value) => {
    if (typeCompany === "E") {
      return value;
    } else {
      return null;
    }
  };
  
  const businessProcessDTO = (businessProcess) => {
    return JSON.stringify(businessProcess);
  };

  //Functions
  const goBack = () => {
    history.goBack();
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const confirmCancelDialog = () => {
    setOpen(false);
    goBack();
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const validateChangeStep = () => {
    setIsSubmitting(true);
  };
  
  const handleCloseSnack = () => {
    clear();
    history.push("/Materiales/Consultar");
  };

  const navBreadCrumbArray = [
    { path: "/", active: "", word: "Inicio" },
    {
      path: "/Materiales/Consultar",
      active: "",
      word: "Gestión materiales",
    },
    {
      path: `/Materiales/${isEdited ? "Modificar" : "Crear"}`,
      active: "BreadCrumb__link--active",
      word: `${isEdited ? "Modificación" : "Creación"} material`,
    },
  ];

  const components = [
    {
      number: 1,
      component: (
        <DatosGenerales
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataDatosGenerales(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
    {
      number: 2,
      component: (
        <DatosBasicos
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          setForm={(element) => setDataDatosBasicos(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
    {
      number: 3,
      component: (
        <NivelesOrganizacion
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataNivelesOrganizacion(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
        />
      ),
    },
    {
      number: 4,
      component: (
        <AreaVenta
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataVenta(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          logisticCenterstoreList={dataNivelesOrganizacion.logisticCenterstoreList}
        />
      ),
    },
    {
      number: 5,
      component: (
        <OilGas
          dataEdit={state}
          isEdited={isEdited}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataOilGas(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          logisticCenterstoreList={dataNivelesOrganizacion.logisticCenterstoreList}
        />
      ),
    },
    {
      number: 6,
      component: (
        <Venta
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataVenta(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          logisticCenterstoreList={dataNivelesOrganizacion.logisticCenterstoreList}
        />
      ),
    },
    {
      number: 7,
      component: (
        <GestionCompras
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          typeMaterial={dataDatosBasicos.materialType}
          setForm={(element) => setDataGestionCompras(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          typePurchase={dataDatosBasicos.typePurchase}
          logisticCenterstoreList={dataNivelesOrganizacion.logisticCenterstoreList}
        />
      ),
    },
    {
      number: 8,
      component: (
        <PlanificacionNecesidad
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          typeMaterial={dataDatosBasicos.materialType}
          setForm={(element) => setDataPlanificacionNecesidad(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          logisticCenterstoreList={dataNivelesOrganizacion.logisticCenterstoreList}
        />
      ),
    },
    {
      number: 9,
      component: (
        <DatAlmacenamiento
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataDatAlmacenamiento(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          logisticCenterstoreList={dataNivelesOrganizacion.logisticCenterstoreList}
        />
      ),
    },
    {
      number: 10,
      component: (
        <Contabilidad
          dataEdit={state}
          isEdited={isEdited}
          setError={setError}
          isSubmitting={isSubmitting}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          setForm={(element) => setDataContabilidad(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          logisticCenterstoreList={dataNivelesOrganizacion.logisticCenterstoreList}
        />
      ),
    },
    // {
    //   number: 11,
    //   component: (
    //     <Costos
    //       dataEdit={state}
    //       isEdited={isEdited}
    //       setError={setError}
    //       isSubmitting={isSubmitting}
    //       typeCompany={dataDatosGenerales.typeCompany}
    //       company={nameCompany(dataDatosGenerales.typeCompany)}
    //       materialType={dataDatosGenerales.materialType}
    //       materialName={dataDatosGenerales.materialName}
    //       setForm={(element) => setDataCostos(element)}
    //       setIsSubmitting={() => setIsSubmitting(false)}
    //     />
    //   ),
    // },
    {
      number: 11,
      component: (
        <InformacionAdicional
          dataEdit={state}
          isEdited={isEdited}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataInformacionAdicional(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
          typeCompany={dataDatosGenerales.typeCompany}
          company={nameCompany(dataDatosGenerales.typeCompany)}
          materialType={dataDatosGenerales.materialType}
          materialName={dataDatosGenerales.materialName}
          orderUnitmeasure= {dataGestionCompras.orderUnitmeasure}
        />
      ),
    },
  ];


  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArray} />
        <Button
          color="primary"
          variant="outlined"
          className="goBackButton"
          onClick={handleClickOpen}
          startIcon={<ArrowBackIosIcon />}
        >
          Regresar
        </Button>
        <h3 className="TitleView">
          {isEdited ? "Modificar material" : "Solicitud Creación Material"}
        </h3>

      {/* {showCompany ? (
        !isEdited ? (
          <CompanyCustom
            schema={schema}
            items={companyMDS}
            setCompany={setCompany}
            initialState={initialState}
          />
        ) : (
          setShowCompany(false)
        )
      ) : ( */}
        <>
          <Wizard
            isSave={false}
            showPreview={false}
            activeStep={activeStep}
            handleBack={handleBack}
            finalBtnName={"Enviar"}
            classes={classesMaterial}
            titlesWizard={TITLES_WIZARD}
            componentsWizard={components}
            handleCancel={handleClickOpen}
            handleNext={validateChangeStep}
          />
        </>
      {/* )} */}

      <SnackBarCommon
        time="5000"
        error={Error}
        success={Success}
        errorMessage={MessageError}
        successMessage={MessageSuccess}
        handleCloseSnack={handleCloseSnack}
      />

      <DialogCommon
        open={open}
        title="Cancelar"
        classes={classes}
        handleClose={handleClose}
        medium={!isEdited ? "crear" : "editar"}
        confirmCancelDialog={confirmCancelDialog}
        messageEdit="¿Está seguro que desea cancelar la edición de la información?"
        messageCreate="¿Está seguro que desea cancelar la creación de la información?"
      />
    </>
  );
};
