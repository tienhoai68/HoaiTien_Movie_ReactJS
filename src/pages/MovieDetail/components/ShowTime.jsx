import React, { useEffect, useState } from "react";
import { cinemaService } from "../../../services/cinema";
import { Link, useParams } from "react-router-dom";
import "./ShowTime.scss";
import { formatDate } from "../../../utils/formatDate";

export default function ShowTime() {
  const params = useParams();

  const [showTime, setShowTime] = useState([]);

  const fetchShowTime = async () => {
    const result = await cinemaService.fecthShowTimeApi(params.movieId);
    setShowTime(result.data.content.heThongRapChieu);
  };

  // console.log(showTime)
  const renderTabList = () => {
    return showTime.map((element, idx) => {
      return (
        <a
          key={element.maHeThongRap}
          className={`nav-link mb-3 p-3 shadow " id="v-pills-home-tab ${idx === 0 && "active"
            }`}
          data-toggle="pill"
          href={`#${element.maHeThongRap}`}
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="true"
        >
          <i className="fa fa-user-circle-o mr-2" />
          <span className="font-weight-bold small text-uppercase">
            {element.tenHeThongRap}
          </span>
        </a>
      );
    });
  };

  const renderTabContent = () => {
    return showTime.map((element, idx) => {
      return (
        <div
          className={`nav-showtime tab-pane fade show p-3 ${idx === 0 && "active"
            }`}
          id={element.maHeThongRap}
          key={element.maHeThongRap}
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          {element.cumRapChieu.map((element) => {
            return (
              <div key={element.maCumRap} className="row mb-3">
                <div className="col-2">
                  <img
                    className="img-fluid rounded"
                    src={element.hinhAnh}
                    alt="..."
                  />
                </div>
                <div className="col-10 pl-0">
                  <h5>{element.tenCumRap}</h5>
                  <span className="text-white">{element.diaChi}</span>
                  <div className="row">
                    {element.lichChieuPhim.map((element) => {
                      return (
                        <div key={element.maRap} className="col-6 col-md-4 text-time">
                          <Link
                            className="calendar-movie"
                            to={`/booking/${element.maLichChieu}`}
                          >
                            {formatDate(element.ngayChieuGioChieu)}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };
  useEffect(() => {
    fetchShowTime();
  }, []);

  return (
    <div className="row ">
      <div className="col-md-3 ">
        {/* Tabs nav */}
        <div
          className="nav flex-column nav-pills nav-pills-custom"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {renderTabList()}
        </div>
      </div>
      <div className="col-md-9">
        {/* Tabs content */}
        <div className="tab-content" id="v-pills-tabContent">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
