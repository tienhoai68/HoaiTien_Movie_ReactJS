import { requestApi } from "../configs/callApi";

class MovieService {
    fecthMovieListApi(key) {
        return requestApi({
            url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${key}`,
            method: "GET",
        })
    };
    fecthMovieListWithPageApi() {
        return requestApi({
            url: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
            method: "GET",
        })
    };
    fecthMovieListPageApi(page) {
        return requestApi({
            url: `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=8`,
            method: "GET",
        })
    };
    fecthMovieDetailApi(movieId) {
        return requestApi({
            url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
            method: "GET",
        })
    };
    fetchMovieBannerApi() {
        return requestApi({
            url: "/QuanLyPhim/LayDanhSachBanner",
            method: "GET",
        })
    }
}
export const movieService = new MovieService();
