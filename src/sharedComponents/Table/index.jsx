import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Paginator, SearchTable } from "./components";

const Table = ({
  titles,
  data,
  cellNames,
  isFiltered,
  editMethod,
  title,
  wordFilter,
  handleOnChange,
  redirectCreateRegister,
  btnLabel,
  alternativeCellName,
  otherMethod,
  classes,
  nameRow,
  value,
  secondValue,
  isApprover = false,
  Icon,
  Icon2,
  Icon3,
  threeValue,
  fourValue,
  AlternativeIcon,
  alternativeMethod,
  disabledClass,
  enabledClass,
  isJson,
  nivel2 = false,
  valueNivel2 = 0,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [idsLi, setIdsLi] = useState([]);
  const totalUserNumber = data.length;
  const pageNumbers = [];
  let li = null;
  let Previousli = null;

  for (let i = 1; i <= Math.ceil(totalUserNumber / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const tableCell = (item) =>
    cellNames.map((nameItem) => (
      <td key={nameItem}>
        {item[nameItem] !== "" ? item[nameItem] : item[alternativeCellName]}
      </td>
    ));

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = data.slice(indexOfFirstPost, indexOfLastPost);
  let filterOrPaginator = isFiltered ? data : currentItems;
  const [ordeByPaginator, setOrdeByPaginator] = useState([]);
  const [clickOrderOderBy, setClickOderBy] = useState(false);
  const headTable = [
    "name",
    "lastName",
    "email",
    "state",
    "dateCreated",
    "lastModified",
  ];

  const paginate = (number) => {
    setClickOderBy(false);
    setCurrentPage(number);
    setIdsLi((prevState) => [...prevState, number]);
    li = document.getElementById(number);
    Previousli = document.getElementById(idsLi[idsLi.length - 1]);
    li.click(li.classList.add(`table__paginator`));
    if (Previousli !== null) {
      Previousli.classList.remove(`table__paginator`);
    }
  };

  const ordeBy = (item) => {
    if (clickOrderOderBy === true) {
      setClickOderBy(false);
      setOrdeByPaginator(filterOrPaginator);
    } else {
      filterOrPaginator.sort((a, b) => {
        let headValue = item.target.textContent;
        let storeData = titles.findIndex(
          (element) => element.title === `${headValue}`
        );
        if (a[headTable[storeData]] > b[headTable[storeData]]) {
          return 1;
        }
        if (a[headTable[storeData]] < b[headTable[storeData]]) {
          return -1;
        }
        return 0;
      });
      setOrdeByPaginator(filterOrPaginator);
      setClickOderBy(true);
    }
  };

  const dataFilter = (item) => {
    let locaOrderBy = [];
    if (item) {
      locaOrderBy = ordeByPaginator;
    } else {
      locaOrderBy = filterOrPaginator;
    }
    return (
      <>
        {locaOrderBy.map((item, index) => (
          <tr key={index}>
            {tableCell(item)}
            {isJson ? (
              <>
                <td>
                  <div
                    className={
                      item[nameRow] === value ||
                      item[nameRow] === secondValue ||
                      item[nameRow] === threeValue
                        ? enabledClass
                        : disabledClass
                    }
                    onClick={
                      item[nameRow] === value ||
                      item[nameRow] === secondValue ||
                      item[nameRow] === threeValue
                        ? () => otherMethod(item)
                        : () => {}
                    }
                  >
                    <Icon2 />
                  </div>
                </td>
                <td>
                  <div
                    className={
                      item[nameRow] === secondValue ||
                      item[nameRow] === threeValue
                        ? enabledClass
                        : disabledClass
                    }
                    onClick={
                      item[nameRow] === secondValue ||
                      item[nameRow] === threeValue
                        ? () => alternativeMethod(item)
                        : () => {}
                    }
                  >
                    <AlternativeIcon />
                  </div>
                </td>
                <td>
                  <div
                    className={
                      item[nameRow] === value ||
                      item[nameRow] === secondValue ||
                      item[nameRow] === threeValue
                        ? enabledClass
                        : disabledClass
                    }
                    onClick={
                      item[nameRow] === value ||
                      item[nameRow] === secondValue ||
                      item[nameRow] === threeValue
                        ? () => editMethod(item)
                        : () => {}
                    }
                  >
                    <Icon />
                  </div>
                </td>
              </>
            ) : (
              <td>
                {nivel2 ? (
                  <div
                    className={
                      isApprover &&
                      (item[nameRow] === valueNivel2
                        ? enabledClass
                        : disabledClass)
                    }
                    onClick={
                      isApprover &&
                      (item[nameRow] === valueNivel2
                        ? () => editMethod(item)
                        : () => {})
                    }
                  >
                    <Icon />
                  </div>
                ) : (
                  <div
                    className={
                      isApprover && item[nameRow] === fourValue
                        ? disabledClass
                        : enabledClass
                    }
                    onClick={
                      isApprover && item[nameRow] === fourValue
                        ? () => {}
                        : () => editMethod(item)
                    }
                  >
                    <Icon />
                  </div>
                )}
              </td>
            )}
          </tr>
        ))}
      </>
    );
  };
  return (
    <>
      <SearchTable
        title={title}
        wordFilter={wordFilter}
        handleOnChange={handleOnChange}
        redirectCreateRegister={redirectCreateRegister}
        btnLabel={btnLabel}
        isApprover={isApprover}
      />
      <table className="table table-striped">
        <thead className="table__header">
          <tr>
            {titles.length > 0 &&
              titles.map((item, index) => (
                <th
                  scope="col"
                  key={index}
                  onClick={ordeBy}
                  className="alingImg"
                >
                  {item.title}
                  {clickOrderOderBy ? <ArrowDropUp /> : <ArrowDropDown />}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            <>{dataFilter(clickOrderOderBy)}</>
          ) : (
            <div className={classes.ctnCharningInfo}>
              <strong>No hay información...</strong>
            </div>
          )}
        </tbody>
      </table>
      <div className="table__ctnPaginator">
        {pageNumbers.length > 0 && (
          <Paginator
            pageNumbers={pageNumbers}
            paginate={paginate}
            setClickOderBy={setClickOderBy}
          />
        )}
      </div>
    </>
  );
};

export default Table;
