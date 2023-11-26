// @file: middleware.ts
// надає основні функціональності middleware
export { default } from 'next-auth/middleware'

// налаштування middleware для захисту певних маршрутів
export const config = { matcher: ['/profile', '/protected/:path*'] }
// вказує на маршрути, які потребують автентифікації користувача