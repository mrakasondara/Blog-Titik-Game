import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {Close,Menu,TrendingUp} from 'react-ionicons'
import {UserContext} from '../UserContext'

const Sidebar = ({display,width})=>{
 const {setIsMenuOpen, isMenuOpen} = useContext(UserContext)
 const {setUserInfo, userInfo} = useContext(UserContext)
 const username = userInfo?.username
	return(
	  	<div className={`${display} flex-col top-0 bottom-0 absolute bg-indigo-500 ${width} z-10 transition py-5 px-3`}>
		  	<div className="flex items-center justify-between w-full h-10">
		  		<h1 className="text-3xl font-bold text-white">
            	<span className="text-yellow-800">.</span>
            	Game
          		</h1>
          		<button className="text-3xl" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
	              }}>
	              {(isMenuOpen)&&(
	                <Close
			            color={'#000000'}
			            width="30px"
			            height="30px"
		          	/> )
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
	  		<div className="flex flex-col items-center gap-2 self-center w-full mt-10">
	  			{(username)&&(
	  				<>
	  				{/*<img src={`src/assets/user/profile.png`} className="w-20" alt=""/>*/}
	  				<h1 className="text-xl text-slate-100">{username}</h1>
	  				</>
	  			)}
	  			
	  			<div className="flex w-full gap-2">
	  				
              		{(!username)&&(
              		<>
	                	<Link to="/login" onClick={()=> setIsMenuOpen(!isMenuOpen)} className="block bg-green-500 py-1 px-1 md:px-2 rounded-full  text-white font-bold hover:text-green-500 hover:bg-white hover:border-2 hover:border-green-500 w-1/2 text-center">Login</Link>
	                	<Link to="/Register" onClick={()=> setIsMenuOpen(!isMenuOpen)} className="block bg-white text-green-500 border-2 border-green-500 py-1 px-1 md:px-2 rounded-full  hover:text-white hover:bg-green-500 font-bold w-1/2 text-center">Register</Link>
              		</>
              		)}
              		{(username)&&(
              		<>
	              		<button className="block transition bg-red-500 py-1 px-1 md:px-2 rounded-full  text-white font-bold hover:text-red-500 hover:bg-white hover:border hover:border-red-500 w-1/2" >
	                		Logout
	              		</button>
	              		<button className="block transition bg-transparent py-1 px-1 md:px-2 rounded-full  text-white font-bold border border-white hover:text-white hover:bg-green-500  w-1/2">
	                		<Link to="">Turn On Notification</Link>
	              		</button>
              		</>
              		)}
	  			</div>
	  			
	  		</div>
	  		<nav className="flex-col my-10 px-10">
	  			<ol className="flex flex-col gap-5 text-slate-50 font-bold  text-xl">
	  				<Link to="" className="">
		  				<li className="flex items-center gap-5 transition">
		  					<TrendingUp
				            color={'#ffffff'}
				            width="30px"
				            height="30px"
			          		/>
		  					Trending News
		  				</li>
	  				</Link>
	  				{(username)&&(
	  				 <Link to="/addblog" onClick={()=> setIsMenuOpen(!isMenuOpen)} >		
		  				<li className="flex items-center transition gap-5">
		  					<span className="material-symbols-outlined w-[30px]">
		  						post_add
		  					</span>
		  					Post A Blog
		  				</li>
		  			 </Link>
	  				)}

	  			</ol>
	  		</nav>
	  	</div>
	)
}
export default Sidebar