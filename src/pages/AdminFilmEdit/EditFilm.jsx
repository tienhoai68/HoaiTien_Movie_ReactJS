import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  notification,
} from "antd";
import { filmService } from "../../services/Films";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export default function AddFilm() {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchFilmDetail();
  }, []);
  const fetchFilmDetail = async () => {
    const result = await filmService.fetchFilmDetaiApi(params.filmId);

    setState(result.data.content);
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [img, setImg] = useState("");

  const [state, setState] = useState({
    maPhim: params,
    maNhom: "",
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: {},
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSwitch = (value, name) => {
    setState({
      ...state,
      [name.target.offsetParent.name]: value,
    });
  };

  const handleChangeDate = (value) => {
    const ngayKhoiChieu = dayjs(value);
    setState({
      ...state,
      ngayKhoiChieu: ngayKhoiChieu,
    });
  };

  const handleChangeImg = (event) => {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImg(event.target.result);
    };
    setState({
      ...state,
      hinhAnh: file,
    });
  };
  const handleChangeNumber = (value) => {
    setState({
      ...state,
      danhGia: value,
    });
  };
  const handleSubmit = async () => {
    let formData = new FormData();
    for (let name in state) {
      if (name !== "hinhAnh" && name !== "ngayKhoiChieu") {
        formData.append(name, state[name]);
      }
      if (name === "ngayKhoiChieu") {
        const ngay = dayjs(state.ngayKhoiChieu).format("DD/MM/YYYY");
        formData.append("ngayKhoiChieu", ngay);
      }
      if (name === "hinhAnh") {
        if (img === "") {
          setState({
            ...state,
            hinhAnh: null,
          });
        }
        if (img !== "") {
          formData.append("File", state.hinhAnh, state.hinhAnh.name);
        }
      }
    }
    if (formData.get("dangChieu") === formData.get("sapChieu")) {
      notification.warning({
        message: "Sắp chiếu không thể hoạt động chung với đang chiếu",
        placement: "bottomLeft",
      });
    } else {
      try {
        const confirmationResult = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        });

        if (confirmationResult.isConfirmed) {
          const result = await filmService.fetchUpdateFilmApi(formData);
          if (result.data.content) {
            Swal.fire("Updated!", "Your file has been update.", "success");
            navigate("/admin/films");
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
    }
  };

  return (
    <div>
      <h1 className="md-5">Cập nhật phim</h1>
      <Form
        onSubmitCapture={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên Phim">
          <Input value={state.tenPhim} name="tenPhim" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Mã nhóm">
          <Select
            style={{
              width: 120,
            }}
            disabled
            name="maNhom"
            value={state.maNhom}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input value={state.trailer} name="trailer" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input value={state.moTa} name="moTa" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handleChangeDate}
            value={dayjs(state.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đang Chiếu" valuePropName="checked">
          <Switch
            checked={state.dangChieu}
            name="dangChieu"
            onChange={handleChangeSwitch}
          />
        </Form.Item>
        <Form.Item label="Sắp Chiếu" valuePropName="checked">
          <Switch
            checked={state.sapChieu}
            name="sapChieu"
            onChange={handleChangeSwitch}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            checked={state.hot}
            name="hot"
            onChange={handleChangeSwitch}
          />
        </Form.Item>
        <Form.Item label="Đánh Giá">
          <InputNumber
            name="danhGia"
            onChange={handleChangeNumber}
            value={state.danhGia}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <input name="hinhAnh" type="File" onChange={handleChangeImg} />
          <br />
          <img
            style={{ width: 150, height: 150 }}
            src={img === "" ? state.hinhAnh : img}
            alt="..."
          />
        </Form.Item>
        <Form.Item label="Tác Vụ">
          <button className="p-2 btn btn-success text-white" type="submit">
            Update
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
