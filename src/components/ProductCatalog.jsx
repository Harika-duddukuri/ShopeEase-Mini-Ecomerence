import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "low-to-high") return a.price - b.price;
      if (sortBy === "high-to-low") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">ShopEase Products</h2>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)} >
            <option value="default">Sort by Price</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </Form.Select>
        </Col>
      </Row>
      
      <Row>
        {filteredProducts.map((product) => (
          <Col md={4} className="mb-4" key={product.id}>
            <Card className="h-100 shadow-sm p-3">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "160px", objectFit: "contain" }}/>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-muted">${product.price}</Card.Text>
                <Card.Text className="small">
                  Rating: ⭐ {product.rating?.rate ?? product.rating ?? "N/A"}
                </Card.Text>
                <Button as={Link} to={`/products/${product.id}`}
                  variant="primary" className="mt-auto">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductCatalog;