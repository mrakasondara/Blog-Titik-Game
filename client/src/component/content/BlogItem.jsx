import React,{useState} from "react";
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import {CalendarClearOutline} from 'react-ionicons'
const BlogItem = ({_id,thumbnail,title,summary,tag,createdAt,author}) => {
  const [link, setLink] = useState(false)
  const urlImage = 'https://res.cloudinary.com/dxs0jt3xe/image/upload/v1704103187/'

  return (
    <div className="min-w-[25%] max-w-[45%] my-5 flex-col lg:max-w-[30%] h-full md:h-auto">
     <Link to={`/detailpost/${_id}`}>
      <img className="rounded-lg w-full h-2/5" src={`${urlImage}/${thumbnail}`} alt=""/>
      </Link>
      <div className="flex w-full max-h-12 text-elipsis overflow-hidden my-2 items-center justify-center text-center">
        <Link to={`/detailpost/${_id}`}>
          <h1 className="text-[17px] text-center font-semibold font-roboto">{title}</h1>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center  mt-2 gap-1 md:gap-0">
        <p className="text-[14px] text-center  font-semibold">{author.username}</p>
        <div className="flex justify-center md:justify-start gap-2">
          <CalendarClearOutline
              color={'#000000'}
              height="19px"
              width="19px"
            />
          <p className="text-[14px]">{format(new Date(createdAt),'d MMM yyyy, HH:mm')}</p>
        </div> 
      </div>
      <div className="flex text-center max-h-[100px] text-elipsis overflow-hidden md:text-justify my-5">
          <p className="text-[15px] font-fira">{summary}</p>
      </div>
      <div className="flex justify-center mb-5 md:justify-start">
        <Link to={`/tag/${tag}`}>
          <p className="bg-indigo-500 justify-center font-roboto text-slate-50 inline rounded-xl px-3 border hover:bg-white hover:border-indigo-500 hover:text-indigo-500 cursor-pointer transition">{tag}</p>
        </Link>
      </div>
    </div>
  );
};
export default BlogItem;
