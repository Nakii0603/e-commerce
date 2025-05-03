import React from 'react'
import DashboardProduct from '../components/dashbaord/DashboardProduct';
import Navbar from '../components/Navbar';

export default function page() {
  return (
    <div className="bg-gray-100 h-full">
      <Navbar />
      <DashboardProduct />
    </div>
  );
}
