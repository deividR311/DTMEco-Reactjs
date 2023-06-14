export const materialsTableTitles = [
  { title: "# solicitud" },
  { title: "Fecha de creación" },
  { title: "Fecha de modificación" },
  { title: "Solicitante" },
  { title: "Tipo de material" },
  { title: "Empresa" },
  { title: "Estado" },
  { title: "Acciones" },
];

export const materialsCellNames = [
  "id",
  "dateCreatedFormat",
  "lastModifiedFormat",
  "userName",
  "materialTypeName",
  "company",
  "stateName",
];

export const navBreadCrumbArrayList = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "#",
    active: "BreadCrumb__link--active",
    word: "Gestión de materiales",
  },
];

export const stateBorrador = 1;
export const stateDevuelto = 4;
export const stateAprobado = 3;
export const stateGuradado = 7;
export const statePendiente = 2;
export const stateRechazado = 5; 
// State Package
export const stateDebueltoMaterial = 1;