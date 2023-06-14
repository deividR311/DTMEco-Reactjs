import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStylesStepOne = makeStyles((theme) => ({
  stepOne: {
    fontSize: "36px",
    color: "#0e0c5a",
  },
  stepOneDescription: {
    fontSize: "16px",
    display: "block",
    marginBottom: "52px",
  },
  ButtonCancel: {
    display: "flex",
    flexFlow: "row nowrap",
    alignContent: "center",
    alignItems: "center",
    marginRight: "38px",
    textDecoration: "underline",
    cursor: "pointer",
    textTransform: "none",
    backgroundColor: "white",
    color: "#0e0c5a!important",
    hover: {
      color: "#50539e",
      border: "1px solid #50539e",
    },
  },
  containerButonsStepOne: {
    display: "flex",
    flexFlow: "row nowrap",
    paddingBottom: "100px",
    justifyContent: "flex-end",
  },
  item: {
    width: "160px",
    height: "40px",
    marginLeft: "20px",
    padding: "0 5px",
  },
}));
