import React, { useEffect, useState } from 'react'
import { Form, InputNumber, DatePicker, Cascader, notification } from 'antd';
import { filmService } from '../../../services/Films';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';

export default function AdminShowTime() {
    const params = useParams();
    const navigate = useNavigate();
    const [listHeThongRap, setListHeThongRap] = useState([]);
    const [listCumRap, setListCumRap] = useState([]);
    const [lichChieu, setLichChieu] = useState({
        maPhim: params.filmId,
        ngayChieuGioChieu: '',
        maRap: '',
        giaVe: 0,
    })
    useEffect(() => {
        heThongRap();
    }, [])
    const heThongRap = async () => {
        const result = await filmService.fetchHeThongRapApi();
        setListHeThongRap(result.data.content);
    }
    const renderHeThongRap = () => {
        return listHeThongRap?.map((element) => {
            return { label: element.tenHeThongRap, value: element.maHeThongRap }
        })
    }
    const handleChangeHeThongRap = async (value) => {
        const result = await filmService.fetchCumRapApi(value);
        setListCumRap(result.data.content)
    }
    const renderCumRap = () => {
        return listCumRap?.map((element) => {
            return { label: element.tenCumRap, value: element.maCumRap }
        })
    }
    const handleChangeCumRap = (value) => {
        setLichChieu({
            ...lichChieu,
            maRap: value[0],
        })
    }

    const onOk = (value) => {
        const date = moment(value).format('DD/MM/YYYY hh:mm:ss')
        setLichChieu({
            ...lichChieu,
            ngayChieuGioChieu: date,
        })
    }
    const onChange = (value) => {
        const date = moment(value).format('DD/MM/YYYY hh:mm:ss')
        setLichChieu({
            ...lichChieu,
            ngayChieuGioChieu: date,
        })
    }
    const onChangeGiaVe = (value) => {
        setLichChieu({
            ...lichChieu,
            giaVe: value,
        })
    }
    const handleSubmit = async () => {
        if (lichChieu.maPhim === ':filmId') {
            notification.warning({
                message: "Bạn Thiếu Mã phim !!!",
                placement: "bottomLeft",
            });
        } else {
            try {
                const result = await filmService.fetchTaoLichChieuApi(lichChieu);
                if (result.data.content) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Thêm lịch chiếu thành công !',
                    });
                    navigate("/admin/films");
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.response.data.content}`,
                })
            }
        }


    }
    return (
        <Form
            onSubmitCapture={handleSubmit}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
        >
            <h1 className='mb-5'>Tạo lịch chiếu</h1>
            <Form.Item label="Hệ Thống Rạp">
                <Cascader name='' options={renderHeThongRap()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
            </Form.Item>
            <Form.Item label="Cụm Rạp">
                <Cascader options={renderCumRap()} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
            </Form.Item>
            <Form.Item label="Ngày Giờ Chiếu">
                <DatePicker format='DD/MM/YYYY hh:mm:ss' showTime onChange={onChange} onOk={onOk} />
            </Form.Item>
            <Form.Item label="Giá Vé">
                <InputNumber min={75000} max={200000} onChange={onChangeGiaVe} />
            </Form.Item>
            <Form.Item label="Chức Năng">
                <button className='btn btn-success' type='submit'>Tạo lịch chiếu</button>
            </Form.Item>
        </Form>
    );

}
