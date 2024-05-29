import React from 'react'
import ReactDOM from 'react-dom/client'
import { useEffect } from 'react';
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route,useNavigate, Outlet } from 'react-router-dom'
import Type from './type/type.jsx'
import Cookies from 'js-cookie'
import Staff from './staff/Staff.jsx'
import Manufacturer from './manufacturer/Manufacturer.jsx'
import Vaccine from './vaccine/vaccine.jsx'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Objects from './object/Object.jsx'
import Schedule from './schedule/Schedule.jsx'
import Login from './login/Login.jsx'
import Test from './test/test.jsx'

import Plan from './plan/Plan.jsx'
import Storage from './storage/storage.jsx'
import UnitDelivering from './unit_delivering/UnitDelivering.jsx'
import { Result,Button } from 'antd'
import DashBoard from './dash_board/DashBoard.jsx';
import Statistical from './statistical/Statistical.jsx';
import HistoryInjection from './history/History.jsx';
const queryClient = new QueryClient()

console.log("session: "+ sessionStorage.length )
console.log("Cookies: "+ Object.keys(Cookies.get()).length )
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
   <QueryClientProvider client={queryClient}>
   <BrowserRouter>
  <Routes>
  <Route path="*" element={<Result status={404} title="Không tìm thấy trang"
   subTitle="Trang bị lỗi hoặc không tồn tại" 
   extra={<Button type="primary" onClick={()=>{
    history.back();
   }}>Trở lại trang trước</Button>}/> }/>
    <Route path='/Login'element={<Login/>}></Route>
    <Route path='/DashBoard' element={<DashBoard/>}></Route>
    {/* <Route path='/Type' element={ sessionStorage.length > 0  || Object.keys(Cookies.get()).length > 0 ? <Type/> : <Login/>}></Route> */}
    <Route path='/Type' element={<Type></Type>}></Route>
    <Route path='/Staff' element={ <Staff/>}></Route>
    <Route path='/History' element={ <HistoryInjection/>}></Route>
    <Route path='/Manufacturer' element={  <Manufacturer/>}></Route>
    <Route path='/Vaccine'element={ <Vaccine/>}></Route>
    <Route path='/Object' element={ <Objects/>}></Route>
    <Route path='/Storage' element={ <Storage/>}></Route>
    <Route path='/Schedule'element={  <Schedule/> }></Route>
    <Route path='/Plan' element={ <Plan/> }></Route>
    <Route path='/Statistical' element={<Statistical></Statistical> }></Route>
    <Route path='/UnitDelivering'element={ <UnitDelivering/>}></Route>
    <Route path='/Test' element={<Test/>}></Route>
  </Routes>
   </BrowserRouter>
   </QueryClientProvider>
  </React.StrictMode>,
)
