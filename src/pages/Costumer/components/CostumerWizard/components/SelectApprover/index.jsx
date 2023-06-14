import React from "react";
import { AutoCompleteCommon } from "../../../../../../sharedComponents";

const SelectApprover = ({
  list,
  item,
  label,
  name,
  handleOnChange,
  classes,
  required,
  isSecondItem,
  secondItem,
}) => {
  return (
    <>
      <div className={classes.ctnAutoComplete}>
        <AutoCompleteCommon
          list={list}
          item={item}
          label={label}
          name={name}
          isSecondItem={isSecondItem}
          secondItem={secondItem}
          required={required}
          handleOnChange={handleOnChange}
        />
      </div>
    </>
  );
};

export default SelectApprover;
