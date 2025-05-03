import React from 'react'
import DashboardProduct from '../components/dashbaord/DashboardProduct';
import Navbar from '../components/auth/Navbar';

export default function page() {
  return (
    <div >
      <Navbar />
      <DashboardProduct />
    </div>
  );
}
