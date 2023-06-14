
import { makeStyles } from '@mui/styles';
export const stylesCell = makeStyles({
	root: {
		'& .cold': {
			backgroundColor: '#b9d5ff91',
			color: '#1a3e72',
		},
		'& .hot': {
			backgroundColor: '#ff943975',
			color: '#1a3e72',
		},
	},
});