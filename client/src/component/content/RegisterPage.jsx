import React,{useState} from "react";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

const RegisterPage = () => {
  const [fullname,setFullname] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [showNotif, setShowNotif] = useState(false)
  const [statusNotif, setStatusNotif] = useState(false)
  async function register(ev){
    ev.preventDefault()
    const response = await fetch('http://localhost:4000/register',{
      method: 'POST',
      body: JSON.stringify({fullname,username,password}),
      headers: {'Content-type':'application/json'},
    })
      if(response.status === 200){
        // alert('sukes')
        setShowNotif(true)
        setStatusNotif(true)
      }else{
        // alert('register gagal')
        setShowNotif(true)
        setStatusNotif(false)
      }
    
    setFullname('')
    setUsername('')
    setPassword('')
  }
  return (
    <div className="w-full flex justify-center p-3">
      <div className="w-3/4 md:w-2/5 h-auto min-h-[25rem] flex flex-col bg-slate-50 my-[5rem] px-5 py-[3rem] justify-center items-center rounded-lg shadow shadow-slate-300 shadow-lg">
        {showNotif&&(
          <div>
          {statusNotif&&(
            <Alert severity="success">Register Sukses - <Link to='/login' className="text-black cursor-pointer underline">Halaman Login</Link></Alert>
          )}
          {!statusNotif&&(
            <Alert severity="error">Register Gagak - <span className="text-black">Username telah digunakan</span></Alert>
          )}
          </div>
        )}
        <h1 className="text-2xl text-slate-700 font-bold text-center">
          Register
        </h1>
        <form
          onSubmit={register}
          className="flex flex-col w-full md:w-4/5 gap-3 text-slate-700"
        >
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="">Nama Lengkap</label>
            <input
              type="text"
              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 px-3 py-2"
              value={fullname}
              onChange={ev => setFullname(ev.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 px-3 py-2"
              value={username}
              onChange={ev => setUsername(ev.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 px-3 py-2"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
            />
          </div>
          <div className="flex w-full justify-center">
            <button type="submit" className="w-1/2 border rounded-full  py-1 px-2 bg-green-400 text-white font-bold hover:bg-white hover:border-green-400 hover:text-slate-500">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
