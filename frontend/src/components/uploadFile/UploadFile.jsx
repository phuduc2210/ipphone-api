import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./uploadFile.scss";
import axiosInstance from "../../../axiosConfig";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const UploadFile = () => {
  const [file, setFile] = useState(null);
  const versionRef = useRef();
  // console.log("version", versionRef.current.value);
  const handleFileUpload = async (e) => {
    const uploadFile = e.target.files[0];
    setFile(uploadFile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("version", versionRef.current.value);
    formData.append("apk", file);

    try {
      const response = await axiosInstance.post("/update/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", response.data);
    } catch (err) {
      console.error("Error uploading file", err);
    }
  };

  return (
    <div>
      <h2>Upload your OTA file to Server!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-submit">
          <TextField
            id="outlined-multiline-flexible"
            label="Version"
            inputRef={versionRef}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Import file
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </Button>
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginLeft: "50%", marginTop: "20px" }}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadFile;
