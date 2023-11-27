"use client";
// @file: /app/components/Posts.tsx
// для отримання даних з сервера і автоматичного кешування цих даних
import useSWR from "swr";
import Link from "next/link";
import { getAllPosts } from "@/services/getPosts";

const Posts = () => {
  // використання хука для здійснення запиту на "/api/posts"
  const { data: posts, isLoading } = useSWR("posts", getAllPosts);
  // перевірка, чи дані завантажуються
  return isLoading ? (
    <h3>Loading... </h3> // якщо дані ще завантажуються
  ) : (
    <ul>
      {/* відображення списку постів, якщо дані вже доступні */}
      {posts.map((post:any) => (
        <li key={post.id}>
          {/* створення посилання на конкретний пост */}
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export { Posts };