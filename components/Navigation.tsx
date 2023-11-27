"use client";
// @file: /app/components/Navigation.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

// типу для кожного пункту навігації
type NavLink = {
  label:string;
  href:string;
};
// тип для пропсів (вхідних параметрів) компонента
type Props = {
  navLinks:NavLink[];
};
// основний компонент навігації
const Navigation = ({ navLinks }:Props) => {
  // хук для отримання поточного шляху (URL) сторінки
  const pathname = usePathname();
  const session = useSession();
  console.log(session);

  return (
    <>
      {/* проходження по кожному пункту навігації і генерація посилань */}
      {navLinks.map((link) => {
        // визначення активного стану навігації на основі поточного URL
        // змінна отримує true або false в залежності чи збігаються ці два значення
        const isActive = pathname === link.href;

        return (
          // компонента для створення посилань
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? "active" : ""}
          >
            {/* текст або мітка посилання */}
            {link.label}
          </Link>
        );
      })}
      {/* відображення посилання на профіль, якщо користувач увійшов в систему */}
      {session?.data && <Link href="/profile">Profile</Link>}
      {/* перевірка сесії користувача для відображення відповідних посилань */}
      {session?.data ? (
        // посилання для виходу з облікового запису активного користувача
        <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </Link>
      ) : (
        // посилання для входу, якщо користувач не увійшов в систему
        <Link href="/signin">SignIn</Link>
      )}
    </>
  );
};

export { Navigation };