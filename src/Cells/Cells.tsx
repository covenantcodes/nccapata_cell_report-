import { useState, MouseEventHandler } from "react";
import SideBar from "../Custom/Sidebar/Sidebar";
import "./cells.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import CustomButton from "../Custom/Button/CustomButton";
import axios from "axios"; // Import Axios

const Cells = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cellData, setCellData] = useState({
    name: "",
    type: "Generic", // Default to "Generic" cell type
    location: "",
  });

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

  const handleAddNewCell: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      await axios.post("/api/cells/create", cellData); // Send POST request to backend
      console.log("Cell added");
      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error adding cell:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="cells-main-container">
      <SideBar />

      <div className="cells-container">
        <div className="page-title">My Cells</div>

        <div className="cells-box-container">
          <div className="cells-box">
            <div className="cells-title">Cell One</div>
            <div className="cells-location">
              <LocationOnIcon
                fontSize="medium"
                style={{
                  color: "red",
                }}
              />
              No 23, Finder Street, Netherlands
            </div>
          </div>
          <div className="add-cell-box" onClick={openModal}>
            <AddCircleIcon fontSize="large" />
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="modal-container">
          <div className="modal-form">
            <div className="page-title">Add a Cell</div>
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
                  onClick={handleAddNewCell}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cells;
