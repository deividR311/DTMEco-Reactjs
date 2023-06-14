import { makeStyles } from '@material-ui/core/styles';

export const useSpecialStyles = makeStyles((theme) => ({
    simpleSelectForm: {
        width: '150px',
        marginBottom: '15px',
        marginTop: '15px'
    },

    multilineStyle: {
        width: '400px'
    },

    ctn__approveScreen: {
        height: '70px'
    },

    approveMessage: {
        marginTop: '30px'
    },

    selectForm: {
        width: '400px',
        marginBottom: '15px',
        marginTop: '15px'
    },

    ctn__Observations: {
        marginBottom: '15px'
    },

    simpleTextField: {
        width: '150px'
    },

    indicative: {
        width: '60px',
        marginLeft: '5px',
        marginTop: '15px'
    },

    ctn__approverManage: {
        width: '800px'
    },

    header: {
        marginBottom: '20px'
    },

    buttonAccept: {
        width: '180px',
        height: '50px',
        marginLeft: '10px',
        backgroundColor: '#0e0c5a',
        fontWeight: 'bold',
        color: '#ffffff',
  
        '&:hover': {
          backgroundColor: '#50539e',
        },
  
        '&:disabled': {
          backgroundColor: '#50539e',
          color: 'white'
        }
    },

    ctn__approverBtns: {
        textAlign: 'center'
    },

    numberTextField: {
        width: '175px',
        marginTop: '15px'
    },

    ctnTextField: {
        marginLeft: '50px'
    },

    ctnTextField2: {
        marginLeft: '100px'
    },

    ctnTextField3: {
        marginLeft: '150px'
    }
}));