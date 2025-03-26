import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ProductsPage from '@/pages/ProductsPage';

// TODO: make /products main route
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
