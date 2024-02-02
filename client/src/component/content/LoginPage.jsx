import React, { useState, useContext } from "react";
import { Link,Navigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import {UserContext} from '../../UserContext'
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [statusNotif, setStatusNotif] = useState(false)
 const {setUserInfo} = useContext(UserContext)
 async function login(ev){
    ev.preventDefault()
    const response = await fetch('http://localhost:4000/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    })
    if(response.status === 200){
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
        {setTimeout(()=>{
          setRedirect(true)
        }),5000}
        setShowNotif(true)
        setStatusNotif(true)
      })
    }else{
      setShowNotif(true)
      setStatusNotif(false)
    }

  }

  if(redirect){
   return <Navigate to={"/"}/>
  }
  return (
    <div className="w-full flex justify-center p-3">
      <div className="w-3/4 md:w-2/4 min-h-[20rem] h-auto flex flex-col bg-slate-50 my-[5rem] px-5 py-[3rem] justify-center items-center rounded-lg shadow shadow-slate-300 shadow-lg">
        {showNotif&&(
          <div>
          {statusNotif&&(
            <Alert severity="success">Login Sukses - <span className="text-black">Selamat Datang</span></Alert>
          )}
          {!statusNotif&&(
            <Alert severity="error">Login Gagal - <span className="text-black">Username atau Password salah</span></Alert>
          )}
          </div>
        )}
        <h1 className="text-2xl text-slate-700 font-bold text-center">Login</h1>
        <form
          className="flex flex-col w-full md:w-1/2 gap-3 text-slate-700"
          onSubmit={login}
        >
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="username"
              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-around">
            <p className="text-sm">Belum mempunyai akun ?</p>
            <Link to="/register" className="text-sm underline text-blue-700">
              Register
            </Link>
          </div>
          <div className="flex w-full justify-center">
            <button className="w-1/2 border rounded-full  py-1 px-2 bg-green-400 text-white font-bold hover:bg-white hover:border-green-400 hover:text-slate-500">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
