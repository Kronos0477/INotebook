import React,{useContext} from 'react'

import Contextvalue from '../context/notes/NoteContext.jsx'
const NoteItems = (props) => {
  const  context = useContext(Contextvalue)
  const {DeleteNote,setCurrentNote,setModalVisible} = context;
  const handleclickedit =()=>{
    setCurrentNote(note);
    setModalVisible(true)
  }
    const {note} = props
  return (
    <div className='col-md-3'>
      <div className="card  my-3" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid mx-2 fa-trash" onClick={()=>{DeleteNote(note._id)}} style={{"color": "#58bcd5","marginLeft":"2px"}}></i>
    <i className="fa-solid fa-pen-to-square mx-2 fa-lg fa-fade" onClick={handleclickedit} ></i>
  </div>
</div>
    </div>
  )
}

export default NoteItems
