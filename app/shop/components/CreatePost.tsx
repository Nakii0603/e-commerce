"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!title || !content || !image) {
      setErrorMessage("All fields are required: Title, Content, and Image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/post/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      setSuccessMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      setLoading(false);
      console.error("Error creating post:", error);
      setErrorMessage(
        "An error occurred while creating the post. Please try again."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center  mb-6">Create a order</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg ">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg ">
            details
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-lg ">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full py-2 "
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#FF5349] text-white font-semibold rounded-md"
        >
          {loading ? "Uploading..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
