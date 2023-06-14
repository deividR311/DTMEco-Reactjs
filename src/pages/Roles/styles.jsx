import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

  goBackBtn: {
    marginBottom: '5px',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  simpleTextField: {
    borderRadius: '0px'
  },

  simpleSelectForm: {
    width: '100%',
    marginTop: '16px',
    maxWidth: '230px'
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

  PaperPermissionsCtn: {
    backgroundColor: '#F3F3F3',
    paddingTop: '10px',
    paddingBottom: '10px'

  },

  rolesTitle: {
    fontWeight: 'bold',
    color: '#50539e'
  },

  titleList: {
    fontWeight: 'bold'
  },

  paper: {
    width: 400,
    height: 220,
    overflow: 'auto',
    paddingTop: '15px',
    paddingBottom: '15px'
  },

  root: {
    margin: 'auto',
  },

  button: {
    margin: theme.spacing(0.5, 0),
    color: 'white',
    backgroundColor: '#0e0c5a',
    fontWeight: 'bold'
  },

  formBtnCancel: {
    width: '180px',
    height: '50px',
    fontWeight: 'bold',
    color: '#0e0c5a'
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

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }

}));