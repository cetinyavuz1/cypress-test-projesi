import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";
import { useHistory } from "react-router-dom"

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false)
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  })
  const history = useHistory()
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    if (
      validateEmail(form.email) &&
      form.password.trim().length >= 4 &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if (name === 'email') {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name === 'password') {
      if (value.trim().length >= 4) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name === 'terms') {
      if (value) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          history.push("/Success")
        }
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="with a placeholder"
            type="email"
            onChange={handleChange}
            value={form.email}
            invalid={errors.email}
          />
          {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
            onChange={handleChange}
            value={form.password}
            invalid={errors.password}
          />
          {errors.password && (
            <FormFeedback>{errorMessages.password}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" id="terms" name="terms" checked={form.terms} onChange={handleChange}
            invalid={errors.terms} />
          {' '}
          <Label check htmlFor="terms">
            I agree to terms of service and privacy policy
          </Label>
        </FormGroup>
        <Button type="submit" disabled={!isValid}>
          Login
        </Button>
      </Form>
    </>
  )
}