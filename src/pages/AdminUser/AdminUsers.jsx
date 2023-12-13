import React, { createRef, useContext, useEffect, useState } from "react";
import { userAdminService } from "../../services/userAdmin";
import { useDispatch } from "react-redux";
import { addUserAction } from "../../store/actions/userAdminAction";
import "./AdminUser.scss";
import { LoadingContext } from "../../contexts/Loading/Loading";
import Swal from "sweetalert2";

export default function AdminUsers() {
  const [_, setIsLoading] = useContext(LoadingContext);
  const taiKhoanInputRef = createRef();
  const matKhauInputRef = createRef();
  const emailInputRef = createRef();
  const soDTInputRef = createRef();
  const hoTenInputRef = createRef();
  const loaiNguoiDungRef = createRef();
  const dispatch = useDispatch();

  const [userList, setUserList] = useState([]);
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
    hoTen: "",
    maLoaiNguoiDung: "",
  });

  useEffect(() => {
    UserListApi();
  }, []);

  const UserListApi = async () => {
    setIsLoading({ isLoading: true });
    const result = await userAdminService.fecthUserAdminApi();
    setUserList(result.data.content);
    setIsLoading({ isLoading: false });
  };

  const handleSearch = async (event) => {
    const result = await userAdminService.fecthSearchUserApi(
      event.target.value
    );
    setUserList(result.data.content);
    if (event.target.value === "") {
      UserListApi();
    }
  };
  const validateRequired = (value, ref, mes) => {
    if (value !== "") {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mes;
    return false;
  };
  const validateCheckExistTaiKhoan = (value, ref, mes, list) => {
    let isExist = false;
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      if (data.taiKhoan === value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      ref.innerHTML = mes;
      return false;
    }
    ref.innerHTML = "";
    return true;
  };
  const validateCheckExistEmail = (value, ref, mes, list) => {
    let isExist = false;
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      if (data.email === value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      ref.innerHTML = mes;
      return false;
    }
    ref.innerHTML = "";
    return true;
  };
  const validateChecLength = (value, ref, mes, number) => {
    if (value.length === number) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mes;
    return false;
  };

  const validateCheck = (value, ref, mes, letter) => {
    if (letter.test(value)) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mes;
    return false;
  };
  const renderUser = () => {
    return userList.map((element, idx) => {
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{element.taiKhoan}</td>
          <td>{element.matKhau}</td>
          <td>{element.hoTen}</td>
          <td>{element.email}</td>
          <td>{element.soDT}</td>
          <td className="btnList">
            <button
              className="btnStyle1 mr-2"
              onClick={() => handleSelect(element)}
              data-toggle="modal"
              data-target="#myModal"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
            <button
              className="btnStyle2"
              onClick={() => handleDelete(element.taiKhoan)}
            >
              <i className="fa-solid fa-trash" />
            </button>
          </td>
        </tr>
      );
    });
  };
  const btnHandle = () => {
    document.getElementById("taiKhoan").disabled = false;
    document.getElementById("btnAdd").innerHTML = "Thêm";
    document.getElementById("header-title").innerHTML = "Thêm người dùng";
  };
  const handleSelect = async (element) => {
    document.getElementById("taiKhoan").disabled = true;
    document.getElementById("btnAdd").innerHTML = "Cập nhật";
    document.getElementById("header-title").innerHTML = "Cập nhật người dùng";
    document.getElementById("errorTaiKhoan").style.display = "none";

    const result = await userAdminService.fecthTakeProfileUserApi(
      element.taiKhoan
    );

    setState(result.data.content);
  };
  const addUser = async (state) => {
    try {
      const result = await userAdminService.fecthAddUserAdminApi(state);
        dispatch(addUserAction(result.data.content));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "thêm User thành công !",
        });
        UserListApi();    
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.content}`,
      });
    }
  };
  const editUser = async (state) => {
    try {
      const result = await userAdminService.fecthEditUserAdminApi(state);
      if (result.data.content) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Cập nhật thành công !",
        });
        UserListApi();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.content}`,
      });
    }
  };

  const handleSubmit = () => {
    let isValid = true;

    if (document.getElementById("taiKhoan").disabled === true) {
    } else {
      document.getElementById("errorTaiKhoan").style.display = "block";
      isValid &=
        validateRequired(
          state.taiKhoan,
          taiKhoanInputRef.current,
          "Chưa nhập tài khoản"
        ) &&
        validateCheckExistTaiKhoan(
          state.taiKhoan,
          taiKhoanInputRef.current,
          "Tài khoản đã tồn tại",
          userList
        );

      isValid &=
        validateRequired(
          state.email,
          emailInputRef.current,
          "Chưa nhập Email"
        ) &&
        validateCheck(
          state.email,
          emailInputRef.current,
          "Định dạng email chưa đúng",
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        ) &&
        validateCheckExistEmail(
          state.email,
          emailInputRef.current,
          "Email đã tồn tại",
          userList
        );
    }
    isValid &=
      validateRequired(
        state.matKhau,
        matKhauInputRef.current,
        "Chưa nhập mật khẩu"
      ) &&
      validateCheck(
        state.matKhau,
        matKhauInputRef.current,
        "Định dạng mật khẩu chưa đúng",
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
      );

    isValid &=
      validateRequired(
        state.soDT,
        soDTInputRef.current,
        "Chưa nhập số điện thoại"
      ) &&
      validateCheck(
        state.soDT,
        soDTInputRef.current,
        "Vui lòng nhập số",
        /^[0-9]+$/
      ) &&
      validateChecLength(
        state.soDT,
        soDTInputRef.current,
        "Số điện thoại có 10 số",
        10
      );

    isValid &= validateRequired(
      state.hoTen,
      hoTenInputRef.current,
      "Chưa nhập họ tên"
    );

    isValid &= validateRequired(
      state.maLoaiNguoiDung,
      loaiNguoiDungRef.current,
      "Vui lòng chọn loại người dùng"
    );
    if (isValid) {
      if (document.getElementById("taiKhoan").disabled === false) {
        addUser(state);
        document.getElementById("btnDong").click();
        setState({
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDT: "",
          maNhom: "GP01",
          hoTen: "",
          maLoaiNguoiDung: "",
        });
      } else {
        editUser(state);
        document.getElementById("btnDong").click();
        setState({
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDT: "",
          maNhom: "GP01",
          hoTen: "",
          maLoaiNguoiDung: "",
        });
      }
    }
  };
  const handleDelete = async (key) => {
    try {
      const confirmationResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      });

      if (confirmationResult.isConfirmed) {
        const result = await userAdminService.fecthDeleteUserAdminApi(key);
        if (result.data.content) {
          Swal.fire("Deleted!", "User has been update.", "success");
          UserListApi();
        } else {
          Swal.fire("error");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.content}`,
      });
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="card ">
      <div className="card-header text-left myCardHeader">
        <h3 className="text-left font-weight-bold">USER MANAGER</h3>
        <button
          id="BtnHandleAdd"
          onClick={btnHandle}
          className="btn btn-info"
          data-toggle="modal"
          data-target="#myModal"
        >
          <span>Add User</span>
        </button>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                onChange={handleSearch}
                className="form-control"
                placeholder="Tìm kiếm theo Họ tên"
                id="searchName"
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="btnTimNV">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-bordered table-hover myTable">
          <thead>
            <tr>
              <th className="nowrap">
                <span className="mr-1">STT</span>
              </th>
              <th className="nowrap">
                <span className="mr-1">Tài Khoản</span>
              </th>
              <th className="nowrap">
                <span className="mr-1">Mật khẩu</span>
              </th>
              <th>
                <span className="mr-1">Họ tên</span>
              </th>
              <th>
                <span className="mr-1">Email</span>
              </th>
              <th>
                <span className="mr-1">Số điện thoại</span>
              </th>
              <th>
                <span className="mr-1"></span>
              </th>
            </tr>
          </thead>
          <tbody>{renderUser()}</tbody>
        </table>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <header className="head-form mb-0 text-center">
              <h2 id="header-title">Thêm người dùng</h2>
            </header>
            <div className="modal-body">
              <form role="form" id="modalUser">
                <div className="form-group">
                  <div className="input-group">
                    <input
                      value={state.taiKhoan}
                      id="taiKhoan"
                      onChange={handleChange}
                      type="text"
                      name="taiKhoan"
                      className="form-control input-sm"
                      placeholder="Tài khoản"
                    />
                  </div>
                  <span
                    className="text-danger"
                    id="errorTaiKhoan"
                    ref={taiKhoanInputRef}
                  ></span>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      value={state.matKhau}
                      onChange={handleChange}
                      type="password"
                      name="matKhau"
                      className="form-control input-sm"
                      placeholder="Mật Khẩu"
                    />
                  </div>
                  <span className="text-danger" ref={matKhauInputRef}></span>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      value={state.email}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      className="form-control input-sm"
                      placeholder="Email"
                    />
                  </div>
                  <span className="text-danger" ref={emailInputRef}></span>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      value={state.soDT}
                      onChange={handleChange}
                      type="text"
                      name="soDT"
                      className="form-control input-sm"
                      placeholder="Số điện thoại"
                    />
                  </div>
                  <span className="text-danger" ref={soDTInputRef}></span>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      value={state.hoTen}
                      onChange={handleChange}
                      type="text"
                      name="hoTen"
                      className="form-control input-sm"
                      placeholder="Họ tên"
                    />
                  </div>
                  <span className="text-danger" ref={hoTenInputRef}></span>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <select
                      value={state.maLoaiNguoiDung}
                      onChange={handleChange}
                      name="maLoaiNguoiDung"
                      className="form-control"
                    >
                      <option value="">Loại người dùng</option>
                      <option value="KhachHang">Khách hàng</option>
                      <option value="QuanTri">Quản trị</option>
                    </select>
                  </div>
                  <span className="text-danger" ref={loaiNguoiDungRef}></span>
                </div>
              </form>
            </div>
            <div className="modal-footer" id="modal-footer">
              <button
                onClick={handleSubmit}
                id="btnAdd"
                className="btn btn-success"
              >
                Thêm
              </button>
              <button
                id="btnDong"
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
