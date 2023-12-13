import { requestApi } from "../configs/callApi";

class FimlService {
  fetchFilmsListApi(maNhom) {
    return requestApi({
      url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
      method: "GET",
    });
  }
  fetchAddNewFilmApi(data) {
    return requestApi({
      url: `/QuanLyPhim/ThemPhimUploadHinh`,
      method: "POST",
      data,
    });
  }
  fetchFilmDetaiApi(filmId) {
    return requestApi({
      url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${filmId}`,
      method: "GET",
    });
  }
  fetchUpdateFilmApi(data) {
    return requestApi({
      url: `/QuanLyPhim/CapNhatPhimUpload`,
      method: "POST",
      data,
    });
  }

  fetchFilmDeleteApi(id) {
    return requestApi({
      url: `/QuanLyPhim/XoaPhim?MaPhim=${id}`,
      method: "DELETE",
    });
  }
  fetchFilmSearchApi(key) {
    return requestApi({
      url: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${key}`,
      method: "GET",
      maNhom: "GP01",
    });
  }
  fetchHeThongRapApi() {
    return requestApi({
      url: `/QuanLyRap/LayThongTinHeThongRap`,
      method: "GET",
    });
  }
  fetchCumRapApi(key) {
    return requestApi({
      url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${key}`,
      method: "GET",
    });
  }
  fetchTaoLichChieuApi(data) {
    return requestApi({
      url: `/QuanLyDatVe/TaoLichChieu`,
      method: "POST",
      data,
    });
  }
}

export const filmService = new FimlService();
