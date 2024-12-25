import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const Layout=()=> {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
    
  )
}
