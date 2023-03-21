import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import ListGroup from 'react-bootstrap/esm/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStore < quantity) {
      window.alert('productout of store');
      return;
    }
    ctxDispatch({
      type: 'ADD_TO_CART_ITEM',
      payload: { ...item, quantity },
    });
  };

  const RemoveFromCartHandler = (item) => {
    ctxDispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: item });
  };
  const CheckOutHandler = () => {
    navigate('/Signin?redirect=/Shipping');
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <h1> Products in the Cart</h1>

      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              {' '}
              No product added to cart {''}
              <Link to="/">Back to shop</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.slug}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link to={`/ProductsDescription/${item.name}`}>
                        {' '}
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      {''}
                      <span>{item.quantity}</span>
                      {''}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStore}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                      {''}
                    </Col>

                    <Col md={3}>Price: {item.price}</Col>

                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => RemoveFromCartHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Total Items:({cartItems.reduce((a, c) => a + c.quantity, 0)}
                    {''}) <br />
                    Total Price: $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className=""
                    type="button"
                    variant="primary "
                    disabled={cartItems.length === 0}
                    onClick={CheckOutHandler}
                  >
                    {' '}
                    Procced To CheckOut
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
