"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateProduct = () => {
  const [shopId, setShopId] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    price: "",
    category: "Electronics",
    subCategory: [] as string[],
    createdBy: "",
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedShopId = localStorage.getItem("shopId");
    if (storedShopId) {
      setShopId(storedShopId);
      setFormData((prev) => ({ ...prev, createdBy: storedShopId }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData((prev) => ({ ...prev, subCategory: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { title, content, price, category, subCategory, createdBy, image } = formData;

    if (!title || !content || !price || !category || !createdBy || !image) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("content", content);
    formDataToSend.append("price", price);
    formDataToSend.append("category", category);
    subCategory.forEach((item) => formDataToSend.append("subCategory", item));
    formDataToSend.append("createdBy", createdBy);
    formDataToSend.append("image", image);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/product/upload`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      if (res.data.success) {
        setSuccessMessage("Product created successfully!");
        setFormData({
          title: "",
          content: "",
          price: "",
          category: "Electronics",
          subCategory: [],
          createdBy: shopId || "",
          image: null,
        });

        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      } else {
        setErrorMessage(res.data.message || "Failed to create product.");
      }
    } catch (err: any) {
      setLoading(false);
      console.error("Upload error:", err);
      setErrorMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Create a Product</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium">
            Price
          </label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-medium">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            {["Electronics", "Clothing", "Books", "Furniture", "Toys", "Sports", "Beauty"].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subCategory" className="block text-lg font-medium">
            Subcategories
          </label>
          <select
            multiple
            name="subCategory"
            value={formData.subCategory}
            onChange={handleSubCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md h-40"
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
        </div>

        <div>
          <label htmlFor="image" className="block text-lg font-medium">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            ref={imageInputRef}
            onChange={handleImageChange}
            accept="image/*"
            required
            className="w-full py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#FF5349] text-white font-semibold rounded-md"
        >
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
