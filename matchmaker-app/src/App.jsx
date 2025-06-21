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
  return <RouterProvider router={router} />;
}

export default App;
