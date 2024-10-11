import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Product({ products }) {
  console.log("Hello Products =====> ", products);
  
  return (
    <>
      <Row xs={2} md={3} className="g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id}> {/* Use a unique key for each product */}
              <Card>
                <div style={{display: "flex", alignItems:  "center", justifyContent: "center"}}>
                    <Card.Img style={{width: "300px", height: "400px"}} variant="top" src={product.images[0]} alt={product.title} />
                </div>
                <Card.Body>
                  <Card.Title style={{textAlign: "center"}}>{product.title}</Card.Title>
                  <Card.Text style={{textAlign: "center"}}>
                    {product.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products available</p>
        )}
      </Row>
    </>
  );
}

export default Product;
