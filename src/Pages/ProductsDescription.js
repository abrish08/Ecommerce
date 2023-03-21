import axios from 'axios';
import '../App.css';
import { useContext, useEffect, useReducer } from 'react';
import Card from 'react-bootstrap/esm/Card';
import Badge from 'react-bootstrap/esm/Badge';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom';
import Rating from '../Rating';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../Utils';
import { Store } from '../Store';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCESESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductsDescription() {
  const params = useParams();
  const { name } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST ' });

      try {
        const result = await axios.get(`/api/products/name/${name}`);
        dispatch({ type: 'FETCH_SUCESESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, [name]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCarthandler = async () => {
    const existItem = cart.cartItems.find((x) => x.i_d === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStore < quantity) {
      window.alert('productout of store');
      return;
    }
    ctxDispatch({
      type: 'ADD_TO_CART_ITEM',
      payload: { ...product, quantity },
    });
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.slug}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Helmet>
                <title> {product.name} </title>
              </Helmet>
              <Rating>{product.Rating}</Rating>
            </ListGroup.Item>
            <ListGroup.Item>{product.price}</ListGroup.Item>
            <ListGroup.Item>Discription : Original and best</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item variant="flush">
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item variant="flush">
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStore > 0 ? (
                        <Badge bg="success">Available</Badge>
                      ) : (
                        <Badge bg="danger">Un Available</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStore > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary" onClick={addToCarthandler}>
                        ADD TO CART
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ProductsDescription;
