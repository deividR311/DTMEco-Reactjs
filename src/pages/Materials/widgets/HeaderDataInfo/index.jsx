import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

export const HeaderDataInfo = ({
    typeCompany = "",
    materialType = "",
    materialName = ""
}) => {


  return (
    <>
        <div style={{background: "#ebebeb", padding: "10px"}}>
          <div className="">
            <Grid container spacing={12} style= {{textAlign: "center"}}>
                <Grid item xs={4} >
                    
                        <p style={{ display: "inline", color: "#0e0c5a", fontWeight: "bold"}}>
                        {"Empresa: "}
                        </p>
                        <p style={{ display: "inline"}}>
                            {typeCompany === "R" && "REFICAR"} 
                            {typeCompany === "E" && "ECOPETROL"} 
                            {typeCompany === "" && "Sin información"} 
                        </p>
                </Grid>
                <Grid item xs={4}>
                    <p style={{ display: "inline", color: "#0e0c5a", fontWeight: "bold"}}>
                        {"Tipo de Material: "}
                    </p>
                    <p style={{ display: "inline"}}>
                        {materialType === "" ? "Sin información": materialType.split('_')[0]}
                    </p>
                </Grid>
                <Grid item xs={4}>
                    <p style={{ display: "inline", color: "#0e0c5a", fontWeight: "bold"}}>
                        {"Nombre de material: "}
                    </p>
                    <p style={{ display: "inline"}}>
                        {materialName === ""? "Sin información" : materialName}
                    </p>
                </Grid>
            </Grid>
          </div>
        </div>
    </>
  );
};
