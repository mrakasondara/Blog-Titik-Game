import React,{useState} from 'react'
const TestCloud =()=>{
	const [file, setFile] = useState('')
	const create = async (ev)=>{
		const data = new FormData()
		data.set('file',file)
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
			<input type="file" onChange={(ev)=> setFile(ev.target.files)}/>			
			<button>Submit</button>
		</form>

		</div>
	)
}
export default TestCloud
