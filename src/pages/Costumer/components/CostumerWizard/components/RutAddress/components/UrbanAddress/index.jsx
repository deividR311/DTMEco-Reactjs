import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import {
  NumberTextField,
  SelectCommon,
  TextFieldCommon,
} from "../../../../../../../../sharedComponents";
import {
  BIS,
  LETTER_VIA,
  QUADRANT,
  TYPE_VIA,
} from "../../../../../../constants";

const UrbanAddress = ({
  classes,
  urbanAddress,
  UrbanAddressChange,
  updateValue,
  didSubmitUrban,
  didSubmitOne,
  didSubmitTwo
}) => {
  return (
    <>
      <div className={classes.ctn_Urban}>
        <Grid>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"Avenida calle"}
              name={"typeVia"}
              classes={classes}
              value={urbanAddress.typeVia}
              selectOptions={TYPE_VIA}
              handleChange={UrbanAddressChange}
              required={didSubmitUrban}
              disabled={false}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <TextFieldCommon
              label={"127"}
              name={"NameVia"}
              disabled={false}
              value={urbanAddress.NameVia}
              required={didSubmitUrban}
              classes={classes}
              handleChange={UrbanAddressChange}
              regex={/[^a-zA-Z^0-9^ñÑ]/g}
              isRegex={true}
              updateValue={updateValue}
              maxLength={30}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"A"}
              name={"letterVia"}
              classes={classes}
              value={urbanAddress.letterVia}
              selectOptions={LETTER_VIA}
              handleChange={UrbanAddressChange}
              required={false}
              disabled={false}
              saveName={true}
              otherStyle={true}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"Bis"}
              name={"prefix"}
              classes={classes}
              value={urbanAddress.prefix}
              selectOptions={BIS}
              handleChange={UrbanAddressChange}
              required={false}
              disabled={false}
              saveName={true}
              otherStyle={true}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"Norte"}
              name={"quadrant"}
              classes={classes}
              value={urbanAddress.quadrant}
              selectOptions={QUADRANT}
              handleChange={UrbanAddressChange}
              required={false}
              disabled={false}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <NumberTextField
              label={"13"}
              name={"numberViaGeneral"}
              value={urbanAddress.numberViaGeneral}
              handleChange={UrbanAddressChange}
              disabled={false}
              classes={classes}
              maxCharacterLength={3}
              required={didSubmitUrban}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"C"}
              name={"letterViaGeneral"}
              classes={classes}
              value={urbanAddress.letterViaGeneral}
              selectOptions={LETTER_VIA}
              handleChange={UrbanAddressChange}
              required={false}
              disabled={false}
              saveName={true}
              otherStyle={true}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"Bis"}
              name={"prefixBis"}
              classes={classes}
              value={urbanAddress.prefixBis}
              selectOptions={BIS}
              handleChange={UrbanAddressChange}
              required={false}
              disabled={false}
              saveName={true}
              otherStyle={true}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <NumberTextField
              label={"21"}
              name={"plateNumber"}
              value={urbanAddress.plateNumber}
              handleChange={UrbanAddressChange}
              disabled={false}
              classes={classes}
              maxCharacterLength={3}
              required={didSubmitUrban}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <SelectCommon
              label={"Carrera"}
              name={"complementOne"}
              classes={classes}
              value={urbanAddress.complementOne}
              selectOptions={TYPE_VIA}
              handleChange={UrbanAddressChange}
              required={false}
              disabled={false}
            />
          </span>
          <span className={classes.ctn_TypeVia}>
            <TextFieldCommon
              label={"Esperanza"}
              name={"otherOne"}
              classes={classes}
              disabled={false}
              value={urbanAddress.otherOne.toUpperCase()}
              required={didSubmitOne}
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
              name={"complementTwo"}
              classes={classes}
              value={urbanAddress.complementTwo}
              selectOptions={TYPE_VIA}
              handleChange={UrbanAddressChange}
              required={false}
              disabled={false}
            />
          </span>
          <TextFieldCommon
            label={"Esperanza"}
            name={"otherTwo"}
            classes={classes}
            disabled={false}
            value={urbanAddress.otherTwo.toUpperCase()}
            required={didSubmitTwo}
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

export default UrbanAddress;
