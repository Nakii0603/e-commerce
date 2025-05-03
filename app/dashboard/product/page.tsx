import Products from '@/app/shop/components/ProductList';
import ShopNavbar from '@/app/shop/components/ShopNavbar';
import React from 'react'

export default function page() {
  return (
    <div>
      <ShopNavbar />
      <Products />
    </div>
  );
}
