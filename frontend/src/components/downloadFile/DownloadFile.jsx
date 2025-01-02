import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import "../versions/versions.scss";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment/moment";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";

const DownloadFile = () => {
  const [otaFiles, setOtaFiles] = useState([]);

  useEffect(() => {
    const fetchAllVersions = async () => {
      try {
        const res = await axiosInstance.get("/update/all-versions");
        setOtaFiles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllVersions();
  }, []);

  const handleDownload = async (fileName) => {
    try {
      const response = await axiosInstance.get(`/update/download/${fileName}`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: response.data.type });
      saveAs(blob, fileName);
      console.log("Download file successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2>Download OTA File</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="table-columns">
            <TableRow className="table-columns">
              <TableCell align="right">File name</TableCell>
              <TableCell align="right">Version</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Download</TableCell>
            </TableRow>
          </TableHead>
          {otaFiles.map((row) => (
            <TableBody key={row.id}>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="right"
                  className="file-selected"
                  sx={{ color: "rgb(47, 0, 255)" }}
                >
                  {row.file_name}
                </TableCell>
                <TableCell align="right">{row.version}</TableCell>
                <TableCell align="right">{row.size} MB</TableCell>
                <TableCell align="right">
                  {moment(row.created_at).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell align="right">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(row.file_name)}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};

export default DownloadFile;
