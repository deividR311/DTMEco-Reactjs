import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from "@material-ui/icons/Edit";
import AdminContext from '../../../../context/Administration/adminContext';
import { NavBreadCrumb, Table } from '../../../../sharedComponents';
import { adminTableTitles, adminCellNames } from '../../constant';
import { useStyles } from '../../styles';

const AdminListUsers = () => {
    const classes = useStyles();
    const adminContext = useContext(AdminContext);
    const { allUsers, loadAllUsers } = adminContext;
    const history = useHistory();
    const [wordFilter, setWordFilter] = useState({
        word: ''
    });
    let usersFiltered = [];
    const navBreadCrumbArray = [
        { path: '/', active: '', word: 'Inicio' },
        { path: '/Admin/Consultar', active: 'BreadCrumb__link--active', word: 'Listado de usuarios' }
    ];

    useEffect(() => {
        loadAllUsers();
    }, [])

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setWordFilter((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    if (wordFilter.word !== '') {
        usersFiltered = allUsers.filter( user => {
            return user.email.includes(wordFilter.word);
        });
    }

    const editUser = ( item ) => {
        history.push({
            pathname: '/Admin/Modificar',
            state: item
        });
    }

    const redirectCreateUserForm = () => {
        history.push('/Admin/Crear');
    }

    return (
        <>
            <NavBreadCrumb
                path={navBreadCrumbArray}
            />
            <h3 className="eco_titulo_tabla">Listado de usuarios</h3>
            <Table
                titles={ adminTableTitles }
                data={ usersFiltered.length > 0 ? usersFiltered : allUsers }
                isFiltered={ usersFiltered.length > 0 ? true : false }
                cellNames={ adminCellNames }
                classes={classes}
                editMethod={ editUser }
                title={'Correo electrónico'}
                wordFilter={wordFilter}
                handleOnChange={handleOnChange}
                redirectCreateRegister={redirectCreateUserForm}
                btnLabel={'Nuevo usuario'}
                Icon={() => (<EditIcon />)}
                enabledClass={classes.ctnEditIcon}
            />
        </>
    )
}

export default AdminListUsers;