import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { userRegister } from "../stores/actions";
import { Toast } from "../configs/swal";
import "../styles/css/register-page.css";

const RegisterPage = (props) => {
  const history = useHistory();
  const [dataSignUp, setDataSignUp] = useState({
    userName: "",
    email: "",
    password: "",
  });

  function handleChangePage(page) {
    history.push(page);
  }

  function handleFromInputChange(e) {
    let key = e.target.name;
    let value = e.target.value;

    setDataSignUp({
      ...dataSignUp,
      [key]: value,
    });
  }

  function handleRegister(event) {
    event.preventDefault();
    userRegister(dataSignUp)
      .then(({ data: res }) => {
        const { data } = res;
        Toast.fire({
          icon: "success",
          title: `Hai ${data.userName}`,
        });
        history.push("/login");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.message || "Oops, Error",
        });
      });
  }
  return (
    <div
      className="bgLogin d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="container w3-animate-opacity align-self-center">
        <div className="row justify-content-center">
          <div className="padingRegis col-5 text-center">
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
              <h1 className="titleLogin">REGISTER</h1>
              <form onSubmit={(e) => handleRegister(e)}>
                <input
                  onChange={(e) => handleFromInputChange(e)}
                  name="userName"
                  value={dataSignUp.userName}
                  type="text"
                  className="BorRegis form-control my-3"
                  placeholder="User Name"
                  required
                ></input>
                <input
                  onChange={(e) => handleFromInputChange(e)}
                  name="email"
                  value={dataSignUp.email}
                  type="email"
                  className="BorRegis form-control my-3"
                  placeholder="E-mail"
                  required
                ></input>
                <input
                  onChange={(e) => handleFromInputChange(e)}
                  name="password"
                  value={dataSignUp.password}
                  type="password"
                  className="BorRegis form-control my-3"
                  placeholder="Password"
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
                    Register
                  </button>
                </div>
              </form>
              <hr />
              <div>
                <div>
                  <p className="mt-2" style={{ cursor: "pointer" }}>
                    Already have an account ?{" "}
                    <strong>
                      <span
                        onClick={() => handleChangePage("/login")}
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        Login
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

export default RegisterPage;
