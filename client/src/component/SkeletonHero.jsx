import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonHero =()=>{

	return(
	  <div className="flex-col flex md:flex-row w-full my-5 items-center justify-center px-5">
        <div className="w-full md:w-2/5">
          <Skeleton variant="rounded" sx={{ fontSize: '10rem', width: '100%' }}/>
        </div>
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center gap-2 p-2 mx-10">
          <div className="flex w-full items-center">
            <Stack spacing={0} sx={{width: '100%'}}>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }}/>
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '50%', margin: '0 auto'}}/>
            </Stack>
          </div>
          <Skeleton variant="rectangular" sx={{ fontSize: '4rem', width: '100%' }}/>
          <div className="w-full flex flex-col md:flex-row items-center gap-y-2 md:gap-y-0 md:justify-around">
	          <Skeleton variant="rounded" sx={{ fontSize: '1rem', width: '15%' }}/>
	          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '25%' }}/>
          </div>
        </div>
      </div>
	)
}
export default SkeletonHero