import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./shared/client";
import "./App.css";

import { MainView } from "./views/main";
import { Login } from "./views/login";
import { SignUp } from "./views/signup";
import { Fetch } from "./views/fetch";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/fetch">Fetch</Link>
              </li>
            </ul>

            <Switch>
              <Route path="/signup" component={SignUp} />

              <Route path="/login">
                <Login />
              </Route>
              <Route path="/fetch">
                <Fetch />
              </Route>
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
