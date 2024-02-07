import React,{useContext} from "react";
import { Outlet } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Header from "./Header";
import Sidebar from './Sidebar'
import Footer from "./Footer";
import {UserContext} from '../UserContext'

const Layout = () => {
  const {setIsMenuOpen, isMenuOpen} = useContext(UserContext)
  const {alertSuccess, setAlertSuccess} = useContext(UserContext)
  const width = isMenuOpen ? 'w-full' : 'w-0'
  const display = isMenuOpen ? 'flex' : 'hidden'
  setTimeout(()=>{
    setAlertSuccess(false)
  },3000)
  return (
    <div className="w-full relative">
      <Header />
      <Sidebar width={width} display={display}/>
      <Outlet />  
      <Snackbar 
        open={alertSuccess}
      >
        <Alert 
          severity="success"
          variant="filled"
          sx={{width: '100%'}}
        >
          Data Berhasil Ditambahkan
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
};
export default Layout
