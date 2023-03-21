import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import data from '../Data';
import axios from 'axios';
function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Available Products</h1>
      <div className="products">
        {products.map((product) => (
          <div className=" items" key={product.name}>
            <Link to={`/ProductsDescription/${product.name}`}>
              <img
                src={product.image}
                alt={product.name}
                height="250px"
                width="200px"
              ></img>
            </Link>

            <Link to={`/ProductsDescription/${product.name}`}>
              <strong>
                <p> {product.name}</p>
              </strong>
            </Link>

            <p>{product.price}</p>
            <button> ADD TO CART</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
