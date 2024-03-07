import { useState, useEffect } from "react";
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

interface Disciple {
  _id: string;
  name: string;
  level: string;
  ownerCell: string;
}

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
  const [disciples, setDisciples] = useState<Disciple[]>([]);
  const [discipleData, setDiscipleData] = useState({
    name: "",
    level: "New Disciples",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDisciple, setSelectedDisciple] = useState<Disciple | null>(
    null
  );

  useEffect(() => {
    fetchDisciples();
  }, []); // Fetch disciples when component mounts

  const fetchDisciples = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/disciples");
      const data = await response.json();
      // Filter disciples based on ownerCell
      const cellDisciples = data.filter(
        (disciple: Disciple) => disciple.ownerCell === cell._id
      );
      setDisciples(cellDisciples);
    } catch (error) {
      console.error("Error fetching disciples:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const openEditModal = (disciple: Disciple) => {
    setSelectedDisciple(disciple);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setDiscipleData({ name: "", level: "New Disciples" });
    setIsEditModalOpen(false);
  };

  const updateDisciple = async () => {
    try {
      if (!selectedDisciple || !selectedDisciple._id) {
        console.error("Selected disciple or its ID is undefined.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/disciples/${selectedDisciple._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: selectedDisciple._id, // Include _id field in the request body
            name: selectedDisciple.name,
            level: selectedDisciple.level,
            ownerCell: selectedDisciple.ownerCell,
          }),
        }
      );
      const data = await response.json();
      console.log("Disciple updated:", data);
      closeModal();
    } catch (error) {
      console.error("Error updating disciple:", error);
    }
  };

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
      <div className="page-title detailed">{cell.name}</div>
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
                    <StyledTableRow key={disciple._id}>
                      <StyledTableCell>{disciple.name}</StyledTableCell>
                      <StyledTableCell>{disciple.level}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton onClick={() => openEditModal(disciple)}>
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
      {/* Render edit modal */}
      <Modal open={isEditModalOpen} onClose={closeEditModal}>
        <div className="modal-container">
          {/* Modal content for editing disciple details */}
          {selectedDisciple && (
            <div className="modal-form">
              <div className="close-modal-button">
                <CloseIcon
                  fontSize="large"
                  className="close-button"
                  onClick={closeEditModal}
                />
              </div>
              <div className="modal-top">
                <div className="page-title">Edit Disciple</div>
              </div>
              <div>
                <div>
                  <div className="password-input-container custom-input">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="modal-input"
                      value={selectedDisciple.name}
                      onChange={(e) =>
                        setSelectedDisciple({
                          ...selectedDisciple,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="password-input-container custom-input">
                    <select
                      name="type"
                      value={selectedDisciple.level}
                      onChange={(e) =>
                        setSelectedDisciple({
                          ...selectedDisciple,
                          level: e.target.value,
                        })
                      }
                    >
                      <option value="Consolidation">Consolidation</option>
                      <option value="School of Leaders">
                        School of Leaders
                      </option>
                      <option value="New Disciples">New Disciples</option>
                    </select>
                  </div>
                  <div className="custom-button-container">
                    <CustomButton
                      border="none"
                      color="white"
                      padding="1rem"
                      radius="5px"
                      label="Update Disciple"
                      bgcolor="var(--primary-color)"
                      width="320px"
                      fontFamily="var(--main-font)"
                      fontSize="1rem"
                      marginTop="1rem"
                      cursor="pointer"
                      onClick={() => selectedDisciple && updateDisciple()}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CellsDetailed;
