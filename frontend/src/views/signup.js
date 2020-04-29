import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Input, Button } from "semantic-ui-react";
import cogoToast from "cogo-toast";

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

export const SignUp = () => {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [hashedPwd, setHashedPwd] = useState(null);
  const [addUser] = useMutation(ADD_USER);

  // useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  return (
    <div>
      <div>
        <h3>creating user</h3>
        <Input onChange={(e) => setEmail(e.target.value)} />
        <Input onChange={(e) => setFirstName(e.target.value)} />
        <Input onChange={(e) => setLastName(e.target.value)} />
        <Input onChange={(e) => setHashedPwd(e.target.value)} />
        <Button onClick={handleSignupClick}>sign up</Button>
      </div>
    </div>
  );

  function handleSignupClick() {
    addUser({ variables: { user: { email, firstName, lastName, hashedPwd } } }).then((data) =>
      console.log("data", data)
    );
    cogoToast.success("Konto założone");
  }
};
