import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { Input, Button, Form } from "semantic-ui-react";
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

  useEffect(() => {
    register({ name: "email" }, { required: true });
    register({ name: "firstName" }, { required: true });
    register({ name: "lastName" }, { required: true });
    register({ name: "password" }, { required: true });
  }, []);

  const { register, errors, handleSubmit, setValue, triggerValidation } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data, e) => {
    console.log("Submit event", e);
    cogoToast.success("Konto zalozone");
  };

  return (
    <div>
      <h3>Rejestracja</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            id="form-input-control-error-email"
            control={Input}
            placeholder="joe@schmoe.com"
            data-testid="signup-inputmail"
            name="email"
            onChange={async (e, { name, value }) => {
              setEmail(e.target.value);
              setValue(name, value);
              await triggerValidation({ name });
            }}
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            error={errors.email && <p>This is required</p>}
          />

          <Form.Input
            fluid
            id="form-input-control-first-name"
            control={Input}
            placeholder="First name"
            data-testid="signup-inputFirstName"
            name="firstName"
            onChange={async (e, { name, value }) => {
              setFirstName(e.target.value);
              setValue(name, value);
              await triggerValidation({ name });
            }}
            ref={register({ required: true, maxLength: 80 })}
            error={errors.firstName && <p>This is required</p>}
          />

          <Form.Input
            fluid
            id="form-input-control-last-name"
            control={Input}
            placeholder="Last name"
            data-testid="signup-inputLastName"
            name="lastName"
            onChange={async (e, { name, value }) => {
              setLastName(e.target.value);
              setValue(name, value);
              await triggerValidation({ name });
            }}
            ref={register({ required: true })}
            error={errors.lastName && <p>This is required</p>}
          />

          <Form.Input
            fluid
            id="form-input=control-password"
            control={Input}
            placeholder="Hasło"
            data-testid="signup-inputPassword"
            name="password"
            type="password"
            onChange={async (e, { name, value }) => {
              setHashedPwd(e.target.value);
              setValue(name, value);
              await triggerValidation({ name });
            }}
            ref={register({ required: true })}
            error={errors.password && <p>This is required</p>}
          />
        </Form.Group>
        <Button type="submit" primary onClick={handleSignupClick} data-testid="signup-button">
          Zarejestruj się
        </Button>
      </Form>
    </div>
  );

  function handleSignupClick() {
    addUser({ variables: { user: { email, firstName, lastName, hashedPwd } } })
      .then((data) => console.log("data", data))
      .catch(() => {
        cogoToast.error("Complete all fields");
      });
  }
};
