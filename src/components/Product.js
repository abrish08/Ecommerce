import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../Rating';
import axios from 'axios';
import { Store } from '../Store';
import { useContext } from 'react';
function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.i_d === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  return (
    <Card>
      <Link to={`/ProductsDescription/${product.name}`}>
        <img
          className="card-img-top"
          src={product.image}
          alt={product.name}
          height="250px"
          width="250px"
        ></img>
      </Link>

      <Card.Body>
        <Link to={`/ProductsDescription/${product.name}`}>
          <Card.Title> {product.name}</Card.Title>
        </Link>
        <Rating> {product.Rating}</Rating>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStore === 0 ? (
          <Button variant="light" disabled>
            {' '}
            out Of Store{' '}
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            {' '}
            ADD TO CART
          </Button>
        )}
      </Card.Body>

      <p></p>
    </Card>
  );
}
export default Product;
