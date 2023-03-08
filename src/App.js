import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UnAuthenticated from "./components/UnAuthenticated";
import Protected from "./components/Protected";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/login"
          element={
            <UnAuthenticated>
              <Login />
            </UnAuthenticated>
          }
        />
        <Route
          path="/register"
          element={
            <UnAuthenticated>
              <Register />
            </UnAuthenticated>
          }
        />
      </Route>
    )
  );

  return (
    <div className="App App box-border min-h-screen bg-specialGray-200 font-josefin dark:bg-purply-900 dark:text-specialGray-200">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const Root = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};
