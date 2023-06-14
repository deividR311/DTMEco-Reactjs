import * as React from 'react';
import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from '@mui/material';

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MultipleSelectCheckmarks = ({
  label,
  name,
  items,
  width,
  onChange,
  placeholder
}) => {
  const [values, setValues] = React.useState([]);

  const handleChange = (event) => {
    const { value } = event.target
    setValues( typeof value === 'string' ? value.split(',') : value )
    onChange(value)
  };

  return (
    <div>
      <InputLabel style={{marginTop:-3, marginBottom:3, fontWeight:'bold'}}>{label}</InputLabel>
      <FormControl sx={{ width: width }}>
        <Select
          multiple
          value={values}
          onChange={handleChange}
          displayEmpty={true}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <InputLabel style={{fontSize:"14px"}}>{placeholder}</InputLabel>;
            }
            return <InputLabel style={{fontSize:"14px"}}>
              <span style={{borderRadius:"50%", fontSize:"12px", backgroundColor:'lightGray', marginRight:"4px", paddingTop:"2.5px", paddingBottom:"2.5px", paddingInline:"6px"}}>
                {values.length}
              </span>
              {selected.join(', ')}
            </InputLabel>
          }}
          style={{ height:40 }}
          MenuProps={MenuProps}
        >
          {items.map((value) => (
            <MenuItem key={value.id} value={value.name}>
              <Checkbox checked={values?.indexOf(value.name) > -1} />
              <ListItemText primary={value.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

MultipleSelectCheckmarks.defaultProps = {
  placeholder: "Seleccionar",
};