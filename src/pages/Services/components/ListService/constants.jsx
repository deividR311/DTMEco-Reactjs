export const servicesTableTitles = [
  { title: "Nro solicitud" },
  { title: "Fecha de creación" },
  { title: "Fecha de actualización" },
  { title: "Solicitante" },
  { title: "Área de negocio" },
  { title: "Tipo material" },
  { title: "Empresa" },
  { title: "Estado" },
  { title: "Acciones" },
];

export const servicesCellNames = [
  "id",
  "dateCreatedFormat",
  "lastModifiedFormat",
  "userName",
  "nameBussinesArea",
  "nameTypeService",
  "company",
  "stateName",
];

export const navBreadCrumbArrayList = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "#",
    active: "BreadCrumb__link--active",
    word: "Gestión de servicios",
  },
];
