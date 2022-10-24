import React, { useContext, useState } from "react";
import { Button, Modal, Navbar } from "react-bootstrap";
import { CartContext } from "../CartContext.jsx";
import { getProductData } from "../productsStore.js";
import CartProduct from "./CartProduct.jsx";


const NavbarComponent = () => {
  const [show, setShow] = useState(false);
  const { items, getTotalCost } = useContext(CartContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.url) {
        window.location.assign(response.url);
      }
    })
  };
  const productsCount = items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">
          E-commerce Store
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Card {productsCount} items</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            productsCount > 0
              ? <>
                <p>Items in your cart:</p>
                {items.map((currentProduct, index) => (
                  <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity}/>
                ))}
                <h1>Total: ${getTotalCost().toFixed(2)}</h1>
                <Button variant="success" onClick={checkout}>Purchase items!</Button>
              </>
              : <h1>There are no items in your cart!</h1>
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;
