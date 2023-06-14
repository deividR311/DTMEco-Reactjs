// constants
export const rejectTitle =
  "Rechazo o Devolución de material No Core para modificación";

export const approveTitle = "Aprobación modificación";

export const breadCrumb = [
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
    path: "/MaterialesNoCore/ConsultaModificacion",
    active: "",
    word: "Gestión de materiales para modificación",
  },
  {
    path: "/MaterialesNoCore/CreacionModificacion",
    active: "BreadCrumb__link--active",
    word: "Modificación del material",
  },
];

export const breadCrumbDetail = [
  { path: "/", active: "", word: "Inicio" },
  {
    path: "/MaterialesNoCore/Consultar",
    active: "",
    word: "Gestión Materiales No Core",
  },
  {
    path: "/MaterialesNoCore/GestionSolicitudes",
    active: "",
    word: "Gestión de solicitudes",
  },
  {
    path: "#",
    active: "BreadCrumb__link--active",
    word: "Detalle del material",
  },
];

export const TitlesDetail_DatosMaterial = {
  typeResquest: "Tipo de solicitud",
  typeMaterial: "Tipo de material",
  statusMateril: "Status material para todos los centros",
  shortDesc: "Descripción corta",
  longDesc: "Descripción larga",
  grArtInterno: "Grupo de artículos UNSPSC",
  grArtExternal: "Grupo de artículos externo",
  productHierar: "Jerarquía de productos",
  internalNote: "Nota interna",
  observations: "Observaciones acerca de la solicitud",
};
