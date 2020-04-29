import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Input, Button } from "semantic-ui-react";

const LOGIN = gql`
  mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      email
      id
      lastName
    }
  }
`;

export const Login = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginUser] = useMutation(LOGIN);

  return (
    <div>
      <div>
        <h3>login</h3>
        <Input onChange={(e) => setLogin(e.target.value)} />
        <Input onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLoginClick}>login</Button>
      </div>
    </div>
  );

  function handleLoginClick() {
    loginUser({ variables: { loginInput: { email: login, password } } }).then((loginData) =>
      console.log("loginData", loginData)
    );
  }
};
