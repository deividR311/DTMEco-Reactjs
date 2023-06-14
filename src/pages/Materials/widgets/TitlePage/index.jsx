
import { Grid } from "@material-ui/core";
import {TooltipCustom} from "../TooltipCustom"

export const TitlePage = ({
    tooltip = "",
    tittle = "",
}) => {


  return (
    <>
       <Grid item xs={12}>
          </Grid>

            <div style={{ display: "flex", justifyContent: "space-between", marginLeft:"20px" }}>
                <h2 style={{color: "#0e0c5a", display: "inline-block"}}>{tittle}</h2>
                <TooltipCustom
                    title={tooltip}
                    placement={"right"}
                    style={{
                      marginTop: "-2px",
                      display: "flex",
                    }}
                  />
              </div>
          <Grid item xs={12}>
          </Grid>
    </>
  );
};
