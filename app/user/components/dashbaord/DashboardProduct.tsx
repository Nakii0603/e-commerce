"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardProduct() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/product/getAllProducts`);
      const fetchedProducts = response.data.products;
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-evenly gap-4 p-4">
        {products.map((product) => (
          <div key={product.productId} className="border bg-white rounded-xl p-4 w-60 shadow">
            <img src={product.image} alt={product.title} className="w-full h-[200px] object-cover" />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">SubCategory: {product.subCategory.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
