import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const { find } = useLocation();
  const redirectInUrl = new URLSearchParams(find).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h2 className="my-3"> Sign In</h2>

      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>PassWord</Form.Label>
          <Form.Control type="password" required></Form.Control>
        </Form.Group>

        <div className="mb-3">
          <Button type="submit"> Sign In</Button>
        </div>
        <div className="mb-3">
          Don't have an Account?
          <Link to={`/SignUP?redirect=${redirect}`}> Create Your Account</Link>
        </div>
      </Form>
    </Container>
  );
}
