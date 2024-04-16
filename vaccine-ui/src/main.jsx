import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home/Home.jsx'
import Type from './type/type.jsx'
import Staff from './staff/Staff.jsx'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
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
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>,
)
