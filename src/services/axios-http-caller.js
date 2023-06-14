import axios from "axios";

export const API_ADMIN = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/datosmaestrosadmin`,
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
    "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_APIS_KEY}`,
    "Ocp-Apim-Trace": false,
  },
});

export const API_COMMON = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/datosmaestroscommons`,
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
    "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_APIS_KEY}`,
    "Ocp-Apim-Trace": false,
  },
});

export const API_CLIENT = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/datosmaestrosclients`,
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
    "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_APIS_KEY}`,
    "Ocp-Apim-Trace": false,
  },
});

export const API_MATERIAL = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/datosmaestrosmaterials`,
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
    "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_APIS_KEY}`,
    "Ocp-Apim-Trace": false,
  },
});

export const mockAPiLocalhost = axios.create({
  baseURL: "https://localhost:5001/",
  timeout: 150000,
  headers: {
    "Content-type": "application/json",
    "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_APIS_KEY}`,
    "Ocp-Apim-Trace": false,
  },
});

export const API_MATERIAL_NO_CORE = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/datosmaestrosmaterialesnocore`,
  timeout: 120000,
  headers: {
    "Content-type": "application/json",
    "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_APIS_KEY}`,
    "Ocp-Apim-Trace": false,
  },
});

export const API_AUTH = axios.create({
  baseURL: `${process.env.REACT_APP_LOGIN_URL}/security/api/v4/authentication/azure`,
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
    "Ocp-Apim-Subscription-Key":
      process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_LOGIN_KEY,
  },
});
