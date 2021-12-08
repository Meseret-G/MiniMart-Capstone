import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProducts } from '../api/ProductData';
import ProductCard from '../components/ProductCards';

export default function ProductView({ user }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getProducts().then((productArray) => {
      console.warn(productArray);
      if (isMounted) setProducts(productArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      <>
        {user?.isAdmin && <Link to="/createproduct"> Create Product </Link>}
        {products.map((product) => (
          <ProductCard
            key={product.firebaseKey}
            product={product}
            setProducts={setProducts}
            user={user}
          />
        ))}
      </>
    </div>
  );
}
ProductView.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};
ProductView.defaultProps = {
  user: null,
};