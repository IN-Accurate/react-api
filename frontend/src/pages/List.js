import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import axios from "axios";

const columns = [
  { id: "name", label: "NAME", minWidth: 170 },
  { id: "email", label: "EMAIL", minWidth: 100 },
  { id: "status", label: "STATUS", minWidth: 30, align: "center" },
];

export default function List() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [listOfCompanies, setListOfCompanies] = useState([]);

  //https://testing-api.free.beeceptor.com/ - to test the style of 'status' when inactive

  useEffect(() => {
    axios.post('https://demo2211087.mockable.io/mock').then((response) => {
      let data = response.data.companies;

      setListOfCompanies(data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  key={i}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfCompanies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((listOfCompanies, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column, i) => {
                      const value = listOfCompanies[column.id];
                      return (
                        <TableCell
                          key={i}
                          align={column.align}
                          style={{
                            backgroundColor:
                              column.id === "status" &&
                              ((listOfCompanies[column.id] === "active" &&
                                "green") ||
                                (listOfCompanies[column.id] === "inactive" &&
                                  "grey")),

                            borderRadius: column.id === "status" && 8,

                            color: column.id === "status" && "white",
                            padding: column.id === "status" && "3px ",
                          }}
                        >
                          <Typography>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={listOfCompanies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
