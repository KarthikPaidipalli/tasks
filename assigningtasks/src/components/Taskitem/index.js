import "./index.css";
import { useState } from "react";

const Tasks = (props) => {
  const [status, setStatus] = useState(false);
  const { appointmentDetails, toggleIsStarred } = props;
  const { id, title, date, isStarred, teamtype } = appointmentDetails;
  const starImgUrl = isStarred
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";

  const onClickStar = () => {
    toggleIsStarred(id);
  };

  const toggleStatus = () => {
    setStatus((prevStatus) => !prevStatus);
  };

  return (
    <li
      className={`appointment-item ${status ? "completed" : "in-progress"}`}
    >
      <div className="header-container">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Due date: {date}</p>
      <p className="date">Team Type: {teamtype}</p>
      <div className="bottomCard">
        <input type="checkbox" onChange={toggleStatus} checked={status} />
        <p>{status ? "Completed" : "In Progress"}</p>
      </div>
    </li>
  );
};

export default Tasks;
