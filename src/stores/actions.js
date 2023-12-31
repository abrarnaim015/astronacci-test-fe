import axios from "../configs/axios";
import { setContents, setLoading } from "./reducers";
// import { Swal, Toast } from "../configs/swal";

const googleLogin = (googleToken) => {
  return axios({
    method: "POST",
    url: "/googlelogin",
    data: { googleToken },
  });
};

const userRegister = (newUser) => {
  return axios({
    method: "POST",
    url: "/register",
    data: newUser,
  });
};

const userLogin = (user) => {
  return axios({
    method: "POST",
    url: "/login",
    data: user,
  });
};

const GetContents = (dispatch, category, access_token) => {
  axios({
    method: "GET",
    url: `/content/membership?category=${category}`,
    headers: {
      access_token,
    },
  })
    .then(({ data }) => {
      dispatch(setContents(data.articles));
    })
    .catch(console.log)
    .finally(() => {
      dispatch(setLoading(false));
    });
};

const getClientIdGoogle = (dispatch) => {
  return axios({
    method: "GET",
    url: "/clientid",
  });
};

export { googleLogin, userRegister, userLogin, GetContents, getClientIdGoogle };
