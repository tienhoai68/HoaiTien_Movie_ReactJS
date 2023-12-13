import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { userService } from '../../../../services/user';
import { ErrorApi } from '../../../../enums/api';


const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string().required('(*) Tài khoản không được để trống'),
  matKhau: Yup.string().required('(*) Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  email: Yup.string().email('(*) Email không hợp lệ').required('(*) Email không được để trống'),
  soDt: Yup.string().required('(*) Số điện thoại không được để trống'),
  hoTen: Yup.string().required('(*) Họ tên không được để trống'),
});

export default function Register() {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({
    taiKhoan: "",
    email: "",
  });

  const handleSubmitRegister = async (values, { resetForm }) => {
    try {
      await userService.registerApi(values);
      setFieldErrors({});
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Bạn đã đăng kí thành công',
      });
      resetForm();
      navigate("/login")
    } catch (error) {

      if (error.response) {
        const errorData = error.response.data.content;
        if (errorData === ErrorApi.Account) {
          setFieldErrors({ taiKhoan: errorData });
        } else if (errorData === ErrorApi.Email) {
          setFieldErrors({ email: errorData });
        }
      }
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.content}`,
        text: "Vui lòng chọn tài khoản khác",
      })
    }
  };
  return (
    <div>
      <h1>Register here</h1>
      <Formik
        initialValues={{
          taiKhoan: '',
          matKhau: '',
          email: '',
          soDt: '',
          maNhom: 'GP08',
          hoTen: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitRegister}
      >
        <Form className="register-form">
          <div className='form-control form-register'>
            <Field name='taiKhoan' type='text' placeholder='Tài khoản' />
            <span></span>
            <ErrorMessage name='taiKhoan' component='label' className='form-label error-register text-danger' />
            {fieldErrors.taiKhoan && (
              <label className="text-danger">(*) {fieldErrors.taiKhoan}</label>
            )}
          </div>
          <div className='form-control form-register'>
            <Field name='matKhau' type='password' placeholder='Mật khẩu' />
            <span></span>
            <ErrorMessage name='matKhau' component='label' className='form-label error-register text-danger' />
          </div>
          <div className='form-control form-register'>
            <Field name='email' type='text' placeholder='Email' />
            <span></span>
            <ErrorMessage name='email' component='label' className='form-label error-register text-danger' />
            {fieldErrors.email && (
              <label className="text-danger">(*) {fieldErrors.email}</label>
            )}
          </div>
          <div className='form-control form-register'>
            <Field name='soDt' type='text' placeholder='Số điện thoại' />
            <span></span>
            <ErrorMessage name='soDt' component='label' className='form-label error-register text-danger' />
          </div>
          <div className='form-control form-register'>
            <Field name='hoTen' type='text' placeholder='Họ Tên' />
            <span></span>
            <ErrorMessage name='hoTen' component='label' className='form-label error-register text-danger' />
          </div>
          <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  );
}
