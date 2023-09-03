import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { LoginPage, RegisterPage, ContentPage } from "./pages";
import { FooterComponent } from "./components";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "./stores/reducers";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (access_token) {
      dispatch(setAccessToken(access_token));
    }
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={ContentPage} />
      </Switch>
      <FooterComponent />
    </>
  );
}

export default App;
