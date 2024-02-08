import React from 'react'
import {EyeOutline,CalendarClearOutline} from 'react-ionicons'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'

const TrendItem = ({_id,title,summary,tag,views,createdAt,author})=>{
	return(
			<div className="w-full md:w-1/2 flex my-5 border items-center shadow-lg p-3 rounded-lg">
				<div className="w-10 flex-col p-2">
					<p className="font-bold text-red-500 text-center mx-auto">{views}</p>
					<EyeOutline
						color={'black'}
						height="25px"
						width="25px"
					/>	
				</div>
				<div className="flex-col ml-5">
					<Link to={`/detailpost/${_id}`}>
						<h1 className="text-lg font-bold">{title}</h1>
					</Link>
					<div className="flex text-sm">
						<p className="text-sm font-semibold">{author.username}</p>
						<div className="flex ml-5 gap-2">
							<CalendarClearOutline
								color={'black'}
								height="18px"
								width="18px"
							/>
							<p>{format(new Date(createdAt),'MMM d, yyyy, HH:mm')}</p>
						</div>
					</div>
				</div>
			</div>
	)
}
export default TrendItem