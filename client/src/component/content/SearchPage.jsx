import React,{useEffect,useState} from "react";
import {useParams} from 'react-router-dom'
import BlogItem from './BlogItem'
import SkeletonContent from '../SkeletonContent'
const SearchPage = ()=>{
	const [posts, setPosts] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [notFound,setNotFound] = useState(false)
	const {query} = useParams()
	useEffect(()=>{
		fetch(`https://api-tes-rho.vercel.app/search/${query}`).then(response=>{
			response.json().then(posts=>{
				if(posts){
					setPosts(posts)
					setIsLoading(false)
					setNotFound(false)
				}
				if(posts.length === 0){
					setNotFound(true)
				}
			})
		})
	},[])

	return(
	<div className="w-full my-3 flex flex-col gap-3 p-5 mb-[10rem]">
		{!notFound&&(
      <div className="flex items-center bg-indigo-400 gap-2 p-2 shadow-lg shadow-slate-300 rounded-lg">
        <span className="material-symbols-outlined">
          Search
        </span>
        <h1 className="text-lg font-semibold tracking-wider">Hasil pencarian <span className="text-white underline font-bold">{query}</span></h1>
      </div>
    )}
    {notFound&&(
      <div className="flex items-center bg-red-500 gap-2 p-2 shadow-lg shadow-slate-300 rounded-lg">
        <span className="material-symbols-outlined">
          Search
        </span>
        <h1 className="text-lg font-semibold tracking-wider">Hasil pencarian <span className="text-white underline font-bold">{query}</span> tidak ditemukan !</h1>
      </div>
    )}
      <div className="flex justify-center flex-wrap mt-5 gap-5">
      {isLoading&&(
        <>
          <SkeletonContent/>
          <SkeletonContent/>
          <SkeletonContent/>
          <SkeletonContent/>
        </> 
      )}
      {!isLoading&&(
        (posts.length > 0 && posts.map(post=>(
          <BlogItem {...post} key={post._id}/>
        )))
      )}

      </div>

    </div>
  );
};
export default SearchPage