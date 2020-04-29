import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

const LOGIN = gql`
  mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      email
      id
      lastName
    }
  }
`;

// TO DO
// POPRAWIĆ REACT-HOOK-FORM

export const Login = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginUser] = useMutation(LOGIN);

  useEffect(() => {
    register({ name: "login" }, { required: true });
    register({ name: "password" }, { required: true });
  }, []);

  const { register, errors, handleSubmit, setValue, triggerValidation } = useForm();
  const onSubmit = (data, e) => {
    console.log("Submit event", e);
    alert(JSON.stringify(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Zaloguj się</h3>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          placeholder="E-mail"
          name="login"
          onChange={async (e, { name, value }) => {
            setLogin(e.target.value);
            setValue(name, value);
            await triggerValidation({ name });
          }}
          error={errors.email ? true : false}
        />
        <Form.Input
          fluid
          placeholder="Hasło"
          name="password"
          onChange={async (e, { name, value }) => {
            setPassword(e.target.value);
            setValue(name, value);
            await triggerValidation({ name });
          }}
          error={errors.password ? true : false}
        />
      </Form.Group>

      <Button primary onClick={handleLoginClick}>
        Zaloguj się
      </Button>
    </Form>
  );

  function handleLoginClick() {
    loginUser({ variables: { loginInput: { email: login, password } } }).then((loginData) =>
      console.log("loginData", loginData)
    );
  }
};
