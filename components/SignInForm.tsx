"use client";
// @file: /components/SignInForm.tsx
// для маніпулювання маршрутами у відповідь на дії користувача
import { useRouter } from "next/navigation";
// для входу користувача за допомогою облікових даних з форми
import { signIn } from "next-auth/react";
// тип для обробника події форми
import type { FormEventHandler } from "react";

const SignInForm = () => {
  // ініціалізація роутера для зміни маршруту
  const router = useRouter();
  // обробник події відправки форми входу
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
    // запобігання автоматичній відправці форми
    event.preventDefault();
    // отримання даних з форми
    const formData = new FormData(event.currentTarget);
    // виклик функції для входу з обліковими даними користувача
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      // вимкнення автоматичного перенаправлення після входу
      redirect: false,
    });
    // перевірка результату входу користувача та дій після входу
    if (res && !res.error) {
      // перенаправлення на сторінку профілю після успішного входу
      router.push("/profile");
    } else {
      // виведення помилки в консоль у разі невдалого входу
      console.log(res);
    }
  };

  return (
    // форма для входу користувача
    <form onSubmit={handleSubmit} className="login-form">
      {/* поле для введення email */}
      <input type="email" name="email" required />
      {/* поле для введення паролю */}
      <input type="password" name="password" required />
      {/* кнопка входу */}
      <button type="submit">Sign In</button>
    </form>
  );
};

export { SignInForm };