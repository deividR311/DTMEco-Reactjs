import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
    },

    paper: {
      width: 400,
      height: 220,
      overflow: 'auto',
      paddingTop: '15px',
      paddingBottom: '15px'
    },

    ctnEditIcon: {
      backgroundColor: '#0e0c5a',
      justifyContent: 'space-around',
      width: '30px',
      height: '30px',
      display: 'flex',
      paddingTop: '2px',
      borderRadius: '50%',
      color: 'white',
      '&:hover': {
        backgroundColor: '#50539e',
        cursor: 'pointer'
      }
  },

  ctnCharningInfo: {
    margin: 'auto',
    marginTop: '5px'
  },

    button: {
      margin: theme.spacing(0.5, 0),
      color: 'white',
      backgroundColor: '#0e0c5a',
      fontWeight: 'bold'
    },

    PaperPermissionsCtn: {
      backgroundColor: '#F3F3F3',
      paddingTop: '10px',
      paddingBottom: '10px'

    },

    titleList: {
      fontWeight: 'bold'
    },

    rolesTitle: {
      fontWeight: 'bold',
      color: '#50539e'
    },

    simpleTextField: {
      borderRadius: '0px'
    },

    simpleSelectForm: {
      width: '200px',
      marginTop: '16px',
      maxWidth: '230px'
    },

    ctn__inputs: {
      marginRight: '10px'
    },

    formBtns: {
      width: '180px',
      height: '50px',
      backgroundColor: '#0e0c5a',
      fontWeight: 'bold',
      color: 'white',
      '&:hover': {
        backgroundColor: '#50539e'
      }
    },

    formBtnCancel: {
      width: '180px',
      height: '50px',
      fontWeight: 'bold',
      color: '#0e0c5a'
    },

    goBackBtn: {
      marginTop: '10px',
      marginBottom: '10px',
      fontWeight: 'bold',
      textTransform: 'capitalize'
    },

    btnCloseModal: {
      backgroundColor: 'white',
      color: 'black'
    },

    btnAddPoint: {
        color: 'white',
        backgroundColor: '#0e0c5a',
        '&:hover': {
          backgroundColor: '#50539e'
        }
    },

    closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));