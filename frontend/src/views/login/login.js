import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";

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

  useEffect(() => {
    register({ name: "login" }, { required: true });
    register({ name: "password" }, { required: true });
  }, []);

  const { register, errors, handleSubmit, setValue, triggerValidation } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data, e) => {
    cogoToast.success("OK");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Zaloguj się</h3>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          placeholder="E-mail"
          name="login"
          ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          onChange={async (e, { name, value }) => {
            setLogin(e.target.value);
            setValue(name, value);
            await triggerValidation({ name });
          }}
          error={errors.login && <p>This is required</p>}
        />
        <Form.Input
          fluid
          placeholder="Hasło"
          name="password"
          error={errors.password && <p>This is required</p>}
          ref={register({ required: true })}
          onChange={async (e, { name, value }) => {
            setPassword(e.target.value);
            setValue(name, value);
            await triggerValidation({ password });
          }}
        />
      </Form.Group>

      <Button primary onClick={handleLoginClick}>
        Zaloguj się
      </Button>
    </Form>
  );

  function handleLoginClick() {
    loginUser({ variables: { loginInput: { email: login, password } } })
      .then((loginData) => console.log("loginData", loginData))
      .catch(() => {
        cogoToast.error("Wrong login or password");
      });
  }
};
