import React, { useState } from "react";

function Modal(props) {
    const { content, onClose, onSave } = props;
  const [inputValue, setInputValue] = useState(content);

  const handleSaveClick = () => {
    onSave(inputValue.title,inputValue.description);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Note</h2>
        <div className="mb-3">
<label htmlFor="title" className="form-label">Title</label>
<input type="text" className="form-control"minLength={5} required   id={'title'} name='title' value={inputValue.title} onChange={(e)=>{setInputValue({...inputValue,title:e.target.value})}} aria-describedby="title"/>
</div>
        <div className="mb-3">
<label htmlFor="Description" className="form-label">Description</label>
<input type="text" className="form-control" minLength={5} required  id={'Description'} name='Description' value={inputValue.description} onChange={(e)=>{setInputValue({...inputValue,description:e.target.value})}} aria-describedby="description"/>
</div>
        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
