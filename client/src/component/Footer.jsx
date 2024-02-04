import React from "react";
import {Link} from 'react-router-dom'
import {LogoFacebook,LogoGithub,LogoLinkedin,LogoInstagram} from 'react-ionicons'
const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-indigo-500 h-40 p-3 gap-3 mt-[5rem]">
      <div className="w-1/2 my-2">
      <ol className="flex justify-center gap-2">
        <li>
          <a href="https://facebook.com/" target="_blank">
            <LogoFacebook
              color={'#113adf'}
              title={"facebook.com"}
              width="30px"
              height="30px"
            />  
          </a>
        </li>
        <li>
           <a href="https://github.com/mrakasondara" target="_blank">
            <LogoGithub
            color={'#000000'}
            title={"https://github.com/mrakasondara"}
            width="30px"
            height="30px"
            />
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <LogoLinkedin
            color={'#3f798z'}
            title={"https://linkedin.com/mrakasondara"}
            width="30px"
            height="30px"
            />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/mrakasondara" target="_blank">
            <LogoInstagram
            color={'#d00780'}
            title={"https://instagram.com/mrakasondara"}
            width="30px"
            height="30px"
            />
          </a>
        </li>
      </ol>
      </div>
      <div className="w-full flex">
        <ol className="w-full flex gap-5 text-md md:text-lg justify-center text-white font-semibold">
          <li className="hover:text-slate-600 transition">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="hover:text-slate-600 transition">
            <Link to={'/trending'}>Trending</Link>
          </li>
          <li className="hover:text-slate-600 transition">
            <a className="cursor-pointer">About</a>
          </li>
          <li className="hover:text-slate-600 transition">
            <a className="cursor-pointer">Contact Me</a>
          </li>
        </ol>
      </div>
      <h1 className="text-slate-800 text-sm">&copy; mrakasondara 2023</h1>
    </div>
    
  );
};
export default Footer;
