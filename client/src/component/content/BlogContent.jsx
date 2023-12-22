import React from "react";
import LatesBlog from "./LatestBlog";
import TrendingBlog from "./TrendingBlog";
const BlogContent = () => {
  return (
    <div className="sm:gap-5 w-full flex flex-col md:flex-row justify-between">
      <LatesBlog />
      {/*<TrendingBlog />*/}
    </div>
  )
}
export default BlogContent;
