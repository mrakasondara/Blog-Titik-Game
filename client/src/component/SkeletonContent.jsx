import React from 'react'
import Skeleton from '@mui/material/Skeleton';
const SkeletonContent = () =>{
	return(
	<div className="w-[45%] flex-col lg:w-[30%] ">
      <Skeleton variant="rounded" sx={{ fontSize: '10rem', width: '100%' }}/>
		<div className="flex w-full justify-center text-center">
	       <Skeleton variant="text" sx={{ fontSize: '10px', width: '100%' }}/>
		</div>
		<div className="flex flex-col items-center justify-center md:flex-row md:justify-between md:items-center mt-1 gap-1 md:gap-0">
	       <Skeleton variant="text" sx={{ fontSize: '14px', width: '40%' }}/>
	       	<Skeleton variant="text" sx={{ fontSize: '14px', width: '40%' }}/>
		</div>
		<div className="flex text-center max-h-[100px] text-elipsis overflow-hidden md:text-justify my-5">
      		<Skeleton variant="rectangular" sx={{ fontSize: '50px', width: '100%' }}/>
	      </div>
	      <div className="flex justify-center md:justify-start">
	       	<Skeleton variant="rounded" sx={{ fontSize: '14px', width: '20%' }}/>
	    </div>
	</div>
	)
}
export default SkeletonContent
