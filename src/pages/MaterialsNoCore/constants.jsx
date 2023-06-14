export const servicesTableTitles = [
  { title: "Nro solicitud" },
  { title: "Fecha de creación" },
  { title: "Fecha de modificación" },
  { title: "Solicitante" },
  { title: "Tipo de material" },
  { title: "Estado" },
  { title: "Acciones" },
];

export const servicesCellNames = [
  "id",
  "dateCreatedFormat",
  "lastModifiedFormat",
  "createdByName",
  "materialName",
  "stateName",
];

export const navBreadCrumbArrayList = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Gestión Materiales No Core",
  },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Creación y gestión",
  },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "BreadCrumb__link--active",
    word: "Gestión de materiales",
  },
];
export const navBreadCrumbArraySolicitud = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Gestión Materiales No Core",
  },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Creación y gestión",
  },
  {
    path: "/MaterialesNoCore/GestionSolicitudes",
    active: "BreadCrumb__link--active",
    word: "Gestión de solicitudes",
  },
];

export const navBreadCrumbArrayListSolicitudes = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Gestión Materiales No Core",
  },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Creación y gestión",
  },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "BreadCrumb__link--active",
    word: "Gestión de solicitudes",
  },
];

export const navBreadCrumbArrayCreateList = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Gestión Materiales No Core",
  },
  {
    path: "#",
    active: "BreadCrumb__link--active",
    word: "Creación de Material No Core",
  },
];
export const navBreadCrumbArrayCreateListEdited = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Gestión Materiales No Core",
  },
  {
    path: "#",
    active: "BreadCrumb__link--active",
    word: "Edición de Material No Core",
  },
];

export const navBreadCrumbArrayManagmentList = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Gestión Materiales No Core",
  },
  {
    path: "#",
    active: "BreadCrumb__link--active",
    word: "Creación y gestión",
  },
];
export const breadCrumbConsultaModificacion = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Gestión Materiales No Core",
  },
  {
    path: "#",
    active: "BreadCrumb__link--active",
    word: "Consultar y editar",
  },
];

export const TITLES_WIZARD = [
  { number: 1, name: "Datos específicos del material" },
  { number: 2, name: "Detalles del material" },
];

export const stateBorrador = 1;
export const stateDevuelto = 4;
export const stateAprobado = 3;
export const stateGuradado = 7;
export const statePendiente = 2;
export const stateRechazado = 5;
// State Package
export const stateDebueltoMaterial = 1;

const viewCircle = () => {
  return true;
};

export const columnsSolicitante = [
  {
    field: "ticketNumber",
    headerName: "Nº de ticket",
    "min-width": 0,
    width: 350,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "approverByName",
    headerName: "Fecha de creación",
    "min-width": 0,
    width: 150,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "aprobador",
    headerName: "Aprobador",
    "min-width": 0,
    width: 250,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "numMaterial",
    headerName: "Nº de materiales",
    "min-width": 0,
    width: 150,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "state",
    headerName: "Estado de la solicitud",
    "min-width": 0,
    width: 250,
    disableColumnMenu: true,
    border: "none",
    viewCircle: viewCircle,
  },
];

export const columnsCatalogador = [
  {
    field: "ticketNumber",
    headerName: "Nº de ticket",
    "min-width": 0,
    width: 350,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "approverByName",
    headerName: "Fecha de creación",
    "min-width": 0,
    width: 150,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "createByName",
    headerName: "Solicitante",
    "min-width": 0,
    width: 150,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "aprobador",
    headerName: "Aprobador",
    "min-width": 0,
    width: 250,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "numMaterial",
    headerName: "Nº de materiales",
    "min-width": 0,
    width: 150,
    disableColumnMenu: true,
    border: "none",
  },
  {
    field: "state",
    headerName: "Estatus de la solicitud",
    "min-width": 0,
    width: 250,
    disableColumnMenu: true,
    border: "none",
    viewCircle: viewCircle,
  },
];
