import "./settings.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Rightbar from "../../components/rightbar/Rightbar";
import { Image, Person } from "@mui/icons-material";
import axiosInstance from "../../config";

export default function Settings() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState({ photo: user.profilePicture });
  const [coverimg, setCoverimg] = useState({ coverPhoto: user.coverPicture });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [from, setFrom] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      city,
      from,
      //   relationship
    };
    if (file) {
      updatedUser.profilePicture = file.photo;
      updatedUser.coverPicture = coverimg.coverPhoto;
      try {
        await axiosInstance.put("/users/" + user._id, updatedUser);
        localStorage.removeItem("user");
        window.location.replace("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const coverimg = e.target.files[0];
    const base64 = await convertToBase64(coverimg);
    console.log(base64);
    setFile({ ...coverimg, photo: base64 });
  };

  const handleFileUploadCoverImg = async (e) => {
    const coverPic = e.target.files[0];
    const base64 = await convertToBase64(coverPic);
    console.log(base64);
    setCoverimg({ ...coverPic, coverPhoto: base64 });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file.photo === "" ? PF + "person/noAvatar.png" : file.photo}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon">
                <Person />
              </i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => handleFileUpload(e)}
              //   value={file.photo}
            />
          </div>
          <label>Cover Picture</label>
          <div className="settingsPP">
            <img
              src={
                coverimg.coverPhoto === ""
                  ? PF + "person/background-default.jpg"
                  : coverimg.coverPhoto
              }
              alt=""
            />
            <label htmlFor="fileCoverPictureInput">
              <i className="settingsPPIcon">
                <Image />
              </i>
            </label>
            <input
              id="fileCoverPictureInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => handleFileUploadCoverImg(e)}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            // value={user.username}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            // value={user.email}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            // value={user.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>City</label>
          <input
            type="text"
            placeholder={user.city === "" && "Enter your city you come from"}
            // value={user.city ?? ""}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>From</label>
          <input
            type="text"
            placeholder={user.from === "" && "Enter your country you come from"}
            // value={user.from ?? ""}
            onChange={(e) => setFrom(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Rightbar />
    </div>
  );
}
