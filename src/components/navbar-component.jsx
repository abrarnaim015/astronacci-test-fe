import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAccessToken, setLoading, setUser } from "../stores/reducers";
import axios from "../configs/axios";

const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, access_token } = useSelector((state) => state);

  const signOut = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      localStorage.clear();
      dispatch(setAccessToken(""));
      dispatch(setUser({}));
      dispatch(setLoading(false));
      history.push("/login");
    }, 2000);
  };

  const membershipUpgrade = (type) => {
    if (type === "A") return "Updare Membership from A to B";
    if (type === "B") return "Updare Membership from B to C";
    if (type === "C") return "You Can Back to Mamber A";
  };

  const updateMemberShip = async () => {
    try {
      let type = "";
      if (user.membershipType === "A") type = "B";
      if (user.membershipType === "B") type = "C";
      if (user.membershipType === "C") type = "A";
      dispatch(setLoading(true));
      const result = await axios({
        method: "PUT",
        url: `/update/membership/type`,
        headers: {
          access_token,
        },
        data: {
          membershipType: type,
        },
      });

      dispatch(setUser(result.data.data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow"
        style={{ paddingLeft: "100px", paddingRight: "100px" }}
      >
        <div className="container-fluid">
          <div>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <span
                  className="content nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>
                    {user.userName}
                    <i
                      className="fas fa-user-alt"
                      style={{ paddingLeft: "5px", paddingRight: "5px" }}
                    ></i>
                  </span>
                </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <span
                      onClick={() => updateMemberShip()}
                      className="dropdown-item"
                    >
                      {membershipUpgrade(user.membershipType)}
                    </span>
                  </li>
                  <li>
                    <span onClick={() => signOut()} className="dropdown-item">
                      Sign Out
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
