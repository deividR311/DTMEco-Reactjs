import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStylesMaterial = makeStyles((theme) => ({
  contentFormWizard: {
    height: "auto",
    display: "flex",
    padding: "70px 0",
    alignItems: "center",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
  },
  section__info: {
    display: "flex",
    padding: "5px",
    borderRadius: "7px",
    flexFlow: "row nowrap",
    border: "1px solid #0e0c5a",
    justifyContent: "space-between",
  },
  section__info__disabled: {
    display: "flex",
    padding: "5px",
    borderRadius: "7px",
    flexFlow: "row nowrap",
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
  section__info__green: {
    display: "flex",
    padding: "5px",
    borderRadius: "7px",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
  },

  section__info__name: {
    color: 'white'
  },
  ection__info__name__green: {
  },
  section__info__Number__green: {
    display: "flex",
    color: "#fff",
    padding: "0 6.8px",
    marginRight: "5px",
    alignItems: "center",
    borderRadius: "10px",
    justifyContent: "center",
    backgroundColor: "#068E19",
  },

  containerWizard: {
    marginTop: "10px",
    display: "flex",
    position: "relative",
    justifyContent: "center",
  },

  divider: {
    padding: "20px 0",
    width: "70%",
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
    color: "white",
    padding: "5px",
    fontWeight: "bold",
    backgroundColor: '#0F0C5A',
    borderRadius: '8px'
  },

  section__item___disabled: {
    color: "#0e0c5a",
    padding: "5px",
    fontWeight: "bold",
    backgroundColor: '#edeeef',
    borderRadius: '8px',
    border: '1px solid'
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

  colorEdit: {
    background: red
  },

  textInfo: {
    fontSize: '36px',
    color: '#0e0c5a'
  },

  textInfoSub: {
    fontSize: '16px;'
  },

  displayAling: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '4px'
  },

  colorAsterisk: {
    color: 'red',
    fontWeight: 'bold'
  },

  marginFrom: {
    marginBlockEnd: '100px'
  }
}));
