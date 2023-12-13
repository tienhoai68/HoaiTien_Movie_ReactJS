import React from 'react'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import "./HomeLayout.scss"
export default function HomeLayout() {
  return (
    <div style={{background: "#fdfcf0"}} className=''>
    <div className=' wrapper'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
    </div>
  )
}
