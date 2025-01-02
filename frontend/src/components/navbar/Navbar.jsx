// import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
// import { AuthContext } from "../context/authContext";

const Navbar = () => {
  //   const { currentUser, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const res = await axiosInstance.get("/users/all");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUser();
  }, []);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDLJklFaRZjXBpTuBtfpYqVei8F5UYvBZV2A&s"
              alt=""
            />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/">
            <h6>Dashboard</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>Devices</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>Campaigns</h6>
          </Link>
          <Link className="link" to="/upload-file">
            <h6>Import OTA File</h6>
          </Link>
          <Link className="link" to="/download-file">
            <h6>Download OTA file</h6>
          </Link>
          <Link className="link" to="/versions">
            <h6>All Update Versions</h6>
          </Link>
          {/* <span>{currentUser?.username}</span> */}
          {/* {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )} */}
          <Link className="link" to="/login">
            Login
          </Link>
          <span className="write">
            <Link className="link" to="/register">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
