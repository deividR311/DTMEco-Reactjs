import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  createRequestCtnFather: {
    position: "relative",
  },

  titleRegister: {
    color: "#0e0c5a",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  ctn_RutAddress: {
    width: "800px",
  },

  ctnLoading: {
    margin: 0,
    textAlign: "center",
    position: "absolute",
    left: "0",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: "1301",
    width: "100%",
  },

  ctnLoadingCenter: {},

  ctnBlockDisplay: {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "999999",
    top: "0px",
    background: "#64606085",
    margin: 0,
  },

  ctnEditIcon: {
    backgroundColor: "#0e0c5a",
    justifyContent: "space-around",
    width: "30px",
    height: "30px",
    display: "flex",
    paddingTop: "2px",
    borderRadius: "50%",
    color: "white",
    "&:hover": {
      backgroundColor: "#50539e",
      cursor: "pointer",
    },
  },

  ctnCharningInfo: {
    margin: "auto",
    marginTop: "5px",
  },

  ctnEditIconDisabled: {
    backgroundColor: "#E3E3E3",
    justifyContent: "space-around",
    width: "30px",
    height: "30px",
    display: "flex",
    paddingTop: "2px",
    borderRadius: "50%",
    color: "white",
    "&:hover": {
      cursor: "not-allowed",
    },
  },

  containerModalBtns: {
    marginTop: "10px",
  },

  modalBtnCancel: {
    backgroundColor: "white",
  },

  modalBtnConfirm: {
    backgroundColor: "#0e0c5a",
    color: "white",
    "&:hover": {
      backgroundColor: "#50539e",
    },
  },

  ctnModalHeader: {
    marginBottom: "20px",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },

  ctnAutoComplete: {
    height: "150px",
    paddingTop: "40px",
    paddingBottom: "20px",
  },

  contentFormWizard: {
    height: "340px",
    marginTop: "20px",
    overflowY: "auto",
    overflowX: "hidden",
    marginBottom: "5px",
  },

  ctnFormTwo: {
    paddingTop: "15px",
    paddingLeft: "15px",
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  ctnFormThree: {
    paddingTop: "15px",
    paddingLeft: "15px",
  },

  fileDivCTN: {
    borderStyle: "dashed",
    border: "2px solid #50539e",
    borderRadius: "5px",
    height: "110px",
    width: "90%",
    margin: "0 auto",
    marginTop: "5px",
    marginBottom: "10px",
  },

  nameFile: {
    backgroundColor: "#F3F3F3",
    borderRadius: "5px",
    boxShadow: "0px 0.5px 0px #50539e",
  },

  fileDivContent: {
    height: "100%",
    width: "95%",
    margin: "0 auto !important",
  },

  uploadFile: {
    textTransform: "capitalize",
    marginTop: "5px",
    color: "#0e0c5a",
  },

  inputFile: {
    display: "none",
  },

  ctnIcon: {
    paddingTop: "2%",
    paddingBottom: "2%",
    textAlign: "center",
  },

  iconUpload: {
    width: "65%",
    height: "65%",
  },

  CTNContent: {
    textAlign: "center",
    fontSize: "12px",
    padding: "5px",
  },

  fileLi: {
    marginLeft: "20px",
  },

  ctnFormFour: {
    margin: "0 auto",
  },

  rowTwo: {
    marginTop: "10px",
  },

  createRequestCtnSon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "50%",
    height: "30%",
    margin: "auto",
    textAlign: "center",
    padding: "10px",
  },

  simpleTextField: {
    width: "250px",
  },

  ctnCompanyName: {
    marginLeft: "30px",
    width: "70%",
  },

  requestTitle: {
    fontWeight: "bold",
  },

  simpleSelectForm: {
    width: "250px",
    marginBottom: "15px",
    marginTop: "15px",
  },

  selectForm: {
    width: "250px",
    marginBottom: "15px",
    marginTop: "15px",
  },

  CancelBtn: {
    marginRight: "40px",
    color: "#0e0c5a",
    fontWeight: "bold",
  },

  ctnFormOne: {
    width: "100%",
    marginLeft: "50px",
  },

  numberTextField: {
    width: "250px",
    marginTop: "15px",
  },

  indicative: {
    width: "60px",
    marginRight: "15px",
    marginTop: "15px",
  },

  saveBtn: {
    marginLeft: "40px",
    backgroundColor: "#0e0c5a",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#50539e",
    },
  },

  PaperPermissionsCtn: {
    backgroundColor: "#F3F3F3",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "90%",
  },

  buttonsCtn: {
    marginTop: "30px",
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
    color: "#ffffff",
    padding: "0 6.8px",
    marginRight: "5px",
    alignItems: "center",
    borderRadius: "10px",
    justifyContent: "center",
    backgroundColor: "#0e0c5a",
  },

  containerWizard: {
    marginTop: "10px",
    display: "flex",
    position: "relative",
    justifyContent: "center",
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
    width: "50%",
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
    backgroundColor: "#ffffff",
  },
}));
