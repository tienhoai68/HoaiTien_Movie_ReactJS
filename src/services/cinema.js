import { requestApi } from "../configs/callApi";

class CinemaService {
  fecthShowTimeApi(movieId) {
    return requestApi({
      url: `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
      method: "GET",
    })
  };
  fetchCinemaApi() {
    return requestApi({
      url: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP08`,
      method: "GET",
    })
  }
}

export const cinemaService = new CinemaService();
