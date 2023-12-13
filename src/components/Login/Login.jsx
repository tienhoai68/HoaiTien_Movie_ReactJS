import React from "react";
import "./Login.scss";
import Register from "./components/Register/Register";
import { userService } from "../../services/user";
import { useDispatch } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string().required('(*) Tài khoản không được để trống'),
  matKhau: Yup.string().required('(*) Mật khẩu không được để trống'),
})

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickRegister = () => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };

  const handleClickLogin = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };

  const handleSubmitLogin = async (values, { resetForm }) => {
    try {
      const result = await userService.loginApi(values);
      dispatch(setUserInfoAction(result.data.content));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Bạn đã đăng nhập thành công',
      });
      localStorage.setItem("USER_INFO", JSON.stringify(result.data.content));
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.content}`,
        text: "Xin vui lòng thử lại ^-^",
      })
    }
    resetForm();
  };

  return (
    <div className="background-login">
      <div className="container" id="container">
        <div className="form-container register-container">
          {/* cắt thành component Register */}
          <Register />
        </div>
        <Formik
          initialValues={{
            taiKhoan: '',
            matKhau: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitLogin}
        >
          <div className="form-container login-container">
            <Form className="form-lg">
              <h1>Login here</h1>
              <div className="form-control2">
                <Field name='taiKhoan' type='text' placeholder='Tài khoản' />
                <span></span>
              </div>
              <div className="error-login w-100">
              <ErrorMessage name='taiKhoan' component='label' className='form-label error-login form-label-login text-danger' />
              </div>
              <div className="form-control2">
                <Field name='matKhau' type='password' placeholder='Mật khẩu' />
                <span></span>
              </div>
              <div className="error-login w-100">
              <ErrorMessage name='matKhau' component='label' className='form-label  form-label-login text-danger' />
              </div>
              <button type='submit'>Login</button>
            </Form>
          </div>
        </Formik>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel over-left">
              <h1 className="title">Hello</h1>
              <p>Nếu bạn có tài khoản, hãy đăng nhập</p>
              <button onClick={handleClickLogin} className="ghost" id="login">
                Login
                <i className="fa-solid fa-arrow-left" />
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1 className="title">Hello</h1>
              <p>Nếu bạn không có tài khoản, hãy đăng ký</p>
              <button
                onClick={handleClickRegister}
                className="ghost"
                id="register"
              >
                Register
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
