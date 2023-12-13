import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { movieService } from "../../../services/movie";
import "./ListMoviePage.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ListMoviePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [movieListPage, setMovieListPage] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isNowPlaying, setIsNowPlaying] = useState();
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const fetchMovieListPage = async () => {
    const result = await movieService.fecthMovieListPageApi(currentPage);
    setMovieListPage(result.data.content.items);
  };
  const fetchMovieList = async () => {
    const result = await movieService.fecthMovieListWithPageApi();
    setMovieList(result.data.content)
  }
  const handleNowPlaying = (key) => {
    setIsNowPlaying(key);
  }

  const handleChangePage = (page) => {
    setCurrentPage(page);
    fetchMovieListPage();
  };

  const handleBooking = (codeMovie) => {
    if (userState) {
      navigate(`/movie-detail/${codeMovie}`)
    } else {
      navigate("/login")
    }
  }

  useEffect(() => {
    fetchMovieList();
    fetchMovieListPage();
  }, []);

  const renderMovieList = () => {
    const filteredMovies = movieListPage.filter((element) => {
      if (isNowPlaying) {
        return element.dangChieu === true;
      } else if (isNowPlaying === false) {
        return element.dangChieu === false;
      } else {
        return element;
      }
    }
    );
    return filteredMovies.map((element) => {
      return (
        <div key={element.maPhim} className="movie-page col-9 col-sm-6 col-md-4 col-lg-3 my-3">
          <div onClick={() => handleBooking(element.maPhim)} className="movie-card-page">
            <div className="movie-image-page">
              <img
                src={element.hinhAnh}
                alt="Sample Movie"
              />
              <span className="badge-page">Premium</span>
            </div>

            <div className="movie-details-page">
              <h6 className="name-movie-page">{element.tenPhim}</h6>
              <div className="rating-page">
                <div className="star-rating-page">
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9734;</span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="icon-text mb-0">
                  <i className="fas fa-clock"></i> 120 min
                </p>
                <button onClick={() => handleBooking(element.maPhim)} className="custom-button">
                  <i className="fa fa-heart"></i> Chi Tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="main-movie container">
      <div className="title-movie">
        <div className="page-title category-title">
          <i className="fas fa-star"></i>
          <h1 className="title-res">DANH SÁCH PHIM</h1>
          <hr />
          <div className="btn-group-isotope isotope-filters">
            <button
              onClick={() => handleNowPlaying()}
              className="btn btn-success-mod-1 btn-sm mr-1 text-capitalize"
              data-isotope-filter="type-1"
              data-isotope-group="gallery"
            >
              Tất cả
            </button>
            <button
              onClick={() => handleNowPlaying(true)}
              className="btn btn-success-mod-1 btn-sm mr-1 text-capitalize"
              data-isotope-filter="*"
              data-isotope-group="gallery"
            >
              Đang chiếu
            </button>
            <button
              onClick={() => handleNowPlaying(false)}
              className="btn btn-success-mod-1 btn-sm text-capitalize"
              data-isotope-filter="type-1"
              data-isotope-group="gallery"
            >
              Sắp chiếu
            </button>
          </div>
        </div>
        <div className="py-5">
          <div className="row justify-content-center">{renderMovieList()}</div>
          <div className="ant-pagination">
            <Pagination
              onChange={handleChangePage}
              current={currentPage}
              defaultCurrent={currentPage}
              defaultPageSize={8}
              total={movieList.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
