let apiUrlDev = process.env.REACT_APP_API_URL_DEV;
let apiUrlProd = process.env.REACT_APP_API_URL_PROD;

//Used for backend communication
export const backendUri =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? apiUrlDev
    : apiUrlProd;
