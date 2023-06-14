import React from "react";
import { Grid } from "@material-ui/core";
import { SelectCommon, TextFieldCommon } from "../../../../../../../../sharedComponents";
import { TYPE_VIA } from "../../../../../../constants";

const RuralAddress = ({
    classes, urbanAddress, UrbanAddressChange, didSubmitOneRural,
    didSubmitTwoRural, updateValue
}) => {
  return (
    <>
      <div className={classes.ctn_Urban}>
        <Grid>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"Carrera"}
              name={"complementOneRural"}
              classes={classes}
              value={urbanAddress.complementOneRural}
              selectOptions={TYPE_VIA}
              handleChange={UrbanAddressChange}
              required={didSubmitOneRural}
              disabled={false}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <TextFieldCommon
              label={"Esperanza"}
              name={"otherOneRural"}
              classes={classes}
              disabled={false}
              value={urbanAddress.otherOneRural.toUpperCase()}
              required={didSubmitOneRural}
              classes={classes}
              updateValue={updateValue}
              regex={/[^a-zA-Z^0-9^ñÑ]/g}
              isRegex={true}
              handleChange={UrbanAddressChange}
              maxLength={30}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"Carrera"}
              name={"complementTwoRural"}
              classes={classes}
              value={urbanAddress.complementTwoRural}
              selectOptions={TYPE_VIA}
              handleChange={UrbanAddressChange}
              required={false}
              disabled={false}
            />
          </span>
          <TextFieldCommon
            label={"Esperanza"}
            name={"otherTwoRural"}
            classes={classes}
            disabled={false}
            value={urbanAddress.otherTwoRural.toUpperCase()}
            required={didSubmitTwoRural}
            classes={classes}
            updateValue={updateValue}
            regex={/[^a-zA-Z^0-9^ñÑ]/g}
            isRegex={true}
            handleChange={UrbanAddressChange}
            maxLength={30}
          />
        </Grid>
      </div>
    </>
  );
};

export default RuralAddress;
