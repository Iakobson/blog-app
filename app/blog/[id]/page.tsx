// app/blog/[id]/page.tsx
// так позначаємо [динамічну] сторінку
import { Metadata } from "next";

async function getData(id:string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        // дані будуть кешовані на 60 сек для поста з конкретним id
        revalidate: 60,
      },
    }
  );
  // розпакування JSON-відповіді в об'єкт
  return response.json();
}

// визначаємо тип для "Props"
type Props = {
  params: { // єдина властивість, яка є об'єктом
    id:string; // "id" має бути рядком
  };
};

// функція визначає метадані сторінки для конкретного поста
export async function generateMetadata(
  {params: { id }}:Props
): Promise<Metadata> {
  // для отримання даних конкретного поста
  const post = await getData(id);

  return {
    // визначення мета-заголовку сторінки
    title: post.title,
  };
}

// як параметр очікується об'єкт типу Props
// використовується деструктуризація для отримання значення id
// { params: { id } } === props.params.id
export default async function Post({ params: { id } }:Props) {
  // для отримання даних конкретного поста
  const post = await getData(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}