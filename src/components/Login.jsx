import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function Login() {
  return (
    <>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="with a placeholder"
            type="email"
          />
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
          />
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" id="terms" />
          {' '}
          <Label check htmlFor="terms">
            Check me out
          </Label>
        </FormGroup>
        <Button>
          Login
        </Button>
      </Form>
    </>
  )
}