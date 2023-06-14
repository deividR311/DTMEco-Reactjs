import { NavBreadCrumb } from "../../../../sharedComponents";

const BreadCrumb = () => {
  const navBreadCrumbArray = [
    { path: '/', active: '', word: 'Inicio' },
    { path: '/Clientes/Consultar/Destinatarios', active: 'BreadCrumb__link--active', word: 'Listado Solicitud Destinatarios' }
  ];

  return (
    <>
      <NavBreadCrumb path={navBreadCrumbArray} />
    </>
  )
}

export default BreadCrumb;