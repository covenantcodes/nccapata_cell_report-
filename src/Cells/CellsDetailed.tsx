import SideBar from "../Custom/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";


const CellsDetailed = () => {
  const location = useLocation();
  const { cell } = location.state;

  return (
    <div className="cells-detailed-container">
      <SideBar />
      <div className="page-title">{cell.name}</div>
      <div className="cell-type">{cell.type}</div>
      <div className="cell-type">{cell.location}</div>
    </div>
  );
};

export default CellsDetailed;
