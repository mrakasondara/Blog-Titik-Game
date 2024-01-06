import React,{useState} from 'react'
const TestCloud =()=>{
	const [files, setFiles] = useState('')
	const create = async (ev)=>{
		const data = new FormData()
		data.set('Files',files)
		ev.preventDefault()

		await fetch('https://api-tes-rho.vercel.app/upload',{
			method: 'POST',
			body: data,
			credentials: 'include'
		})
	}
	return(
		<div className="w-full flex justify-center items-center">
		<form action="" onSubmit={create}>
			<input type="file" onChange={(ev)=> setFiles(ev.target.value)}/>			
			<button>Submit</button>
		</form>

		</div>
	)
}
export default TestCloud