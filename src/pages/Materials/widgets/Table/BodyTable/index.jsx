import React, { useState } from "react";
import { Paginator } from "../Paginator";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

let li = null;
let Previousli = null;

export const BodyTable = ({
  data,
  titles,
  cellNames,
  Filtered,
  showDetail,
  isEditable,
  handleEdit,
  handleDetail,
  currentUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [idsLi, setIdsLi] = useState([]);
  const totalUserNumber = data.length;
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = data.slice(indexOfFirstPost, indexOfLastPost);
  const filterOrPaginator = currentItems;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUserNumber / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const tableCell = (item) =>
    cellNames.map((nameRow) => {
      return (
        <>
          {nameRow === "stateName" ? (
            <td key={nameRow} className="itemState">
              <div className="stateStyled" style={colorState(item[nameRow])}>
                {item[nameRow]}
              </div>
            </td>
          ) : nameRow === "userName" ? (
            <td key={nameRow}>{userName(item[nameRow])}</td>
          ) : nameRow === "lastModifiedFormat" ? (
            <td key={nameRow} className="itemDateModified">
              {item[nameRow] ? item[nameRow] : item["dateCreatedFormat"]}
            </td>
          ) : (
            <td key={nameRow}>{item[nameRow]}</td>
          )}
        </>
      );
    });

  const colorState = (state) => {
    if (state === "Aprobado") {
      return { backgroundColor: "#02A24E" };
    }
    if (state === "Rechazado") {
      return { backgroundColor: "#FF2622" };
    }
    if (state === "Pendiente aprobación") {
      return { backgroundColor: "#E5C215", color: "black" };
    }
    if (state === "Devuelto") {
      return { backgroundColor: "#D8D8D8", color: "black" };
    }
  };

  const userName = (name) => {
    const nameSplit = name.split(" ");
    if (nameSplit.length > 3) {
      nameSplit.pop();
      const returnName = nameSplit[0] + " " + nameSplit[1] + " " + nameSplit[2];
      return returnName;
    } else {
      return name;
    }
  };

  const paginate = (number) => {
    setCurrentPage(number);

    setIdsLi((prevState) => [...prevState, number]);
    li = document.getElementById(number);
    Previousli = document.getElementById(idsLi[idsLi.length - 1]);
    li.click(li.classList.add(`table__paginator`));
    if (Previousli !== null) {
      Previousli.classList.remove(`table__paginator`);
    }
  };
  return (
    <>
      <table className="table table-striped">
        <thead className="table__header">
          <tr>
            {titles.length > 0 &&
              titles.map((item, index) => (
                <th scope="col" key={index}>
                  {item.title}
                </th>
              ))}
          </tr>
        </thead>
        {data.length > 0 && (
          <tbody>
            {filterOrPaginator.map((item, index) => (
              <tr key={index} className="rowTable">
                {tableCell(item)}
                <td>
                  <div className="ContainerActions">
                    {showDetail && (
                      <div
                        className={"ItemActions__simple"}
                        onClick={() => {
                          handleDetail(item);
                        }}
                        title="Ver detalle"
                      >
                        <VisibilityIcon />
                      </div>
                    )}
                    {isEditable &&
                      (item.stateId == 4 ? (
                        item.createdBy === currentUser ? (
                          <div
                            className="ItemActions__simple"
                            onClick={() => handleEdit(item)}
                            title="Modificar"
                          >
                            <EditIcon />
                          </div>
                        ) : (
                          <div
                            className="disableItem"
                            title="Solo se puede editar por el usuario que realizó la solicitud"
                          >
                            <EditIcon />
                          </div>
                        )
                      ) : (
                        <div
                          className="disableItem"
                          title="Solo se puede editar en estado Devuelto"
                        >
                          <EditIcon />
                        </div>
                      ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {Filtered
        ? data.length === 0 && (
            <div className="noDataMaterial">No hay coincidencias</div>
          )
        : data.length === 0 && <div className="noDataMaterial">Sin datos</div>}
      <div className="table__ctnPaginator">
        {pageNumbers.length > 0 && (
          <Paginator pageNumbers={pageNumbers} paginate={paginate} />
        )}
      </div>
    </>
  );
};

BodyTable.defaultProps = {
  data: [],
  title: [],
  cellNames: [],
  showDetail: true,
  isEditable: true,
};
