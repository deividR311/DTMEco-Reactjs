import * as React from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { MultipleSelectChip} from '../MultipleSelectChip'


function Row({row, titleSubColumns, handleDelete, disable, businessProcessList, setRows, rows, values, isRequired,ErrorlogisticCenterstoreList,setErrorlogisticCenterstoreList}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            
          >
            {open ? <KeyboardArrowUpIcon sx={{ color: '#0F0C5A' }} /> : <KeyboardArrowDownIcon sx={{ color: '#0F0C5A' }}/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.logisticCenter.split(' - ')[1]}
        </TableCell>
        <TableCell>{row.logisticCenter.split(' - ')[0]}</TableCell>
        <TableCell>{row.subrows.length}</TableCell>
        <TableCell><MultipleSelectChip items={businessProcessList} setRows={setRows} rowId={row.id} rows={rows} values ={values} required={isRequired} errors={ErrorlogisticCenterstoreList.length > 0 && ErrorlogisticCenterstoreList.find((el)=> el[row.id]) !== undefined ? ErrorlogisticCenterstoreList.find((el)=> el[row.id])[row.id] : isRequired === true ? ["Este campo es requerido"]:[]} name={`${row.id}.processBusiness`} setErrorlogisticCenterstoreList={setErrorlogisticCenterstoreList} /></TableCell>
      </TableRow>
      <TableRow  style={{ background: '#EFF4FD'  }}>
        <TableCell  colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead style={{ background: '#EFF4FD',  color: "#0F0C5A",
      fontWeight: "bold"  }}>
                  <TableRow >
                    <TableCell style={{ color: "#0F0C5A",
                         fontWeight: "bold"  }}>No</TableCell>
                    {titleSubColumns.map((titleSubColumn) => (
                        <TableCell style={{ color: "#0F0C5A",
                        fontWeight: "bold"  }}>{titleSubColumn}</TableCell>
                    ))}
                    {!disable && <TableCell style={{ color: "#0F0C5A",
                         fontWeight: "bold"  }}>Acciones</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody style={{ background: '#FFFFFF'  }}>
                  {row.subrows.map((subrow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{subrow.store.split(' - ')[1]}</TableCell>
                      <TableCell>{subrow.store.split(' - ')[0]}</TableCell>
                     {!disable && <TableCell>
                        <IconButton aria-label="close" onClick={() => handleDelete(row, subrow.id)}> 
                          <DeleteIcon style={{ color: "#9F9D9D" }} />
                        </IconButton>
                      </TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export const StorageLogisticCenter = ({
    titleColumns,
    titleSubColumns,
    rows,
    handleDelete,
    disable = false,
    businessProcessList = [],
    setRows,
    values,
    isRequired,
    ErrorlogisticCenterstoreList,
    setErrorlogisticCenterstoreList
}) => {

  React.useEffect(()=>{
    let errors = [];
    rows.map((row)=>{      
      let error = {}; 
      error[row.id] = isRequired===true && !(row.businnessProcessList.length>0) ? ["Este campo es requerido"] :  [];
      errors.push(error); 
    })
    setErrorlogisticCenterstoreList(errors);    
  },[rows])

  return (
    <TableContainer>
      <Table>
        <TableHead  style={{ background: '#5052A3', borderRadius: "10px"}}>
          <TableRow>
            <TableCell  style={{ color: "#FFFFFF", fontWeight: "bold"}}/>
            {titleColumns.map((titleColumn) => (
            <TableCell style={{ color: "#FFFFFF", fontWeight: "bold"}}>{titleColumn} </TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              <Row key={row.name} row={row} titleSubColumns={titleSubColumns} handleDelete= {handleDelete} disable= {disable} businessProcessList= {businessProcessList} setRows={setRows} rows={rows} values={values} isRequired={isRequired} ErrorlogisticCenterstoreList={ErrorlogisticCenterstoreList} setErrorlogisticCenterstoreList={setErrorlogisticCenterstoreList}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}