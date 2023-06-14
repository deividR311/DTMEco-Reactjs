import { useEffect, useState } from "react";
import { Checkbox, Grid } from "@material-ui/core";
import { TextFieldDetail } from "../TextFieldDetail";
import { TitlesDetail_DatosMaterial } from "../../constants";
import { AlertMessage, HelperDescriptionLong } from "../../../../widgets";

export const VersionModified = ({
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

  const showDataModified = (value) => {
    if (value !== null) return true;
    return false;
  };

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
          value={validateNull(`${data.shortDescriptionDesc}`)}
        />
      </Grid>
      <Grid item xs={12} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          label={TitlesDetail_DatosMaterial.longDesc}
          value={validateNull(
            hasValues
              ? showDataModified(data.dataModify.longDescriptionMds)
                ? data.dataModify.longDescriptionMds
                : data.dataMds.longDescription
              : ""
          )}
          type={"section"}
          modified={
            hasValues
              ? showDataModified(data.dataModify.longDescriptionMds)
              : false
          }
        />
      </Grid>
      <Grid item xs={12} className={"headerDetailContainer_item"}>
        <div className="check">
          <Checkbox
            disabled
            checked={hasValues ? data.dataModify.mailSupport : false}
          />
          Se envían soportes a correo
        </div>
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
          type={"section"}
          label={TitlesDetail_DatosMaterial.grArtInterno}
          value={validateNull(
            hasValues
              ? showDataModified(data.dataModify.groupInternalArticle)
                ? data.dataModify.groupInternalArticle
                : data.dataMds.groupInternalArticle
              : ""
          )}
          modified={
            hasValues
              ? showDataModified(data.dataModify.groupInternalArticle)
              : false
          }
        />
      </Grid>
      <Grid item xs={4} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          type={"section"}
          label={TitlesDetail_DatosMaterial.grArtExternal}
          value={validateNull(
            hasValues
              ? showDataModified(data.dataModify.groupExternalArticle)
                ? data.dataModify.groupExternalArticle
                : data.dataMds.groupExternalArticle
              : ""
          )}
          modified={
            hasValues
              ? showDataModified(data.dataModify.groupExternalArticle)
              : false
          }
        />
      </Grid>
      <Grid item xs={4} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          type={"section"}
          label={TitlesDetail_DatosMaterial.productHierar}
          value={validateNull(
            hasValues
              ? showDataModified(data.dataModify.hierarchyProducts)
                ? data.dataModify.hierarchyProducts
                : data.dataMds.hierarchyProducts
              : ""
          )}
          modified={
            hasValues
              ? showDataModified(data.dataModify.hierarchyProducts)
              : false
          }
        />
      </Grid>
      <Grid item xs={12} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          max={900}
          type={"section"}
          showCharacters={true}
          typeField={"textarea"}
          label={TitlesDetail_DatosMaterial.internalNote}
          value={validateNull(
            hasValues
              ? showDataModified(data.dataModify.internalNote)
                ? replaceNota(data.dataModify.internalNote)
                : replaceNota(data.dataMds.internalNote)
              : ""
          )}
          modified={
            hasValues ? showDataModified(data.dataModify.internalNote) : false
          }
        />
      </Grid>
      <Grid item xs={12} className={"headerDetailContainer_item"}>
        <TextFieldDetail
          label={TitlesDetail_DatosMaterial.observations}
          value={validateNull(hasValues ? data.dataModify.observations : "")}
          type={"section"}
          typeField={"textarea-observation"}
          showCharacters={true}
        />
      </Grid>
    </Grid>
  );
};
