import * as React from "react";
import { DataGrid, useGridState, GridApiContext, esES } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";

function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No hay datos mostrar
    </Stack>
  );
}
export default function DataGridList(
  { setRows, checkVisible = true, head, data, height = (15 * 100) / 2 - 100, width = "100%", border = "" }
) {
  const [valueCountPage, setCountPage] = React.useState(0);

  const CustomPagination = () => {
    GridApiContext.displayName = "GridApiContext";
    const apiRef = React.useContext(GridApiContext);
    const [state] = useGridState(apiRef);
    setCountPage(state.pagination.rowCount);

    return (
      <>
        <div style={{margin:"0 auto"}}>
          <Pagination
            color="primary"
            count={state.pagination.pageCount}
            page={state.pagination.page + 1}
            onChange={(event, value) => {
              return apiRef.current.setPage(value - 1);
            }}
          />
        </div>
        <div>
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
    <div style={{ height: height, width: width }} >
      <DataGrid
        style={{border:border}}
        autoPageSize={true}
        pagination={true}
        totalItems
        currentPage
        checkboxSelection={checkVisible}
        hideFooterSelectedRowCount
        rows={data}
        columns={head}
        pageSize={10}
        getCellClassName={(params) => { }}
        selectionModel={selectionModel}
        onSelectionModelChange={
          (newSelection) => {
            checkVisible && setSelectionModel(newSelection);
          }
        }
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
