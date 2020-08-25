import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import client from "./shared/client";
import "./App.css";

import { Login } from "./views/login";
import { SignUp } from "./views/signup";
import { Fetch } from "./views/fetch";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Menu>
            <MenuItem>
              <Button>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </MenuItem>
            <MenuItem>
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            </MenuItem>
            <MenuItem>
              <Button>
                <Link to="/fetch">Fetch</Link>
              </Button>
            </MenuItem>
          </Menu>

          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/fetch">
              <Fetch />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
