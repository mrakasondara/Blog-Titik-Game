import React,{useState} from 'react'
const TestCloud =()=>{
	const [files, setFiles] = useState('')
	const [name, setName] = useState('')

	async function createUpload(ev){

		ev.preventDefault()
		const data = new FormData()
	    data.set('file',files[0])
	    data.set('name',name)


		await fetch('http://localhost:4000/upload',{
			method: 'POST',
			body: data,
			credentials: 'include'
		})

		console.log('tea')
	}
	return( 
		<div className="w-full flex justify-center items-center">
		<form action="" onSubmit={createUpload}>
		     <input type="text" onChange={ev=> setName(ev.target.value)}/>
			<input type="file"  onChange={ev=> setFiles(ev.target.files)}/>			
			<button>Submit</button>
		</form>

		</div>
	)
}
export default TestCloud
