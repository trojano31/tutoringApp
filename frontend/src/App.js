import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import client from "./shared/client";
import "./App.css";

import { Login } from "./views/login";
import { SignUp } from "./views/signup";
import { Fetch } from "./views/fetch";
import { AddAdvert } from "./views/advert/addAdvert";
import { Main } from "./views/main";
import { AdvertList } from './views/advert-list/advert-list';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            {/* <Route path="/">
              <Main />
            <Route>
            Patryk rzuć okiem co z tym jest nie tak plx - chyba, że u mnie coś na windowsie to odświeżanie nawala
            */}
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/fetch">
              <Fetch />
            </Route>
            <Route path="/advert">
              <AddAdvert />
            </Route>
            <Route path="/adverts">
              <AdvertList />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
