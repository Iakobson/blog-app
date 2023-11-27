"use client";
// цей файл призначений для використання в браузері
// @file: /app/components/Providers.tsx
// надає доступ до даних сесії користувача в додатку
import { SessionProvider } from "next-auth/react";

//  провайдер обгортає вкладені компоненти
export const Providers = ({ children }: { children:React.ReactNode }) => {
  // щоб забезпечити доступ до даних сесії для усіх дочірніх елементів
  return <SessionProvider>{children}</SessionProvider>;
};