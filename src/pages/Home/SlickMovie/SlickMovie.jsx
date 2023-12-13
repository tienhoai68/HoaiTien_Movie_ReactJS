import React, { useEffect, useState } from "react";
import "./SlickMovie.scss";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { movieService } from "../../../services/movie";
import Slider from "react-slick";

export default function SlickMovie() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const [movieList, setMovieList] = useState([]);
  const userState = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const result = await movieService.fecthMovieListApi("GP11");
    setMovieList(result.data.content);
  };
  const handleBooking = (codeMovie) => {
    if (userState) {
      navigate(`/movie-detail/${codeMovie}`);
    } else {
      navigate("/login");
    }
  };

  const renderMovieList = () => {
    return movieList.map((element) => {
      return (
        <div onClick={() => handleBooking(element.maPhim)} key={element.maPhim} className="movie-card">
          <div className="movie-image">
            <img
              src={element.hinhAnh} // Đường dẫn hình ảnh mặc định
              alt="Sample Movie"
            />
            <span className="badge">Premium</span>
          </div>
          <div className="rating">
            <div className="star-rating">
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9734;</span>
            </div>
            <p>{element.danhGia}</p>
          </div>
          <div className="movie-details">
            <h6 className="name-movie">{element.tenPhim}</h6>
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
      );
    });
  };

  return (
    <div className="main-movie container pt-0">
      <div className="title-movie">
        <div className="page-title category-title">
          <i className="fas fa-star"></i>
          <h1 className=" title-res">PHIM HOT</h1>
          <hr />
        </div >
        <Slider {...settings}>{renderMovieList()}</Slider>
      </div>
    </div>
  );
}
