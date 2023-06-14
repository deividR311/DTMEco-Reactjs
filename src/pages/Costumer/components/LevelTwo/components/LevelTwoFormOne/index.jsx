import * as React from "react";
import { useEffect, useState } from "react";
import { useStyles } from "../../../../styles";
import IconUpload from "../../../../../../assets/images/upload.svg";
import { UploadCard } from "../../../CostumerWizard/components/ClientFormFour/components";

export const LevelTwoFormOne = ({
  data,
  documentType,
  generalCostumerList,
}) => {
  const classes = useStyles();
  const [valuesGeneralInfo, setValuesGeneralInfo] = useState({
    address: "",
    businessName: "",
    cellphone: "",
    codeCIIU: "",
    codeCity: "",
    codeCountry: "",
    codeRegion: "",
    codeTypeNif: "",
    codeTypePerson: "",
    email: "",
    firstName: "",
    firstSurname: "",
    legalRepresentativeId: "",
    legalRepresentativeName: " ",
    nif: "",
    secondName: "",
    secondSurname: "",
    telephone: "",
    tittle: 0,
    typeIndustry: "",
  });

  const [valuesSalesInfo, setValuesSalesInfo] = useState({
    canalCode: "",
    codefunction: "",
    email: "",
    salesAreaCode: "",
    salesOrganizationCode: "",
    sectorCode: "",
    telephone: "",
    transportZoneCode: "",
  });

  const [valuesImpuestos, setValuesImpuestos] = useState([]);

  useEffect(() => {
    if (generalCostumerList && data) {
      if (generalCostumerList.length) {
        // INFORMACIÓN GENERAL
        const general = data.generalInfo;
        let generalInfo;
        // VENTAS
        const ventas = data.salesInfo;
        let salesInfo;

        //IMPUESTOS
        const impuestos = data.fiscalInfo;
        let fiscalInfo = [];
        generalCostumerList.map((List) => {
          if (List.listName === "TipoNif") {
            const newValue = List.list[0].values.find(
              (data) => data.id === general.codeTypeNif
            );
            if (newValue !== undefined) {
              const textValue = newValue.name;
              generalInfo = { ...generalInfo, nameCodetypeNif: textValue };
            }
          }
          if (List.listName === "TipoPersona") {
            const newValue = List.list[0].values.find(
              (data) => data.id === general.codeTypePerson
            );
            if (newValue !== undefined) {
              const textValue = newValue.id + " - " + newValue.name;
              generalInfo = { ...generalInfo, nameCodeTypePerson: textValue };
            }
          }
          if (List.listName === "Geo") {
            const newValue = List.list[0].values.find(
              (data) => data.id === general.codeRegion
            );
            if (newValue !== undefined) {
              const City = newValue.subValues.find(
                (data) => data.id === general.codeCity
              );
              const textValue = newValue.name;
              generalInfo = {
                ...generalInfo,
                nameCodeRegion: textValue,
                nameCity: City.name,
              };
            }
          }
          if (List.listName === "ImpuestoCarbono") {
            const Carbono = impuestos.filter(
              (element) => element.codeClassFiscal === "ZICB"
            );
            if (Carbono.length) {
              const nameClasificacion = List.list[0].values.find(
                (data) => data.id === Carbono[0].value
              );
              fiscalInfo.push({
                impuesto: "Impuesto al carbono",
                clasificacion: nameClasificacion.name,
              });
            }
          }
          if (List.listName === "ImpuestoNacional") {
            const Carbono = impuestos.filter(
              (element) => element.codeClassFiscal === "ZINA"
            );
            if (Carbono.length) {
              const nameClasificacion = List.list[0].values.find(
                (data) => data.id === Carbono[0].value
              );
              fiscalInfo.push({
                impuesto: "Impuesto nacional",
                clasificacion: nameClasificacion.name,
              });
            }
          }
          if (List.listName === "ImpuestoTimbre") {
            const Carbono = impuestos.filter(
              (element) => element.codeClassFiscal === "ZITI"
            );
            if (Carbono.length) {
              const nameClasificacion = List.list[0].values.find(
                (data) => data.id === Carbono[0].value
              );
              fiscalInfo.push({
                impuesto: "Impuesto al timbre",
                clasificacion: nameClasificacion.name,
              });
            }
          }
          if (List.listName === "ImpuestoSobretasa") {
            const Carbono = impuestos.filter(
              (element) => element.codeClassFiscal === "ZIST"
            );
            if (Carbono.length) {
              const nameClasificacion = List.list[0].values.find(
                (data) => data.id === Carbono[0].value
              );
              fiscalInfo.push({
                impuesto: "Impuesto sobre tasa",
                clasificacion: nameClasificacion.name,
              });
            }
          }
          if (List.listName === "ImpuestoIVA") {
            const Carbono = impuestos.filter(
              (element) => element.codeClassFiscal === "ZIVA"
            );
            if (Carbono.length) {
              const nameClasificacion = List.list[0].values.find(
                (data) => data.id === Carbono[0].value
              );
              fiscalInfo.push({
                impuesto: "Impuesto IVA",
                clasificacion: nameClasificacion.name,
              });
            }
          }

          if (List.listName === "Ventas") {
            const Ecopetrol = List.list.filter(
              (item) => item.parent.id === "E"
            );
            if (Ecopetrol.length) {
              const EcopetrolSA = Ecopetrol[0].values.filter(
                (ecp) => ecp.id === data.codePartrnership
              );
              if (EcopetrolSA.length) {
                const salesOrganization = EcopetrolSA[0].subValues.filter(
                  (sales) => sales.id === ventas.salesOrganizationCode
                );
                if (salesOrganization.length) {
                  const canal = salesOrganization[0].subValues.filter(
                    (canal) => canal.id === ventas.canalCode
                  );
                  if (canal.length) {
                    const sector = canal[0].subValues.filter(
                      (sector) => sector.id === ventas.sectorCode
                    );

                    salesInfo = {
                      ...salesInfo,
                      nameCanalCode: canal[0].name,
                      nameSectorCode: sector[0].name,
                      nameSalesOrganizationCode: salesOrganization[0].name,
                    };
                  }
                }
              }
            }
          }

          if (List.listName === "TipoIndustria") {
            const newValue = List.list[0].values.find(
              (data) => data.id === general.typeIndustry
            );

            salesInfo = {
              ...salesInfo,
              nameTypeIndustry: newValue.id + " - " + newValue.name,
            };
          }
        });
        setValuesGeneralInfo({
          ...general,
          ...generalInfo,
          tittle: parseInt(general.tittle),
        });
        setValuesSalesInfo({
          ...ventas,
          ...salesInfo,
        });
        setValuesImpuestos(fiscalInfo);
      }
    }
  }, [generalCostumerList, data]);


  //------------------------------------------------------------------------------------------------------------------------------------------------
  const showTittle = (value) => {
    switch (value) {
      case 1:
        return "Empresa";
      case 2:
        return "Señor";
      case 3:
        return "Señora";
      default:
        return "";
    }
  };

  const showInfo = (value) => {
    if (value) {
      return value;
    } else {
      return "Sin información";
    }
  };

  const showCodeAccountGroup = (item, company) => {
    if (company === "E") {
      switch (item) {
        case "Z001":
          return "Deudores nacionales";
        case "Z00":
          return "Deudores extranjeros";

        default:
          return "";
      }
    } else {
      switch (item) {
        case "Z001":
          return "Cartera clientes nacionales";
        case "Z00":
          return "Cartera clientes extranjeros";

        default:
          return "";
      }
    }
  };

  const showCodePartrnership = (item, company) => {
    if (company === "E") {
      switch (item) {
        case "ASOC":
          return "Operación Asociada";
        case "ECP":
          return "Ecopetrol S.A.";
        case "MAN2":
          return "Mandatos ECP";
        case "US01":
          return "Ecopetrol America LLC";
        default:
          return "";
      }
    } else {
      switch (item) {
        case "ASOC":
          return "Operación Asociada";
        case "ECP":
          return "Ecopetrol S.A.";
        case "MAN2":
          return "Mandatos ECP";
        case "US01":
          return "Ecopetrol America LLC";
        default:
          return "";
      }
    }
  };

  let arrayWithName = [];
  if (data.attachments) {
    documentType.map((attachments) => {
      data.attachments.filter((type) => {
        if (type.documentTypeId === attachments.id) {
          arrayWithName.push({ name: attachments.name, ...type });
        }
      });
    });
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="containerDatosAnteriores">
        <div className="ContainerDetail ">
          <div className="HeaderDetail">
            <div className="titleTransparent">
              Datos de la solicitud de cliente - Id Solicitud # {data.id}
            </div>
            <div className="col-detail" style={{ width: "100%" }}>
              <div className="row-detail">
                <div className="HeaderDetail__item">
                  <h6>Empresa</h6>
                  <p>
                    {showInfo(
                      data.codeEnterprise === "E" ? "Ecopetrol" : "Reficar"
                    )}
                  </p>
                </div>
                <div className="HeaderDetail__item">
                  <h6>Estado</h6>
                  <p>{showInfo(data.stateName)}</p>
                </div>
                <div className="HeaderDetail__item">
                  <h6>Creado por</h6>
                  <p>{showInfo(data.createdByName)}</p>
                </div>
                <div className="HeaderDetail__item">
                  <h6>Fecha de creación</h6>
                  <p>{showInfo(data.dateCreated)}</p>
                </div>
              </div>
              <div className="row-detail">
                <div className="HeaderDetail__item">
                  <h6>Modificado por</h6>
                  <p>{showInfo(data.modifiedByName)}</p>
                </div>
                <div className="HeaderDetail__item">
                  <h6>Fecha de modificación</h6>
                  <p>{showInfo(data.dateModified)}</p>
                </div>
                <div className="HeaderDetail__item">
                  <h6>Aprobado por</h6>
                  <p>{showInfo(data.approvedByName)}</p>
                </div>
                <div className="HeaderDetail__item">
                  <h6>Fecha de aprobación</h6>
                  <p>{showInfo(data.dateApprovved)}</p>
                </div>
              </div>
              <div className="row-detail">
                <div className="HeaderDetail__item">
                  <h6>Sociedad</h6>
                  <p>
                    {showInfo(
                      showCodePartrnership(
                        data.codePartrnership,
                        data.codeEnterprise
                      )
                    )}
                  </p>
                </div>
                <div className="HeaderDetail__item">
                  <h6>Tipo de cliente</h6>
                  <p>
                    {showInfo(
                      showCodeAccountGroup(
                        data.codeAccountGroup,
                        data.codeEnterprise
                      )
                    )}
                  </p>
                </div>
                <div className="HeaderDetail__item">
                  <h6># Caso herramienta de gestión</h6>
                  <p>{showInfo(data.titanCaseId)}</p>
                </div>
                <div className="HeaderDetail__item">
                  <h6>Nombre del asesor de Nivel 1</h6>
                  <p>{showInfo(data.advisorName)}</p>
                </div>
              </div>
            </div>
            <div className="col-detail__button">
              <div className="col-btn">
                <div className="ContainerDetailButtons__items"></div>
              </div>
            </div>
          </div>
          <div className="Detalle">
            <div className="ContainerDetailForm">
              <div className="Section">
                <h4>{"Información general"}</h4>
                <div className="Fields">
                  <div className="groupField">
                    <label className="titleField">
                      Tipo Nif - Número identificación fiscal (Nif)
                    </label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.nameCodetypeNif)} -{" "}
                      {showInfo(valuesGeneralInfo.nif)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Tipo de persona</label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.nameCodeTypePerson)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">País</label>
                    <div className={"contentField"}>CO - Colombia</div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Departamento</label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.nameCodeRegion)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Cuidad</label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.nameCity)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Dirección</label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.address)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Tratamiendo</label>
                    <div className={"contentField"}>
                      {showInfo(showTittle(valuesGeneralInfo.tittle))}
                    </div>
                  </div>
                  {valuesGeneralInfo.tittle === 1 && (
                    <div className="groupField">
                      <label className="titleField">Razón Social</label>
                      <div className={"contentField"}>
                        {showInfo(valuesGeneralInfo.businessName)}
                      </div>
                    </div>
                  )}
                  {valuesGeneralInfo.tittle !== 1 && (
                    <div className="groupField">
                      <label className="titleField">Nombre del cliente</label>
                      <div className={"contentField"}>
                        {showInfo(data.clientName)}
                      </div>
                    </div>
                  )}
                  <div className="groupField">
                    <label className="titleField">Teléfono</label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.telephone)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Celular</label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.cellphone)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Correo electrónico</label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.email)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">
                      Actividad Económica (CIIU):
                    </label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.codeCIIU)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">
                      Identificación representante legal
                    </label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.legalRepresentativeId)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">
                      Nombre representante legal
                    </label>
                    <div className={"contentField"}>
                      {showInfo(valuesGeneralInfo.legalRepresentativeName)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="Section">
                <h4>{"Información de ventas"}</h4>
                <div className="Fields">
                  <div className="groupField">
                    <label className="titleField">Organización de ventas</label>
                    <div className={"contentField"}>
                      {showInfo(valuesSalesInfo.nameSalesOrganizationCode)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Canal</label>
                    <div className={"contentField"}>
                      {showInfo(valuesSalesInfo.nameCanalCode)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Sector</label>
                    <div className={"contentField"}>
                      {showInfo(valuesSalesInfo.nameSectorCode)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Tipo de industria</label>
                    <div className={"contentField"}>
                      {showInfo(valuesSalesInfo.nameTypeIndustry)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Función</label>
                    <div className={"contentField"}>
                      {showInfo(valuesSalesInfo.codeFunction)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Correo</label>
                    <div className={"contentField"}>
                      {showInfo(valuesSalesInfo.email)}
                    </div>
                  </div>
                  <div className="groupField">
                    <label className="titleField">Teléfono fijo o móvil</label>
                    <div className={"contentField"}>
                      {showInfo(valuesSalesInfo.telephone)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="Section">
                <h4>{"Información de Impuestos"}</h4>
                <div className="Fields">
                  <div className="groupField">
                    <label className="titleField">Impuestos</label>
                    <div className={"contentTax"}>
                      <table className="table">
                        <thead className="table__header">
                          <tr>
                            <th scope="col">Tipo impuesto</th>
                            <th scope="col">Clasificación fiscal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {valuesImpuestos.length
                            ? valuesImpuestos.map((data, index) => (
                                <tr index={index} key={index}>
                                  <td>{data.impuesto}</td>
                                  <td>{data.clasificacion}</td>
                                </tr>
                              ))
                            : "Sin información"}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Section">
                <h4>{"Archivos adjuntos"}</h4>
                <div className="Fields">
                  {arrayWithName.length > 0 &&
                    arrayWithName.map((array) => (
                      <div className="groupField">
                        <li>{array.name}*</li>
                        <UploadCard
                          classes={classes}
                          fileDescriptions={{
                            descriptionFile: "Para descargar dele click abajo",
                          }}
                          IconUpload={IconUpload}
                          nameFile={""}
                          isAttachment={true}
                          attachment={array.downloadURL}
                          inputId={"string"}
                          handleChange={() => {}}
                          generalDisabled={true}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
