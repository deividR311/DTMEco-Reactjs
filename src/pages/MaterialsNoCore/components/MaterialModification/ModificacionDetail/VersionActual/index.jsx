import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { TextFieldDetail } from "../TextFieldDetail";
import { TitlesDetail_DatosMaterial } from "../../constants";
import { AlertMessage, HelperDescriptionLong } from "../../../../widgets";

export const VersionActual = ({
  data,
  replaceNota,
  validateNull,
  helperDescriptionLong,
}) => {
  const [hasValues, setHasValues] = useState(false);

  useEffect(() => {
    if (Object.entries(data).length > 0) {
      setHasValues(true);
    }
  }, [data]);

  return (
    <Grid container className="headerDetailContainer">
      {data.statusMaterial !== "" && (
        <Grid item xs={12} className={"headerDetailContainer_item"}>
          <AlertMessage type={"Danger"} width={"50%"} />
        </Grid>
      )}
      <Grid item xs={4} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          type={"section"}
          value={validateNull(data.typeRequest)}
          label={TitlesDetail_DatosMaterial.typeResquest}
        />
      </Grid>
      <Grid item xs={4} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          type={"section"}
          value={validateNull(data.typeMaterials)}
          label={TitlesDetail_DatosMaterial.typeMaterial}
        />
      </Grid>
      <Grid item xs={4} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          type={"section"}
          value={validateNull(data.statusMaterial)}
          label={TitlesDetail_DatosMaterial.statusMateril}
        />
      </Grid>
      <Grid item xs={12} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          type={"section"}
          label={TitlesDetail_DatosMaterial.shortDesc}
          value={validateNull(data.shortDescriptionDesc)}
        />
      </Grid>
      <Grid item xs={12} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          label={TitlesDetail_DatosMaterial.longDesc}
          value={validateNull(hasValues ? data.dataMds.longDescription : "")}
          type={"section"}
        />
      </Grid>
      <Grid item xs={12} className={"headerDetailContainer_item"}>
        <AlertMessage width={"80%"} type={"Warning"} />
      </Grid>
      {helperDescriptionLong.length > 0 && (
        <Grid item xs={12} className={"headerDetailContainer_item"}>
          <HelperDescriptionLong
            helperDescriptionLong={helperDescriptionLong}
          />
        </Grid>
      )}
      <Grid item xs={4} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          label={TitlesDetail_DatosMaterial.grArtInterno}
          value={validateNull(
            hasValues ? data.dataMds.groupInternalArticle : ""
          )}
          type={"section"}
        />
      </Grid>
      <Grid item xs={4} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          label={TitlesDetail_DatosMaterial.grArtExternal}
          value={validateNull(
            hasValues ? data.dataMds.groupExternalArticle : ""
          )}
          type={"section"}
        />
      </Grid>
      <Grid item xs={4} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          label={TitlesDetail_DatosMaterial.productHierar}
          value={validateNull(hasValues ? data.dataMds.hierarchyProducts : "")}
          type={"section"}
        />
      </Grid>
      <Grid item xs={12} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          label={TitlesDetail_DatosMaterial.internalNote}
          value={validateNull(
            hasValues ? replaceNota(data.dataMds.internalNote) : ""
          )}
          type={"section"}
          typeField={"textarea"}
          max={900}
          showCharacters={true}
        />
      </Grid>
    </Grid>
  );
};
