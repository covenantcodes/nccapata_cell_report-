import { useState, useEffect } from "react";
import SideBar from "../Custom/Sidebar/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  TablePagination,
  tableCellClasses,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
    fontFamily: "Poppins",
    width: "25%",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Poppins",
    fontSize: 14,
    width: "25%",
    textAlign: "center",
  },
}));

const API_URL = "http://localhost:8080/api/";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Disciples = () => {
  const [disciples, setDisciples] = useState<
    { id: number; name: string; level: string }[]
  >([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchDisciples();
  }, []); // Fetch disciples when component mounts

  const fetchDisciples = async () => {
    try {
      const userId = getUserId(); // Retrieve user ID from storage
      const response = await fetch(
        API_URL + `disciples/createdBy/${userId}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch disciples: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setDisciples(data);
    } catch (error) {
      console.error("Error fetching disciples:", error);
    }
  };

  const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData.id;
    }
    return ""; // Return default value if user data not found
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <div className="cells-detailed-container">
      <SideBar />

      <div className="disciples-table-container">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
  {disciples
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((disciple) => (
      <StyledTableRow key={disciple.id}>
        <StyledTableCell>{disciple.name}</StyledTableCell>
        <StyledTableCell>{disciple.level}</StyledTableCell>
        <StyledTableCell>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
    ))}
</TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={disciples.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Disciples;
