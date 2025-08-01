import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router";
import { Provider } from "react-redux";
import "react-router-dom";

import Root from "./pages/Root/Root";
import Homepage from "./pages/Homepage";
import Foster from "./pages/Foster";
import Volunteer from "./pages/Volunteer";

import Register from "./modules/auth/pages/Register";
import SignIn from "./modules/auth/pages/SignIn";
import ConfirmEmail from "./modules/auth/pages/ConfirmEmail";
import CreatePetForm from "./modules/pets/components/admin/CreatePetForm/CreatePetForm";
import EditPet from "./modules/pets/components/admin/EditPet/EditPet";

import Match from "./modules/pets/pages/Match";
import Adopt from "./modules/pets/pages/Adopt";
import PetAdmin from "./modules/pets/pages/PetAdmin";
import AdoptPetList from "./modules/pets/components/adopt/AdoptPetList/AdoptPetList";
import AdoptRoot from "./modules/pets/components/adopt/AdoptRoot/AdoptRoot";
import PetDescription from "./modules/pets/components/PetDescription/PetDescription";

import FavoritePet from "./modules/users/pages/FavoritePet";
import UserProfile from "./modules/users/pages/UserProfile";

import store from "./store/store";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Homepage />} />
        <Route path="foster" element={<Foster />} />
        <Route path="volunteer" element={<Volunteer />} />
        <Route path="adopt" element={<Adopt />}>
          <Route index element={<AdoptRoot />} />
          <Route path="pet" element={<PetDescription />} />
          <Route path=":species" element={<AdoptPetList />} />
        </Route>
        <Route path="match" element={<Match />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="favorite" element={<FavoritePet />} />
        <Route path="petadmin" element={<PetAdmin />}>
          <Route path="create" element={<CreatePetForm />} />
          <Route path="edit" element={<EditPet />} />
        </Route>
        <Route path="user-profile" element={<UserProfile />} />
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
