import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./versions.scss";
import moment from "moment/moment";

const Versions = () => {
  const [allVersions, setAllVersions] = useState([]);

  useEffect(() => {
    const fetchAllVersions = async () => {
      try {
        const res = await axiosInstance.get("/update/all-versions");
        setAllVersions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllVersions();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="table-columns">
            <TableRow className="table-columns">
              <TableCell align="right">File name</TableCell>
              <TableCell align="right">Version</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Created at</TableCell>
            </TableRow>
          </TableHead>
          {allVersions.map((row) => (
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
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};

export default Versions;
