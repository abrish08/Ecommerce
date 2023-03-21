import './App.css';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductsDescription from './Pages/ProductsDescription';
function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="habesha">
          <Link to="/">Habesha</Link>
        </header>
        <main>
          <Routes>
            <Route
              path="/ProductsDescription/:name"
              element={<ProductsDescription />}
            ></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
