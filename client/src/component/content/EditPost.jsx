import React,{useState,useContext,useEffect} from 'react'
import {Navigate, useParams} from 'react-router-dom'
import ReactQuill from 'react-quill'
import Editor from '../Editor'
import {UserContext} from '../../UserContext'

const EditPost = () =>{
  	const {userInfo} = useContext(UserContext)
  	const {updateSuccess, setUpdateSuccess} = useContext(UserContext)
  	const {id} = useParams()
		const [title, setTitle] = useState('')
  	const [summary, setSummary] = useState('')
  	const [tag, setTag] = useState('')
  	const [files, setFiles] = useState('')
 		const [content, setContent] = useState('')
  	const [redirect, setRedirect] = useState(false)


  	useEffect(()=>{
  		fetch('https://blog-titikgame.vercel.app/api/detailpost/'+id).then(response=>{
  			response.json().then(postInfo=>{
  				setTitle(postInfo.title)
  				setSummary(postInfo.summary)
  				setTag(postInfo.tag)
  				setFiles(postInfo.thumbnail)
  				setContent(postInfo.content)

  			})
  		})
  	},[])


  	async function editPost(ev){
  		ev.preventDefault()
  		const data = new FormData()
  		data.set('title',title)
  		data.set('summary',summary)
  		data.set('tag',tag)
  		data.set('id',id)
  		if(files?.[0]){
  			data.set('file', files?.[0])
  		}
  		data.set('content',content)
  		const response = await fetch('https://blog-titikgame.vercel.app/api/post',{
  			method: 'PUT',
  			body: data,
  			credentials: 'include',
  		})
  		if(response.ok){
	  		setRedirect(true)
	  		setUpdateSuccess(true)
  		}
  	}

  	if(redirect){
  		return <Navigate to={`/detailpost/${id}`}/>
  	}



  	const username = userInfo?.username
  	return(
  	<>
    {username && (
    <div className="w-full flex justify-center">
	    <div className="w-full md:w-3/4 flex py-1 px-5 -mt-5">
	        <div className="w-full min-h-[30rem] h-auto flex flex-col bg-slate-50 my-[5rem] px-5 py-[3rem] justify-center items-center rounded-lg shadow shadow-slate-300 shadow-lg">
		        <h1 className="text-2xl text-slate-700 font-bold text-center">
		          Edit Blog
		        </h1>
	        <form
	          action=""
	          className="flex flex-col w-full md:w-4/5 gap-3 text-slate-700"
	          onSubmit={editPost}
	        >
	          <div className="flex flex-col w-full gap-2">
	            <label htmlFor="">Judul</label>
	            <input
	              type="text"
	              name="title"
	              placeholder={"Judul Blog"}
	              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 px-3 py-2"
	              value={title}
	              onChange={ev=> setTitle(ev.target.value)}
	            />
	          </div>
	          <div className="flex flex-col w-full gap-2">
	            <label htmlFor="">Ringkasan</label>
	            <input
	              type="text"
	              name="summary"
	              placeholder={"Ringkasan Blog"}
	              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 px-3 py-2"
	              value={summary}
	              onChange={ev=> setSummary(ev.target.value)}
	            />
	          </div>
	          <div className="flex flex-col w-full gap-2">
	            <label htmlFor="">Tag</label>
	            <input
	              type="text"
	              name="tag"
	              placeholder={"News, Tournament, other"}
	              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 px-3 py-2"
	              value={tag}
	              onChange={ev=> setTag(ev.target.value)}
	            />
	          </div>
	          <div className="flex flex-col w-full gap-2">
	            <label htmlFor="">Thumbnail</label>
	            <input
	              type="file"
	              className="border rounded-lg focus:border-slate-700  outline-none border-slate-300 p-2"
	              onChange={ev=> setFiles(ev.target.files)}
	            />
	            <p className="text-[12px] font-semibold text-red-500">Format : JPEG, JPG, PNG, WEBP</p>
	          </div>
	          <div className="flex flex-col w-full gap-2 my-2">
	            <label htmlFor="">Content</label>
	            <Editor value={content} onChange={setContent} />
	          </div>
	          <div className="flex w-full my-6 justify-center">
	            <button className="w-full transition border rounded-full  py-1 px-2 bg-green-400 text-white font-bold hover:bg-white hover:border-green-400 hover:text-slate-500">
	              Edit Post
	            </button>
	          </div>
	        </form>
	      </div>
	    </div>
    </div>

    )}
    {!username && (
      <div className="flex w-full mb-[11rem] h-[15rem] justify-center items-center">
        <h1 className="text-3xl font-bold">404 Page Not Found</h1>
      </div>
      )}
    </>
  	)
}
export default EditPost