import { useState } from "react";
import SideBar from "../Custom/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import CustomButton from "../Custom/Button/CustomButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CellsDetailed = () => {
  const location = useLocation();
  const { cell } = location.state;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [discipleData, setDiscipleData] = useState({
    name: "",
    level: "New Disciples",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDiscipleData({
      ...discipleData,
      [event.target.name]: event.target.value,
    });
  };

  const AddNewDisciple = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/disciples/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: discipleData.name,
            level: discipleData.level,
            ownerCell: cell._id,
          }),
        }
      );
      const data = await response.json();
      console.log("New disciple created:", data);
      closeModal();
    } catch (error) {
      console.error("Error creating new disciple:", error);
    }
  };

  const disciples = [
    { id: 1, name: "Disciple 1", level: "New Disciples" },
    { id: 2, name: "Disciple 2", level: "School of Leaders" },
    { id: 3, name: "Disciple 3", level: "School of Leaders" },
    { id: 4, name: "Disciple 4", level: "School of Leaders" },
    { id: 5, name: "Disciple 5", level: "School of Leaders" },
    { id: 6, name: "Disciple 6", level: "School of Leaders" },
    { id: 7, name: "Disciple 7", level: "School of Leaders" },
    { id: 8, name: "Disciple 8", level: "School of Leaders" },
    { id: 9, name: "Disciple 9", level: "School of Leaders" },
    { id: 10, name: "Disciple 10", level: "School of Leaders" },
    { id: 11, name: "Disciple 11", level: "School of Leaders" },
    { id: 12, name: "Disciple 12", level: "School of Leaders" },
    { id: 13, name: "Disciple 13", level: "School of Leaders" },
    { id: 14, name: "Disciple 14", level: "School of Leaders" },
    { id: 15, name: "Disciple 15", level: "School of Leaders" },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      <div className="page-title">{cell.name}</div>

      <div className="disciples-table-container">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="disciples-table-head">
                <StyledTableRow className="disciples-table-head">
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

      <div className="add-cell-box" onClick={openModal}>
        <AddCircleIcon fontSize="large" />
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="modal-container">
          <div className="modal-form">
            <div className="close-modal-button">
              {" "}
              <CloseIcon
                fontSize="large"
                className="close-button"
                onClick={() => closeModal()}
              />
            </div>
            <div className="modal-top">
              <div className="page-title">Add New Disciple</div>
            </div>
            <div>
              <div>
                <div className="password-input-container custom-input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="modal-input"
                    value={discipleData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="password-input-container custom-input">
                  <select
                    name="type"
                    value={discipleData.level}
                    onChange={handleChange}
                  >
                    <option value="Generic">Consolidation</option>
                    <option value="Bible Club">School of Leaders</option>
                    <option value="Bible Club">New Disciples</option>
                  </select>
                </div>
                <div className="custom-button-container">
                  <CustomButton
                    border="none"
                    color="white"
                    padding="1rem"
                    radius="5px"
                    label="Add Disciple"
                    bgcolor="var(--primary-color)"
                    width="320px"
                    fontFamily="var(--main-font)"
                    fontSize="1rem"
                    marginTop="1rem"
                    cursor="pointer"
                    onClick={AddNewDisciple}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CellsDetailed;
