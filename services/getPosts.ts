// @file: /services/getPosts.ts
// функція для отримання всіх постів
export const getAllPosts = async () => {
  // запит до маршруту
  const response = await fetch("/api/posts");
  // в разі неуспішності отримання даних викидається помилка
  if (!response.ok) throw new Error("Unable to fetch posts.");
  // повернення даних у форматі JSON
  return response.json();
};

// функція отримання постів за пошуковим запитом
export const getPostsBySearch = async (search: string) => {
  // запит до маршруту з параметром пошуку
  const response = await fetch(`/api/posts?q=${search}`);
  // в разі неуспішності отримання даних викидається помилка
  if (!response.ok) throw new Error("Unable to fetch such posts.");
  // повернення даних у форматі JSON
  return response.json();
};