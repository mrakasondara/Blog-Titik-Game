import React,{useState,useEffect} from "react";
import {Link,Navigate} from 'react-router-dom'
import {CalendarClearOutline,Search} from 'react-ionicons'
import {format} from 'date-fns'
import SkeletonHero from './SkeletonHero'
const Hero = () => {
  const [highlight, setHighlight] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [navigate, setNavigate] = useState(false)

  useEffect(()=>{
    fetch('http://localhost:4000/highlight').then(response=>{
    response.json().then(post=>{
      const index = Math.floor(Math.random()*post.length)
      setHighlight(post[index])
      setIsLoading(false)
    })
  })
  },[])
  if(navigate){
    return <Navigate to={`/detailpost/${highlight._id}`}/>
  }
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className='w-3/4 md:w-2/4 relative flex bg-[url(http://localhost:4000/uploads/hero.png)] bg-cover bg-center justify-center items-center h-20 rounded-lg'>
      <h1 className="text-2xl text-white font-fira">Blog</h1>
        <div className="flex absolute w-3/4 md:w-1/2 h-10 bg-indigo-500 top-[75%] rounded-lg items-center ">
        <input className="absolute w-[90%] h-10 bg-transparent rounded-lg text-white font-roboto px-3 outline-none" placeholder="Search"/>
        <span className="absolute -right-2 mr-3">
          <Search
                color={'#000000'}
                height="20px"
                width="20px"
              />
        </span>      
        </div>
      </div>
      {isLoading&&(
        <SkeletonHero/>
      )}
      {!isLoading&&(
        <div className="flex-col flex md:flex-row w-full my-5 items-center justify-center px-5">
            <img src={`http://localhost:4000/${highlight?.thumbnail}`} onClick={()=> setNavigate(true)} alt="thumbnail" className="w-full justify-center md:w-2/5 rounded-lg cursor-pointer"/>
            <div className="md:w-1/2 flex flex-col justify-center items-center gap-2 p-2 mx-10">
            <Link to={`/detailpost/${highlight._id}`} className="text-l text-center font-roboto mt-2">{highlight?.title}</Link>
            <div className="flex justify-center md:justify-start gap-2">
              <CalendarClearOutline
                color={'#000000'}
                height="19px"
                width="19px"
              />
              {highlight&&(
                <p className="text-[14px]">{format(new Date(highlight.createdAt),'d MMM yyyy, HH:mm')}</p>
                )}
            </div> 
            <p className="text-center sm:text-justify font-fira">{highlight?.summary}</p>
            <div className="w-full flex flex-col md:flex-row items-center gap-y-2 md:gap-y-0 md:justify-around">
              <p className="bg-indigo-500 rounded-lg font-roboto text-white hover:bg-white border border-indigo-500 cursor-pointer hover:text-indigo-500 px-2">{highlight?.tag}</p>
              <p className="font-semibold">{highlight?.author.username}</p>
            </div>
          </div>
        </div>
      )}
      
    </div>

  );
};
export default Hero;
