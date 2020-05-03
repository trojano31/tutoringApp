import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Input, Button } from "semantic-ui-react";

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

export const Fetch = () => {
  const [id, setId] = useState(null);

  const [fetchUser, { data }] = useLazyQuery(FETCH_USER);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <div>
        <h3>fetch user</h3>
        <Input onChange={(e) => setId(e.target.value)} />
        <Button onClick={handleFetchUserClick}>fetch</Button>
      </div>
    </div>
  );

  function handleFetchUserClick() {
    fetchUser({ variables: { id } });
  }
};