import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { RenderIf } from "../RenderIf";

export const AlertMessage = ({
  width = "55%",
  type = "Danger" || "Warning",
}) => {
  let color = "";
  let classN = "";

  if (type === "Danger") {
    color = "#ff0000";
    classN = "DangerMod";
  }
  if (type === "Warning") {
    color = "#d68400";
    classN = "WarningMod";
  }

  return (
    <>
      <div className={`alertMod ${classN}`} style={{ width: width }}>
        <div className="iconAlertMod">
          <WarningAmberIcon sx={{ color: color }} />
        </div>

        <RenderIf isTrue={type === "Danger"}>
          <p className={`textAlertMod`}>
            Material en estado <strong>bloqueado</strong>, su solicitud quedará
            sujeta a revisión.
          </p>
        </RenderIf>
        <RenderIf isTrue={type === "Warning"}>
          <p className={`textAlertMod`}>
            Recuerde que para la modificación, este material tiene habilitadas
            las siguientes características en el orden indicado.
          </p>
        </RenderIf>
      </div>
    </>
  );
};
