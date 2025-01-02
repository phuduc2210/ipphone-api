import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./style.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Versions from "./components/versions/Versions";
import UploadFile from "./components/uploadFile/UploadFile";
import DownloadFile from "./components/downloadFile/DownloadFile";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/versions",
        element: <Versions />,
      },
      {
        path: "/upload-file",
        element: <UploadFile />,
      },
      {
        path: "/download-file",
        element: <DownloadFile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
