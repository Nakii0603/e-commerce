"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Posts() {
  const [post, setPost] = useState<any[]>([]);

  const getAllPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/post/getAllPost`
      );

      console.log(response.data.posts);
      setPost(response.data.posts);
    } catch (error) {
      console.log("Error during API call");
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="flex gap-2 p-4">
      {post.map((e) => (
        <div
          className="w-[300px] flex flex-col p-2 border-[1px] rounded-md"
          key={e._id}
        >
          <div className="flex justify-center items-center]">
            <img className="w-[100%]" src={e.image} alt={e.title} />
          </div>
          <h2 className="font-bold text-[24px]">{e.title}</h2>
          <p>{e.content}</p>
          <p className="font-bold">{e.price} ₮</p>
        </div>
      ))}
    </div>
  );
}
