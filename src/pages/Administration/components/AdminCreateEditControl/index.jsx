import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import AdminContext from '../../../../context/Administration/adminContext';
import HeaderContext from '../../../../context/Header/headerContext';
import { adminCreateUserNames, transferListTitles } from '../../constant';
import { AdminCreateEditUser } from './components';
import { useStyles } from '../../styles';

const AdminCreateEditControl = ({ match, location }) => {
    const classes = useStyles();
    const history = useHistory();
    const adminContext = useContext(AdminContext);
    const { allRoles, allUserStates, loadAllUserStates, loadAllRoles,
    createUserFailed, userId, createUser, assignRolesSuccess, ErrorMessage, clearcreateUserFailed,
    assignRolesFailed, UserAssignRoles, clearUserAssignRolesSuccess, clearUserAssignRolesFailed,
    clearcreateUsersuccess, editUserSuccess, editUserFailed, editUser, cleareditUserFailed,
    cleareditUsersuccess, createUserSuccess } = adminContext;
    const headerContext = useContext(HeaderContext);
    const { headerModuleUserPermissions } = headerContext;
    const { responseData } = headerModuleUserPermissions;
    const [didSubmit, setDidSubmit] = useState(false);
    const [specificError, setSpecificError] = useState(false);
    const [messageSpecificError, setMessageSpecificError] = useState('');
    const [userPermissions, setUserPermissions] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [validateEmail, setvalidateEmail] = useState(false);
    const [dataUser, setDataUser] = useState({
        id: 0,
        email: '',
        name: '',
        lastName: '',
        stateId: '',
        registrationCode: '',
        createdBy: 0,
        modifiedBy: 0
    });    

    const [assignRoles, setAssignRoles] = useState({
        userId: '',
        groups: [],
        stateId: '',
        modifiedBy: 0
      });
    let isValidate = false;
    const array = [];
    const { state } = location;

    useEffect(() => {
        loadAllUserStates();
        loadAllRoles();
    }, [])

    useEffect(() => {
        if(state !== undefined && responseData !== undefined) {
            setDataUser({
                id: state.id,
                email: state.email,
                name: state.name,
                lastName: state.lastName,
                stateId: state.state,
                registrationCode: state.registrationCode,
                createdBy: state.createdBy,
                modifiedBy: responseData[0].userId
            })

            setAssignRoles({
                userId: state.id,
                groups: userRoles,
                stateId: state.state,
                modifiedBy: responseData[0].userId
            })
        }
    }, [responseData])

    useEffect(() => {
        setAssignRoles((prevState) => ({
            ...prevState,
            stateId: dataUser.stateId
        }))
    }, [dataUser])

    useEffect(() => {
        if(userId !== '') {
            setAssignRoles((prevState) => ({
                ...prevState,
                userId: userId
            }))
        }
    }, [userId])

    useEffect(() => {
        if(userRoles.length > 0) {
            setAssignRoles((prevState) => ({
                ...prevState,
                groups: userRoles
            }))
        } else {
            setAssignRoles((prevState) => ({
                ...prevState,
                groups: []
            }))
        }
    }, [userRoles])

    useEffect(() => {
        if(assignRoles.userId !== '' && match.path !== '/Admin/Modificar') {
            UserAssignRoles(assignRoles);
        }
    }, [assignRoles])

    useEffect(() => {        
        if(userPermissions.length > 0) {
            for (let i = 0; i < userPermissions.length; i++) {
                array.push(userPermissions[i].id)
                setUserRoles(array);     
            }
        } else {
            setUserRoles([]);
        }
    }, [userPermissions])

    useEffect(() => {
        if (responseData !== undefined) {
            setDataUser((prevState) => ({
                ...prevState,
                createdBy : responseData[0].userId
            }))
        }
    }, [responseData])

    const handleCloseSnack = () => {
        setSpecificError(false);
        clearUserAssignRolesSuccess();
        clearUserAssignRolesFailed();
        clearcreateUserFailed();
        clearcreateUsersuccess();
    }

    const handleAssignPermissions = ( permissions ) => {
        setUserPermissions(permissions)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setDataUser((prevState) => ({
        ...prevState,
        [name] : value
        }))
    }

    const regexEmailOnChange = (name, value, isEmail) => {
        setvalidateEmail(isEmail);
        setDataUser((prevState) => ({
        ...prevState,
        [name] : value
        }))
    }

    const updateValue = (name, value) => {
        setDataUser((prevState) => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleValidations = () => {
        setMessageSpecificError('');
        setDidSubmit(true);
        setSpecificError(false);

        if(dataUser.email === '' || dataUser.name === '' || dataUser.lastName === '' ||
        dataUser.stateId === '' || dataUser.registrationCode === ''
        ) {
        isValidate = true;
        setSpecificError(true);
        setMessageSpecificError('Hay campos requeridos sin diligenciar');
        }

        if (userPermissions.length === 0) {
        isValidate = true;
        setSpecificError(true);
        setMessageSpecificError('Debes asignar al menos un rol para el usuario');
        }

        if (!validateEmail) {
            isValidate = true;
            setSpecificError(true);
            setMessageSpecificError('El correo electrónico es invalido');
        }

        if (dataUser.registrationCode.length < 8) {
            isValidate = true;
            setSpecificError(true);
            setMessageSpecificError('El Registro Ecopetrol debe ser de 8 caracteres');
        }

        if (!isValidate) {
            if(match.path === '/Admin/Modificar') {
                editUser(dataUser);
            } else {
                createUser(dataUser);
            }  
        }
    };

    useEffect(() => {
        if(editUserSuccess) {
            UserAssignRoles(assignRoles);
        }
    }, [editUserSuccess])

    if(assignRolesSuccess) {
        if(editUserSuccess) {
            setTimeout(() => {
                history.push('/Admin/Consultar');
                clearUserAssignRolesSuccess();
                clearUserAssignRolesFailed();
                cleareditUserFailed();
                cleareditUsersuccess();
            }, 2000);
        }

        if(createUserSuccess) {
            setTimeout(() => {
                history.push('/Admin/Consultar');
                clearUserAssignRolesSuccess();
                clearUserAssignRolesFailed();
                clearcreateUserFailed();
                clearcreateUsersuccess();
            }, 2000);
        }
    }

    let editItemsLeft = allRoles.filter(e => userRoles.indexOf(e.id) === -1);

    return (
        <>
            <AdminCreateEditUser
                classes={classes}
                allUserStates={allUserStates}
                adminCreateUserNames={adminCreateUserNames}
                handleOnChange={handleOnChange}
                dataUser={dataUser}
                didSubmit={didSubmit}
                allRoles={match.path === '/Admin/Modificar' ? editItemsLeft : allRoles}
                allEditRoles={state !== undefined && state.roles}
                medium={match.path === '/Admin/Modificar' ? 'editar' : 'crear'}
                handleAssignPermissions={handleAssignPermissions}
                handleValidations={handleValidations}
                createUserSuccess={assignRolesSuccess}
                createUserFailed={createUserFailed === true ? createUserFailed : assignRolesFailed}
                specificError={specificError}
                handleCloseSnack={handleCloseSnack}
                messageSpecificError={ErrorMessage !== undefined && ErrorMessage !== '' ? ErrorMessage : messageSpecificError}
                history={history}
                regexEmailOnChange={regexEmailOnChange}
                transferListTitles={transferListTitles}
                updateValue={updateValue}
            />
        </>
    )
}

export default withRouter(AdminCreateEditControl);
