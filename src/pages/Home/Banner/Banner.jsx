import React, { useEffect, useState } from 'react'
import { movieService } from '../../../services/movie';
import "./Banner.scss"

export default function Banner() {
  const [bannerMovie, setBannerMovie] = useState([]);
  useEffect(() => {
    fetchBannerMovie();
  }, []);

  const fetchBannerMovie = async () => {
    const result = await movieService.fetchMovieBannerApi();
    setBannerMovie(result.data.content);
  };

  const renderBanner = () => {
    return bannerMovie.map((element, index) => {

      return (
        <div key={element.maPhim} className={`carousel-item  ${index === 0 && "active"
          } `}>
          <img src={element.hinhAnh} className="img-banner d-block w-100 img-fluid" alt="..." />
        </div>
      );
    });
  };
  return (
    <div className="bd-example carousel">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            className="active"
          ></li>
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="1"
          ></li>
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          {renderBanner()}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}
