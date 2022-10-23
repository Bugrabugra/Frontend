import React, { useContext } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CartContext } from "../CartContext.jsx";


const ProductCard = ({ product }) => {
  const { items, addOneToCart, getProductQuantity, removeOneFromCart, deleteFromCart } = useContext(CartContext);
  const productQuantity = getProductQuantity(product.id);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {
          productQuantity > 0
            ?
            <>
              <Form as={Row}>
                <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                <Col sm="6">
                  <Button sm="6" className="mx-2" onClick={() => addOneToCart(product.id)}>+</Button>
                  <Button sm="6" className="mx-2" onClick={() => removeOneFromCart(product.id)}>-</Button>
                </Col>
              </Form>
              <Button variant="danger" className="my-2" onClick={() => deleteFromCart(product.id)}>Remove from
                                                                                                   Cart</Button>
            </>

            : <Button variant="primary" onClick={() => addOneToCart(product.id)}>Add to Cart</Button>

        }
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
