import React, { useEffect } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import {
  SelectCommon,
  SnackBarCommon,
  TextFieldCommon,
} from "../../../../../../sharedComponents";
import { RuralAddress, UrbanAddress } from "./components";
import { useStyles } from "./styles";
import { useStylesHome } from "../../../../../home/styles";
import IconInfo from "../../../../../../assets/images/info.svg";

const RutAddress = ({
  classes,
  urbanAddress,
  UrbanAddressChange,
  setUrbanAddress,
  addressType,
  addressOnChange,
  didSubmitUrban,
  didSubmitOne,
  didSubmitTwo,
  specificErrorUrban,
  showAddress,
  setShowAddress,
  closeModalSnack,
  didSubmitRural,
  didSubmitTwoRural,
  specificErrorRural,
  closeRuralModalSnack,
}) => {
  const RutClasses = useStyles();
  const classesHome = useStylesHome();
  const urbanDescription = 'URBANO:  CL 17 10 16 OF 502 ';
  const ruralDescription = 'RURAL: VRD VILLA NUEVA  FCA TORCORAMA';
  const typeAddress = [
    { id: 1, name: "Rural" },
    { id: 2, name: "Urbana" },
  ];

  const updateValue = (name, value) => {
    setUrbanAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (addressType.id === 2) {
      setShowAddress(
        `${urbanAddress.typeVia} ${urbanAddress.NameVia} ${urbanAddress.letterVia} ${urbanAddress.prefix} ${urbanAddress.quadrant} ${urbanAddress.numberViaGeneral} ${urbanAddress.letterViaGeneral} ${urbanAddress.prefixBis} ${urbanAddress.plateNumber} ${urbanAddress.complementOne}${urbanAddress.otherOne} ${urbanAddress.complementTwo}${urbanAddress.otherTwo}`
      );
    } else {
      setShowAddress(
        `${urbanAddress.complementOneRural} ${urbanAddress.otherOneRural} ${urbanAddress.complementTwoRural} ${urbanAddress.otherTwoRural}`
      );
    }
  }, [urbanAddress]);

  return (
    <>
      <div className={classes.ctn_RutAddress}>
        <Grid>
          <SelectCommon
            label={"Tipo de dirección"}
            name={"id"}
            classes={classes}
            value={addressType.id}
            selectOptions={typeAddress}
            handleChange={addressOnChange}
            required={false}
            disabled={false}
          />
          <Tooltip title="Diligencie la dirección tal como está en el RUT.">
            <span>
              <img src={IconInfo} alt="IconInfo" />
            </span>
          </Tooltip>
        </Grid>
        <Grid>
          {addressType.id !== "" && (
            <>
              <Tooltip title={addressType.id === 2 ? urbanDescription : ruralDescription}>
                <span>
                  <img src={IconInfo} alt="IconInfo" />
                </span>
              </Tooltip>
              {addressType.id === 1 ? (
                <RuralAddress
                  classes={RutClasses}
                  urbanAddress={urbanAddress}
                  UrbanAddressChange={UrbanAddressChange}
                  didSubmitOneRural={didSubmitRural}
                  didSubmitTwoRural={didSubmitTwoRural}
                  updateValue={updateValue}
                />
              ) : (
                <UrbanAddress
                  classes={RutClasses}
                  urbanAddress={urbanAddress}
                  UrbanAddressChange={UrbanAddressChange}
                  updateValue={updateValue}
                  didSubmitUrban={didSubmitUrban}
                  didSubmitOne={didSubmitOne}
                  didSubmitTwo={didSubmitTwo}
                />
              )}
            </>
          )}
        </Grid>
        <Grid>
          <TextFieldCommon
            label={"Dirección"}
            name={""}
            disabled={true}
            value={showAddress.toUpperCase()}
            required={false}
            classes={classesHome}
            handleChange={() => {}}
          />
        </Grid>
      </div>
      <SnackBarCommon
        success={false}
        error={didSubmitUrban || didSubmitOne || didSubmitTwo}
        handleCloseSnack={closeModalSnack}
        successMessage={""}
        errorMessage={specificErrorUrban}
      />
      <SnackBarCommon
        success={false}
        error={didSubmitRural || didSubmitTwoRural}
        handleCloseSnack={closeRuralModalSnack}
        successMessage={""}
        errorMessage={specificErrorRural}
      />
    </>
  );
};

export default RutAddress;
