import React,{useState} from 'react'
const TestCloud =()=>{
	const [files, setFiles] = useState('')
	const create = async (ev)=>{
		const data = new FormData()
		data.set('Files',files)
		ev.preventDefault()
		await fetch('https://api-tes-rho.vercel.app/post',{
			method: 'POST',
			body: data,
			credentials: 'include'
		})
	}
	return(
		<div className="w-full flex justify-center items-center">
			<input type="file" onChange={(ev)=> setFiles(ev.target.value)}/>			
		</div>
	)
}
export default TestCloud