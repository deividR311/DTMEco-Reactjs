import * as React from "react";
import { Button } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { useState, useEffect, useCallback } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export const TableContact = ({
  items,
  errors,
  titleTable,
  handleValues,
  functionList,
  setContactInfo,
  handleClickOpen,
}) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const handleDelete = (item) => {
    const opcion = window.confirm("¿Seguro que desea eliminar este contacto?");
    if (opcion) {
      const List = items;
      List.splice(item, 1);
      handleValues(List);
      setContactInfo(List);
      forceUpdate();
    }
  };

  const showFunction = (item) => {
    if (functionList !== undefined) {
      if (functionList.length) {
        const value = functionList.filter((data) => data.id === item);
        if (value.length) {
          return value[0].name;
        }
      }
    }
  };

  return (
    <>
      <div className="containterTableContact">
        <div className="headerTableContact">
          <h5>{titleTable}</h5>
          <Button
            title={"Agregar contacto"}
            className={`btnAddContact`}
            onClick={handleClickOpen}
          >
            <PersonAddIcon />
          </Button>
        </div>
        <div
          className={`containerTable ${errors.length > 0 && "validateError"}`}
        >
          <table className="table">
            <thead className="table__header ">
              <tr>
                <th scope="col">Nombre completo</th>
                <th scope="col">Identificación</th>
                <th scope="col">Función</th>
                <th scope="col" style={{ width: "30px" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((element, i) => (
                <tr key={i}>
                  <td>{element.Name}</td>
                  <td>
                    {element.FirstName
                      ? element.FirstName
                      : "Sin identificación"}
                  </td>
                  <td>{showFunction(element.Function)}</td>
                  <td style={{ textAlign: "center" }}>
                    <div
                      title="Eliminar contacto"
                      className="btnDeleteContact"
                      onClick={() => {
                        handleDelete(i);
                      }}
                    >
                      <DeleteForeverIcon />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="WithoutContact">No hay contactos asignados</div>
          )}
        </div>
        <FormHelperText
          className="__labelSelectCustom"
          error={errors.length > 0}
        >
          {errors.length > 0 ? errors[0] : ""}
        </FormHelperText>
      </div>
    </>
  );
};
