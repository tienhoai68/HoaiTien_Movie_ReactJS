import React from "react";

import "./AdminHome.scss";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className="background-Admin">
      <div className="admin-Banner">
        <div className="admin-Banner-Hand">
          <i className="fa-solid fa-hand-point-down" />
        </div>
        <h1 className="admin-Banner-Header-Title">GO TO</h1>
        <div className="admin-Banner-Btn btn-Left">
          <button onClick={() => navigate("/admin/films")}>Films</button>
        </div>
        <div className="admin-Banner-Btn btn-Right">
          <button onClick={() => navigate("/admin/user")}>Users</button>
        </div>
      </div>
    </div>
  );
}
