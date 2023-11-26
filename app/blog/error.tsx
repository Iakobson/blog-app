"use client";
// app/blog/eror.tsx

/*
 файл призначений для використання на клієнтській стороні (браузері)
  і не буде виконуватися на стороні сервера
*/

// компонент приймає пропс "error", який містить об'єкт помилки типу "Error"
export default function ErrorWrapper({ error }: { error:Error }) {
  // відображає повідомлення про помилку
  return <h1>Oops!!! {error.message}</h1>;
}