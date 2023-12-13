import { requestApi } from "../configs/callApi";

class TicketService {
  fetchTicketDetailApi = (bookingId) => {
    return requestApi({
      url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${bookingId}`,
      method: "GET",
    })
  }

  bookTicketApi = (data) => {
    return requestApi({
      url: `/QuanLyDatVe/DatVe`,
      method: "POST",
      data,
    })
  }
}
export const ticketService = new TicketService();
