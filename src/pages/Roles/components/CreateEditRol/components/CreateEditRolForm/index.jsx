import * as React from "react";
import { Grid } from "@material-ui/core";
import { TextFieldCommon, SelectCommon } from "../../../../../../sharedComponents";

const CreateEditRolForm = ({
  CreateRolesNames, disabled, rolData, required, classes,
  handleChange, allStates, allMasterData
}) => {

  const roleStates = allStates.filter((item) => item.id !== 3);

  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <TextFieldCommon
            label={CreateRolesNames.name}
            name={CreateRolesNames.dataName}
            disabled={disabled}
            value={rolData.name}
            required={required}
            classes={classes}
            handleChange={handleChange}
            maxLength={20}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectCommon
            label={CreateRolesNames.state}
            name={CreateRolesNames.dataStateId}
            classes={classes}
            value={rolData.stateId}
            selectOptions={roleStates}
            handleChange={handleChange}
            required={required}
            disabled={false}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectCommon
            label={CreateRolesNames.type}
            name={CreateRolesNames.dataMasterData}
            classes={classes}
            value={rolData.typeDmId}
            selectOptions={allMasterData}
            handleChange={handleChange}
            required={required}
            disabled={false}
          />
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateEditRolForm;
