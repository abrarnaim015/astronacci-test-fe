import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Toast, Swal } from "../configs/swal";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, googleLogin } from "../stores/actions";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "../styles/css/login-page.css";
import { setAccessToken, setUser } from "../stores/reducers";

const LoginPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { access_token } = useSelector((state) => state);

  if (access_token) {
    history.push("/");
  }

  // useEffect(() => {
  //   getClientIdGoogle()
  //     .then(({ data }) => {
  //       dispatch(setClientIdGoogle(data.data.clientId));
  //     })
  //     .catch(console.log);
  // }, [dispatch, clientIdGoogle]);

  const [formInput, setFromInput] = useState({
    email: "",
    password: "",
  });

  function handleChangePage(page) {
    history.push(page);
  }

  const handleFromInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFromInput({
      ...formInput,
      [key]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    userLogin(formInput)
      .then(({ data: res }) => {
        const { data } = res;
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch(setAccessToken(data.access_token));
        dispatch(setUser(data.user));
        Toast.fire({
          icon: "success",
          title: `Welcome ${data.user.userName}!`,
        });
        history.push("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: err.response.data.message || "Something Went Wrong",
        });
      });
  };

  const handleLoginByGoogle = (response) => {
    const google_token = response.getAuthResponse().id_token;
    googleLogin(google_token)
      .then(({ data: res }) => {
        const { data } = res;
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch(setAccessToken(data.access_token));
        dispatch(setUser(data.user));
        Toast.fire({
          icon: "success",
          title: `Welcome ${data.user.userName}!`,
        });
        history.push("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: err.response.data.message || "Something Went Wrong",
        });
      });
  };

  const handleLoginByFacebook = (response) => {
    // window.fbAsyncInit = function () {
    //   FacebookLogin.init({
    //     appId: "1965755637137016",
    //     cookie: true,
    //     xfbml: true,
    //     version: "{api-version}",
    //   });

    //   FacebookLogin.AppEvents.logPageView();
    // };

    // (function (d, s, id) {
    //   var js,
    //     fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {
    //     return;
    //   }
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, "script", "facebook-jssdk");

    // FacebookLogin.getLoginStatus(function (response) {
    //   // statusChangeCallback(response);
    //   console.log(response, "<<<< FB2");
    // });
    console.log(response, "<<<< FB");
  };

  return (
    <div
      className="bgLogin d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="container w3-animate-opacity align-self-center">
        <div className="row justify-content-center">
          <div className="borderHorver col-5 text-center">
            <h1
              style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Astronacci Test
            </h1>
            <div
              className="w3-card-4 p-3 bg-light"
              style={{ borderRadius: "10px" }}
            >
              <h1 className="titleLogin">LOGIN</h1>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  style={{ borderRadius: "50px" }}
                  className="form-control my-3"
                  placeholder="E-mail"
                  value={formInput.email}
                  onChange={handleFromInputChange}
                  required
                ></input>
                <input
                  type="password"
                  name="password"
                  style={{ borderRadius: "50px" }}
                  className="form-control my-3"
                  placeholder="Password"
                  value={formInput.password}
                  onChange={handleFromInputChange}
                  required
                ></input>
                <div
                  className="mb-4"
                  style={{ paddingRight: "50px", paddingLeft: "50px" }}
                >
                  <button
                    type="submit"
                    className="btnSignInUp btn btn-outline-dark form-control"
                  >
                    Login
                  </button>
                </div>
              </form>
              <hr />
              <div>
                <div>
                  <p>Or Login with</p>
                </div>
                <div>
                  <GoogleLogin
                    clientId="281372448495-9egpusn6t7nq49euno6bv5ffi9qesq2s.apps.googleusercontent.com"
                    buttonText="Google"
                    onSuccess={handleLoginByGoogle}
                    onFailure={handleLoginByGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <FacebookLogin
                    appId="1965755637137016"
                    fields="name,email,picture"
                    callback={handleLoginByFacebook}
                    icon="fa-facebook"
                    textButton="Facebook"
                    size="small"
                  />
                </div>
                <div>
                  <p className="mt-2" style={{ cursor: "pointer" }}>
                    Need an account ?{" "}
                    <strong>
                      <span
                        onClick={() => handleChangePage("/register")}
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        Register
                      </span>
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
