// @file: app/page.tsx
// це головна (базова) сторінка сайту
export default function Home() {
  return (
   <>
     <h1>Welcome to Next Blog App</h1>
     <p>
        We use:
      </p>
      <ul>
        <li>data from JSON Placeholder Site</li>
        <li>data obtained from our API</li>
      </ul>
      <p>
        to emulate working with the API.
      </p>
   </>
  )
}
