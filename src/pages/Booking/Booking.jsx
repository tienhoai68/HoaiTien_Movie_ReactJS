import React, { useContext, useEffect, useState } from "react";
import "./Booking.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ticketService } from "../../services/ticket";
import { filter, sumBy } from "lodash";
import Swal from 'sweetalert2';
import { ChairType } from "../../enums/api";
import { LoadingContext } from "../../contexts/Loading/Loading";

export default function Booking() {
  const params = useParams();
  const navigate = useNavigate();

  const [_, setIsLoading] = useContext(LoadingContext);
  const [ticketDetail, setTicketDetail] = useState({});
  const [chairList, setChairList] = useState([]);

  useEffect(() => {

    fetchTicketDetail();
  }, []);

  const fetchTicketDetail = async () => {
    setIsLoading({ isLoading: true });
    const result = await ticketService.fetchTicketDetailApi(params.bookingId);
    setTicketDetail(result.data.content.thongTinPhim);
    setChairList(
      result.data.content.danhSachGhe.map((element) => {
        return {
          ...element,
          dangChon: false,
        };
      })
    );
    setIsLoading({ isLoading: false });
  };

  const renderChairList = () => {
    return chairList.map((element, index) => {
      let className = "chair";
      if (element.loaiGhe === ChairType.Vip) {
        className = "button-vip";
      }
      if (element.dangChon) {
        className = "button-success";
      }
      return (
        <React.Fragment key={element.maGhe}>
          <button
            onClick={() => handleSelectedChair(element)}
            disabled={element.daDat}
            className={`mr-1 mb-1 ${className} btn`}
          >
            {element.tenGhe}
          </button>
          {(index + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };
  const handleSelectedChair = (chair) => {
    const data = [...chairList];
    const index = data.findIndex((element) => element.maGhe === chair.maGhe);
    data[index].dangChon = !data[index].dangChon;
    setChairList(data);
  };

  const rederSeatList = () => {
    const filterChair = chairList.filter(
      (element) => element.dangChon === true
    );
    return filterChair.map((element) => {
      return <span key={element.maGhe} className="detail-value"> {element.tenGhe}</span>;
    });
  };

  const renderTotalPrice = () => {
    // use ES6
    // const filterChair = chairList.filter(
    //   (element) => element.dangChon === true
    // );
    // return filterChair.reduce((total, element) => total += element.giaVe, 0).toLocaleString();

    // dùng Lodash
    const filterChair = filter(chairList, "dangChon")
    const total = sumBy(filterChair, "giaVe");
    return total.toLocaleString();
  }

  const handleBookTicket = async () => {
    const filterChair = filter(chairList, "dangChon")

    const dataSendApi = {
      maLichChieu: Number(params.bookingId),
      danhSachVe: filterChair.map((element) => {
        return {
          maGhe: element.maGhe,
          giaVe: element.giaVe,
        }
      })
    }
    await ticketService.bookTicketApi(dataSendApi);
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Bạn đã đặt vé thành công',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });

    navigate("/profile")
  }
  return (
    <div className="backgroud-booking ">
      <div className="row mr-0 ml-0">
        <div className="col-12 col-lg-8">
          <div className="title">MOVIE SEAT SELECTION</div>
          <div className="">
            <div className="wrapper-booking">
              <div className="w-100">
                <div className="screen">
                  <h2 className="wthree">Screen this way</h2>
                </div>
                <div className="mt-5">
                  <ul className="seat_w3ls text-center">
                    <li className="smallBox greenBox">Selected Seat</li>
                    <li className="smallBox redBox">Reserved Seat</li>
                    <li className="smallBox emptyBox">Normal Seat</li>
                    <li className="smallBox vipBox">Vip Seat</li>
                  </ul>
                </div>
              </div>
              <div style={{ width: "100" }} className="mx-auto scroll-chair text-center">
                {renderChairList()}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 mt-5">
          <div className="movie-info">
            <div className="movie-price">
              <span className="price-title">Giá Tiền: </span>
              <span className="price-text">{renderTotalPrice()} VND</span>
            </div>
            <hr className="divider" />
            <div className="movie-details">
              <h3 className="detail-heading">Cụm Rạp:</h3>
              <h3 className="detail-value">{ticketDetail.tenCumRap}</h3>
            </div>
            <hr className="divider" />
            <div className="movie-details">
              <h3 className="detail-heading">Địa chỉ:</h3>
              <h3 className="detail-value">{ticketDetail.diaChi}</h3>
            </div>
            <hr className="divider" />
            <div className="movie-details">
              <h3 className="detail-heading">Rạp:</h3>
              <h3 className="detail-value">{ticketDetail.tenRap}</h3>
            </div>
            <hr className="divider" />
            <div className="movie-details">
              <h3 className="detail-heading">Ngày giờ chiếu:</h3>
              <h3 className="detail-value">
                {ticketDetail.ngayChieu} -{" "}
                <span className="time-highlight">{ticketDetail.gioChieu}</span>
              </h3>
            </div>
            <hr className="divider" />
            <div className="movie-details">
              <h3 className="detail-heading">Tên Phim:</h3>
              <h3 className="detail-value">{ticketDetail.tenPhim}</h3>
            </div>
            <hr className="divider" />
            <div className="movie-details">
              <span className="detail-heading">Ghế Đang Chọn: </span>
              {rederSeatList()}
            </div>
            <hr className="divider" />
            <div className="button-group">
              <button onClick={handleBookTicket} className="button_default btn_booking ">Đặt vé</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
