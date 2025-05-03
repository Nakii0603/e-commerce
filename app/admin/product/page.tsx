import Products from '../components/ProductList';
import ShopNavbar from '../components/ShopNavbar';
import React from 'react'

export default function page() {
  return (
    <div>
      <ShopNavbar />
      <Products />
    </div>
  );
}
