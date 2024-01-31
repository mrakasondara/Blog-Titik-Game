import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import BlogItem from './BlogItem'
import SkeletonContent from '../SkeletonContent'
const TagPage = ()=>{
	const [tags, setTags] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	const {tagParams} = useParams()

	useEffect(()=>{
		fetch(`https://api-tes-rho.vercel.app/tag/${tagParams}`).then(response=>{
				response.json().then(tag=>{
					setTags(tag)
					setIsLoading(false)
				})
			})
	},[])



	return(
		<div className="w-full my-3 flex flex-col gap-3 p-5">
			<div className="flex items-center gap-2">
				<span className="material-symbols-outlined">
					Feed
				</span>
				<h1 className="text-lg font-semibold tracking-wider">Tag {tagParams}</h1>
			</div>
			<div className="flex justify-center flex-wrap gap-5">
			{isLoading &&(
				<>
					<SkeletonContent/>
					<SkeletonContent/>
					<SkeletonContent/>
					<SkeletonContent/>
				</>

			)}
			{!isLoading&&(
				(tags.length >= 1 && tags.map(tag=>(
					<BlogItem {...tag} key={tag._id} />
				)))
			)}
			</div>
		</div>
		)
}
export default TagPage