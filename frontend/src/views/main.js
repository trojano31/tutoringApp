import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      email
      firstName
      lastName
      hashedPwd
    }
  }
`;

const LOGIN = gql`
  mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      email
      id
      lastName
    }
  }
`;

const FETCH_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      email
      id
      lastName
      firstName
      hashedPwd
    }
  }
`;


export const MainView = () => {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [hashedPwd, setHashedPwd] = useState(null);
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [id, setId] = useState(null);
  const [addUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN);
  const [fetchUser, { data }] = useLazyQuery(FETCH_USER);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <div>

      <div>
        <h3>creating user</h3>
        <input onChange={(e) => setEmail(e.target.value)} />
        <input onChange={(e) => setFirstName(e.target.value)} />
        <input onChange={(e) => setLastName(e.target.value)} />
        <input onChange={(e) => setHashedPwd(e.target.value)} />
        <button onClick={handleSignupClick}>sign up</button>
      </div>

      <div>
        <h3>login</h3>
        <input onChange={(e) => setLogin(e.target.value)} />
        <input onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLoginClick}>login</button>
      </div>

      <div>
        <h3>fetch user</h3>
        <input onChange={(e) => setId(e.target.value)} />
        <button onClick={handleFetchUserClick}>fetch</button>
      </div>

    </div>
  );

  function handleSignupClick() {
    addUser({ variables: { user: { email, firstName, lastName, hashedPwd } } })
      .then(data => console.log('data', data))
  }

  function handleLoginClick() {
    loginUser({ variables: { loginInput: { email: login, password } } })
      .then(loginData => console.log('loginData', loginData))
  }

  function handleFetchUserClick() {
    fetchUser({ variables: { id } });
  }
};
