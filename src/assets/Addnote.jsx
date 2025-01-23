import React,{useContext,useState} from 'react'

import Contextvalue from '../context/notes/NoteContext.jsx'
const Addnote = () => {
    const  context = useContext(Contextvalue)
  const {addnote,setAlert} = context;
  const [note, setnote] = useState({title:"",description:"",tag:''})
  const handleclick=(e)=>{
    e.preventDefault()
    addnote(note.title,note.description,note.tag)
    setnote({title:"",description:"",tag:''})
    setAlert('The Note has been Added')
    setTimeout(() => {
      setAlert('')
     }, 2000);
  }
const onchange =(e)=>{
   
    setnote({...note,[e.target.name]:e.target.value})
}
  return (
    <div>
        <div className="container my-3">

<h1>Add a Note:</h1>
  <form>
<div className="mb-3">
<label htmlFor="title" className="form-label">Title</label>
<input type="text" className="form-control" id={'title'} name='title'minLength={5} required value={note.title}  onChange={onchange} aria-describedby="title"/>
</div>
<div className="mb-3">
<label htmlFor="description"  className="form-label">Description</label>
<input type="text" id={'description'} value={note.description} name='description'minLength={5} required  onChange={onchange} className="form-control" />
</div>
<div className="mb-3">
<label htmlFor="tag" className="form-label">Tag</label>
<input type="text" id={'Tag'} value={note.tag} name='tag' onChange={onchange} className="form-control" />
</div>

<button type="submit" disabled={note.title.length<5 || note.description.length<10} className="btn btn-primary" onClick={handleclick} >Add a Note</button>
</form>

</div>
    </div>
  )
}

export default Addnote
