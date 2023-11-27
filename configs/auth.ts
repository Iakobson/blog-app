// @file: /app/auth.ts
// об'єкт, що містить налаштування аутентифікації
import type { AuthOptions, User } from 'next-auth';
// провайдер для Google Sign-In
import GoggleProvider from 'next-auth/providers/google';
// провайдер авторизації за допомогою облікових даних
import Credentials from 'next-auth/providers/credentials';
import { users } from '../data/users';

// конфігурація аутентифікації (AuthOptions) для next-auth
export const authConfig:AuthOptions = {
  // використовуються для різних методів авторизації 
  providers: [
    // провайдер з використанням отриманих ключів доступу з оточення
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // провайдер авторизації за допомогою облікових даних (локальна авторизація)
    Credentials({
      credentials: {
        email: { label:'email', type:'email', required:true },
        password: { label:'password', type:'password', required:true },
      },
      // логіка авторизації: перевірка введених облікових даних у масиві users
      async authorize(credentials) {
        // перевірка наявності облікових даних
        if (!credentials?.email || !credentials.password) return null;
        // пошук користувача по email
        const currentUser = users.find(user => user.email === credentials.email)

        if (currentUser && currentUser.password === credentials.password) {
          // вилучення паролю перед поверненням даних
          const { password, ...userWithoutPass } = currentUser;
          // повернення об'єкту користувача без паролю
          return userWithoutPass as User;
        }
        // якщо користувач не знайдений або пароль неправильний
        return null
      }
    })
  ],
  // налаштування сторінки для входу користувача
  pages: {
    signIn: '/signin'
  }
}