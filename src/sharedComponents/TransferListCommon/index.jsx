import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { PermissionsButtons, PermissionsCustomList } from "./components";
import { intersection, not } from "../constants";

const TransferListCommon = ({
  handleAssignPermissions,
  medium,
  transferListTitles,
  classes,
  allOptions,
  allEditOptions,
}) => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setLeft(allOptions);
  }, []);

  useEffect(() => {
    if (medium === "editar") {
      setRight(allEditOptions);
    }
  }, []);

  useEffect(() => {
    handleAssignPermissions(right);
  }, [right]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <PermissionsCustomList
      handleToggle={handleToggle}
      items={items}
      classes={classes}
      checked={checked}
    />
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <h6 className={classes.titleList}>{transferListTitles.firstTitle}</h6>
        <Paper className={classes.paper}>{customList(left)}</Paper>
      </Grid>
      <Grid item>
        <PermissionsButtons
          classes={classes}
          handleAllRight={handleAllRight}
          left={left}
          handleCheckedRight={handleCheckedRight}
          leftChecked={leftChecked}
          handleCheckedLeft={handleCheckedLeft}
          handleAllLeft={handleAllLeft}
          right={right}
          rightChecked={rightChecked}
        />
      </Grid>
      <Grid item>
        <h6 className={classes.titleList}>{transferListTitles.secondTitle}</h6>
        <Paper className={classes.paper}>{customList(right)}</Paper>
      </Grid>
    </Grid>
  );
};

export default TransferListCommon;
