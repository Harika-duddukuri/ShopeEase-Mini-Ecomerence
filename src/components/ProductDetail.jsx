import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading product details...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-5 text-center">
        <h3>Product not found</h3>
        <Button as={Link} to="/" variant="outline-primary" className="mt-3">
          Back to Catalog
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button as={Link} to="/" variant="outline-secondary" className="mb-4">
        &larr; Back to Products
      </Button>
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="shadow-sm border-0 p-3">
            <Card.Img
              src={product.image}
              alt={product.title}
              style={{ maxHeight: "400px", objectFit: "contain" }} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p className="text-muted text-uppercase small">{product.category}</p>
          <h3 className="text-primary mb-3">${product.price}</h3>
          <p className="mb-4">{product.description}</p>
          <p className="text-warning mb-4">
            Rating: ⭐ {product.rating?.rate ?? product.rating ?? "N/A"} / 5
          </p>

          <Form className="d-flex align-items-center gap-3 mb-4" style={{ maxWidth: "250px" }}>
            <Form.Label className="mb-0 fw-bold">Qty:</Form.Label>
            <Form.Select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))} >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Select>
          </Form>

          <Button variant="primary" size="lg" className="w-100"
  onClick={() => { console.log("Button clicked for product:", product);
    addToCart(product, quantity);
     }} >
  Add to Cart ({quantity})
</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;