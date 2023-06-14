import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStylesStepIndicator = makeStyles((theme) => ({
	containerWizard: {
		marginTop: "10px",
		display: "flex",
		position: "relative",
		justifyContent: "center",
		marginTop: '6%',
		marginBottom: '4%'
	},

	divider: {
		padding: "20px 0",
		width: "50%",
	},

	divider__item: {
		border: "1px solid #d5d8dc",
		backgroundColor: "#d5d8dc",
	},

	section: {
		width: "70%",
		display: "flex",
		position: "absolute",
		alignItems: "center",
		flexFlow: "row nowrap",
		justifyContent: "space-between",
	},

	section__item: {
		color: "#0e0c5a",
		padding: "5px",
		fontWeight: "bold",
		backgroundColor: '#0F0C5A',
		borderRadius: '8px'
	},

	section__info: {
		display: "flex",
		padding: "5px",
		borderRadius: "7px",
		flexFlow: "row nowrap",
		border: "1px solid #0e0c5a",
		justifyContent: "space-between",
	},

	section__info__Number: {
		display: "flex",
		color: "#0e0c5a",
		padding: "0 6.8px",
		marginRight: "5px",
		alignItems: "center",
		borderRadius: "10px",
		justifyContent: "center",
		backgroundColor: '#fff'
	},

	section__info__name: {
		color: 'white'
	},

	// Estilo para el comonente desabilitado
	section__item__disabled: {
		color: "#0e0c5a",
		padding: "5px",
		fontWeight: "bold",
		backgroundColor: '#edeeef',
		borderRadius: '8px',
		border: '1px solid'
	},

	section__info__disabled: {
		display: "flex",
		padding: "5px",
		borderRadius: "7px",
		flexFlow: "row nowrap",
		justifyContent: "space-between",
	},

	section__info__Number__disabled: {
		display: "flex",
		color: "#fff",
		padding: "0 6.8px",
		marginRight: "5px",
		alignItems: "center",
		borderRadius: "10px",
		justifyContent: "center",
		backgroundColor: '#0e0c5a'
	},
	
	// Estilo para el comonente chekeado
	section__info__green: {
		display: "flex",
		padding: "5px",
		borderRadius: "7px",
		flexFlow: "row nowrap",
		justifyContent: "space-between",
	},

	section__info__Number__green: {
		display: "flex",
		color: "#fff",
		marginRight: "5px",
		alignItems: "center",
		borderRadius: "10px",
		justifyContent: "center",
	},

	section__item__green: {
		color: "#068E19",
		padding: "5px",
		fontWeight: "bold",
		backgroundColor: '#d5d8dc',
		borderRadius: '8px',
		backgroundColor: '#edeeef',
		border: '1px solid'
	},
}))