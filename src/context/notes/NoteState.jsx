import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const Host = "http://localhost:8000";
  const NotesInitial = [];
    
  const [Alert, setAlert] = useState("");
  const [Notes, setNotes] = useState(NotesInitial);

  //  GET  The  Notes :
  const GetAllNotes = async () => {
    // Get ALl the Notes from the api :
    if (sessionStorage.getItem("token")) {
     const check =await checkthetoken()
     if(check){
      const AllNotes = await fetch(`${Host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": sessionStorage.getItem("token")
            ? sessionStorage.getItem("token")
            : "",
        },
      });
      // Add a Note ON the Client Side:
      const json = await AllNotes.json();
      setNotes(json);};
      
    } else {
      setAlert("Please login or SignUp to fetch Notes");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    }
  };
  const addnote = async (title, description, tag) => {
    //  API call:
    const responce = await fetch(`${Host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : "",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // Add a Note ON the Client Side:
    const note = await responce.json();
    setNotes(Notes.concat(note));
  };

  // Delete a Note
  const DeleteNote = async (id) => {
    // API CALL For Deleting the Note:
    const responce = await fetch(`${Host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : "",
      },
    });
    const json = await responce.json();

    const newnotes = Notes.filter((note) => {
      return note._id != id;
    });
    setNotes(newnotes);
    setAlert("Note Deleted Successfully");
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };
  // Edit a Note
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const editNote = async (title, description) => {
    // API Calls:

    const responce = await fetch(
      `${Host}/api/notes/updatenote/${currentNote._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "auth-token": sessionStorage.getItem("token")
            ? sessionStorage.getItem("token")
            : "",
        },
        body: JSON.stringify({ title, description }),
      }
    );

    // Login to edit the note client side :

    setNotes((Notes) =>
      Notes.map((note) =>
        note._id === currentNote._id
          ? { ...note, title: title, description: description }
          : note
      )
    );
    setModalVisible(false);
    setCurrentNote(null);
    setAlert("Note Edited Successfully");
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  //  Handle the UnauthorisedUser token:
  const checkthetoken = async () => {
    if (sessionStorage.getItem("token")) {
  const user =    await fetch(`${Host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": sessionStorage.getItem("token")
            ? sessionStorage.getItem("token")
            : "",
        },
      });
      if (user.status === 401) {
        sessionStorage.removeItem("token");
        setAlert("Please Login to continue");
        setTimeout(() => {
          setAlert("");
        
        }, 2000);
        return false;
      }
      return true;
    }
  };

  return (
    <NoteContext.Provider
      value={{
        Alert,
        Notes,
        addnote,
        setAlert,
        DeleteNote,
        checkthetoken,
        editNote,
        isModalVisible,
        GetAllNotes,
        setModalVisible,
        currentNote,
        setCurrentNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
