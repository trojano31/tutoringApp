import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Button, Menu } from "semantic-ui-react";

import client from "./shared/client";
import "./App.css";

import { Login } from "./views/login/login";
import { SignUp } from "./views/signup/signup";
import { Fetch } from "./views/fetch/fetch";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Menu>
            <Menu.Item>
              <Button>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button>
                <Link to="/fetch">Fetch</Link>
              </Button>
            </Menu.Item>
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
