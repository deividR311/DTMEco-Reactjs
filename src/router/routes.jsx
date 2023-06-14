import {
  Administration,
  Costumer,
  Home,
  Materials,
  Providers,
  Recipients,
  Roles,
  Services,
} from "../pages/index";
import RolesState from "../context/Roles/rolesState";
import { CreateEditRol } from "../pages/Roles/components";
import CostumerState from "../context/Costumer/costumerState";
import MaterialState from "../context/Materials/materialState";
import { AdminCreateEditControl } from "../pages/Administration/components";
import { CreateMaterial, DetailMaterial } from "../pages/Materials/components";
import MaterialNoCoreState from "../context/MaterialsNoCore/materialNoCoreState";
import {
  CostumerWizard,
  CreateUserRequest,
  LevelTwo,
} from "../pages/Costumer/components";

import { MaterialesNoCore } from "../pages/MaterialsNoCore";
import { About } from "../pages/About";
import {
  GestionMateriales,
  GestionSolicitudes,
} from "../pages/MaterialsNoCore/components/Managment";

import {
  DraftMaterialNoCore,
  MaterialesNoCoreList,
  MaterialsNoCoreDetail,
} from "../pages/MaterialsNoCore/components";

import ServiceState from "../context/Services/servicesState";
import { CreateEditService, DetailService } from "../pages/Services/components";

import {
  ModificationList,
  ModificationCreate,
  ModificacionDetail,
} from "../pages/MaterialsNoCore/components/MaterialModification";

export const routes = [
  {
    exact: true,
    path: "/",
    component: () => <Home />,
  },

  {
    exact: true,
    path: "/Admin/Crear",
    component: () => <AdminCreateEditControl />,
  },

  {
    exact: true,
    path: "/Admin/Modificar",
    component: () => <AdminCreateEditControl />,
  },

  {
    exact: true,
    path: "/Admin/Consultar",
    component: () => <Administration />,
  },

  {
    exact: true,
    path: "/Admin/Roles/Consultar",
    component: () => (
      <RolesState>
        <Roles />
      </RolesState>
    ),
  },

  {
    exact: true,
    path: "/Admin/Roles/Crear",
    component: () => (
      <RolesState>
        <CreateEditRol />
      </RolesState>
    ),
  },

  {
    exact: true,
    path: "/Admin/Roles/Modificar",
    component: () => (
      <RolesState>
        <CreateEditRol />
      </RolesState>
    ),
  },

  {
    exact: true,
    path: "/Clientes/Consultar",
    component: () => (
      <CostumerState>
        <Costumer />
      </CostumerState>
    ),
  },

  {
    exact: true,
    path: "/Clientes/Crear",
    component: () => (
      <CostumerState>
        <CreateUserRequest />
      </CostumerState>
    ),
  },

  {
    exact: true,
    path: "/Clientes/Crear/ClienteNacional",
    component: () => (
      <CostumerState>
        <CostumerWizard />
      </CostumerState>
    ),
  },

  {
    exact: true,
    path: "/Clientes/ClienteNacional/:code/:nivel/:id",
    component: () => (
      <CostumerState>
        <CostumerWizard />
      </CostumerState>
    ),
  },
  {
    exact: true,
    path: "/Clientes/:code/ClienteNacional/NivelDos/:id",
    component: () => (
      <CostumerState>
        <LevelTwo />
      </CostumerState>
    ),
  },

  {
    exact: true,
    path: "/proveedores",
    component: () => <Providers />,
  },

  {
    exact: true,
    path: "/Materiales/Consultar",
    component: () => (
      <MaterialState>
        <Materials flow="1" />
      </MaterialState>
    ),
  },
  {
    exact: true,
    path: "/Materiales/Crear",
    component: () => (
      <MaterialState>
        <CreateMaterial />
      </MaterialState>
    ),
  },
  {
    exact: true,
    path: "/Materiales/Modificar",
    component: () => (
      <MaterialState>
        <CreateMaterial />
      </MaterialState>
    ),
  },
  {
    exact: true,
    path: "/Materiales/Detalle",
    component: () => (
      <MaterialState>
        <DetailMaterial />
      </MaterialState>
    ),
  },
  {
    exact: true,
    path: "/Materiales/ServiciosConsultar",
    component: () => (
      <MaterialState>
        <Materials flow="2" />
      </MaterialState>
    ),
  },
  {
    exact: true,
    path: "/Materiales/ServiciosCrear",
    component: () => (
      <ServiceState>
        <CreateEditService />
      </ServiceState>
    ),
  },
  {
    exact: true,
    path: "/Materiales/ServiciosModificar",
    component: () => (
      <ServiceState>
        <CreateEditService />
      </ServiceState>
    ),
  },
  {
    exact: true,
    path: "/Materiales/ServiciosDetalle",
    component: () => (
      <ServiceState>
        <DetailService />
      </ServiceState>
    ),
  },
  {
    exact: true,
    path: "/Clientes/Consultar/Destinatarios",
    component: () => <Recipients />,
  },
  {
    exact: true,
    path: "/MaterialesNoCore/Borrador/:step/:id",
    component: () => (
      <MaterialNoCoreState>
        <DraftMaterialNoCore />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/Modificar/:step/:id",
    component: () => (
      <MaterialNoCoreState>
        <DraftMaterialNoCore />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/Detalle/:id",
    component: () => (
      <MaterialNoCoreState>
        <MaterialsNoCoreDetail />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/Consultar",
    component: () => (
      <MaterialNoCoreState>
        <MaterialesNoCore />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/Crear",
    component: () => (
      <MaterialNoCoreState>
        <DraftMaterialNoCore />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/GestionMateriales",
    component: () => (
      <MaterialNoCoreState>
        <GestionMateriales />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/GestionSolicitudes",
    component: () => (
      <MaterialNoCoreState>
        <GestionSolicitudes />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/CreacionMaterial",
    component: () => (
      <MaterialNoCoreState>
        <MaterialesNoCoreList />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/ConsultaModificacion",
    component: () => (
      <MaterialNoCoreState>
        <ModificationList />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/CreacionModificacion",
    component: () => (
      <MaterialNoCoreState>
        <ModificationCreate />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/EditarModificacion/:id",
    component: () => (
      <MaterialNoCoreState>
        <ModificationCreate />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/MaterialesNoCore/DetalleModificacion/:id",
    component: () => (
      <MaterialNoCoreState>
        <ModificacionDetail />
      </MaterialNoCoreState>
    ),
  },
  {
    exact: true,
    path: "/Admin/acercade",
    component: () => <About />,
  },
];
