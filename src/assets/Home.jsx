import React,{useContext} from 'react'
import Notes from './Notes.jsx';
import Modal from "./Modal.jsx"
import Addnote from './Addnote.jsx';

import Contextvalue from '../context/notes/NoteContext.jsx'
export default function Home() {
  const  context = useContext(Contextvalue)
  const {isModalVisible,setModalVisible,currentNote,editNote} = context;
  return (
    <div>
    <Addnote/>
    {isModalVisible && (
        <Modal
          content={currentNote}
          onClose={() => setModalVisible(false)}
          onSave={editNote}
        />
      )}
    <Notes />
    </div>
  
)}