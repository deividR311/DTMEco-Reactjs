import * as React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { titleWizardServices } from "./constants";
import { Wizard } from "../../../../sharedComponents";
import { useState, useEffect, useContext } from "react";
import { useStyles } from "../../../Administration/styles";
import { useStylesMaterial } from "../../../Materials/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HeaderContext from "../../../../context/Header/headerContext";
import ServicesContext from "../../../../context/Services/servicesContext";
import { Form1, Form2, Form3, Form4, Form5, Form6, Form7 } from "./components";

import {
  NavBreadCrumb,
  DialogCommon,
  SnackBarCommon,
} from "../../../../sharedComponents";

export const CreateEditService = () => {
  //Styles
  const classes = useStyles();
  const classesMaterial = useStylesMaterial();

  //History
  const history = useHistory();
  const { location } = history;
  const { state } = location;

  //ReactContext  ****************************************************************>
  //---MATERIALES
  const servicesContext = useContext(ServicesContext);
  const { getCompany, ListsMDS } = servicesContext;
  //METODOS API
  const { createService, editService } = servicesContext;

  //---HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //Manejar Errores
  const {
    Time,
    clear,
    Error,
    Success,
    setError,
    MessageError,
    MessageSuccess,
  } = servicesContext;

  if (Success || Error) {
    setTimeout(() => {
      clear();
      history.push("/Materiales/ServiciosConsultar");
    }, Time);
  }

  //ReactContext  ****************************************************************>

  //States
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isEdited, setIsEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    createdBy: 0,
  });

  /* STATES FORMULARIOS */
  const [dataForm1, setDataForm1] = useState({});
  const [dataForm2, setDataForm2] = useState({});
  const [dataForm3, setDataForm3] = useState({});
  const [dataForm4, setDataForm4] = useState({});
  const [dataForm5, setDataForm5] = useState({});
  const [dataForm6, setDataForm6] = useState({});
  const [dataForm7, setDataForm7] = useState({});

  useEffect(() => {
    getCompany();
    if (location.pathname === "/Materiales/ServiciosModificar") {
      setIsEdited(true);
    }
  }, []);

  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 4
      );
      const isApplicant = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_C_SVC"
      );
      if (location.pathname === "/Materiales/ServiciosModificar") {
        if (!isApplicant) {
          alert("No tiene permiso para crear");
          history.push("/");
        }
      }
      const isEdit = moduleMaterials[0].subModules.some(
        (element) => element.code === "DMM_U_SVC"
      );
      if (location.pathname === "/Materiales/ServiciosModificar") {
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

  useEffect(() => {
    if (
      Object.values(dataForm1).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataForm1]);

  useEffect(() => {
    if (
      Object.values(dataForm2).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataForm2]);

  useEffect(() => {
    if (
      Object.values(dataForm3).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataForm3]);

  useEffect(() => {
    if (
      Object.values(dataForm4).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataForm4]);

  useEffect(() => {
    if (
      Object.values(dataForm5).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataForm5]);

  useEffect(() => {
    if (
      Object.values(dataForm6).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      handleNext();
    }
  }, [dataForm6]);

  useEffect(() => {
    if (
      Object.values(dataForm7).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      if (!isEdited) {
        saveData();
      } else {
        editData();
      }
    }
  }, [dataForm7]);

  const saveData = () => {
    const request = {
      tax: JSON.stringify(dataForm4),
      loadGroup: dataForm6.loadGroup,
      sector: dataForm2.sectorService,
      center: dataForm2.centerService,
      createdBy: currentUser.createdBy,
      company: dataForm1.companyService,
      transportGroup: dataForm6.transportGroup,
      materialGroup1: dataForm5.materialGroup1,
      materialGroup2: dataForm5.materialGroup2,
      serviceName: dataForm3.serviceNameService,
      commissionGroup: dataForm5.commissionGroup,
      serviceType: dataForm1.typeMaterialService,
      businessArea: dataForm1.bussinesAreaService,
      observations: dataForm7.observationsService,
      articleGroup: dataForm3.articleGroupService,
      materialGroup: dataForm5.materialGroupService,
      beneficCenter: dataForm6.benefitCenterService,
      baseUnitMeasure: dataForm3.baseUnitMeasureService,
      distributionChannel: dataForm2.distributionChannel,
      salesOrganization: dataForm2.salesOrganizationServices,
      materialCarryingGroup: dataForm6.materialCarryingGroup,
      materialImputationGroup: dataForm5.materialsImputationGroup,
    };
    createService(request);
  };

  const editData = () => {
    const { id, createdBy, dateCreated, approverBy } = state;
    const request = {
      id,
      createdBy,
      approverBy,
      dateCreated,
      tax: JSON.stringify(dataForm4),
      loadGroup: dataForm6.loadGroup,
      sector: dataForm2.sectorService,
      center: dataForm2.centerService,
      modifiedBy: currentUser.createdBy,
      company: dataForm1.companyService,
      transportGroup: dataForm6.transportGroup,
      materialGroup1: dataForm5.materialGroup1,
      materialGroup2: dataForm5.materialGroup2,
      serviceName: dataForm3.serviceNameService,
      commissionGroup: dataForm5.commissionGroup,
      serviceType: dataForm1.typeMaterialService,
      businessArea: dataForm1.bussinesAreaService,
      observations: dataForm7.observationsService,
      articleGroup: dataForm3.articleGroupService,
      materialGroup: dataForm5.materialGroupService,
      beneficCenter: dataForm6.benefitCenterService,
      baseUnitMeasure: dataForm3.baseUnitMeasureService,
      distributionChannel: dataForm2.distributionChannel,
      salesOrganization: dataForm2.salesOrganizationServices,
      materialCarryingGroup: dataForm6.materialCarryingGroup,
      materialImputationGroup: dataForm5.materialsImputationGroup,
    };
    editService(request);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const goBack = () => {
    history.goBack();
  };

  const confirmCancelDialog = () => {
    setOpen(false);
    goBack();
  };

  const validateChangeStep = () => {
    setIsSubmitting(true);
  };

  const components = [
    {
      number: 1,
      component: (
        <Form1
          dataEdit={state}
          isEdit={isEdited}
          setError={setError}
          dataForm={dataForm1}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataForm1(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
    {
      number: 2,
      component: (
        <Form2
          dataEdit={state}
          isEdit={isEdited}
          setError={setError}
          dataForm={dataForm2}
          isSubmitting={isSubmitting}
          company={dataForm1.companyService}
          typeMaterial={dataForm1.typeMaterialService}
          setForm={(element) => setDataForm2(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
    {
      number: 3,
      component: (
        <Form3
          dataEdit={state}
          isEdit={isEdited}
          setError={setError}
          dataForm={dataForm3}
          isSubmitting={isSubmitting}
          company={dataForm1.companyService}
          typeMaterial={dataForm1.typeMaterialService}
          setForm={(element) => setDataForm3(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
    {
      number: 4,
      component: (
        <Form4
          dataEdit={state}
          isEdit={isEdited}
          setError={setError}
          dataForm={dataForm4}
          isSubmitting={isSubmitting}
          company={dataForm1.companyService}
          typeMaterial={dataForm1.typeMaterialService}
          setForm={(element) => setDataForm4(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
    {
      number: 5,
      component: (
        <Form5
          dataEdit={state}
          isEdit={isEdited}
          setError={setError}
          dataForm={dataForm5}
          isSubmitting={isSubmitting}
          company={dataForm1.companyService}
          typeMaterial={dataForm1.typeMaterialService}
          setForm={(element) => setDataForm5(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
    {
      number: 6,
      component: (
        <Form6
          dataEdit={state}
          isEdit={isEdited}
          setError={setError}
          dataForm={dataForm6}
          isSubmitting={isSubmitting}
          company={dataForm1.companyService}
          typeMaterial={dataForm1.typeMaterialService}
          setForm={(element) => setDataForm6(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
    {
      number: 7,
      component: (
        <Form7
          dataEdit={state}
          isEdit={isEdited}
          dataForm={dataForm7}
          isSubmitting={isSubmitting}
          setForm={(element) => setDataForm7(element)}
          setIsSubmitting={() => setIsSubmitting(false)}
        />
      ),
    },
  ];

  const navBreadCrumbArrayList = [
    { path: "/", active: "", word: "Inicio" },
    {
      path: "/Materiales/ServiciosConsultar",
      active: "",
      word: "Gestión servicios",
    },
    {
      path: "#",
      active: "BreadCrumb__link--active",
      word: `${isEdited ? "Modificar servicio" : "Creación servicio"}`,
    },
  ];

  const [datosEncabezado, setDatosEncabezado] = useState({
    tipoMaterial: "",
    nombreAreaNegocio: "",
  });

  useEffect(() => {
    if (ListsMDS.length) {
      const AreaNegocio = ListsMDS.filter(
        (element) => element.listName === "AreaNegocio"
      );
      const TipoMaterial = ListsMDS.filter(
        (element) => element.listName === "TipoMaterialServicio"
      );
      if (dataForm1.bussinesAreaService && dataForm1.typeMaterialService) {
        const namebussinesArea = AreaNegocio[0].list[0].values.filter(
          (element) => element.id === dataForm1.bussinesAreaService
        );
        const typeMaterialService = TipoMaterial[0].list[0].values.filter(
          (element) => element.id === dataForm1.typeMaterialService
        );
        setDatosEncabezado({
          ...datosEncabezado,
          nombreAreaNegocio: `${namebussinesArea[0].name}`,
          tipoMaterial: `${typeMaterialService[0].name}`,
        });
      }
    }
  }, [ListsMDS, dataForm1]);

  const handleCloseSnack = () => {
    clear();
    history.push("/Materiales/ServiciosConsultar");
  };

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArrayList} />
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
        {isEdited ? "Modificar servicio" : "Solicitud Creación Servicio"}
      </h3>

      {activeStep > 1 && (
        <div className="headerFormServices">
          <h4 className="titleFormServices">Datos de encabezado</h4>
          <div className="contentEncabezado">
            {isEdited && state && (
              <div className="contentEncabezado__item">
                <h6 className="titleItemContent">Id Servicio</h6>
                <p className="textContent">
                  {state.id ? state.id : "Sin información"}
                </p>
              </div>
            )}
            <div className="contentEncabezado__item">
              <h6 className="titleItemContent">Empresa</h6>
              <p className="textContent">
                {dataForm1.companyService === "R" ? "REFICAR" : "ECOPETROL"}
              </p>
            </div>
            <div className="contentEncabezado__item">
              <h6 className="titleItemContent">Tipo de material</h6>
              <p className="textContent">
                {datosEncabezado.tipoMaterial.length
                  ? datosEncabezado.tipoMaterial
                  : "Sin información"}
              </p>
            </div>
            <div className="contentEncabezado__item">
              <h6 className="titleItemContent">Área de negocio</h6>
              <p className="textContent">
                {datosEncabezado.nombreAreaNegocio.length
                  ? datosEncabezado.nombreAreaNegocio
                  : "Sin información"}
              </p>
            </div>
          </div>
        </div>
      )}
      <Wizard
        isSave={false}
        showPreview={false}
        activeStep={activeStep}
        handleBack={handleBack}
        finalBtnName={"Enviar"}
        classes={classesMaterial}
        componentsWizard={components}
        handleCancel={handleClickOpen}
        handleNext={validateChangeStep}
        titlesWizard={titleWizardServices}
      />
      <SnackBarCommon
        time={Time}
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
        medium={isEdited ? "editar" : "crear"}
        confirmCancelDialog={confirmCancelDialog}
        messageEdit="¿Está seguro que desea cancelar la edición de la información?"
        messageCreate="¿Está seguro que desea cancelar la creación de la información?"
      />
    </>
  );
};
