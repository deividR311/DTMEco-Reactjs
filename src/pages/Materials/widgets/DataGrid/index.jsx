import * as React from "react";
import { DataGrid, useGridState, GridApiContext, esES } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";

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
      color: "#0E0C5A !important",
      background: "#B4B8FF !important",
    },
    "& .rowColor": {
      background: "red",
    },
    "& .countPer": {
      marginLeft: "80%",
    },
  },
});

const stylePagination = makeStyles({
  root: {
    "& .Mui-selected": {
      color: "#fff !important",
      background: "#0E0C5A  !important",
    },
    "& .MuiCheckbox-root": {
      color: "#0E0C5A !important",
    },
  },
  positionDiv: {
    position: "absolute !important",
    right: "10px !important",
    color: "#0E0C5A",
  },
});
function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No hay datos mostrar
    </Stack>
  );
}
export default function DataGridList({
  setRows,
  checkVisible = true,
  head,
  data,
  height = (15 * 100) / 2 - 100,
  width = "100%",
}) {
  const [valueCountPage, setCountPage] = React.useState(0);
  const classes = useStyles();

  const CustomPagination = () => {
    GridApiContext.displayName = "GridApiContext";
    const apiRef = React.useContext(GridApiContext);
    const [state] = useGridState(apiRef);
    setCountPage(state.pagination.rowCount);
    const classes = stylePagination();

    return (
      <>
        <Pagination
          className={classes.root}
          color="primary"
          count={state.pagination.pageCount}
          page={state.pagination.page + 1}
          onChange={(event, value) => {
            return apiRef.current.setPage(value - 1);
          }}
        />
        <div className={classes.positionDiv}>
          {state.pagination.rowCount < state.pagination.pageSize
            ? state.pagination.rowCount
            : state.pagination.pageSize * (state.pagination.page + 1) >
              state.pagination.rowCount
            ? state.pagination.rowCount
            : state.pagination.pageSize * (state.pagination.page + 1)}{" "}
          de {state.pagination.rowCount}
        </div>
      </>
    );
  };

  const translate = esES.components.MuiDataGrid.defaultProps.localeText;
  const preSelectedRows = [];
  const [selectionModel, setSelectionModel] = useState(preSelectedRows);

  useEffect(() => {
    setRows(selectionModel);
  }, [selectionModel]);

  const [disabledCheck, setDisabledCheck] = useState([]);
  useEffect(() => {
    const values = data.filter((value) => {
      return value.stateName === "Borrador";
    });
    setDisabledCheck(values);
  }, [data]);
  return (
    <div style={{ height: height, width: width }} className={classes.root}>
      <DataGrid
        autoPageSize={true}
        pagination={true}
        totalItems
        currentPage
        checkboxSelection={checkVisible}
        hideFooterSelectedRowCount
        rows={data}
        columns={head}
        pageSize={10}
        getCellClassName={(params) => {}}
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelection) => {
          checkVisible && setSelectionModel(newSelection);
        }}
        components={{
          Pagination: CustomPagination,
          localeText: {
            translate,
          },
          NoRowsOverlay: () => {
            return (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No hay datos a mostrar.
              </Stack>
            );
          },
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} rows `
              : `${count.toLocaleString()} row `,
        }}
      />
      <br />
    </div>
  );
}
