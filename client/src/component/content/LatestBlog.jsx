import React,{useEffect,useState} from "react";
import BlogItem from "./BlogItem";
import SkeletonContent from '../SkeletonContent'
const LatestBlog = () => {
  const [posts,setPosts] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    fetch(`https://api-tes-rho.vercel.app/post`).then(response=>{
      response.json().then(posts=>{
        setPosts(posts)
        setIsLoading(false)
      })
    })
  },[])


  return (
    <div className="w-full my-3 flex flex-col gap-3  p-5">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined">
          Feed
        </span>
        <h1 className="text-lg font-semibold tracking-wider">Blog Terbaru</h1>
              
      </div>
      <div className="flex justify-center flex-wrap gap-5">
      {isLoading&&(
        <>
          <SkeletonContent/>
          <SkeletonContent/>
          <SkeletonContent/>
          <SkeletonContent/>
        </> 
      )}
      {!isLoading&&(
        (posts.length >= 1 && posts.map(post=>(
                    <BlogItem {...post} key={post._id}/>
        )))
      )}

      </div>

    </div>
  );
};
export default LatestBlog;
