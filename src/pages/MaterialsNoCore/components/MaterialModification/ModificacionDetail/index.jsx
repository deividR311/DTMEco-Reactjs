import "./_detailsModificacion.scss";
import { ModalModify } from "./ModalModify";
import { useParams } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { VersionActual } from "./VersionActual";
import { VersionModified } from "./VersionModified";
import { useContext, useEffect, useState } from "react";
import { TooltipCustom } from "../../../../Materials/widgets";
import { NavBreadCrumb } from "../../../../../sharedComponents";
import HeaderContext from "../../../../../context/Header/headerContext";
import { breadCrumbDetail, rejectTitle, approveTitle } from "../constants";
import MaterialsNoCoreContext from "../../../../../context/MaterialsNoCore/materialsNoCoreContext";

export const ModificacionDetail = () => {
  const { id } = useParams();

  //---HEADER
  const headerContext = useContext(HeaderContext);
  const { headerModuleUserPermissions } = headerContext;
  const { responseData } = headerModuleUserPermissions;

  //---MATERIAL NO CORE
  const materialNoCore = useContext(MaterialsNoCoreContext);
  const {
    descriptionLong,
    GetDescriptionLong,
    materialNoCoreModifyDetailsFull,
    getMaterialNoCoreModifyDetailChanges,
  } = materialNoCore;

  const [open, setOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [currentUser, setCurrentUser] = useState(0);
  const [selectedValue, setSelectedValue] = useState("modified");
  const [helperDescriptionLong, setHelperDescriptionLong] = useState([]);

  /* SE VALIDAN LOS ROLES Y PERMISOS */
  useEffect(() => {
    if (responseData !== undefined) {
      const moduleMaterials = responseData.filter(
        (module) => module.moduleOrder === 5
      );
      setCurrentUser(moduleMaterials[0].userId);
    }
  }, [responseData]);

  // metodo para visualizar el detalle
  useEffect(() => {
    if (id !== undefined) {
      getMaterialNoCoreModifyDetailChanges(id);
    }
  }, [id]);

  useEffect(() => {
    if (descriptionLong.length > 0) {
      setHelperDescriptionLong(descriptionLong);
    }
  }, [descriptionLong]);

  useEffect(() => {
    if (Object.entries(materialNoCoreModifyDetailsFull).length > 0) {
      GetDescriptionLong(materialNoCoreModifyDetailsFull.shortDescription);
    }
  }, [materialNoCoreModifyDetailsFull]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleClickHistory = () => {
    alert("Ver Histórico");
  };

  const validateNull = (value) => {
    if (!value) return "Sin información";
    return value;
  };

  const replaceNota = (value) => {
    if (value) {
      if (value.includes("%-@")) {
        const splitNote = value.split(" %-@ ");
        if (splitNote[1] === "") {
          return value.replace("%-@ ", "");
        } else {
          return value.replace("%-@ ", "- ");
        }
      } else {
        return value;
      }
    } else {
      return "";
    }
  };

  //<------------------------------------------------------------------------------------------------------------------------->

  const Radio = ({ value, label, textTooltip }) => {
    return (
      <>
        <label className="container">
          <input
            type="radio"
            name="radio"
            checked={selectedValue === value}
            value={value}
          />
          <span className="checkmark"></span>
          <div className="text">{label}</div>
        </label>
        <TooltipCustom title={textTooltip} placement={"top"} />
      </>
    );
  };

  const HeaderSectionTwoDetail = () => {
    return (
      <div className="sectionTwoDetail_header">
        <h4 className="title">Datos del material</h4>
        <div onChange={handleChange} className="RadioBtn">
          <Radio
            value={"modified"}
            label="Versión a modificar"
            textTooltip={
              "Muestra las modificaciones solicitadas por el usuario"
            }
          />
          <Radio
            value={"actual"}
            label="Versión actual"
            textTooltip={
              "Muestra el material como se encuentra actualmente en el sistema"
            }
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="allContainerDetail">
        <NavBreadCrumb path={breadCrumbDetail} />
        <SectionHeader
          validateNull={validateNull}
          data={materialNoCoreModifyDetailsFull}
          handleClickHistory={handleClickHistory}
        />
        <section className="sectionTwoDetail">
          <HeaderSectionTwoDetail />
          <div className="sectionTwoDetail_bodyDetail">
            {selectedValue === "modified" ? (
              <VersionModified
                replaceNota={replaceNota}
                validateNull={validateNull}
                data={materialNoCoreModifyDetailsFull}
                helperDescriptionLong={helperDescriptionLong}
              />
            ) : (
              <VersionActual
                replaceNota={replaceNota}
                validateNull={validateNull}
                data={materialNoCoreModifyDetailsFull}
                helperDescriptionLong={helperDescriptionLong}
              />
            )}
          </div>
        </section>
      </div>
      <div className="ContainerDetailButtonsModify">
        <div className="containerBtn">
          <div className="col-btn">
            <div className="ContainerDetailButtons__items">
              <div className={`ButtonCancelModify`} onClick={() => {}}>
                Cancelar
              </div>
            </div>
          </div>
          <div className="col-btn">
            <div className="ContainerDetailButtons__items">
              <div
                className={`ButtonCancelBorder`}
                onClick={() => {
                  handleOpen();
                  setTypeModal("reject");
                }}
              >
                Rechazar/devolver
              </div>
            </div>
            <div className="ContainerDetailButtons__items">
              <div
                className={`ButtonAccept`}
                onClick={() => {
                  handleOpen();
                  setTypeModal("approve");
                }}
              >
                Aprobar
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalModify
        id={id}
        open={open}
        typeModal={typeModal}
        handleClose={handleClose}
        tittleModal={typeModal === "reject" ? rejectTitle : approveTitle}
      />
    </>
  );
};
