import React from 'react';
import { useParams } from 'react-router-dom';
import { NavigationBar } from '../../common';

const RenderProduct = () => {
  const params = useParams();
  // fetch API for product info via product id in params
  console.log(params);

  return (
    <div>
      <NavigationBar />

      <h1>Product Page</h1>
    </div>
  );
};

export default RenderProduct;
