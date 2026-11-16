import React from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cart({ cart, updateQuantity, removeFromCart }) {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
        <Button as={Link} to="/" variant="primary" className="mt-3">
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      <Row>
        <Col lg={8}>
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "50px", height: "50px", objectFit: "contain" }} />
                      <span className="fw-semibold text-truncate" style={{ maxWidth: "200px" }}>
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1} >
                        -
                      </Button>
                      <span className="fw-bold px-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)} >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Order Summary</Card.Title>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Estimated Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button as={Link} to="/checkout" variant="success" size="lg" className="w-100">
                      Proceed to Checkout
                        </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;