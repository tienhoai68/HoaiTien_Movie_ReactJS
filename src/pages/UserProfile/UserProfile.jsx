import React, { useContext, useEffect, useState } from 'react'
import "./UserProfile.scss"
import * as Yup from 'yup';
import { Form, ErrorMessage, Field, Formik } from 'formik';
import { userService } from '../../services/user';
import Swal from 'sweetalert2';
import { formatDate } from '../../utils/formatDate';
import { LoadingContext } from '../../contexts/Loading/Loading';

const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string().required('(*) Tài khoản không được để trống'),
  matKhau: Yup.string().required('(*) Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  email: Yup.string().email('(*) Email không hợp lệ').required('(*) Email không được để trống'),
  soDT: Yup.string().required('(*) Số điện thoại không được để trống'),
  hoTen: Yup.string().required('(*) Họ tên không được để trống'),
});

export default function UserProfile() {
  const [_, setIsLoading] = useContext(LoadingContext);
  const [userInfo, setUserInfo] = useState({
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDT: '',
    hoTen: '',
    maNhom: 'GP08',
    loaiNguoiDung: '',
  });

  const [fieldErrors, setFieldErrors] = useState("");

  const [ticketInfo, setTicketInfo] = useState([]);

  const handleChangeUserInfo = async (values, { resetForm }) => {
    try {
      await userService.updateUserInfo(values);
      handlefetchUserInfo();
      setFieldErrors("");
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Bạn đã cập nhật thành công',
      });
      resetForm();
    } catch (error) {
      setFieldErrors(error.response.data.content);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.content}`,
      })
      resetForm();
    }
  };

  const handlefetchUserInfo = async () => {
    setIsLoading({ isLoading: true });
    const result = await userService.fetchUserInfoApi();
    setUserInfo(result.data.content)
    setTicketInfo(result.data.content.thongTinDatVe);
    setIsLoading({ isLoading: false });
  }

  useEffect(() => {
    handlefetchUserInfo();
  }, [])

  const renderTicketInfo = () => {
    return ticketInfo.map((element) => {
      return (
        <div key={element.maVe} className="col-12 col-md-12 col-lg-6">
          <div className="ticket-section">
            <div className="ticket-info-container">
              <div className="ticket-info">
                <h3 className="ticket-date">Ngày Đặt: {formatDate(element.ngayDat)}</h3>
              </div>
              <div className="ticket-info">
                <h1 className="ticket-title">Tên phim: {element.tenPhim}</h1>
              </div>
              <div className="ticket-info">
                <h3 className="ticket-details" style={{ display: 'inline-block' }}>
                  Thời lượng: {element.thoiLuongPhim} phút
                </h3>
                ,{' '}
                <h3 className="ticket-details" style={{ display: 'inline-block' }}>
                  Giá vé: {element.giaVe} VND
                </h3>
              </div>
              <div className="ticket-info">
                {element.danhSachGhe.slice(0, 1).map((element) => {
                  return <h1 key={element.maCumRap} className="ticket-cinema">{element.tenHeThongRap}</h1>
                })}
              </div>
              <div className="ticket-info">
                {element.danhSachGhe.slice(0, 1).map((element) => {
                  return <h3 key={element.maHeThongRap} className="ticket-details d-inline-block mr-2" >{element.tenCumRap}</h3>
                })}

                <span>Ghế số: </span>
                {element.danhSachGhe.map((element) => {
                  return (
                    <h3 key={element.maGhe} className="ticket-details mr-1 d-inline-block text-danger">
                      {element.tenGhe}
                    </h3>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='profile-wrapper'>
      <div className="container">
        <div className="card mt-5 border-5 pt-2 active pb-0 px-3">
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <h4 className="card-title"><b>Cài Đặt Tài Khoản Chung</b></h4>
              </div>
              <div className="col">
                <h6 className="card-subtitle mb-2 text-muted">
                  <p className="card-text text-muted small">
                    <img src="https://img.icons8.com/metro/26/000000/star.png" className="mr-1" width="19" height="19" id="star" /> <span className="vl mr-2 ml-0"></span>
                    Thông Tin <span className="font-weight-bold">Có Thể</span> Thay Đổi
                  </p>
                </h6>
              </div>
            </div>
          </div>

          <div className="card-footer bg-white px-0">
            <Formik
              enableReinitialize
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={handleChangeUserInfo}
            >
              <Form className="register-form">
                <div className="row">
                  <div className='form-group col-12 col-md-12 col-lg-6'>
                    <label className='label-user'> <span className='text-red'>* </span>Tài Khoản</label>
                    <Field readOnly={true} className='form-control' name='taiKhoan' type='text' placeholder='Tài khoản' />
                    <span></span>
                    <ErrorMessage name='taiKhoan' component='label' className='form-label text-danger' />
                  </div>
                  <div className='form-group col-12 col-md-12 col-lg-6'>
                    <label className='label-user'><span className='text-red'>* </span>Mật Khẩu </label>
                    <Field className='form-control' name='matKhau' type='password' placeholder='Mật khẩu' />
                    <span></span>
                    <ErrorMessage name='matKhau' component='label' className='form-label text-danger' />
                  </div>
                  <div className='form-group col-12 col-md-12 col-lg-6'>
                    <label className='label-user'><span className='text-red'>* </span>Email </label>
                    <Field className='form-control' name='email' type='text' placeholder='Email' />
                    <span></span>
                    <ErrorMessage name='email' component='label' className='form-label text-danger' />
                    {fieldErrors && (
                      <label label className='text-danger'>{fieldErrors}</label>
                    )}
                  </div>
                  <div className='form-group col-12 col-md-12 col-lg-6'>
                    <label className='label-user'><span className='text-red'>* </span>Số Điện Thoại </label>
                    <Field className='form-control' name='soDT' type='text' placeholder='Số điện thoại' />
                    <span></span>
                    <ErrorMessage name='soDT' component='label' className='form-label text-danger' />
                  </div>
                  <div className='form-group col-12 col-md-12 col-lg-6'>
                    <label className='label-user'><span className='text-red'>* </span>Họ Tên </label>
                    <Field className='form-control' name='hoTen' type='text' placeholder='Họ Tên' />
                    <span></span>
                    <ErrorMessage name='hoTen' component='label' className='form-label text-danger' />
                  </div>
                  <div className='form-group col-12 col-md-12 col-lg-6'>
                    <label className='label-user'><span className='text-red'>* </span>Mã Loại Người Dùng </label>
                    <Field readOnly={true} className='form-control' name='loaiNguoiDung.tenLoai' type='text' placeholder='Mã Loại Người Dùng' />
                    <span></span>
                    <ErrorMessage name='maLoaiNguoiDung' component='label' className='form-label text-danger' />
                  </div>
                </div>
                <div className='text-right'>
                  <button type='submit' className="btn btn-sm btn-userinfo">Update</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="card mt-5 border-5 pt-2 active pb-0 px-3">
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <h4 className="card-title"><b>Lịch Sử Đặt Vé</b></h4>
              </div>
              <div className="col">
                <h6 className="card-subtitle mb-2 text-muted">
                  <p className="card-text text-muted small">
                    <img src="https://img.icons8.com/color/26/000000/christmas-star.png" className="mr-1" width="19" height="19" id="star" /> <span className="vl mr-2 ml-0"></span>
                    <i className="fa fa-users text-muted" /> Public <span className="vl ml-1 mr-2" />
                    <span /> Updated by <span className="font-weight-bold">Movie Cenrer</span> on 1 Oct, 2023
                  </p>
                </h6>
              </div>
            </div>
          </div>
          <div className="card-footer bg-white px-0">
            <div className="row">
              {renderTicketInfo()}
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
