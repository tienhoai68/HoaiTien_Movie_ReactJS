import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { cinemaService } from '../../../services/cinema';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { LoadingContext } from '../../../contexts/Loading/Loading';
const { TabPane } = Tabs;

export default function TabCinema() {
  const [tabPosition] = useState('left');
  const [cinema, setCinema] = useState([]);
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  useEffect(() => {
    fetchCinema();
  }, [])

  const fetchCinema = async () => {
    setLoadingState({ isLoading: true });
    const result = await cinemaService.fetchCinemaApi();
    setCinema(result.data.content)
    setLoadingState({ isLoading: false });
  }

  const renderTabpane = () => {
    return cinema?.map((element, index) => {
      return (
        <TabPane tab={<img src={element.logo} className='rounded-circle' />} key={index}>
          <Tabs tabPosition={tabPosition}>
            {element.lstCumRap.slice(0, 5).map((element) => {
              return <TabPane tab={<div className='cinema-name text-left'>
                <div className='name-cinema'>{element.tenCumRap}</div>
                <div className='address'>{element.diaChi}</div>
              </div>} key={element.maCumRap}>
                <div className='scroll'>
                  {element.danhSachPhim.map((element) => {
                    return <Fragment key={element.maPhim}>
                      <div className='d-flex border-list'>
                        <img className='img-movie' src={element.hinhAnh} alt="" />
                        <div className='content-movie w-100 ml-3'>
                          <h2 className='movie-name'><i className="fa-solid fa-film"></i> {element.tenPhim}</h2>
                          <div>
                            <div className='row'>
                              {element.lstLichChieuTheoPhim.slice(0, 12).map((element) => {
                                return <Fragment key={element.maLichChieu}>
                                  <div className='col-md-4 col-lg-3'>
                                    <NavLink to={`/booking/${element.maLichChieu}`} className='date'>{moment(element.ngayChieuGioChieu).format("hh :mm A")}</NavLink>
                                  </div>
                                </Fragment>
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  })}
                </div>

              </TabPane>
            })}
          </Tabs>
        </TabPane>
      )
    })
  }
  return (
    <div className="main-movie tablist-movie container">
      <div className="title-movie">
        <div className="page-title category-title">
          <i className="fas fa-star"></i>
          <h1 className='title-res'>CỤM RẠP CHIẾU</h1>
          <hr />
        </div>
        <Tabs tabPosition={tabPosition}>
          {renderTabpane()}
        </Tabs>
      </div>
    </div>
  )
}
