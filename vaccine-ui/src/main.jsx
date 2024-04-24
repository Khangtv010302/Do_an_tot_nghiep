import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home/Home.jsx'
import Type from './type/type.jsx'
import Staff from './staff/Staff.jsx'
import Manufacturer from './manufacturer/Manufacturer.jsx'
import Vaccine from './vaccine/vaccine.jsx'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Object from './object/Object.jsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}></Route>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/Type' element={<Type/>}></Route>
          <Route path='/Staff' element={<Staff/>}></Route>
          <Route path='/Manufacturer' element={<Manufacturer/>}></Route>
          <Route path='/Vaccine' element={<Vaccine/>}></Route>
          <Route path='/Object' element={<Object/>}></Route>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>,
)
