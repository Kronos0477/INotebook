import React,{useContext,useEffect} from 'react'
import NoteItems from './NoteItems.jsx';
import Contextvalue from '../context/notes/NoteContext.jsx'
function Notes() {
    
  const  context = useContext(Contextvalue)
  const {Notes,GetAllNotes} = context;
  useEffect(() => {
    GetAllNotes()
  }, [])
  
  return (
    <div className="row">
    <h2>
        Your Notes
</h2>
{Notes.length !=0 && sessionStorage.getItem('token') ?Notes.map((note)=>{
  
  return<NoteItems key={note._id} note={note}/>
}):<div className="container">Please Add A Note To Display</div>}
      </div>
  )
}

export default Notes
