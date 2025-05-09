"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [productsId, setProductsId] = useState<string | null>(null); // Use productsId for update/delete
  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    content: "",
    price: "",
    category: "",
    subCategory: [] as string[],
    image: "" as any,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const router = useRouter();

  // Fetch all products
  const getAllProducts = async () => {
    const shopId = localStorage.getItem("shopId");
    if (!shopId) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product/getAllShopPruduct/${shopId}`
      );
      const fetchedProducts = response.data.products;
      setProducts(fetchedProducts);
      console.log(fetchedProducts);

      sessionStorage.setItem("shopProducts", JSON.stringify(fetchedProducts));
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle delete product
  const handleDelete = async () => {
    if (!productsId) return;

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/product/delete/${productsId}`);

      if (response.status === 200) {
        // Remove the deleted product from the state
        setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productsId));
        console.log("Product deleted successfully");
      }
      // Close the delete modal after the product is deleted
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  // Handle update product
  const handleUpdate = async () => {
    if (!productsId) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", updatedProduct.title);
    formDataToSend.append("content", updatedProduct.content);
    formDataToSend.append("price", updatedProduct.price);
    formDataToSend.append("category", updatedProduct.category);
    updatedProduct.subCategory.forEach((item) => formDataToSend.append("subCategory", item));
    formDataToSend.append("image", updatedProduct.image instanceof File ? updatedProduct.image : "");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product/update/${productsId}`,
        formDataToSend
      );

      if (response.status === 200) {
        const updatedProductData = response.data.product;
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === updatedProductData.productId ? updatedProductData : product
          )
        );
        console.log("Product updated successfully");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  // Handle input change for regular fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUpdatedProduct((prev) => ({ ...prev, image: file }));
  };

  // Handle subCategory change
  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setUpdatedProduct((prev) => ({ ...prev, subCategory: selected }));
  };

  // Open modal and set the product for editing
  const openModal = (product: any) => {
    setProductsId(product.productId); // Set the productsId for delete and update
    setUpdatedProduct({
      title: product.title,
      content: product.content,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory, // Ensure this is an array
      image: product.image, // This will be either a string (URL) or File (if the user uploads)
    });
    setIsModalOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (productId: string) => {
    setProductsId(productId); // Set productsId for deletion
    setIsDeleteModalOpen(true);
  };

  // Close modals
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 p-4">
        {products.map((product) => (
          <div key={product.productId} className="border p-4 w-60 shadow">
            <img src={product.image} alt={product.title} className="w-full h-[200px] object-cover" />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">SubCategory: {product.subCategory.join(", ")}</p>
            <div className="flex justify-between">
              <button onClick={() => openModal(product)} className="mt-2 text-blue-500">
                Edit
              </button>
              <button onClick={() => openDeleteModal(product.productId)} className="mt-2 text-red-500">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="text"
                name="title"
                value={updatedProduct.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-2 border"
              />
              <textarea
                name="content"
                value={updatedProduct.content}
                onChange={handleInputChange}
                placeholder="Content"
                className="w-full p-2 border"
              />
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full p-2 border"
              />
              <select
                name="category"
                value={updatedProduct.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                {["Electronics", "Clothing", "Books", "Furniture", "Toys", "Sports", "Beauty"].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                multiple
                name="subCategory"
                value={updatedProduct.subCategory}
                onChange={handleSubCategoryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md h-[40]"
              >
                {[
                  "Mobiles",
                  "Laptops",
                  "Cameras",
                  "Smart Watches",
                  "Headphones",
                  "TV",
                  "Smart Home Devices",
                  "Male",
                  "Female",
                  "Kids",
                  "Fiction",
                  "Non-fiction",
                  "Educational",
                  "Living Room",
                  "Bedroom",
                  "Office",
                  "Action Figures",
                  "Puzzles",
                  "Educational Toys",
                  "Gym",
                  "Outdoor",
                  "Footwear",
                  "Fitness Equipment",
                  "Cycling",
                  "Skincare",
                  "Haircare",
                  "Makeup",
                  "Perfumes",
                ].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <input type="file" name="image" onChange={handleImageChange} className="w-full p-2 border" />
              <div className="flex justify-between">
                <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-between mt-4">
              <button onClick={closeDeleteModal} className="bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="bg-blue-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
