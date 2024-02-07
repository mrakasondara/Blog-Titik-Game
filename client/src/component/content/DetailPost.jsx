import React,{useContext,useState,useEffect} from 'react'
import {useParams,Link,Navigate} from 'react-router-dom'
import {format} from 'date-fns'
import {CalendarClearOutline} from 'react-ionicons'
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import {UserContext} from '../../UserContext'
const DetailPost = ()=>{
  	const {userInfo} = useContext(UserContext)
  	const {updateSuccess, setUpdateSuccess} = useContext(UserContext)
	const [postDetail,setPostDetail] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isNotFound, setIsNotFound] = useState(false)

  	const urlImage = 'https://res.cloudinary.com/dxs0jt3xe/image/upload/v1704103187/'

	const {id} = useParams()
	useEffect(() => {
    	fetch(`https://blog-titikgame.vercel.app/api/detailpost/${id}`).then(response=>{
    		response.json().then(post=>{
    			if(post){
    				setPostDetail(post)
    				setIsLoading(false)
    			}
    		})
    		if(response.status === 404){
    			setIsNotFound(true)
    		}
    	})
  	}, []);
  	if(isNotFound){
  		return <Navigate to={'/'}/>
  	}
  	setTimeout(()=>{
  		setUpdateSuccess(false)
  	},3000)
  	// if(!postDetail) return ''
	return(
		<div className="w-full flex flex-col justify-center items-center gap-2 p-5">
			<Snackbar open={updateSuccess}>
				<Alert
					severity="success"
		          	variant="filled"
		          	sx={{width: '100%'}}
	          	>Data berhasil diubah</Alert>
			</Snackbar>
			{isLoading&&(
				<div className="w-3/4  flex flex-col gap-2 items-center">
					<div className="w-full md:w-1/2 flex-col">
						<Skeleton variant="text" sx={{fontSize: '1rem', width: '100%'}}/>
						<Skeleton variant="rounded" sx={{fontSize: '20rem', width: '100%'}}/>
					</div>
					<div className="w-full flex justify-between">
						<Skeleton variant="text" sx={{fontSize: '1rem', width: '10%'}}/>
						<Skeleton variant="text" sx={{fontSize: '1rem', width: '40%'}}/>
					</div>
					<div className="w-full flex-col">
						<Skeleton variant="text" sx={{fontSize: '1rem', width: '20%'}}/>
					</div>
					<div className="w-full flex">
						<Skeleton variant="rectangular" sx={{fontSize: '20rem', marginTop:'2rem', width: '100%'}}/>
						
					</div>
				</div>
			)}
			{!isLoading&&(
			<>	
				<h1 className="font-bold text-2xl font-roboto tracking-wide">{postDetail?.title}</h1>
					{userInfo?.id === postDetail?.author._id && (
						<Link to={'/editpost/'+postDetail?._id} className="flex gap-1 text-sm items-center bg-yellow-300 p-2 rounded-lg hover:bg-white hover:border hover:border-yellow-300 cursor-pointer transition">
							<span className="material-symbols-outlined">Edit</span>
							<p className="font-semibold">Edit Postingan</p>
						</Link>
					)}
				<img className="h-[300px] md:w-1/2  md:h-[350px] rounded-lg" src={`${urlImage}/${postDetail.thumbnail}`}/>
				<div className="w-full flex-col text-sm text-slate-400">
					<div className="w-full flex justify-between">
						<p>Author</p>
						<div className="flex items-center gap-2">
							<CalendarClearOutline
								color={'#858585'}
								height="19px"
								width="19px"
							/>
							<p>{format(new Date(postDetail?.createdAt),'MMM d, yyyy, HH:mm')}</p>
						</div>
					</div>
					<p className="text-black text-[15px] font-bold">{postDetail?.author.username}</p>
					<div className="text-black text-[17px] mt-5 text-justify w-full" dangerouslySetInnerHTML={{__html:postDetail?.content}}></div>
				</div>
			</>	
			)}
		</div>
		
	)
}

export default DetailPost