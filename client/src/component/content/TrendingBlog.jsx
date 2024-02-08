import React, {useEffect,useState} from "react";
import TrendItem from './TrendItem'
const TrendingBlog = () => {
  const [posts,setPosts] = useState({})
  useEffect(()=>{
      fetch('https://blog-titikgame.vercel.app/api/trending').then(response=>{
        response.json().then(post=>{
          setPosts(post)
        })
      })
  },[])
  return (
    <div className="w-full my-3 flex flex-col gap-3 p-5 mb-[22rem]">
      <div className="flex items-center gap-2">
         <span className="material-symbols-outlined">
        whatshot
         </span>
          <h1 className="text-lg font-semibold tracking-wider">
            Trending News
          </h1>
      </div>
     <div className="flex-col gap-3">
        {posts.length >=1 && posts.map(post=>(
            <TrendItem {...post} key={post._id}/>
        ))
        }
     </div>
    </div>
  )
}
export default TrendingBlog;
