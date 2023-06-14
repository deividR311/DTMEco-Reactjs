import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useContext, useState } from "react";
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MultipleSelectChip = ({
  widthSelect = "200px",
  style = { minWidth: "400px"},
  disabled = false,
  handleInputs = {},
  showError = true,
  showEmpty = false,
  items = [],
  errors = [],
  required = false,
  label = "",
  withTooltip = false,
  name,
  placeholder = "Seleccione los procesos de negocio",
  propsSx={ display: 'flex', flexWrap: 'wrap', gap: 0.5 },
  styleInput,
  setRows,
  rows,
  values,
  rowId,
  setErrorlogisticCenterstoreList
}) => {
  const theme = useTheme();
  const [namesSelected, setNamesSelected] = React.useState([]);

  useEffect(() => {   
 
      let logisticCenterstoreList = values.logisticCenterstoreList;
      let center = logisticCenterstoreList.find(center => center.id === rowId);

      if (Object.keys(center.businnessProcessList).length !== 0) {
        setNamesSelected(center.businnessProcessList);
    }
  },[]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let logisticCenterstoreList = values.logisticCenterstoreList;
    let center = logisticCenterstoreList.find(center => center.id === rowId);
    center.businnessProcessList = typeof value === 'string' ? value.split(',') : value;

    setRows({
      ...values,
      logisticCenterstoreList: logisticCenterstoreList
    });

    setNamesSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    let _errors = [];
    rows.map((row)=>{      
      let error = {}; 
      
      if(row.businnessProcessList.length>0){
        error[row.id] = [];
      }else{
        error[row.id] = ["Este campo es requerido"];
      }
      
      _errors.push(error); 
    })
    
    setErrorlogisticCenterstoreList(_errors);
  };

  return (
    <div>
      <InputLabel
            required={required}
            error={showError ? errors.length > 0 : false}
            className="__labelSelect"
          >
            {label}
            {withTooltip && "tooltip"}
          </InputLabel>
      <FormControl             
            style={style}
            variant="outlined"
            disabled={disabled}
            error={showError ? errors.length > 0 : false}
            className={`formControl__Select_${widthSelect}`}>    
            {namesSelected.length ===0 && <InputLabel className="placeholderSelect">  {placeholder}</InputLabel>}
        <Select
          id="demo-multiple-chip"
          multiple
          name={name}
          value={namesSelected}
          onChange={handleChange}         
          renderValue={(selected) => (
            <Box sx={propsSx}>
              {selected.map((value) => (
                <Chip key={value} label={items.filter( e => e.id === value)[0].name} />
              ))}
            </Box>
          )}
          style={styleInput}
           MenuProps={MenuProps}
        >
              {items.length ? (
                items.map((data, index) => (
                  <MenuItem value={data.id} index={index} key={index}>
                    <Checkbox checked={namesSelected.indexOf(data.id) > -1} />
                    <ListItemText primary={data.name} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={""}>Sin datos</MenuItem>
              )}
        </Select>
        <FormHelperText className="__labelSelect">
              {errors.length > 0 ? errors[0] : ""}
            </FormHelperText>
      </FormControl>
    </div>
  );
}