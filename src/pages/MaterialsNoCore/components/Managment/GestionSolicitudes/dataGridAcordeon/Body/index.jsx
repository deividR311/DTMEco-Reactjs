import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { forceLoadUrl } from "../../../../../../../utils/Function";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import { stateDebueltoMaterial, stateDevuelto } from "../../../../../constants";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

export default function BodyRow(props) {
  const { row, checkedAll, onChange, isAdmin, handleCatalogardor, rowClick } =
    props;
  const handleClickReasignar = (id) => {
    handleCatalogardor(id);
  };
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [dataSetMaterials, setDataSetMaterials] = useState([]);
  const isSelected = (name) => {
    return selected.indexOf(name) !== -1;
  };
  const isItemSelected = isSelected(row.id);
  const labelId = `enhanced-table-checkbox-${row.id}`;
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    // rowClick(name);
    setSelected(newSelected);
  };

  useEffect(() => {
    const validObj = Object.keys(row);
    if (validObj.length > 0) {
      const { typeRequest } = row;
      switch (typeRequest) {
        case "MODIFICATION":
          setDataSetMaterials(row.modifications);
          break;
        case "CREATION":
          setDataSetMaterials(row.materials);
          break;
      }
    }
  }, [row]);

  const getColor = (stateName) => {
    let color = "";
    switch (stateName) {
      case "Solicitud En Proceso":
        color = "#FBAF34";
        break;
      case "Solicitud Cerrada":
        color = "rgb(2, 162, 78)";
        break;
      case "Solicitud Devuelta":
        color = "red";
        break;
    }

    return color;
  };

  const customStylesCell = (color) => {
    let hexColor = "";
    let colorText = "";
    switch (color) {
      case "Devuelto":
        hexColor = "#fbaf34";
        break;
      case "Aprobado":
        hexColor = "#02A24E";
        colorText = "white";
        break;
      case "Borrador":
        hexColor = "#0e0c5a";
        colorText = "white";
        break;
      case "Pendiente aprobación":
        hexColor = "#e6c32b";
        colorText = "";
        break;
      case "Rechazado":
        hexColor = "#FF2622";
        colorText = "white";
        break;
      case "Guardado":
        hexColor = "#02A24E";
        colorText = "white";
        break;
      case "Archivado":
        hexColor = "red";
        colorText = "white";
        break;
    }

    let fullColor = {
      borderRadius: "30px",
      background: hexColor,
      color: colorText,
      height: "30px",
      width: "95%",
      justifyContent: "center",
      display: "flex",
      alignContent: "center",
      flexWrap: "wrap",
    };
    return fullColor;
  };
  const simple = {
    marginRight: "10px",
    cursor: "pointer",
    color: "#0e0c5a",
  };

  const disabledSimple = {
    marginRight: "10px",
    color: "rgb(209, 209, 209)",
    cursor: "not-allowed",
  };

  const handleDetail = (objRow, typeRequest) => {
    let strUrl = "";
    const { id } = objRow;
    switch (typeRequest) {
      case "MODIFICATION":
        strUrl = `/MaterialesNoCore/DetalleModificacion/${id}`;
        break;
      case "CREATION":
        strUrl = `/MaterialesNoCore/Detalle/${id}`;
        break;
    }
    forceLoadUrl(strUrl);
  };

  const handleEdit = (id) => {
    forceLoadUrl(`/MaterialesNoCore/Modificar/1/${id}`);
  };

  // --- Estado de la solcitud ---
  // 1 "Solicitud En Proceso"
  // 2 "Solicitud Devuelta"
  // 3 "Solicitud Cerrada"
  const validStateEnabled = (item) => {
    if (item === 2) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Metodo encargado en validar el stado de la solicitud y bloquear el click en el boton administrador
   * en el cual realizaremos la reasignación
   * State Id         State Name
   *     1          Solicitud Pendiente
   *     2          Solicitud devuelta
   * @param {stateId} stateId
   */
  const stateRequest = (row) => {
    const { stateId, applyApproverReassignment, approverByName } = row;
    let stateBooleand = true;

    if (applyApproverReassignment && approverByName !== "") {
      switch (parseInt(stateId, 10)) {
        case 1:
          if (approverByName !== "") {
            stateBooleand = false;
          }
        case 2:
          if (approverByName !== "") {
            stateBooleand = false;
          }
          break;
        default:
          stateBooleand = true;
      }
    }
    return stateBooleand;
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const styleArrowAcord = {
    color: "#0F0C5A",
    fontSize: "35px",
  };

  const showState = (stateName) => {
    return (
      <div style={customStylesCell(stateName)}>
        <strong>{stateName}</strong>
      </div>
    );
  };

  return (
    <>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row.id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        {!props.isCatolagador ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              onChange={onChange}
              disabled={!validStateEnabled(row.stateId)}
              inputProps={{
                id: row.id,
                "aria-labelledby": labelId,
              }}
            />
          </TableCell>
        ) : (
          <TableCell></TableCell>
        )}

        <TableCell>
          <div onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowDown style={styleArrowAcord} />
            ) : (
              <KeyboardArrowRight style={styleArrowAcord} />
            )}
          </div>
        </TableCell>
        <TableCell>{row.ticketNumber}</TableCell>
        <TableCell>{row.dateCreatedFormat}</TableCell>
        {props.isCatolagador && <TableCell>{row.createByName}</TableCell>}
        <TableCell>{row.approverByName}</TableCell>
        <TableCell>{row.materialNumber}</TableCell>
        <TableCell>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={8}>
              {row.stateName}
            </Grid>
            <Grid item xs={1}>
              <CircleIcon
                style={{ color: getColor(row.stateName), marginInline: "auto" }}
              />
            </Grid>
            <Grid item xs={1}>
              {isAdmin && (
                <Button
                  disabled={stateRequest(row)}
                  onClick={() => {
                    handleClickReasignar(row.ticketNumber);
                  }}
                >
                  <AccountCircleIcon />
                </Button>
              )}
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow style={{ background: "#EFF4FD" }}>
        <TableCell padding="checkbox"></TableCell>
        {props.isCatolagador && (
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell>
        )}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open}>
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableHead style={{ background: "#EFF4FD" }}>
                  <TableRow>
                    <TableCell style={{ color: "#0F0C5A" }}>Id</TableCell>
                    <TableCell style={{ color: "#0F0C5A" }}>
                      Descripcion corta
                    </TableCell>
                    <TableCell style={{ color: "#0F0C5A" }}>
                      Fecha modificacion
                    </TableCell>
                    <TableCell style={{ color: "#0F0C5A" }}>
                      Tipo material
                    </TableCell>
                    <TableCell style={{ color: "#0F0C5A" }}>Estado</TableCell>
                    <TableCell style={{ color: "#0F0C5A" }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ background: "#FFF" }}>
                  {dataSetMaterials.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.id}
                      </TableCell>
                      <TableCell>{historyRow.shortDescriptionDesc}</TableCell>
                      <TableCell>{historyRow.lastModifiedFormat}</TableCell>
                      <TableCell>{historyRow.typeMaterials}</TableCell>
                      <TableCell>
                        {props.isCatolagador
                          ? showState(historyRow.stateName)
                          : row.stateId !== 1 &&
                            showState(historyRow.stateName)}
                      </TableCell>
                      <TableCell>
                        <div style={{ display: "flex" }}>
                          {props.isCatolagador ? (
                            <div
                              style={simple}
                              onClick={() =>
                                handleDetail(historyRow, row.typeRequest)
                              }
                              title="Ver detalle"
                            >
                              <VisibilityIcon />
                            </div>
                          ) : row.stateId !== 1 ? (
                            <div
                              style={simple}
                              onClick={() =>
                                handleDetail(historyRow, row.typeRequest)
                              }
                              title="Ver detalle"
                            >
                              <VisibilityIcon />
                            </div>
                          ) : (
                            <div
                              style={disabledSimple}
                              title="No se puede visualizar el detalle de la solicitud"
                            >
                              <VisibilityIcon />
                            </div>
                          )}
                          {!props.isCatolagador &&
                            (historyRow.stateId === stateDevuelto ? (
                              historyRow.createdBy === props.currentUser &&
                              row.stateId !== stateDebueltoMaterial ? (
                                <div
                                  style={simple}
                                  onClick={() => handleEdit(historyRow.id)}
                                  title="Modificar"
                                >
                                  <CreateIcon />
                                </div>
                              ) : (
                                <div
                                  style={disabledSimple}
                                  title="Solo se puede editar por el usuario que realizó la solicitud"
                                >
                                  <CreateIcon />
                                </div>
                              )
                            ) : (
                              <div
                                style={disabledSimple}
                                title="Solo se puede editar en estado Devuelto"
                              >
                                <EditIcon />
                              </div>
                            ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
