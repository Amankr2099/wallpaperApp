import { useState } from 'react'
// import './App.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import ImagePage from './pages/ImagePage';
import {Layout} from './pages/Layout'
import ThemePage from './pages/ThemePage';
import AdminPage from './pages/AdminPage';

export const App = () => {

  const router = createBrowserRouter(


    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home/>} />
        <Route path="/wallpaper/:wallID" element={<ImagePage />} />
        <Route path="/themes/:theme" element={<ThemePage />} />
        <Route path="/admin/:adminId" element={<AdminPage />} />


      </Route>
    )
  );

  return (
   
    <RouterProvider router={router}/>

  );
};