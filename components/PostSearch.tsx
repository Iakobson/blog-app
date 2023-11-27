"use client";
// @file: /app/components/PostSearch.tsx
// для отримання даних з сервера і автоматичного кешування цих даних
import useSWR from "swr";
import { FormEventHandler, useState } from "react";
import { getPostsBySearch } from "@/services/getPosts";

const PostSearch = () => {
  // для здійснення запиту на "/api/posts" та оновлення даних після пошуку
  const { mutate } = useSWR("posts");
  // для збереження значення пошукового запиту користувача
  const [search, setSearch] = useState("");
  // обробник події відправки форми
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    // отримання постів за пошуковим запитом
    const posts = await getPostsBySearch(search);
    // оновлення даних за допомогою хука з useSWR
    mutate(posts);
  };

  return (
    // форма для пошуку постів
    <form onSubmit={handleSubmit}>
      {/* поле введення пошукового запиту */}
      <input
        type="search"
        placeholder="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {/* кнопка для відправки форми */}
      <button type="submit">Search</button>
    </form>
  );
};

export { PostSearch };
