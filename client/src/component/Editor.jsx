import React from 'react'
import ReactQuill from 'react-quill'
const Editor = ({value,onChange})=>{
	const modules = {
  	toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  	};
	return(
	  <ReactQuill value={value} theme={'snow'} modules={modules} className="mb-10" onChange={onChange}/>
		)
}
export default Editor