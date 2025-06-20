import { useState } from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router";

import Root from "./pages/Root/Root";
import Homepage from "./pages/Homepage/Homepage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Adopt from "./pages/Adopt/Adopt";
import Match from "./pages/Match/Match";

import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";

import reactLogo from "./assets/images/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Homepage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="adopt" element={<Adopt />} />
        <Route path="match" element={<Match />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);

function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1 class>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  return <RouterProvider router={router} />;
}

export default App;
