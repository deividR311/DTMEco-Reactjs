import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { authUser } from "../../redux/authentication/authActions";
import { Footer } from "../../sharedComponents";
import { useStyles } from "../Costumer/styles";
import { LoginHeader, LoginForm } from "./components";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { data, isLogged } = useSelector((state) => state.auth);
  let errorCode = "";
  let errorMessage = "";
  const history = useHistory();
  const [progress, setProgress] = useState(10);
  const [userLogged, setUserLogged] = useState({
    user: "",
    password: "",
    applicationId: `${process.env.REACT_APP_LOGIN_SUSCRIPTION_KEY}`,
  });

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
    }
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 1900);

    return () => {
      clearInterval(timer);
    };
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      history.replace("/");
    }
  }, []);

  if (isLogged === false && data !== undefined) {
    const { code, message } = data.data;
    errorCode = code;
    errorMessage = message;
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserLogged((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValidation = (e) => {
    e.preventDefault();
    dispatch(authUser(userLogged));
  };

  return (
    <>
      <LoginHeader />
      {loading && (
        <>
          <div className={classes.ctnBlockDisplay}></div>
          <div className={classes.ctnLoading}>
            <div className={classes.ctnLoadingCenter}>
              <CircularProgressWithLabel value={progress} />
            </div>
          </div>
        </>
      )}
      <div className="login__screen">
        <LoginForm
          handleValidation={handleValidation}
          userLogged={userLogged}
          handleOnChange={handleOnChange}
          loading={loading}
          isLogged={isLogged}
          errorCode={errorCode}
          errorMessage={errorMessage}
        />
      </div>
      <Footer />
    </>
  );
};

export default Login;
