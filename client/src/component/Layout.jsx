import React,{useContext} from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from './Sidebar'
import Footer from "./Footer";
import {UserContext} from '../UserContext'

const Layout = () => {
  const {setIsMenuOpen, isMenuOpen} = useContext(UserContext)

  const width = isMenuOpen ? 'w-full' : 'w-0'
  const display = isMenuOpen ? 'flex' : 'hidden'
  return (
    <div className="w-full relative">
      <Header />
      <Sidebar width={width} display={display}/>
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout
