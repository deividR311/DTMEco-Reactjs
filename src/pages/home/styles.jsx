import { makeStyles } from '@material-ui/core/styles';

export const useStylesHome = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        textAlign: 'center',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },

      simpleTextField: {
        width: '600px'
      },

      homeContainer: {
        textAlign: 'center',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)'
      },

      homeContainerSpan: {
        width: '50%'
      }
}));