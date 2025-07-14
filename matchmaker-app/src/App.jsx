import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router";
import { Provider } from "react-redux";
import "react-router-dom";

import Root from "./pages/Root/Root";
import Homepage from "./pages/Homepage/Homepage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Adopt from "./pages/Adopt/Adopt";
import Match from "./pages/Match/Match";

import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";

import PetDescriptions from "./components/PetDescriptions/PetDescriptions";
import AdoptPetList from "./components/AdoptPetList/AdoptPetList";
import AdoptRoot from "./components/AdoptRoot/AdoptRoot";
import FavoritePet from "./pages/FavoritePet/FavoritePet";

import store from "./redux/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Homepage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="adopt" element={<Adopt />}>
          <Route index element={<AdoptRoot />} />
          <Route path="pet" element={<PetDescriptions />} />
          <Route path=":species" element={<AdoptPetList />} />
        </Route>
        <Route path="match" element={<Match />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="favorite" element={<FavoritePet />} />
      </Route>
      <Route path="/confirm-email" element={<ConfirmEmail />} />
    </>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
