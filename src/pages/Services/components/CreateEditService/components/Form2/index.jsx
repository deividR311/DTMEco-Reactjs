import * as React from "react";
import { useState, useEffect, useContext } from "react";
import schema from "../../../../schema/Forms/form2.schema";
import { SelectCustom } from "../../../../../Materials/widgets";
import { useValidateForm } from "../../../../../../hooks/useValidateForm";
import ServicesContext from "../../../../../../context/Services/servicesContext";

const initialState = {
  sectorService: "",
  centerService: "",
  distributionChannel: "",
  salesOrganizationServices: "",
};


export const Form2 = ({
  company,
  isEdit,
  setForm,
  setError,
  dataForm,
  dataEdit,
  typeMaterial,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { error, values, setValues, handleInputs, submitValidate } =
    useValidateForm(initialState, schema);

  const servicesContext = useContext(ServicesContext);
  const { ListsMDS } = servicesContext;

  const [rules, setRules] = useState({
    salesOrganizationServices: "",
    distributionChannel: ""
  });

  const [list, setList] = useState({
    centerServiceList: [],
    sectorServiceList: [],
    distributionChannelList: [],
    salesOrganizationServicesList: [],
  });

  useEffect(() => {
    try {
      if (ListsMDS !== undefined) {
        if (ListsMDS.length) {
          const Centro = ListsMDS.filter(
            (element) => element.listName === "Centro"
          );
          const Sector = ListsMDS.filter(
            (element) => element.listName === "Sector"
          );
          const SectorByType = Sector[0].list[0].values.filter(
            (sector) => sector.id === typeMaterial
          );
          setList({
            ...list,
            centerServiceList: Centro[0].list[0].values,
            sectorServiceList: SectorByType[0].subValues,
          });
        }
      }
    } catch (err) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  }, [ListsMDS]);

  useEffect(() => {
      if (company === "E") {
        if(list.sectorServiceList.length){
          setValues({
            ...values,
            sectorService: "16_E"
          });
          setRules({
            ...rules,
            salesOrganizationServices: "CO01_E",
            distributionChannel: "50_E"
          });
        }
      } else if (company === "R") {
        if(list.sectorServiceList.length){
          setValues({
            ...values,
            sectorService: "99_R"
          });
          setRules({
            ...rules,
            salesOrganizationServices: "MNAL_R",
            distributionChannel:"00_R"
          });
        }
      }
  }, [company, list]);
  
  useEffect(() => {
    if(list.salesOrganizationServicesList.length || list.distributionChannelList.length){
      setValues({
        ...values,
        salesOrganizationServices: rules.salesOrganizationServices,
        distributionChannel: rules.distributionChannel
      });
    }
  }, [list]);

  useEffect(() => {
    if (isEdit) {
      const { salesOrganization, distributionChannel, center, sector } =
        dataEdit;
      setValues({
        distributionChannel,
        sectorService: sector,
        centerService: center,
        salesOrganizationServices: salesOrganization,
      });
    }
  }, [isEdit]);

   useEffect(() => {
     try {
       if (values.sectorService.length) {
         if (ListsMDS !== undefined) {
           if (ListsMDS.length) {
             const OrganizacionVentas = ListsMDS.filter(
               (element) => element.listName === "OrganizacionVentas"
             );
             const CanalDistribucion = ListsMDS.filter(
               (element) => element.listName === "CanalDistribucion"
             );
             const OrgBySector = OrganizacionVentas[0].list[0].values.filter(
               (org) => org.id === rules.salesOrganizationServices
             );
             const ChannelBySector = CanalDistribucion[0].list[0].values.filter(
               (ch) => ch.id === rules.distributionChannel
             );
              setList({
                ...list,
                distributionChannelList: ChannelBySector,
                salesOrganizationServicesList: OrgBySector,
              });
           }
         }
       }
     } catch (error) {
       setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
     }
   }, [values.sectorService]);

  useEffect(() => {
    if (
      Object.values(dataForm).every(
        (data) => data.length == 0 && data !== ""
      ) === false
    ) {
      setValues(dataForm);
    }
  }, [dataForm]);

  useEffect(() => {
    if (isSubmitting) {
      submitValidate();
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitting) {
      const value = Object.values(error).every(
        (data) => data.length == 0 && data !== ""
      );
      if (value) {
        setForm(values);
      }
    }
    setIsSubmitting();
  }, [error]);

  return (
    <>
      <div className="formRow">
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Centro"}
            errors={error.centerService}
            items={list.centerServiceList}
            placeholder="Seleccione el centro"
            handleInputs={handleInputs("centerService")}
          />
        </div>
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Sector"}
            errors={error.sectorService}
            items={list.sectorServiceList}
            placeholder="Seleccione el sector"
            handleInputs={handleInputs("sectorService")}
          />
        </div>
        <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Organización de ventas"}
            errors={error.salesOrganizationServices}
            items={list.salesOrganizationServicesList}
            placeholder="Ingrese organización de ventas"
            handleInputs={handleInputs("salesOrganizationServices")}
          />
        </div>
         <div className="formRow__campo">
          <SelectCustom
            showId={false}
            required={true}
            label={"Canal distribución"}
            errors={error.distributionChannel}
            items={list.distributionChannelList}
            placeholder="Seleccione el Canal distribución"
            handleInputs={handleInputs("distributionChannel")}
          />
        </div>
      </div>
    </>
  );
};
