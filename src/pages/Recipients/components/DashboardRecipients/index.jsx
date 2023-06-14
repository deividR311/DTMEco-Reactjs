import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Table } from "../../../../sharedComponents"
import { useStyles } from "../../../Costumer/styles";
import { RecipientsTitleTable, RecipientCellNames } from "../../constant";

const DashboardRecipient = () => {
  const classes = useStyles();
  const history = useHistory();
  const editUser = (item) => {
    history.push({
      pathname: '/Admin/Modificar',
      state: item
    });
  }
  const [wordFilter, setWordFilter] = useState({
    word: ''
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setWordFilter((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const redirectCreateUserForm = () => {
    history.push('/Admin/Crear');
  }

  return (
    <>
      <Table
        titles={RecipientsTitleTable}
        data={RecipientsTitleTable}
        isFiltered="true"
        cellNames={RecipientCellNames}
        classes={classes}
        editMethod={editUser}
        title={'Correo electrónico'}
        wordFilter={wordFilter}
        handleOnChange={handleOnChange}
        redirectCreateRegister={redirectCreateUserForm}
        btnLabel={'Nuevo destinatario'}
      />
    </>
  );
}

export default DashboardRecipient;