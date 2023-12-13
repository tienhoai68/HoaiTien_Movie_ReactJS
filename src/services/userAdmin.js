import { requestApi } from "../configs/callApi";

class UserAdminService {
  fecthUserAdminApi() {
    return requestApi({
      url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`,
      method: "GET",
    });
  }
  fecthAddUserAdminApi(data) {
    return requestApi({
      url: `/QuanLyNguoiDung/ThemNguoiDung`,
      method: "POST",
      data,
    });
  }
  fecthTakeProfileUserApi(key) {
    return requestApi({
      url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${key}`,
      method: "POST",
    });
  }
  fecthSearchUserApi(key) {
    return requestApi({
      url: `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${key}`,
      method: "GET",
      maNhom: "GP01",
    });
  }
  fecthEditUserAdminApi(data) {
    return requestApi({
      url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "POST",
      data,
    });
  }
  fecthDeleteUserAdminApi(key) {
    return requestApi({
      url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${key}`,
      method: "DELETE",
    });
  }
}

export const userAdminService = new UserAdminService();
