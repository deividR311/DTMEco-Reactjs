import { Grid } from "@material-ui/core";
import { TextFieldDetail } from "../TextFieldDetail";

export const SectionHeader = ({ data, handleClickHistory, validateNull }) => {
  return (
    <>
      <div>
        <p style={{ fontSize: "36px", color: "#0E0C5A" }}>
          Detalle modificación del material
        </p>
      </div>
      <Grid container className="headerDetailContainer">
        <Grid item xs={12} className={"headerDetailContainer_item header"}>
          Datos del encabezado
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            type={"header"}
            label={"N° de Tickect"}
            value={validateNull(data.ticketNumber)}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            type={"header"}
            label={"Código material"}
            value={validateNull(data.codigoSap)}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            type={"header"}
            label={"Tipo de solicitud"}
            value={validateNull(data.typeRequest)}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            type={"header"}
            label={"Estado"}
            value={validateNull(data.stateName)}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            type={"header"}
            label={"Solicitante"}
            value={validateNull(data.createdBy)}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            label={"Aprobador"}
            value={validateNull("")}
            type={"header"}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            label={"Fecha creación"}
            value={validateNull(data.dateCreated)}
            type={"header"}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            label={"Fecha actualización"}
            value={validateNull(data.lastModified)}
            type={"header"}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            label={"Modificado por"}
            value={validateNull(data.modifiedBy)}
            type={"header"}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <TextFieldDetail
            label={"Fecha de envío"}
            value={validateNull("")}
            type={"header"}
          />
        </Grid>
        <Grid item xs={3} className={"headerDetailContainer_item"}>
          <div className="buttonSeeHistory" onClick={handleClickHistory}>
            Ver histórico
          </div>
        </Grid>
      </Grid>
    </>
  );
};
