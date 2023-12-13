import React from "react";
import "./Header.scss";
import logo from "../../assets/img/logo-default.png";
import avatar from "../../assets/img/AVATAR.gif";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
import { Link } from "react-scroll";
export default function Header() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const renderButtonLogin = () => {
    if (!userState.userInfo) {
      return (
        <>
          <button
            onClick={() => navigate("/login")}
            className="button_default btn_details mr-2"
          >
            ĐĂNG KÍ
          </button>
          <button
            onClick={() => navigate("/login")}
            className="button_default btn_ticket "
          >
            ĐĂNG NHẬP
          </button>
        </>
      );
    } else {
      return (
        <>
          <div className="navbar-nav ml-auto navbar-logout">
            <div className="nav-item-logout dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                className="nav-link-info nav-img dropdown-toggle user-action"
              >
                <img src={avatar} className="avatar" alt="Avatar" />
                Hello {userState.userInfo.hoTen} <b className="caret"></b>
              </a>
              <div className="dropdown-menu w-25">
                <NavLink to="/profile" className="dropdown-item">
                  <i className="fa-regular fa-user"></i> Profile
                </NavLink>
                <NavLink to="/profile" className="dropdown-item">
                  <i className="fa fa-sliders"></i> Settings
                </NavLink>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  return (
    <div className="mtw_banner_top">
      <div>
        <div className="header-dark">
          <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
            <div className="container">
              <NavLink className="navbar-brand" to="/">
                <img className="img-fluid img-header" src={logo} alt="" />
              </NavLink>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navcol-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navcol-1"
              >
                <ul className="nav navbar-nav">
                  <li className="nav-item-header" role="presentation">
                    <NavLink className="nav-link" to="/">
                      TRANG CHỦ
                    </NavLink>
                  </li>
                  <li className="nav-item-header" role="presentation">
                    <Link
                      activeClass="active"
                      to="Movie-List"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500} className="nav-link">
                      DANH SÁCH PHIM
                    </Link>
                  </li>
                  <li className="nav-item-header" role="presentation">
                    <Link activeClass="active"
                      to="Movie-Hot"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500} className="nav-link">
                      PHIM HOT
                    </Link>
                  </li>
                  <li className="nav-item-header" role="presentation">
                    <Link
                      activeClass="active"
                      to="Cinema"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className="nav-link">
                      CỤM RẠP
                    </Link>
                  </li>

                </ul>
                <div className="button-group-header">{renderButtonLogin()}</div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
