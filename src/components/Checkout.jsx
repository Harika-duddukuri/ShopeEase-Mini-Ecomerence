import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Checkout({ cart, clearCart }) {
  const [validated, setValidated] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMode: "Credit Card",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <Container className="text-center mt-5">
        <Card className="shadow-sm p-5 border-0 mx-auto" style={{ maxWidth: "600px" }}>
          <h2 className="text-success mb-3">Order Placed Successfully! 🎉</h2>
          <p className="text-muted mb-4">
            Thank you, <strong>{formData.name}</strong>. Your order has been placed and will be shipped to <strong>{formData.address}</strong>.
          </p>
          <p className="mb-4">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Card>
      </Container>
    );
  }

  if (cart.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h2>Your cart is empty</h2>
        <Button as={Link} to="/" variant="primary" className="mt-3">
          Shop Now
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4">Checkout</h2>
      <Row>
        <Col lg={7} className="mb-4">
          <Card className="shadow-sm p-4">
            <h4 className="mb-3">Shipping & Payment Details</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange} />
                <Form.Control.Feedback type="invalid">
                  Please provide your name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange} />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="phone"
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={handleChange}  />
                <Form.Control.Feedback type="invalid">
                  Please provide a phone number.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  name="address"
                  placeholder="Street address, city, pin code"
                  value={formData.address}
                  onChange={handleChange}  />
                <Form.Control.Feedback type="invalid">
                  Please provide a shipping address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPayment">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange} >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="UPI">UPI / Net Banking</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </Form.Select>
              </Form.Group>

              <Button variant="success" type="submit" size="lg" className="w-100">
                Place Order (${total.toFixed(2)})
              </Button>
            </Form>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm p-4">
            <h4 className="mb-3">Order Summary</h4>
            <div className="d-flex flex-column gap-2 mb-3">
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center">
                  <span className="text-truncate" style={{ maxWidth: "200px" }}>
                    {item.title} (x{item.quantity})
                  </span>
                  <span className="fw-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;