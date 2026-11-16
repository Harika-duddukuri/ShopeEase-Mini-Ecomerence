import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !name)) return;

    onLogin({ name: name || email.split("@")[0], email });
    navigate("/checkout");
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "450px" }}>
      <Card className="shadow-sm p-4 border-0">
        <h3 className="text-center mb-4">{isRegistering ? "Register for ShopEase" : "Login to Checkout"}</h3>
        <Form onSubmit={handleSubmit}>
          {isRegistering && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text" placeholder="Enter your name" 
                 value={name} onChange={(e) => setName(e.target.value)} 
                required />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control  type="email"  placeholder="Enter email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3 py-2">
            {isRegistering ? "Register & Proceed" : "Login"}
          </Button>

          <div className="text-center">
            <Button variant="link"
              className="text-decoration-none p-0"
              onClick={() => setIsRegistering(!isRegistering)} >
              {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;