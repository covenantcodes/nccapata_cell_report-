import { useState, MouseEventHandler, useEffect } from "react";
import SideBar from "../Custom/Sidebar/Sidebar";
import "./cells.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import CustomButton from "../Custom/Button/CustomButton";
import CellService, { CellData } from "../services/cell.service";
import loadingGif from "../../img/loader.gif";
import networkGif from "../../img/network.gif";
import { useNavigate } from "react-router-dom";

interface CellProps {
  userId: string;
}

const Cells: React.FC<CellProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cellData, setCellData] = useState({
    name: "",
    type: "Generic",
    location: "",
  });

  const [cells, setCells] = useState<CellData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCellsByUserId();
  }, []);

  const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData.id;
    }
  };

  const fetchCellsByUserId = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = getUserId();
      const userCells = await CellService.getCellsByUserId(userId);
      setCells(userCells);
    } catch (error) {
      console.error("Error fetching cells:", error);
      setError("Error fetching cells. Please try again later.");
    } finally {
      setIsLoading(false);
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
    setCellData({ ...cellData, [event.target.name]: event.target.value });
  };

  const handleAddCell: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        "x-access-token": accessToken,
      };

      // Add new cell
      const newCell = await CellService.AddNewCell(
        cellData.name,
        cellData.type,
        cellData.location,
        headers
      );

      // Check if newCell.data contains the newly added cell data
      if (newCell.data) {
        // Update state with the new cell data
        setCells((prevCells) => [...prevCells, newCell.data]);
        console.log("Cell added");
        closeModal();

        // Clear form fields by resetting the form data state
        setCellData({
          name: "",
          type: "Generic",
          location: "",
        });
      } else {
        console.error("No cell data returned");
      }
    } catch (error) {
      console.error("Error adding cell:", error);
    }
  };

  const navigate = useNavigate();

  const handleCellClick = (cell: CellData) => {
    navigate("/CellsDetailed", { state: { cell } });
  };
  

  return (
    <div className="cells-main-container">
      <SideBar />

      <div className="cells-container">
        <div className="page-title">My Cells</div>
        {isLoading && (
          <div className="loading-modal">
            <div className="loading-spinner"></div>
            <img src={loadingGif} alt="Loading...." />
          </div>
        )}
        {error && (
          <div className="loading-modal">
            <div className="loading-spinner"></div>
            <img src={networkGif} alt="...." className="error-gif" />
            <div className="error-label">Network Error</div>
          </div>
        )}
        {!isLoading && !error && (
          <div className="cells-box-container">
            {/* Map through cells and display each cell */}
            {cells.map((cell, index) => (
              <div
                key={cell.name + index}
                className="cells-box"
                onClick={() => handleCellClick(cell)}
              >
                <div className="cells-title">{cell.name}</div>

                <div className="cells-type">Cell Type: {cell.type}</div>

                <div className="cells-location">
                  <LocationOnIcon
                    fontSize="medium"
                    style={{
                      color: "red",
                    }}
                  />
                  {cell.location}
                </div>
              </div>
            ))}
            <div className="add-cell-box" onClick={openModal}>
              <AddCircleIcon fontSize="large" />
            </div>
          </div>
        )}
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
              <div className="page-title">Add a Cell</div>
            </div>
            <div>
              <div>
                <div className="password-input-container custom-input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Cell Name"
                    className="modal-input"
                    value={cellData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="password-input-container custom-input">
                  <select
                    name="type"
                    value={cellData.type}
                    onChange={handleChange}
                  >
                    <option value="Generic">Generic Cell</option>
                    <option value="Bible Club">Bible Club</option>
                  </select>
                </div>

                <div className="password-input-container custom-input">
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="modal-input"
                    value={cellData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="custom-button-container">
                  <CustomButton
                    border="none"
                    color="white"
                    padding="1rem"
                    radius="5px"
                    label="Add Cell"
                    bgcolor="var(--primary-color)"
                    width="320px"
                    fontFamily="var(--main-font)"
                    fontSize="1rem"
                    marginTop="1rem"
                    cursor="pointer"
                    onClick={handleAddCell}
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

export default Cells;
