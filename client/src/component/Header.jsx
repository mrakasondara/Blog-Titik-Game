import React,{useContext,useEffect,useState} from "react";
import { Link } from "react-router-dom";
import {Menu, Close} from 'react-ionicons'
import {UserContext} from '../UserContext'
const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext)
  const {setIsMenuOpen, isMenuOpen} = useContext(UserContext)

  useEffect(()=>{
    fetch('https://blog-titik-games.vercell.app/api/profile',{
      credentials: 'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      }) 
    })
  },[])
  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null)
    setNavigate(true)
  }
  const username = userInfo?.username 
  return (
      <div className="w-full flex items-center justify-between py-5 px-3 md:px-5">
        <Link to="/">
          <h1 className="text-3xl font-bold text-yellow-500">
            <span className="text-yellow-800">.</span>
            Game
          </h1>
        </Link>
        <div className="flex gap-2 justify-between md:gap-5">
        <nav className="hidden md:flex items-center px-3 mx-auto font-semibold">
          <ol className="flex gap-2">
            <li className="flex items-center hover:text-yellow-500 gap-1">
              <span className="material-symbols-outlined">
                whatshot
              </span>
              <Link to="" className="text-sm md:text-base">
                Trending News
              </Link>
            </li>
            {username && (
              <li>
                <Link
                  to="/addblog"
                  className="md:flex md:gap-1 md:items-center text-sm md:text-base hover:text-yellow-500"
                >
                  <span className="hidden md:block material-symbols-outlined">
                    post_add
                  </span>
                  Post
                </Link>
             </li>
              )}
            
          </ol>
        </nav>

          {username && (
            <div className="flex gap-5 items-center">
              <button className="transition hidden md:block bg-yellow-500 py-1 px-1 md:px-2 rounded-full text-[.8em] md:text-sm text-white font-bold hover:text-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-300">
                <Link to="">Turn On Notification</Link>
              </button>
              <span className="hidden md:block text-base">{userInfo.username}</span>
              <button className="transition border-2 border-red-500 py-1 px-2 text-[.8em] md:text-sm text-red-500 font-bold rounded-full hover:text-white hover:bg-red-500">
                <a onClick={logout}>Logout</a>
              </button>
              <button className="md:hidden" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
              }}>
              {(isMenuOpen)&&(
                <Close
                  color={'#000000'}
                  width="30px"
                  height="30px"
                />)
              }
              {(!isMenuOpen)&&(
                <Menu
                  color={'#000000'}
                  width="30px"
                  height="30px"
                />)
              }
              </button>
            </div>  
          )}
          {!username && (
            <div className="flex gap-2">
              <button className="transition border-2 border-indigo-500 py-1 px-2 text-[.8em] md:text-sm text-indigo-500 font-bold rounded-full hover:text-white hover:bg-indigo-500">
                <Link to="/login">Login</Link>
              </button>
              <button className="md:hidden" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
              }}>
              {(isMenuOpen)&&(
                <Close
                  color={'#000000'}
                  width="30px"
                  height="30px"
                />)
              }
              {(!isMenuOpen)&&(
                <Menu
                  color={'#000000'}
                  width="30px"
                  height="30px"
                />)
              }
              </button>
            </div>

          )}
        </div>
      </div>
  );
};

export default Header;
