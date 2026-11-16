import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="text-center mt-5 pt-5">
      <Card className="shadow-sm p-5 border-0 mx-auto" style={{ maxWidth: "550px" }}>
        <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
        <h3 className="mb-3">Page Not Found</h3>
        <p className="text-muted mb-4">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div>
          <Button as={Link} to="/" variant="primary" size="lg">
            Back to Home
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default NotFound;

// http://localhost:5173/random-page-xyz