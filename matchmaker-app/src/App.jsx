import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router";
import { Provider } from "react-redux";
import "react-router-dom";

import Root from "./pages/Root/Root";
import Homepage from "./pages/Homepage/Homepage";
import Foster from "./pages/Foster/Foster";
import Volunteer from "./pages/Volunteer/Volunteer";

// import Match from "./pages/Match/Match";
import Match from "./pages/Match";
// import SignIn from "./pages/SignIn/SignIn";
// import Register from "./pages/Register/Register";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";

import Adopt from "./pages/Adopt";
import AdoptPetList from "./modules/pets/components/adopt/AdoptPetList/AdoptPetList";
import AdoptRoot from "./modules/pets/components/adopt/AdoptRoot/AdoptRoot";
import PetDescription from "./modules/pets/components/PetDescription/PetDescription";
import FavoritePet from "./pages/FavoritePet/FavoritePet";
import PetAdmin from "./modules/pets/pages/PetAdmin";
import CreatePetForm from "./modules/pets/components/admin/CreatePetForm/CreatePetForm";
import EditPet from "./modules/pets/components/admin/EditPet/EditPet";
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
