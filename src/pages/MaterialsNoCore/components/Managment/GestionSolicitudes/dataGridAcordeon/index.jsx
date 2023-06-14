import BodyRow from "./Body";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import EnhancedTableHead from "./Head";
import { makeStyles } from "@mui/styles";
import TableBody from "@mui/material/TableBody";
import { Grid, Pagination } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-root .MuiDataGrid-row:hover": {
      background: "#EDEEFF",
    },
    "& .acciones": {
      justifyContent: "center !important",
      minWidth: "18% !important",
      maxWidth: "18% !important",
    },
    "& .MuiDataGrid-root": {
      border: "none !important",
    },
    "& .Mui-selected": {
      color: "#fff !important",
      background: "#B4B8FF !important",
    },
    "& .rowColor": {
      background: "red",
    },
    "& .countPer": {
      marginLeft: "80%",
    },
  },
  positionDiv: {
    color: "#0E0C5A",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  bordes: {
    borderRadius: "7px",
  },
});

Array.prototype.orderByString = function (property, sortOrder, ignoreCase) {
  if (sortOrder != -1 && sortOrder != 1) sortOrder = 1;
  this.sort(function (a, b) {
    var stringA = a[property],
      stringB = b[property];
    // Si un valor es null o undefined, se convierte a cadena vacía.
    if (stringA == null) stringA = "";
    if (stringB == null) stringB = "";
    // Si ignoreCase es true, se convierten ambas variables a minúsculas.
    if (ignoreCase == true) {
      stringA = stringA.toLowerCase();
      stringB = stringB.toLowerCase();
    }
    var res = 0;
    if (stringA < stringB) res = -1;
    else if (stringA > stringB) res = 1;
    return res * sortOrder;
  });
};

function descendingComparator(a, b, orderBy) {
  switch (orderBy) {
    case "approverByName":
      orderBy = "dateCreatedFormat";
      break;
    case "aprobador":
      orderBy = "approverByName";
      break;
    case "numMaterial":
      orderBy = "materialNumber";
      break;
    case "state":
      orderBy = "stateId";
      break;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, orderBy) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (orderBy === "aprobador") {
    stabilizedThis.orderByString("approverByName");
  }
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[0] - b[0];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DataGridAcordeon(head, data, selectionRows) {
  const classes = useStyles();
  const dataCount = head.data.length;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState();
  const [selected, setSelected] = useState([]);
  const [rowSelect, setRowSelect] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [getNumberPage, setNumberPage] = useState(0);
  const [useSelectedRow, setUseSelectedRow] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = head.data.map((n) => {
        return n.id;
      });
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  useEffect(() => {
    let countPage = 0;
    let per = Math.floor(head.data.length / 10);
    if (head.data.length / 10 > per) {
      countPage = Math.floor(head.data.length / 10) + 1;
      if (head.data.length <= 10) {
        countPage = 1;
      }
      setPage(0);
    } else {
      setPage(0);
      countPage = Math.floor(head.data.length / 10);
    }
    setNumberPage(countPage);
  }, [head.data]);

  useEffect(() => {
    if (rowSelect.length > 0) {
      const duplicateIndex = rowSelect.indexOf(data);
      if (duplicateIndex < 0) {
      } else {
        rowSelect.splice(duplicateIndex, 1);
      }
      head.selectionRows(rowSelect);
    }
  }, [rowSelect]);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} className={classes.root}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={head.data.length}
              head={head}
            />
            <TableBody>
              {stableSort(head.data, getComparator(order, orderBy), orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <BodyRow
                      isAdmin={head.isAdmin}
                      key={row.id}
                      onChange={head.handleOnchange}
                      row={row}
                      index={row.id}
                      currentUser={head.currentUser}
                      isCatolagador={head.isCatolagador}
                      checkedAll={
                        selected.length === head.data.length ? true : false
                      }
                      handleCatalogardor={head.handleCatalogardor}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Pagination
          className="stylePagination"
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              display: "flex",
              border: "none",
            }}
            color="primary"
            count={getNumberPage}
            page={page + 1}
            onChange={handleChangePage}
            setRowsPerPage={1}
          />
        </Grid>
        <Grid item xs={4}>
          <div className={classes.positionDiv}>
            {dataCount < rowsPerPage
              ? dataCount
              : rowsPerPage * (page + 1) > dataCount
              ? dataCount
              : rowsPerPage * (page + 1)}{" "}
            de {dataCount}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
