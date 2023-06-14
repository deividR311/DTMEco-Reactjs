import { makeStyles } from '@material-ui/core/styles';

export const useStylesNoMatchPage = makeStyles((theme) => ({
      noMatchContainer: {
        textAlign: 'center',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)'
      },

      title: {
        fontSize: '150px'
      },

      subTitle: {
        fontWeight: 'bold'
      },

      paper: {
        width: '50%',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#F2F2F2',
        opacity: '0.5'
      },

      btn: {
        backgroundColor: '#0e0c5a',
        color: 'white',
        marginTop: '10px',
        '&:hover': {
          backgroundColor: '#50539e',
        },
      }
}));